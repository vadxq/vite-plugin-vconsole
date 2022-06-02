import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { viteVConsole } from '../../src';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteVConsole({
      entry: [path.resolve('src/main.ts'), path.resolve('nested/main.ts')],
      localEnabled: true,
      enabled: true,
      config: {
        maxLogNumber: 1000,
        theme: 'light'
      }
    })
  ],
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        nested: path.resolve(__dirname, 'nested/index.html')
      }
    }
  }
});
