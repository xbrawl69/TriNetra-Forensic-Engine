# OmniSight Forensics Platform

A highly concurrent, multi-vendor forensic analysis tool for standardized acquisition, recovery, and AI-driven analysis of surveillance evidence.

## System Capabilities
- Automated parsing of proprietary file systems (Dahua, CP Plus, HIKVISION, etc.).
- Cryptographic hash verification pre- and post-acquisition.
- Asynchronous video normalization via distributed FFmpeg workers.
- AI Timeline correlation and event tagging.

## Quick Start
```bash
# 1. Clone the repository
git clone [https://github.com/organization/omnisight-forensics.git](https://github.com/organization/omnisight-forensics.git)

# 2. Spin up the infrastructure (Postgres, Redis, Worker, MinIO)
docker-compose up -d

# 3. Install dependencies & push schema
npm install
npx prisma db push

# 4. Start the Next.js API & UI
npm run dev