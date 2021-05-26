import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { viteVConsole } from '../../src';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteVConsole({
      entry: path.resolve('src/main.ts'),
      localEnabled: true,
      enabled: true,
      config: {
        maxLogNumber: 1000,
        theme: 'light'
      }
    })
  ]
});
