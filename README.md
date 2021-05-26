# vite-plugin-vconsole

[![](https://img.shields.io/npm/v/vite-plugin-vconsole.svg?style=flat-square)](https://www.npmjs.com/package/vite-plugin-vconsole)
[![](https://img.shields.io/npm/l/vite-plugin-vconsole.svg?style=flat-square)](https://www.npmjs.com/package/vite-plugin-vconsole)
[![](https://img.shields.io/npm/dt/vite-plugin-vconsole.svg?style=flat-square)](https://www.npmjs.com/package/vite-plugin-vconsole)

> vite2 plugin for vconsole

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
      entry: path.resolve('src/main.ts'),
      localEnabled: true,
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
      localEnabled: true,
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
        entry: path.resolve('src/main.ts'), // entry file
        localEnabled: command === 'serve', // dev environment
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

### viteVConsole Options

```ts
{
    mockPath?: string;
    supportTs?: boolean;
    ignore?: RegExp | ((fileName: string) => boolean);
    watchFiles?: boolean;
    localEnabled?: boolean;
    ignoreFiles?: string[];
    configPath?: string;
    prodEnabled?: boolean;
    injectFile?: string;
    injectCode?: string;
}
```

## Options

### mockPath

**type:** `string`

**default:** `'mock'`

Set the folder where the mock .ts file is stored

If `watchFiles:true`, the file changes in the folder will be monitored. And synchronize to the request result in real time

If configPath has a value, it is invalid

### supportTs

**type:** `boolean`

**default:** `true`

After opening, the ts file module can be read. Note that you will not be able to monitor .js files after opening.

### ignore

**type:** `RegExp | ((fileName: string) => boolean);`

**default:** `undefined`

When automatically reading analog .ts files, ignore files in the specified format

### watchFiles

**type:** `boolean`

**default:** `true`

Set whether to monitor changes in mock .ts files

### localEnabled

**type:** `boolean`

**default:** `command === 'serve'`

Set whether to enable the local mock .ts file, do not open it in the production environment

### prodEnabled

**type:** `boolean`

**default:** `command !=='serve'`

Set whether to enable mock function for packaging

### injectCode

**type:** `string`

**default:**''

If the mock function is enabled in the production environment, that is, `prodEnabled=true`, the code will be injected into the bottom of the file corresponding to `injectFile`. The default is `main.{ts,js}`

The advantage of this is that you can dynamically control whether mock is enabled in the production environment and mock.js will not be packaged when it is not enabled.

If the code is written directly in `main.ts`, no matter whether it is turned on or not, the final package will include `mock.js`

### injectFile

**type:** `string`

**default:** `path.resolve(process.cwd(),'src/main.{ts,js}')`

The file injected by `injectCode` code, the default is `src/main.{ts,js}` in the project root directory

### configPath

**type:** `string`

**default:** `vite.mock.config.ts`

Set the data entry that the mock reads. When the file exists and is located in the project root directory, the file will be read and used first. The configuration file returns an array

### logger

**type:** `boolean`

**default:** `true`

Whether to display the request log on the console

## Sample project

[vite-vue-prod-template](https://github.com/vadxq/vite-vue-prod-template)

## License

[MIT](LICENSE)
