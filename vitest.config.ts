import path from 'node:path';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  test: {
    include: ['**/*.test.{ts,tsx}'],
    exclude: ['node_modules', 'dist', 'coverage'],

    globals: true,
    environment: 'node',

    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'text-summary'],

      exclude: ['**/__test-utils__/**', '**/*.d.ts', '**/*.config.{js,ts,mjs,cjs}'],
    },
  },
});
