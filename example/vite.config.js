import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { viteVConsole } from '../src';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteVConsole({
      entry: '/Users/vadxq/git/vite-plugin-vconsole/example/src/main.js',
      localEnabled: true,
      enabled: true,
      config: {
        maxLogNumber: 1000,
        theme: 'dark'
      }
    })
  ]
});
