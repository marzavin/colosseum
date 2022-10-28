const { remote } = require("electron");

function getCurrentWindow() {
    return remote.getCurrentWindow();
}

function minimizeWindow(browserWindow = getCurrentWindow()) {
    if (browserWindow.minimizable) {
        browserWindow.minimize();
    }
}

function maximizeWindow(browserWindow = getCurrentWindow()) {
    if (browserWindow.maximizable) {
        browserWindow.maximize();
    }
}

function unmaximizeWindow(browserWindow = getCurrentWindow()) {
    browserWindow.unmaximize();
}

function resizeWindow(browserWindow = getCurrentWindow()) {
    if (browserWindow.isMaximized()) {
        browserWindow.unmaximize();
    } else {
        browserWindow.maximize();
    }
}

function closeWindow(browserWindow = getCurrentWindow()) {
    browserWindow.close();
}

function isWindowMaximized(browserWindow = getCurrentWindow()) {
    return browserWindow.isMaximized();
}

module.exports = {
    isWindowMaximized,
    closeWindow,
    minimizeWindow,
    resizeWindow   
};