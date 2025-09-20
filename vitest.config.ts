import { defineConfig } from 'vitest/config';

export default defineConfig(async () => {
  const { default: tsconfigPaths } = await import('vite-tsconfig-paths');

  return {
    plugins: [tsconfigPaths()],
    test: {
      environment: 'node',
      globals: true,
      setupFiles: ['vitest.setup.ts'],
      coverage: {
        reporter: ['text', 'html'],
        include: ['src/lib/ai/**/*.ts', 'src/ai/image/lib/**/*.ts'],
      },
    },
  };
});
