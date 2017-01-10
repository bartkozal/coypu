const { app, autoUpdater } = require('electron')

autoUpdater.setFeedURL(`//download.coypu.co/update?version=${app.getVersion()}&platform=osx`)

autoUpdater.on('error', function(error) {
  console.log(error)
})

autoUpdater.on('update-downloaded', function() {
  autoUpdater.quitAndInstall()
  return true
})

module.exports = autoUpdater
