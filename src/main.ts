import type {
  viteVConsoleDynamicConfigOptions,
  viteVConsoleOptions,
  viteVConsolePluginItemOptions
} from './types';
import type { Plugin } from 'vite';

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

const getEventItems = (
  event: {
    eventName: string;
    callback: (data?: any) => void;
  }[],
  id: string
) => {
  return event
    .map(
      (ele: { eventName: string; callback: (data?: any) => void }) => `
    ${id}.on('${ele.eventName}', ${ele.callback})
    `
    )
    .join(';');
};

const getDynamicConfig = (dynamicConfig?: viteVConsoleDynamicConfigOptions) => {
  let configString = '';
  if (!dynamicConfig) {
    return configString;
  }

  for (const key in dynamicConfig) {
    if (typeof dynamicConfig[key] === 'string') {
      configString += `${key}: ${dynamicConfig[key]},`;
    }
  }
  return configString;
};

const getPlugins = (plugin?: viteVConsolePluginItemOptions[]) => {
  let plugins = '';
  if (plugin && plugin.length) {
    plugins = plugin
      .map(
        (e: viteVConsolePluginItemOptions) => `
    const ${e.id} = new VConsole.VConsolePlugin('${e.id}', '${e.name}');
    ${getEventItems(e.event, e.id)}
    vConsole.addPlugin(${e.id})
    `
      )
      .join(';');
  }
  return plugins;
};

export function viteVConsole(opt: viteVConsoleOptions): Plugin {
  const {
    entry,
    enabled = true,
    config = {},
    plugin,
    customHide = false,
    dynamicConfig = {},
    eventListener = ''
  } = opt;

  // Compatible to solve the windows path problem
  let entryPath = Array.isArray(entry) ? entry : [entry];
  if (process.platform === 'win32')
    entryPath = entryPath.map((item) => item.replace(/\\/g, '/'));

  // let user to controll by mode and command, like: https://vitejs.dev/config/
  const enabledTruly = enabled;
  return {
    name: 'vite:vconsole',
    enforce: 'pre',
    transform(_source: string, id: string) {
      if (entryPath.includes(id) && enabledTruly) {
        const code = `/* eslint-disable */;
        import VConsole from 'vconsole';
        // config
        const vConsole = new VConsole({${parseVConsoleOptions(
          config as Record<string, unknown>
        )}});
        window.vConsole = vConsole;

        // plugins
        ${getPlugins(plugin)}

        // dynamic config
        window.vConsole.dynamicFunction = function() {
          if (${getDynamicConfig(dynamicConfig).length > 0}) {
            vConsole.setOption({${getDynamicConfig(dynamicConfig)}});
          }
        };
        
        window.vConsole.dynamicChange = {
          value: new Date().getTime()
        };

        window.vConsole.dynamicFunction();

        if (${customHide}) {
          vConsole.hideSwitch();
        }

        // In order to be compatible with old equipment, I used defineProperty. In the future, when proxy covers enough devices, proxy will be used.
        Object.defineProperty(window.vConsole.dynamicChange, 'value', {
          get: function() {
            return this._value;
          },
          set: function(newValue) {
            window.vConsole.dynamicFunction();
            this._value = newValue;
          }
        });

        // eventListener
        ${eventListener}
        /* eslint-enable */${_source}`;

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

export default viteVConsole;
