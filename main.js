const { app, BrowserWindow, Menu, ipcMain, nativeTheme } = require('electron');
const path = require('path');

const themeMenuTemplate = [
  {
    label: "Application",
    submenu: [
      {
        role: "quit"
      }
    ]
  },
  {
    label: "View",
    submenu: [
      {
        label: "Theme",
        submenu: [
          {
            label: "Auto",
            click: async () => {
              nativeTheme.themeSource = 'system';
            }
          },
          {
            label: "Dark",
            click: async () => {
              nativeTheme.themeSource = 'dark';
            }
          },
          {
            label: "Light",
            click: async () => {
              nativeTheme.themeSource = 'light';
            }
          }
        ]
      },
      { type: 'separator' },
      { role: "reload" },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    label: "Window",
    submenu: [
      {
        role: "close"
      }
    ]
  }
];

const themeMenu = Menu.buildFromTemplate(themeMenuTemplate);

Menu.setApplicationMenu(themeMenu);

const createWindow = () => {
  const appWindow = new BrowserWindow({
    width: 800,
    minWidth: 800,
    height: 600,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  });

  ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system'
  });

  appWindow.loadFile('index.html');
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
