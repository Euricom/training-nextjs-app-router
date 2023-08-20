import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { join } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': join(__dirname, 'src'),
    },
  },
});
