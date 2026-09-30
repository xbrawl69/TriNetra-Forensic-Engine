import { Worker, Job } from "bullmq";
import { prisma } from "../lib/prisma";
import { getRedisConnection } from "../lib/queue";

interface VideoJobData {
  evidenceId: string;
  originalName?: string;
  vendor?: string;
  sha256Hash?: string;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function processVideoJob(job: Job<VideoJobData>) {
  const { evidenceId, originalName, vendor } = job.data;
  console.log(`[Worker] Started DVR parsing for evidence: ${evidenceId} (${vendor || "PROPRIETARY"})`);

  // Phase 5 requirement:
  // 1. Wait 5 seconds
  await sleep(5000);

  // 2. Update database Evidence status to PROCESSING
  try {
    await prisma.evidence.update({
      where: { id: evidenceId },
      data: { status: "PROCESSING" },
    });
    console.log(`[Worker] Evidence ${evidenceId} status updated to PROCESSING`);
  } catch (err) {
    console.warn(`[Worker] DB update (PROCESSING) notice:`, err instanceof Error ? err.message : err);
  }

  // 3. Wait 5 seconds
  await sleep(5000);

  // 4. Update database Evidence status to NORMALIZED and generate 3 mock Analytics records
  try {
    await prisma.evidence.update({
      where: { id: evidenceId },
      data: {
        status: "NORMALIZED",
        metadata: {
          codec: "H.264 / AVC",
          container: "Standard MP4 Container",
          resolution: "1920x1080",
          framerate: 30,
          normalizedAt: new Date().toISOString(),
          sourceVendor: vendor || "Dahua",
          originalFile: originalName || "stream.dav",
        },
      },
    });

    // Generate 3 mock Analytics records in Prisma
    const mockAnalytics = [
      {
        evidenceId,
        timestamp: 4.2,
        eventType: "MOTION",
        confidence: 0.96,
        boundingBox: { x: 120, y: 180, width: 340, height: 420, label: "Motion Ingress [Zone 1]" },
      },
      {
        evidenceId,
        timestamp: 12.8,
        eventType: "OBJECT",
        confidence: 0.94,
        boundingBox: { x: 210, y: 150, width: 280, height: 390, label: "Unattended Target Object" },
      },
      {
        evidenceId,
        timestamp: 18.5,
        eventType: "FACE_DETECTED",
        confidence: 0.91,
        boundingBox: { x: 310, y: 120, width: 95, height: 110, label: "Facial Geometry 91.2%" },
      },
    ];

    for (const item of mockAnalytics) {
      await prisma.analytics.create({
        data: item,
      });
    }

    console.log(`[Worker] Evidence ${evidenceId} normalized & 3 analytics events registered.`);
  } catch (err) {
    console.warn(`[Worker] DB update (NORMALIZED) notice:`, err instanceof Error ? err.message : err);
  }

  return { status: "NORMALIZED", evidenceId };
}

// Standalone runner helper for background simulation
export async function simulateDirectProcessing(evidenceId: string) {
  const fakeJob = {
    data: { evidenceId, vendor: "Dahua", originalName: "ch01_stream.dav" },
  } as Job<VideoJobData>;
  return processVideoJob(fakeJob);
}

// Initialize BullMQ Worker instance
export function startWorker() {
  const connection = getRedisConnection();
  const worker = new Worker<VideoJobData>(
    "video-processing-queue",
    async (job) => {
      return processVideoJob(job);
    },
    {
      connection,
      concurrency: 2,
    }
  );

  worker.on("completed", (job) => {
    console.log(`[Worker] Job ${job.id} completed successfully.`);
  });

  worker.on("failed", (job, err) => {
    console.error(`[Worker] Job ${job?.id} failed with error:`, err);
  });

  return worker;
}

// If invoked directly from CLI/daemon: node workers/videoProcessor.js
if (require.main === module) {
  console.log("[Worker] Starting OmniSight Forensics BullMQ Worker Daemon...");
  startWorker();
}
