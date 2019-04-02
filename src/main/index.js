import {app, BrowserWindow} from 'electron'


/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        height: 600,
        useContentSize: true,
        width: 1000,
        frame: false,
        minHeight: 580,
        minWidth: 980,
        show: false
    });

    mainWindow.setMenu(null);
    mainWindow.loadURL(winURL)

    mainWindow.on('closed', () => {
        mainWindow = null
    });

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        require('./app');
        require('./setting');
        require('./update');
    });
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
});