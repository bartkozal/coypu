const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
const url = require('url')
const menu = require('./menu')

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
