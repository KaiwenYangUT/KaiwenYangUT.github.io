import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';
export default defineConfig({ plugins: [reactRouter()], define: { __BUILD_DATE__: JSON.stringify(process.env.BUILD_DATE || new Date().toISOString().slice(0, 10)) } });
