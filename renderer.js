window.addEventListener("DOMContentLoaded", () => {
    const minimizeButton = document.getElementById('win-minimize');
    const maximizeButton = document.getElementById('win-maximize');
    const restoreButton = document.getElementById('win-maximize');
    const closeButton = document.getElementById('win-close');

    minimizeButton.addEventListener('click', e => {
        window.minimizeWindow();
    });

    maximizeButton.addEventListener('click', e => {
        window.resizeWindow();
        if (window.isWindowMaximized()) {
            maximizeButton.classList.add('hidden');
            restoreButton.classList.remove('hidden');
        } else {
            maximizeButton.classList.remove('hidden');
            restoreButton.classList.add('hidden');
        }
    });

    restoreButton.addEventListener('click', e => {
        window.resizeWindow();
        if (window.isWindowMaximized()) {
            maximizeButton.classList.add('hidden');
            restoreButton.classList.remove('hidden');
        } else {
            maximizeButton.classList.remove('hidden');
            restoreButton.classList.add('hidden');
        }
    });

    closeButton.addEventListener('click', e => {
        window.closeWindow();
    });
});
