const { app, Menu } = require("electron");

const isMac = process.platform === 'darwin';

const toPascalCase = str => (str.match(/[a-zA-Z0-9]+/g) || []).map(w => `${w.charAt(0).toUpperCase()}${w.slice(1)}`).join('');

const template = [
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

const menu = Menu.buildFromTemplate(template);

Menu.setApplicationMenu(menu);

module.exports = {
    menu
};