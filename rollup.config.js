// https://github.com/rollup/rollup/issues/703#issuecomment-306246339

const version = require('./package.json').version;

const banner = `/**
 * Tiza v${version}
 * Copyright (c) 2017 pd4d10
 * Released under the MIT License.
 * https://github.com/pd4d10/tiza
 */`;

export default [
  {
    entry: 'src/index.js',
    plugins: [
      require('rollup-plugin-babel')({
        exclude: 'node_modules/**',
      }),
    ],
    format: 'cjs',
    dest: 'dist/tiza.common.js',
  },
  {
    entry: 'src/index.js',
    plugins: [
      require('rollup-plugin-babel')({
        exclude: 'node_modules/**',
      }),
      require('rollup-plugin-license')({
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
      require('rollup-plugin-babel')({
        exclude: 'node_modules/**',
      }),
      require('rollup-plugin-uglify')(),
    ],
    format: 'umd',
    moduleName: 'tiza',
    dest: 'dist/tiza.min.js',
  },
];
