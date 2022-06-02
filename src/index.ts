import type { viteVConsoleOptions } from './types';
import type { Plugin } from 'vite';

import { ResolvedConfig } from 'vite';

export function viteVConsole(opt: viteVConsoleOptions): Plugin {
  let viteConfig: ResolvedConfig;
  let isDev = false;
  const { entry, enabled = true, localEnabled = false, config = {} } = opt;

  // Compatible to solve the windows path problem
  let entryPath = Array.isArray(entry) ? entry : [entry];
  if (process.platform === 'win32')
    entryPath = entryPath.map((item) => item.replace(/\\/g, '/'));

  return {
    name: 'vite:vconsole',
    enforce: 'pre',
    configResolved(resolvedConfig) {
      viteConfig = resolvedConfig;
      isDev = viteConfig.command === 'serve';
    },
    transform(_source: string, id: string) {
      if (entryPath.includes(id) && localEnabled && isDev) {
        // serve dev
        return {
          code: `/* eslint-disable */;import VConsole from 'vconsole';new VConsole(${JSON.stringify(
            config
          )});/* eslint-enable */${_source}`,
          map: null // support source map
        };
      }
      if (entryPath.includes(id) && enabled && !isDev) {
        // build prod
        return {
          code: `/* eslint-disable */;import VConsole from 'vconsole';new VConsole(${JSON.stringify(
            config
          )});/* eslint-enable */${_source}`,
          map: null // support source map
        };
      }
      return {
        code: _source,
        map: null // support source map
      };
    }
  };
}

export * from './types';
