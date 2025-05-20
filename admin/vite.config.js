import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Vite config with test environment setup
export default defineConfig({
  plugins: [react()],
  resolve: { 
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: { port: 5172 },

  
  test: {
    environment: 'jsdom',
    globals: true
    
  }
});

