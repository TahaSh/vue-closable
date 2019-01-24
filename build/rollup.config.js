const buble = require('rollup-plugin-buble')
const cjs = require('rollup-plugin-commonjs')
const node = require('rollup-plugin-node-resolve')
const replace = require('rollup-plugin-replace')
const version = process.env.VERSION || require('../package.json').version

const replaceConfig = {
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  'process.env.VUE_ENV': JSON.stringify(process.env.VUE_ENV || 'development')
}

module.exports = {
  input: './vue-closable.js',
  plugins: [replace(replaceConfig), node(), cjs(), buble()],
  output: {
    file: 'dist/vue-closable.js',
    format: 'umd',
    name: 'VueClosable',
    banner:
`/**
 * vue-closable v${version}
 * (c) ${new Date().getFullYear()} Taha Shashtari
 * @license MIT
 */`
  }
}