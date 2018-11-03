import { app, BrowserWindow } from "electron";
import electronReload from "electron-reload";
import electronWindowState from "electron-window-state";

electronReload(__dirname);

// To avoid garbage collector; don't remove!
let mainWindow;

const createWindow = () => {
  let windowState = electronWindowState({
    defaultWidth: 420,
    defaultHeight: 640
  });

  mainWindow = new BrowserWindow({
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
    minWidth: 370,
    minHeight: 100,
    titleBarStyle: "hiddenInset"
  });

  windowState.manage(mainWindow);

  mainWindow.loadURL("http://localhost:1234");
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
