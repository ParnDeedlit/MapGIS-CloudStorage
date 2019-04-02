// 注意这个autoUpdater不是electron中的autoUpdater
import {autoUpdater} from "electron-updater"
import {BrowserWindow, ipcMain, webContents} from 'electron'

var count = 0;
const window = BrowserWindow.fromWebContents(webContents.getFocusedWebContents());

//处理更新操作
function handleUpdate() {
    const returnData = {
        error: {status: -1, msg: '检测更新查询异常'},
        checking: {status: 0, msg: '正在检查应用程序更新'},
        updateAva: {status: 1, msg: '检测到新版本，正在下载,请稍后'},
        updateNotAva: {status: -1, msg: '您现在使用的版本为最新版本,无需更新!'},
    };

    //和之前package.json配置的一样
    autoUpdater.setFeedURL('http://test.yhleb.com/update');

    //更新错误
    autoUpdater.on('error', function (error) {
        sendUpdateMessage(returnData.error)
    });

    //检查中
    autoUpdater.on('checking-for-update', function () {
        sendUpdateMessage(returnData.checking)
    });

    //发现新版本
    autoUpdater.on('update-available', function (info) {
        sendUpdateMessage(returnData.updateAva)
    });

    //当前版本为最新版本
    autoUpdater.on('update-not-available', function (info) {
        setTimeout(function () {
            sendUpdateMessage(returnData.updateNotAva)
        }, 1000);
    });

    // 更新下载进度事件
    autoUpdater.on('download-progress', function (progressObj) {
        mainWindow.webContents.send('downloadProgress', progressObj)
    });


    autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
        ipcMain.on('isUpdateNow', (e, data) => {
            autoUpdater.quitAndInstall();
        });
        setTimeout(() => {
            autoUpdater.quitAndInstall();
        }, 3000)
    });

    //执行自动更新检查
    autoUpdater.checkForUpdates();
}

handleUpdate();

// 通过main进程发送事件给renderer进程，提示更新信息
function sendUpdateMessage(text) {
    window.webContents.send('message', text)
}

ipcMain.on("checkForUpdate", (event, data) => {
    console.log('执行自动更新检查!!!');
    autoUpdater.checkForUpdates();
});