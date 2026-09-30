# Production Deployment Protocol

The system is deployed as a consolidated Docker Swarm or single-node Docker Compose stack for on-premise, air-gapped forensic labs.

1. **Environment Setup:** Modify `.env.production` with secure DB credentials and Redis URIs.
2. **Build Process:**
   ```bash
   docker build -t omnisight-web -f ./docker/web.Dockerfile .
   docker build -t omnisight-worker -f ./docker/worker.Dockerfile .
   docker build -t omnisight-ml -f ./docker/ml.Dockerfile .