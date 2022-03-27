// @ts-check
import { defineConfig } from '@norm/cli'

export default defineConfig({
  projects: {
    '.': {
      type: 'library',
      exports: {
        '.': 'src/index.ts',
      },
    },
  },
})
