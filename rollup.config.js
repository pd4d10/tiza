import babel from 'rollup-plugin-babel'
import license from 'rollup-plugin-license'
import { version } from './package.json'
import uglify from 'rollup-plugin-uglify'

const banner = `/**
 * Tiza v${version}
 * Copyright (c) 2017 pd4d10
 * Released under the MIT License.
 * https://github.com/pd4d10/tiza
 */`

// https://github.com/rollup/rollup/issues/703#issuecomment-306246339
export default [
  {
    entry: 'src/index.js',
    plugins: [
      babel({
        exclude: 'node_modules/**',
      }),
    ],
    format: 'cjs',
    dest: 'dist/tiza.common.js',
  },
  {
    entry: 'src/index.js',
    plugins: [
      babel({
        exclude: 'node_modules/**',
      }),
      license({
        banner,
      }),
    ],
    format: 'umd',
    moduleName: 'tiza',
    dest: 'dist/tiza.js',
  },
  {
    entry: 'src/index.js',
    plugins: [
      babel({
        exclude: 'node_modules/**',
      }),
      uglify(),
      license({
        banner,
      }),
    ],
    format: 'umd',
    moduleName: 'tiza',
    dest: 'dist/tiza.min.js',
  },
]
