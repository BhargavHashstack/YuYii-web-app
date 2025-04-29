// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  
  
  envPrefix: ['VITE_', 'REACT_APP_', 'AWS_'],
  
  server: {
    proxy: {
      '/property-api': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
    historyApiFallback: true,
  },

  plugins: [react()],

  build: {
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Split node_modules into a separate chunk
          }
          if (id.includes('some-large-module')) {
            return 'large-module'; // Split specific large module into a separate chunk
          }
        },
      },
    },
    sourcemap: true,
  },

  // Optional: Configure base if deploying to a subdirectory
  // base: '/your-subdirectory/',

  // CSS will now be handled by PostCSS (no need for manual import of Tailwind)
});