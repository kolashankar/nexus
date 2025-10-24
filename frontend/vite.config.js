import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    'process.env': {},
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    strictPort: false,
    allowedHosts: [
      'screengrab-readme.preview.emergentagent.com',
      '.preview.emergentagent.com',
      'localhost',
    ],
    hmr: {
      clientPort: 443,
    },
    proxy: {
      '/api': {
        target: process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001',
        changeOrigin: true,
      },
      '/ws': {
        target: process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001',
        ws: true,
      },
    },
  },
  base: './',
});
