// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';

export default defineConfig({
  plugins: [mdx(), react()],
  server: {
    // Проксируем /api → бэкенд (только в режиме разработки)
    proxy: {
      '/api': {
        target: 'http://localhost:5100',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api/v0'),
      },
    },
  },
});
