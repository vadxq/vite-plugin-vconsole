# vite-plugin-vconsole

[![](https://img.shields.io/npm/v/vite-plugin-vconsole.svg?style=flat-square)](https://www.npmjs.com/package/vite-plugin-vconsole)
[![](https://img.shields.io/npm/l/vite-plugin-vconsole.svg?style=flat-square)](https://www.npmjs.com/package/vite-plugin-vconsole)
[![](https://img.shields.io/npm/dt/vite-plugin-vconsole.svg?style=flat-square)](https://www.npmjs.com/package/vite-plugin-vconsole)

> vite plugin for vconsole
>
> A plugin for Vite v2+ that helps developers easily use the functions of VConsole in various environments.

**English** | [中文](./README.zh_CN.md)

## Install (yarn or npm)

**node version:** >=12.0.0

**vite version:** >=2.0.0

```bash
yarn add vconsole
# or
npm i  vconsole -S
```

```bash
yarn add vite-plugin-vconsole -D
# or
npm i vite-plugin-vconsole -D
```

## Example

```bash
# vue
cd ./example/vue-demo

yarn install

yarn dev

```

```bash
# react
cd ./example/react-demo

yarn install

yarn dev

```

## Usage

### Config plugin in vite.config.ts

- **Vue** sample config

```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { viteVConsole } from 'vite-plugin-vconsole';
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteVConsole({
      entry: path.resolve('src/main.ts'), // or you can use entry: [path.resolve('src/main.ts')]
      enabled: true,
      config: {
        maxLogNumber: 1000,
        theme: 'dark'
      }
    })
  ]
});
```

- **Vue** sample config for multi pages

```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { viteVConsole } from 'vite-plugin-vconsole';
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteVConsole({
      entry: [path.resolve('src/main.ts')], // entry for each page, different from the above
      enabled: true,
      config: {
        maxLogNumber: 1000,
        theme: 'dark'
      }
    })
  ]
});
```

- **React** sample config

```ts
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { viteVConsole } from 'vite-plugin-vconsole';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    viteVConsole({
      entry: path.resolve('src/main.tsx'),
      enabled: true,
      config: {
        maxLogNumber: 1000,
        theme: 'dark'
      }
    })
  ]
});
```

- Different from the production environment and development environment

```ts
// Different from the production environment and development environment
// You can use command / mode to distinguish usage
import { UserConfigExport, ConfigEnv } from 'vite';
import { viteVConsole } from 'vite-plugin-vconsole';
import vue from '@vitejs/plugin-vue';
import * as path from 'path'

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  return {
    plugins: [
      vue(),
      viteVConsole({
        entry: [path.resolve('src/main.ts')], // entry file
        enabled: command !== 'serve' || mode === 'test', // build production
        config: { // vconsole options
          maxLogNumber: 1000，
          theme: 'light'
        }
      })
    ],
  };
};
```

- vConsole plugin config

```javascript
viteVConsole({
  entry: path.resolve('src/main.ts'),
  enabled: true,
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
```

### viteVConsole Options

```ts
/// <reference types="vconsole" />

{
  entry: string | string[]; // entry file require
  enabled?: boolean;
  config?: VConsoleOptions
  plugin?: {
    id: string;
    name: string;
    event: {
      eventName: string;
      callback: (data?: any) => void;
    }[]
  }[]
}
```

## Options

### entry

**type:** `string | string[]`
**require:**

must support. Supports multiple entries when it is an array.

### enabled

**type:** `boolean`

**default:** `true`

### config

**type:**: `VConsoleOptions`

### plugin

**type:**

```type
{
  id: string;
  name: string;
  event: {
    eventName: string;
    callback: (data?: any) => void;
  }[]
}[]
```

## Typescript

Add a reference to `vconsole`

```ts
/// <reference types="vconsole" />
```

## Sample project

[vite-vue-prod-template](https://github.com/vadxq/vite-vue-prod-template)

## Compatible to solve the Windows path problem

Update to V1.1.1+ version, Now you can use it normally in Windows.

## Support multi-page configuration

Update to V1.2.0+ version, can support multi-page configuration.

Many thanks to [@AfireHong](https://github.com/AfireHong) for support!

## Support VConsole Functions Configuration

Update to V1.3.0+ version, can support VConsole Functions Configuration.

Many thanks to [@KeJunMao](https://github.com/KeJunMao) for support!

## Support VConsole Plugin Configuration

Update to V2.0.0+ version, can support VConsole Plugin Configuration.

## License

[MIT](LICENSE)
