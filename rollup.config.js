// @ts-check
import rollup from 'rollup'
import typescript from 'rollup-plugin-typescript2'
import license from 'rollup-plugin-license'
import { uglify } from 'rollup-plugin-uglify'

const pkg = require('./package.json')

const tsPlugin = typescript()
const licensePlugin = license({
  banner: `/**
 * Tiza v${pkg.version}
 * Copyright (c) 2017 Rongjian Zhang
 * Released under the MIT License.
 * https://github.com/pd4d10/tiza
 */`,
})

const input = 'src/index.ts'

const outputConfig = {
  name: 'tiza',
  sourcemap: true,
}

// Multiple configs
// https://github.com/rollup/rollup/issues/703#issuecomment-306246339
/** @type {rollup.RollupFileOptions[]} */
const configs = [
  {
    input,
    output: [
      {
        ...outputConfig,
        file: pkg.module,
        format: 'es',
      },
      {
        ...outputConfig,
        file: pkg.main,
        format: 'cjs',
      },
      {
        ...outputConfig,
        file: 'dist/tiza.js',
        format: 'umd',
      },
    ],
    plugins: [tsPlugin, licensePlugin],
  },
  {
    input,
    output: {
      ...outputConfig,
      file: 'dist/tiza.min.js',
      format: 'umd',
    },
    plugins: [tsPlugin, uglify(), licensePlugin],
  },
]

export default configs
