// This is the Prisma Schema definition for the core engine.
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Investigation {
  id          String   @id @default(cuid())
  caseNumber  String   @unique
  title       String
  officer     String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  evidences   Evidence[]
}

model Evidence {
  id              String   @id @default(cuid())
  investigationId String
  investigation   Investigation @relation(fields: [investigationId], references: [id])
  originalName    String
  vendor          String   // e.g., "HIKVISION", "Dahua"
  fileSize        BigInt
  md5Hash         String
  sha256Hash      String
  status          JobStatus @default(PENDING)
  storageUrl      String
  metadata        Json?
  createdAt       DateTime @default(now())
  analytics       Analytics[]
}

model Analytics {
  id          String   @id @default(cuid())
  evidenceId  String
  evidence    Evidence @relation(fields: [evidenceId], references: [id])
  timestamp   Float    // Seconds into video
  eventType   String   // "FACE_DETECTED", "MOTION", "OBJECT"
  confidence  Float
  boundingBox Json
}

enum JobStatus {
  PENDING
  PROCESSING
  NORMALIZED
  ANALYZED
  FAILED
}