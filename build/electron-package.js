require('shelljs/global')
var packager = require('electron-packager')
var path = require('path')
var version = require('../package.json').version

var config = {
  name: 'Coypu',
  asar: true,
  dir: path.resolve(__dirname, '../dist/'),
  out: path.resolve(__dirname, '../releases/', version),
  icon: path.resolve(__dirname, '../electron/icons/icon'),
  overwrite: true,
  prune: false,
  'app-version': version,
  'app-bundle-id': 'bkzl.coypu',
  'app-category-type': 'public.app-category.productivity',
  'app-copyright': '© 2017 Bartłomiej Kozal & Maciej Kozal'
}

mkdir('-p', path.resolve(__dirname, '../releases/'))

packager(config, function (err, appPaths) {
  if (err) throw err
})
