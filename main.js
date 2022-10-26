const { app, BrowserWindow, Menu, ipcMain, nativeTheme } = require('electron');
const path = require('path');

const isMac = process.platform === 'darwin';

const toPascalCase = str => (str.match(/[a-zA-Z0-9]+/g) || []).map(w => `${w.charAt(0).toUpperCase()}${w.slice(1)}`).join('');

const themeMenuTemplate = [
  {
    label: (isMac ? toPascalCase(app.name) : 'Application'),
    submenu: [
      { role: 'quit' }
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Theme',
        submenu: [
          {
            label: 'Auto',
            type: 'radio',
            checked: true,
            click: async () => {
              nativeTheme.themeSource = 'system';
            }
          },
          {
            label: 'Dark',
            type: 'radio',
            checked: false,
            click: async () => {
              nativeTheme.themeSource = 'dark';
            }
          },
          {
            label: 'Light',
            type: 'radio',
            checked: false,
            click: async () => {
              nativeTheme.themeSource = 'light';
            }
          }
        ]
      },
      { type: 'separator' },
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },    
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { role: 'resetZoom' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      ...(isMac ? [
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' }
      ] : []),
      { role: 'close' }
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
