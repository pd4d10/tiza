import babel from 'rollup-plugin-babel'
import license from 'rollup-plugin-license'
import uglify from 'rollup-plugin-uglify'

const babelPlugin = babel({ exclude: 'node_modules/**' })
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
    entry: 'src/index.js',
    plugins: [babelPlugin],
    format: 'cjs',
    dest: 'dist/tiza.common.js',
  },
  {
    entry: 'src/index.js',
    plugins: [babelPlugin, licensePlugin],
    format: 'umd',
    moduleName: 'tiza',
    dest: 'dist/tiza.js',
  },
  {
    entry: 'src/index.js',
    plugins: [babelPlugin, uglify(), licensePlugin],
    format: 'umd',
    moduleName: 'tiza',
    dest: 'dist/tiza.min.js',
  },
]
