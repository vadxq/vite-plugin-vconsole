/// <reference types="vconsole" />

import path from 'path';
import { defineConfig } from 'vite';
import { viteVConsole } from '../src/main';
export default defineConfig({
  plugins: [
    viteVConsole({
      entry: path.resolve('src/main.ts'),
      enabled: true,
      customHide: `/chrome\\/([\\d\\.]+)/.test(navigator.userAgent.toLowerCase())`,
      config: {
        theme: 'dark',
        onReady() {
          console.log(23333);
        }
      },
      plugin: [
        {
          id: 'my_plugin',
          name: 'MyPlugin',
          event: [
            {
              eventName: 'init',
              callback: function () {
                console.log('My plugin init');
              }
            },
            {
              eventName: 'renderTab',
              callback: function () {
                console.log('My plugin renderTab');
              }
            }
          ]
        },
        {
          id: 'my_plugin2',
          name: 'MyPlugin2',
          event: [
            {
              eventName: 'init',
              callback: function () {
                console.log('My plugin2 init');
              }
            },
            {
              eventName: 'renderTab',
              callback: function () {
                console.log('My plugin2 renderTab');
              }
            }
          ]
        }
      ]
    })
  ]
});
