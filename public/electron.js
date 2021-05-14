const {
    app,
    BrowserWindow,
    ipcMain
} = require('electron')

const { autoUpdater } = require('electron-updater');

const path = require("path");
const isDev = require("electron-is-dev");

const CHECK_FOR_UPDATE_PENDING = 'CHECK_FOR_UPDATE_PENDING';
const CHECK_FOR_UPDATE_SUCCESS = 'CHECK_FOR_UPDATE_SUCCESS';
const CHECK_FOR_UPDATE_FAILURE = 'CHECK_FOR_UPDATE_FAILURE';
const DOWNLOAD_UPDATE_PENDING = 'DOWNLOAD_UPDATE_PENDING';
const DOWNLOAD_UPDATE_SUCCESS = 'DOWNLOAD_UPDATE_SUCCESS';
const DOWNLOAD_UPDATE_FAILURE = 'DOWNLOAD_UPDATE_FAILURE';
const QUIT_AND_INSTALL_UPDATE = 'QUIT_AND_INSTALL_UPDATE';

let win;

function createWindow() {

    // Create the browser window.     
    win = new BrowserWindow({
        width: 1270,
        height: 700,
        x: 0,
        y: 0,
        menuBarVisible: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        title: "CryptoVIK"
    });

    // and load the index.html of the app.
    win.loadURL(
        isDev ?
        "http://localhost:3000" :
        `file://${path.join(__dirname, "../build/index.html")}`
    );

    win.setMenu(null);
    win.webContents.openDevTools()
}

app.whenReady().then(createWindow);

class AppUpdater {

    constructor() {

        autoUpdater.autoDownload = false;

        autoUpdater.on('error', message => {
            console.error('There was a problem updating the application')
            console.error(message)
        })

        //autoUpdater.logger = log;
    }
};

new AppUpdater();

ipcMain.on(CHECK_FOR_UPDATE_PENDING, event => {

    const { sender } = event;

    if (process.env.NODE_ENV === 'development') {

        sender.send(CHECK_FOR_UPDATE_SUCCESS);

    } else {

        const result = autoUpdater.checkForUpdates();

        result
        .then((checkResult) => {
            const { updateInfo } = checkResult;
            sender.send(CHECK_FOR_UPDATE_SUCCESS, updateInfo);
        })
        .catch(() => {
            sender.send(CHECK_FOR_UPDATE_FAILURE);
        });
    }
});

ipcMain.on(DOWNLOAD_UPDATE_PENDING, event => {

    const result = autoUpdater.downloadUpdate();
    const { sender } = event;

    result
    .then(() => {
        sender.send(DOWNLOAD_UPDATE_SUCCESS);
    })
    .catch(() => {
        sender.send(DOWNLOAD_UPDATE_FAILURE);
    });
});

ipcMain.on(QUIT_AND_INSTALL_UPDATE, () => {

    autoUpdater.quitAndInstall(
        true, // isSilent
        true // isForceRunAfter
    );
});