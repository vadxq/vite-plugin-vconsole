import type { viteVConsoleOptions } from './types';
import type { Plugin } from 'vite';

import { ResolvedConfig } from 'vite';

export function viteVConsole(opt: viteVConsoleOptions): Plugin {
  let viteConfig: ResolvedConfig;
  let isDev = false;
  const { entry, enabled = true, localEnabled = false, config = {} } = opt;

  // Compatible to solve the windows path problem
  let entryPath = entry;
  if (process.platform === 'win32') entryPath = entry.replace(/\\/g, '/');

  return {
    name: 'vite:vconsole',
    enforce: 'pre',
    configResolved(resolvedConfig) {
      viteConfig = resolvedConfig;
      isDev = viteConfig.command === 'serve';
    },
    transform(_source: string, id: string) {
      if (id === entryPath && localEnabled && isDev) {
        // serve dev
        return `${_source};import VConsole from 'vconsole';new VConsole(${JSON.stringify(
          config
        )});`;
      }
      if (id === entryPath && enabled && !isDev) {
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
