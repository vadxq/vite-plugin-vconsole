/// <reference types="vconsole" />
import type { VConsoleOptions } from 'core/options.interface';

export interface viteVConsoleOptions {
  entry: string[] | string; // entry file
  localEnabled?: boolean; // serve dev enabled
  enabled?: boolean; // enabled
  config?: VConsoleOptions; // vconsole option
}
