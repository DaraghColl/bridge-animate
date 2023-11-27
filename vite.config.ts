import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@features': path.resolve(__dirname, './src/features'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@components': path.resolve(__dirname, './src/shared/components'),
      '@constants': path.resolve(__dirname, './src/shared/constants'),
      '@hooks': path.resolve(__dirname, './src/shared/hooks'),
      '@state': path.resolve(__dirname, './src/shared/state'),
      '@utils': path.resolve(__dirname, './src/shared/utils'),
    },
  },
  plugins: [react()],
});
