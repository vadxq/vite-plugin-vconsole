export interface viteVConsoleOptions {
  entry: string; // entry file
  localEnabled?: boolean; // serve dev enabled
  enabled?: boolean; // enabled
  config?: voption; // vconsole option
}

export interface voption {
  defaultPlugins?: string[];
  onReady?: () => void;
  onClearLog?: () => void;
  maxLogNumber?: number;
  disableLogScrolling?: boolean;
  theme?: 'light' | 'dark';
}
