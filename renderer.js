window.addEventListener("DOMContentLoaded", () => {
    const minimizeButton = document.getElementById('win-minimize');
    const maximizeButton = document.getElementById('win-maximize');
    const restoreButton = document.getElementById('win-restore');
    const closeButton = document.getElementById('win-close');

    closeButton.addEventListener('click', async () => { await window.mainWindow.close(); });

    minimizeButton.addEventListener('click', async () => { await window.mainWindow.minimize(); });
    
    maximizeButton.addEventListener('click', async () => { 
        await window.mainWindow.resize();
        maximizeButton.classList.add('hidden');
        restoreButton.classList.remove('hidden'); 
    });
    
    restoreButton.addEventListener('click', async () => { 
        await window.mainWindow.resize();
        maximizeButton.classList.remove('hidden');
        restoreButton.classList.add('hidden'); 
    });
});
