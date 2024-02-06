/// <reference types="vconsole" />

import path from 'path';
import { defineConfig } from 'vite';
import { viteVConsole } from '../src/main';
export default defineConfig({
  plugins: [
    viteVConsole({
      entry: path.resolve('src/main.ts'),
      enabled: true,
      customHide: `/iphone/g.test(navigator.userAgent.toLowerCase())`,
      config: {
        theme: 'light',
        onReady() {
          console.log(23333);
        }
      },
      dynamicConfig: {
        theme: `document.querySelectorAll('.dark').length ? 'dark' : 'light'`
      },
      eventListener: `
const targetElement = document.querySelector('body'); //  选择要监听的元素
const observerOptions = {
  attributes: true, // 监听属性变化
  attributeFilter: ['class'] //  只监听class属性变化
};

//  定义回调函数来处理观察到的变化
function handleAttributeChange(mutationsList, observer) {
  for(let mutation of mutationsList) {
    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
      console.log('The class attribute was modified.');
      //  在这里添加你需要执行的代码
      if (window && window.vConsole) {
        window.vConsole.dynamicChange.value = new Date().getTime();
      }
      console.log('window.vConsole.dynamicChange', window.vConsole.dynamicChange);
    }
  }
}

//  创建观察者实例并传入回调函数
const observer = new MutationObserver(handleAttributeChange);

//  开始观察目标元素
observer.observe(targetElement, observerOptions);

// 当不再需要观察时，停止观察
// observer.disconnect();
      `,
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
