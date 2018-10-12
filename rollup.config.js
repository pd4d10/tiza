import typescript from 'rollup-plugin-typescript2'
import license from 'rollup-plugin-license'
import { uglify } from 'rollup-plugin-uglify'

const tsPlugin = typescript()
const licensePlugin = license({
  banner: `/**
 * Tiza v${require('./package.json').version}
 * Copyright (c) 2017 Rongjian Zhang
 * Released under the MIT License.
 * https://github.com/pd4d10/tiza
 */`,
})

// https://github.com/rollup/rollup/issues/703#issuecomment-306246339
export default [
  {
    input: 'src/index.ts',
    output: {
      name: 'tiza',
      file: 'dist/tiza.js',
      format: 'umd',
    },
    plugins: [tsPlugin, licensePlugin],
  },
  {
    input: 'src/index.ts',
    output: {
      name: 'tiza',
      file: 'dist/tiza.esm.js',
      format: 'es',
    },
    plugins: [tsPlugin, licensePlugin],
  },
  {
    input: 'src/index.ts',
    output: {
      name: 'tiza',
      file: 'dist/tiza.common.js',
      format: 'cjs',
    },
    plugins: [tsPlugin, licensePlugin],
  },
  {
    input: 'src/index.ts',
    output: {
      name: 'tiza',
      file: 'dist/tiza.min.js',
      format: 'umd',
    },
    plugins: [tsPlugin, uglify(), licensePlugin],
  },
]
