(async () => {
  try {
    await import('vconsole');
  } catch (e) {
    throw new Error(
      'vite-plugin-vconsole requires vconsole to be present in the dependency tree.'
    );
  }
})();

import type { viteVConsoleOptions } from './types';
import type { Plugin } from 'vite';

import { ResolvedConfig } from 'vite';

export function viteVConsole(opt: viteVConsoleOptions): Plugin {
  console.log(opt);

  let config: ResolvedConfig;

  return {
    name: 'vite:vconsole',
    enforce: 'pre',
    configResolved(resolvedConfig) {
      config = resolvedConfig;
      console.log(config);
    },
    // transformIndexHtml(html) {
    //   return html.replace(
    //     /<\/body>/,
    //     `<script src="https://unpkg.com/vconsole/dist/vconsole.min.js"></script><script>;new window.VConsole();</script></body>`
    //   )
    // },
    transform(_source: string, id: string) {
      if (id === opt.entry) {
        console.log(_source);
        console.log(this);
        return _source + `import VConsole from 'vconsole';new VConsole();`;
      }
      console.log(id);
      return _source;
    }
  };
}

export * from './types';
