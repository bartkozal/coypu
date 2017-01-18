const os = require('os')
const { app, autoUpdater, dialog } = require('electron')

const platform = os.platform() + '_' + os.arch()
const version = app.getVersion()
const feedURL = 'https://download.coypu.co/update/' + platform + '/' + version

function updater () {
  autoUpdater.setFeedURL(feedURL)

  autoUpdater.on('update-downloaded', function(event, releaseNotes, releaseName, releaseDate, updateURL) {
    dialog.showMessageBox({
      type: 'info',
      buttons: ['Restart', 'Cancel'],
      defaultId: 0,
      title: 'Update is available',
      message: 'New version of Coypu (v' + releaseName + ') is ready. Restart the app to install update.'
    }, function(button) {
      if (button === 0) {
        autoUpdater.quitAndInstall()
      } else {
        return
      }
    })
  })

  autoUpdater.checkForUpdates()
}

module.exports = updater
