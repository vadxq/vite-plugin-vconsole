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
// tips: If the reference path hint does not exist, you can import the @types/node package
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
        log: {
          maxLogNumber: 1000,
        },
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
        log: {
          maxLogNumber: 1000,
        },
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
        log: {
          maxLogNumber: 1000,
        },
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

- A custom rule that triggers destruction, see the question request: [How to judge page userAgent to choose whether to load vconsole](https://github.com/vadxq/vite-plugin-vconsole/issues/12)

```javascript
// customHide: A piece of executable code, used to start some APIs on the browser side.
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

- Dynamic configuration, see issue requirements: [How to dynamically modify the theme?](https://github.com/vadxq/vite-plugin-vconsole/issues/21)

Please note that the dynamic configuration here has the highest priority, and dynamicConfig will override the configuration in config.

You can provide a stringified runnable function that listens for a parameter as a trigger. Then modify a global variable `window.vConsole.dynamicChange.value`. When this variable changes, the dynamic configuration will take effect again. Here you can combine the above dynamic configuration to dynamically switch themes.

The reason why this design uses more stringified code is to reduce code intrusion into the production environment.

```ts
// Example, distinguish theme light and dark colors based on class
// Distinguish black or white based on whether it has a dark class name
viteVConsole({
  config: {
    theme: 'light'
  },
  dynamicConfig: {
    theme: `document.querySelectorAll('.dark').length ? 'dark' : 'light'`,
  },
  // If you need to switch themes without refreshing
  eventListener: `
    const targetElement = document.querySelector('body'); // Select the element to listen to
    const observerOptions = {
      attributes: true, // Listen for property changes
      attributeFilter: ['class'] // Only monitor class attribute changes
    };

    // Define callback functions to handle observed changes
    function handleAttributeChange(mutationsList, observer) {
      for(let mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          console.log('The class attribute was modified.');
          // Add the code you need to execute here
          if (window && window.vConsole) {
            window.vConsole.dynamicChange.value = new Date().getTime();
          }
        }
      }
    }

    // Create an observer instance and pass in the callback function
    const observer = new MutationObserver(handleAttributeChange);

    // Start observing the target element
    observer.observe(targetElement, observerOptions);

    // Stop observing when it is no longer needed
    // observer.disconnect();
  `,
})
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

### customHide

**type:**: String

## Typescript

Add a reference to `vconsole`

```ts
/// <reference types="vconsole" />
```

### dynamicConfig

Dynamic configuration items, which contain stringified functions. (It is recommended not to use dynamic configuration in production environments)

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

Here you can combine the following configurations to dynamically switch themes. Modifying a global variable `window.vConsole.dynamicChange.value` will trigger dynamic configuration reloading without refreshing the page.

### eventListener

You can provide a stringified runnable function that listens for a parameter as a trigger. Then modify a global variable `window.vConsole.dynamicChange.value`. When this variable changes, the dynamic configuration will take effect again. Here you can combine the above dynamic configuration to dynamically switch themes.

```ts
eventListener?: string
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

## Support VConsole Plugin Configuration.Support custom destruction

Update to V2.0.0+ version, can support VConsole Plugin Configuration.Also supports custom destruction.

## Support VConsole dynamic configuration. Support eventListener

Updated to version V2.1.0+, VConsole dynamic configuration can be configured. and you can give some eventListener code. It can be easily configured to follow theme changes, etc.

## License

[MIT](LICENSE)
