if (require('electron-squirrel-startup')) return;
const { app, BrowserWindow, Menu } = require('electron')
const windowStateKeeper = require('electron-window-state')
const path = require('path')
const url = require('url')

const menu = require('./menu')
const updater = require('./updater')

let window

function createWindow () {
  let windowState = windowStateKeeper({
    defaultWidth: 420,
    defaultHeight: 640
  })

  window = new BrowserWindow({
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
    minWidth: 370,
    minHeight: 100
  })

  windowState.manage(window)

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

app.on('ready', () => {
  createWindow()
  if (process.platform === 'darwin' || process.platform === 'win32') {
    updater()
  }
})

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
