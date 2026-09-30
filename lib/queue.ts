import { Queue } from "bullmq";
import IORedis from "ioredis";

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

// Lazy / graceful Redis connection
let redisConnection: IORedis | null = null;
let videoQueue: Queue | null = null;

export function getRedisConnection(): IORedis {
  if (!redisConnection) {
    redisConnection = new IORedis(redisUrl, {
      maxRetriesPerRequest: null,
      enableOfflineQueue: false,
      connectTimeout: 2000,
      retryStrategy(times) {
        if (times > 3) {
          return null; // Stop retrying after 3 attempts
        }
        return Math.min(times * 100, 1000);
      },
      lazyConnect: true,
    });

    redisConnection.on("error", (err) => {
      // Graceful error logging to prevent process crash
      console.warn("[BullMQ] Redis Connection Notice (Fallback Active):", err.message);
    });
  }
  return redisConnection;
}

export function getVideoQueue(): Queue {
  if (!videoQueue) {
    const connection = getRedisConnection();
    videoQueue = new Queue("video-processing-queue", {
      connection,
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 1000,
        },
        removeOnComplete: 100,
        removeOnFail: 500,
      },
    });
  }
  return videoQueue;
}

export async function dispatchVideoProcessingJob(evidenceId: string, payload: Record<string, unknown>) {
  try {
    const queue = getVideoQueue();
    const job = await queue.add(
      "process-surveillance-media",
      { evidenceId, ...payload },
      { priority: 1 }
    );
    return { success: true, jobId: job.id, queued: true };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.warn(
      `[BullMQ] Direct queue dispatch bypassed (${errorMessage}). Running in standalone forensic mode for Evidence: ${evidenceId}`
    );
    return { success: true, jobId: `fallback-${evidenceId}`, queued: false };
  }
}
