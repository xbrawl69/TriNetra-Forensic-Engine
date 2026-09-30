# System Architecture Blueprint

## 1. High-Level Topology
The system utilizes an asynchronous, event-driven microservices architecture to prevent UI blocking during heavy video processing and ML analysis.

- **Frontend / API Gateway:** Next.js 14 (App Router, React Server Components).
- **Database Layer:** PostgreSQL (Relational Data & Metadata) via Prisma ORM.
- **Message Broker & Queue:** Redis + BullMQ (Task orchestration for video decoding).
- **Video Processing Engine:** Node.js Child Processes executing `FFmpeg` and `ExifTool`.
- **ML Analytics Microservice:** Python (FastAPI, OpenCV, YOLOv8) containerized independently.
- **Storage:** MinIO (S3-compatible) for raw and normalized video storage.

## 2. Data Flow
1. User uploads forensic image/raw proprietary video via Next.js UI.
2. Next.js API generates an initial SHA-256 hash, stores metadata in PostgreSQL, and uploads to MinIO.
3. API pushes a job to the `video-processing-queue` (BullMQ).
4. Worker node picks up the job, normalizes the video, extracts timestamps, and pushes to `ml-analytics-queue`.
5. Python microservice executes object/face detection, returning bounding box metadata to PostgreSQL.
6. Client UI updates in real-time via Server-Sent Events (SSE) or WebSockets.