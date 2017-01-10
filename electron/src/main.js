const { app, BrowserWindow, Menu, autoUpdater, dialog } = require('electron')
const path = require('path')
const url = require('url')
const os = require('os')
const menu = require('./menu')
const platform = os.platform() + '_' + os.arch()
const version = app.getVersion()

autoUpdater.setFeedURL('http://download.coypu.co/update/' + platform + '/' + version)

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

let window

function createWindow () {
  window = new BrowserWindow({
    width: 420,
    height: 830,
    minWidth: 420,
    minHeight: 420
  })

  window.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  window.on('closed', () => {
    window = null
  })

  Menu.setApplicationMenu(menu)

  if (process.platform === 'darwin') {
    autoUpdater.checkForUpdates()
  }
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (window === null) {
    createWindow()
  }
})
