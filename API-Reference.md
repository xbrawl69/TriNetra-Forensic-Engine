# Internal API Reference
- `POST /api/evidence/upload`: Accepts `multipart/form-data`. Returns `Evidence` object and queues the parsing job.
- `GET /api/evidence/:id`: Returns metadata, processing status, and nested `Analytics`.
- `GET /api/evidence/:id/stream`: Streams normalized MP4 file using byte-range headers.
- `GET /api/analytics/timeline`: Returns aggregated JSON array of timestamped events.
