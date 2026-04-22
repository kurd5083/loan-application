import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window',
  },
  resolve: {
    alias: {
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/store': path.resolve(__dirname, 'src/store'),
      '@/pages': path.resolve(__dirname, 'src/pages'),
      '@/hooks': path.resolve(__dirname, 'src/hooks'),
      '@/api': path.resolve(__dirname, 'src/api'),
    },
  },
});
