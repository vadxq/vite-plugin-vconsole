/// <reference types="vconsole" />

import path from 'path';
import { defineConfig } from 'vite';
import { viteVConsole } from '../';

export default defineConfig({
  plugins: [
    viteVConsole({
      entry: path.resolve('src/main.ts'),
      localEnabled: true,
      enabled: true,
      config: {
        onReady() {
          console.log(23333);
        }
      }
    })
  ]
});
