const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron');
const path = require('path');
const { menu } = require('./src/menu');

const createWindow = () => {
  const appWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    minWidth: 800,
    minHeight: 600,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      sandbox: true
    }
  });

  appWindow.loadFile('index.html');

  appWindow.webContents.openDevTools();

  ipcMain.handle('close-main-window', () => {
    appWindow.close();
  });

  ipcMain.handle('minimize-main-window', () => {
    if (appWindow.minimizable) {
      appWindow.minimize();
    }
  });

  ipcMain.handle('maximize-main-window', () => {
    if (appWindow.maximizable) {
      appWindow.maximize();
    }
  });

  ipcMain.handle('unmaximize-main-window', () => {
    if (appWindow.isMaximized()) {
      appWindow.unmaximize();
    }
  });

  ipcMain.handle('resize-main-window', () => {
    if (appWindow.isMaximized()) {
      appWindow.unmaximize();
    } else if (appWindow.maximizable) {
      appWindow.maximize();
    }
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});