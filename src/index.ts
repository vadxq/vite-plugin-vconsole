import type { viteVConsoleOptions } from './types';
import type { Plugin } from 'vite';

import { ResolvedConfig } from 'vite';

const parseVConsoleOptions = (config: Record<string, unknown>) =>
  Object.keys(config).reduce((code, key) => {
    const value = config[key];
    if (typeof value === 'function') {
      if (/^[(f]/.test(value.toString())) {
        code += `${key}: ${value},`;
        return code;
      } else {
        code += `${value},`;
        return code;
      }
    }
    code += `${key}: ${JSON.stringify(config[key])},`;
    return code;
  }, '');

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
      const enabledTruly = (localEnabled && isDev) || (enabled && !isDev);
      if (entryPath.includes(id) && enabledTruly) {
        const code = `/* eslint-disable */;import VConsole from 'vconsole';new VConsole({${parseVConsoleOptions(
          config as Record<string, unknown>
        )}});/* eslint-enable */${_source}`;
        return {
          code,
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
