# Security & Integrity Protocols
1. Immutable Chain of Custody: The original ingested file is strictly read-only. Derived files reference the `sha256Hash` of the parent. All actions append to an Audit Log.
2. File System Sandboxing: FFmpeg/parsing scripts run in isolated Node child processes/containers.
3. Data At Rest & Transit: Internal microservice communication is isolated.
4. Input Sanitization: Strict MIME type and magic-byte checking before processing.
