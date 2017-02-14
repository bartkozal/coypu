require('./check-versions')()
require('shelljs/global')
env.NODE_ENV = 'production'

var config = require('../config').build
var path = require('path')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')

rm('-r', path.join(config.assetsRoot, config.assetsSubDirectory))

webpack(webpackConfig, function (err, stats) {
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})
