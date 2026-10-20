import { defineConfig } from 'vitest/config';
export default defineConfig({ test: { include: ['tests/**/*.test.ts'] }, define: { __BUILD_DATE__: JSON.stringify('2026-10-20') } });
