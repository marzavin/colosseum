const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('mainWindow', {
  close: () => ipcRenderer.invoke('close-main-window'),
  maximize: () => ipcRenderer.invoke('maximize-main-window'),
  unmaximize: () => ipcRenderer.invoke('unmaximize-main-window'),
  minimize: () => ipcRenderer.invoke('minimize-main-window'),
  resize: () => ipcRenderer.invoke('resize-main-window'),
  handleStateChange: (callback) => ipcRenderer.on('change-window-state', callback)
});
