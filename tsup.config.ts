import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/main.ts'],
  dts: true,
  splitting: false,
  sourcemap: false,
  clean: true,
  shims: true,
  format: ['cjs', 'esm']
});
