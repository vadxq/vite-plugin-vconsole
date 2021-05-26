import type { viteVConsoleOptions } from './types';
import type { Plugin } from 'vite';

import { ResolvedConfig } from 'vite';

export function viteVConsole(opt: viteVConsoleOptions): Plugin {
  let viteConfig: ResolvedConfig;
  let isDev = false;
  const { entry, enabled = true, localEnabled = false, config = {} } = opt;

  return {
    name: 'vite:vconsole',
    enforce: 'pre',
    configResolved(resolvedConfig) {
      viteConfig = resolvedConfig;
      isDev = viteConfig.command === 'serve';
    },
    transform(_source: string, id: string) {
      if (id === entry && localEnabled && isDev) {
        // serve dev
        return `${_source};import VConsole from 'vconsole';new VConsole(${JSON.stringify(
          config
        )});`;
      }
      if (id === entry && enabled && !isDev) {
        // build prod
        return `${_source};import VConsole from 'vconsole';new VConsole(${JSON.stringify(
          config
        )});`;
      }
      return _source;
    }
  };
}

export * from './types';
