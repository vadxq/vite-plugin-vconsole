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
        log: {
          maxLogNumber: 1000,
        },
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
        log: {
          maxLogNumber: 1000,
        },
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
        log: {
          maxLogNumber: 1000,
        },
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
          log: {
            maxLogNumber: 1000,
          },
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
  customHide: `/iphone/g.test(navigator.userAgent.toLowerCase())`,
  config: {
    theme: 'dark',
    onReady() {
      console.log(23333);
    }
  },
})
```

- 动态配置，见issue需求：[请问如何动态修改主题？](https://github.com/vadxq/vite-plugin-vconsole/issues/21)

请注意，这里的动态配置优先级最高，dynamicConfig会覆盖config里的配置。

你可以提供一段字符串化的可运行函数，监听某个参量作为触发器。然后修改一个全局变量`window.vConsole.dynamicChange.value`。当这个变量发生变化时，动态配置会重新进行生效。这里可以结合上面动态配置做到动态切换主题。

之所以这样设计使用更多的字符串化代码，是为了能减少对生产环境的代码侵入。

```ts
// 示例，根据class来区分主题亮色和暗色
// 根据是否具有dark的class名来区分黑色还是白色
viteVConsole({
  config: {
    theme: 'light'
  },
  dynamicConfig: {
    theme: `document.querySelectorAll('.dark').length ? 'dark' : 'light'`,
  },
  // 如果你需要不刷新切换主题
  eventListener: `
    const targetElement = document.querySelector('body'); // 择要监听的元素
    const observerOptions = {
      attributes: true, // 监听属性变化
      attributeFilter: ['class'] // 只监听class属性变化
    };

    // 定义回调函数来处理观察到的变化
    function handleAttributeChange(mutationsList, observer) {
      for(let mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          console.log('The class attribute was modified.');
          // 在这里添加你需要执行的代码
          if (window && window.vConsole) {
            window.vConsole.dynamicChange.value = new Date().getTime();
          }
        }
      }
    }

    // 创建观察者实例并传入回调函数
    const observer = new MutationObserver(handleAttributeChange);

    // 开始观察目标元素
    observer.observe(targetElement, observerOptions);

    // 当不再需要观察时，停止观察
    // observer.disconnect();
  `,
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

### dynamicConfig

动态配置项，里面放字符串化的函数。（建议不在生产环境使用动态配置）

```ts
dynamicConfig: {
  theme?: string;
  target?: string;
  defaultPlugins?: string;
  disableLogScrolling?: boolean;
  pluginOrder?: string;
  log?: string;
  network?: string;
  storage?: string;
}
```

这里可以结合下面配置进行动态切换主题。修改一个全局变量`window.vConsole.dynamicChange.value`，会触发动态配置重新加载，而不需要刷新页面。

### eventListener

你可以提供一段字符串化的可运行函数，监听某个参量作为触发器。然后修改一个全局变量`window.vConsole.dynamicChange.value`。当这个变量发生变化时，动态配置会重新进行生效。这里可以结合上面动态配置做到动态切换主题。

```ts
eventListener?: string
```

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

## 支持VConsole动态配置和事件监听

更新至V2.1.0+版本，可以配置VConsole动态配置和提供事件监听的代码啦。可以方便配置跟随主题变化等。

## License

[MIT](LICENSE)
