const minimizeButton = document.getElementById('win-minimize');
const maximizeButton = document.getElementById('win-maximize');
const restoreButton = document.getElementById('win-restore');
const closeButton = document.getElementById('win-close');

function processWindowState(state) {
    if(state.isMaximized) {
        maximizeButton.classList.add('hidden');
        restoreButton.classList.remove('hidden'); 
    } else {
        maximizeButton.classList.remove('hidden');
        restoreButton.classList.add('hidden'); 
    } 
}

window.addEventListener("DOMContentLoaded", () => {
    closeButton.addEventListener('click', async () => { await window.mainWindow.close(); });

    minimizeButton.addEventListener('click', async () => { await window.mainWindow.minimize(); });
    
    maximizeButton.addEventListener('click', async () => { 
        var windowState = await window.mainWindow.resize();
        processWindowState(windowState);
    });
    
    restoreButton.addEventListener('click', async () => { 
        var windowState = await window.mainWindow.resize();
        processWindowState(windowState);
    });
});

window.mainWindow.handleStateChange((event, value) => {
    processWindowState(value);
});
