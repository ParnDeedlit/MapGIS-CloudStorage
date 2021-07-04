import {BrowserWindow, ipcMain, dialog, app} from "electron";

/**
 * 最小化软件窗口
 */
ipcMain.on('minWindow', () => {
    const win = BrowserWindow.getFocusedWindow();
    win.minimize();
});


ipcMain.on('maximizeWindow', () => {
    const win = BrowserWindow.getFocusedWindow();
    if (win.isMaximized()) {
        win.unmaximize();
    } else {
        win.maximize();
    }
});

ipcMain.on('exitApp', (event) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    dialog.showMessageBox(window, {
        type: 'warning',
        title: '退出客户端 ',
        message: '确定要退出中地云盘吗?',
        cancelId: 0,
        buttons: ['取消', '确定'],
        defaultId: 0,
    }, (response) => {
        if (response === 1) {
            app.quit();
        }
    })
    // const win = BrowserWindow.getFocusedWindow();
    // win.close();
});