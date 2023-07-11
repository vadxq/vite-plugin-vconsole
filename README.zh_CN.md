# vite-plugin-vconsole

[![](https://img.shields.io/npm/v/vite-plugin-vconsole.svg?style=flat-square)](https://www.npmjs.com/package/vite-plugin-vconsole)
[![](https://img.shields.io/npm/l/vite-plugin-vconsole.svg?style=flat-square)](https://www.npmjs.com/package/vite-plugin-vconsole)
[![](https://img.shields.io/npm/dt/vite-plugin-vconsole.svg?style=flat-square)](https://www.npmjs.com/package/vite-plugin-vconsole)

> vite plugin for vconsole
>
> 一个适用于 Vite v2+的插件，帮助开发者在各个环境下方便使用VConsole的功能。可以方便配置区分环境，根据环境动态加载VConsole，支持多页面配置。

**中文** | [English](./README.md)

## 安装 (yarn or npm)

**node version:** >=12.0.0

**vite version:** >=2.0.0

```bash
# npm
npm i vite-plugin-vconsole -D
npm i  vconsole -S

# yarn
yarn add vconsole
yarn add vite-plugin-vconsole -D

# pnpm
pnpm add vconsole
pnpm add -D vite-plugin-vconsole
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
// tips: 如果引用path提示不存在，可以引入@types/node包
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
      enabled: true, // 可自行结合 mode 和 command 进行判断
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
      enabled: true, // 可自行结合 mode 和 command 进行判断
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
      enabled: true, // 可自行结合 mode 和 command 进行判断
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

- 自定义vConsole插件

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

- 自定义规则使其触发销毁，见issue需求：[如何判断页面userAgent来选择是否加载vconsole](https://github.com/vadxq/vite-plugin-vconsole/issues/12)

```javascript
// customHide: 一段可运行代码段，用于出发在浏览器端的一些api
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
})
```

## 配置

### entry

**type:** `string | string[]`
**require:**

必须提供，支持多入口。

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

### customHide

**type:**: String

## Typescript

添加 `vconsole` 的引用

```ts
/// <reference types="vconsole" />
```

## 示例项目

[vite-vue-prod-template](https://github.com/vadxq/vite-vue-prod-template)

## 兼容解决Windows路径问题

更新至V1.1.1+版本，现在你可以在Windows正常使用啦。

## 支持多页面配置

更新至V1.2.0+版本，可以支持多页面配置啦～

非常感谢[@AfireHong](https://github.com/AfireHong)的支持！

## 支持VConsole函数配置

更新至V1.3.0+版本，可以VConsole函数配置啦～

非常感谢[@KeJunMao](https://github.com/KeJunMao)的支持！

## 支持VConsole自定义插件和配置参数调整，支持自定义销毁

更新至V2.0.0+版本，可以配置VConsole定义插件啦～同时支持自定义销毁

## License

[MIT](LICENSE)
