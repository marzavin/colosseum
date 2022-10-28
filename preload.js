const { remote } = require("electron")

const {
  isWindowMaximized,
  closeWindow,
  minimizeWindow,
  resizeWindow
} = require('./src/win-functions.js');

window.addEventListener("DOMContentLoaded", () => {
  window.isWindowMaximized() = isWindowMaximized;
  window.closeWindow() = closeWindow;
  window.minimizeWindow() = minimizeWindow;
  window.maxUnmaxWindow() = resizeWindow;  
});