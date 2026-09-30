# Engineering Contribution Standards
1. Strict Types: TypeScript strict mode required. `any` is prohibited.
2. Component Architecture: UI components in `/components/ui` or `/components/modules`.
3. Worker Isolation: Heavy media tasks MUST be dispatched to BullMQ.
