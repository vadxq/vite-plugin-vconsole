# vite-plugin-vconsole

[![](https://img.shields.io/npm/v/vite-plugin-vconsole.svg?style=flat-square)](https://www.npmjs.com/package/vite-plugin-vconsole)
[![](https://img.shields.io/npm/l/vite-plugin-vconsole.svg?style=flat-square)](https://www.npmjs.com/package/vite-plugin-vconsole)
[![](https://img.shields.io/npm/dt/vite-plugin-vconsole.svg?style=flat-square)](https://www.npmjs.com/package/vite-plugin-vconsole)

> vite2 plugin for vconsole
> 一个适用于Vite2的插件，帮助开发者在各个环境下方便使用VConsole的功能。可以方便配置区分环境，根据环境动态加载VConsole，支持多页面配置。

**中文** | [English](./README.md)

## 安装 (yarn or npm)

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

## 示例

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

## 使用

### vite.config.ts 配置

- **Vue** 简单配置

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
      entry: path.resolve('src/main.ts'), // 或者可以使用这个配置: [path.resolve('src/main.ts')]
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

- **Vue** 多页面简单配置

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
      entry: [path.resolve('src/main.ts')], // 每个页面的入口文件，和上面不一样的地方，这里是一个数组
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

- **React** 简单配置

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

- 区分开发环境和生产打包环境

```ts
// 你可以使用 command / mode 来区分是否使用
import { UserConfigExport, ConfigEnv } from 'vite';
import { viteVConsole } from 'vite-plugin-vconsole';
import vue from '@vitejs/plugin-vue';
import * as path from 'path'

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  return {
    plugins: [
      vue(),
      viteVConsole({
        entry: [path.resolve('src/main.ts')], // 入口文件
        localEnabled: command === 'serve', // serve开发环境下
        enabled: command !== 'serve' || mode === 'test', // 打包环境下/发布测试包
        config: { // vconsole 配置项
          maxLogNumber: 1000，
          theme: 'light'
        }
      })
    ],
  };
};
```

## 配置

### entry

**type:** `string | string[]`
**require:**

必须提供，支持多入口。

### localEnabled

**type:** `boolean`

**default:** `false`

### enabled

**type:** `boolean`

**default:** `true`

## 示例项目

[vite-vue-prod-template](https://github.com/vadxq/vite-vue-prod-template)

## 兼容解决Windows路径问题

更新至V1.1.1+版本，现在你可以在Windows正常使用啦。

## 支持多页面配置

更新至V1.2.0+版本，可以支持多页面配置啦～

非常感谢[@AfireHong](https://github.com/AfireHong)的支持！

## License

[MIT](LICENSE)
