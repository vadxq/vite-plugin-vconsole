/// <reference types="vconsole" />
import type { VConsoleOptions } from 'core/options.interface';

export interface viteVConsoleOptions {
  entry: string[] | string; // entry file
  localEnabled?: boolean; // serve dev enabled
  enabled?: boolean; // enabled
  config?: VConsoleOptions; // vconsole option
  customHide?: string; // custom hide rule code string
  plugin?: viteVConsolePluginItemOptions[];
  dynamicConfig?: viteVConsoleDynamicConfigOptions;
  eventListener?: string;
}

export interface viteVConsoleDynamicConfigOptions {
  theme?: string;
  target?: string;
  defaultPlugins?: string;
  disableLogScrolling?: boolean;
  pluginOrder?: string;
  log?: string;
  network?: string;
  storage?: string;
  [key: string]: any;
}

export interface viteVConsolePluginItemOptions {
  id: string;
  name: string;
  event: {
    eventName: string;
    callback: (data?: any) => void;
  }[];
}
