require('shelljs/global')
var packager = require('electron-packager')
var ora = require('ora')
var path = require('path')
var version = require('../package.json').version

var sourcePath = path.resolve(__dirname, '../dist/')
var releasePath = path.resolve(__dirname, '../releases/', version)

var config = {
  name: 'Coypu',
  asar: true,
  dir: sourcePath,
  out: releasePath,
  overwrite: true,
  prune: false,
  'app-version': version,
  'app-bundle-id': 'bkzl.coypu',
  'app-category-type': 'public.app-category.productivity'
}

mkdir('-p', releasePath)

packager(config, function (err, appPaths) {
  if (err) throw err
})
