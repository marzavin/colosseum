const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path'); 

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 1024,
        height: 768
    });

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'dist/colosseum/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    //win.webContents.openDevTools();

    win.on('closed', function() {
        win = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function() {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function( ){
    if(win === null) {
        createWindow();
    }
});
