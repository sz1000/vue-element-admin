'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"https://visit.kodin.cn/"',
  // BASE_API: '"https://jiyou.kodin.cn"',
  QINIU_URL: '"https://img.kodin.cn"'
})
