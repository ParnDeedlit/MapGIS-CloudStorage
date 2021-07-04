import {nativeImage, Menu, ipcMain, shell, BrowserWindow, webContents} from 'electron';
import router from '../renderer/router';

function about() {
    const window = BrowserWindow.fromWebContents(webContents.getFocusedWebContents());
    const win = new BrowserWindow({
        devTools: false,
        maximizable: false,
        minimizable: false,
        title: '关于我们',
        parent: window,
        height: 300,
        useContentSize: false,
        width: 600,
        frame: true,
        modal: true,
    });
    win.setMenu(null);
}

ipcMain.on('setting', (event, data) => {
    let start = nativeImage.createEmpty();
    start.addRepresentation({dataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACEElEQVQ4T5WTTUhUYRSGn3fGSrRN7WtRusgI+ptrZtSiZUi4KClMUSEKslblnVkNVt47UhBBtXLSsR+KiKCoVSAtLOdmtDCwiNy0FoISRZwT9+KdREry253znfN853znvGLZSV2xTSQ5DjQhdgLzwITgucTjsR59X5qi2NietfVVlQwBzcBb4A0iMGOtLAIdBOoRT0qzdIxnNRPmRoCam7Zu4wxjGFtNnA1c3VteWWinfGsV3AY+T1dx4Ot5zUUAx7M7wMkFo348o8m/Jce+3TnbVlHinYnhwNU57fFtc8KYMqPpfUYvV0qO7/b22amEyM+voUaOb1cxDhfT2hcHtHWmGyQahwa8a6GvrcvtsZJGhu96Y1FM1hKpSqaAQaU8+4B4Frjq/QNwe0HNhby3IwJ0umFb9wt5/3Ick/LthqBRjmc/EN1FV4VVATw7LeFFAIMLQVqDqwE4OevC6I9beB24urgqgGdZxJEQ0Ae0BHPUklUphLR29OxPSg1Def96aLd3pS8ZCyOFgf5i/IjjW7hkr6IxJuFb+FdFVw/+Z4yOZ8cQDxdgS3mRTJxQCaeY0ZeVIPV9VmciHOdgMa3u8ipvmGFUUAuc+VclTs7azbglY3K6msbyKocvhmKqrmTY4CjG6KKYPi5WswvjUCgmiae/Zun4lNXPspiWlhzJuYKWSM5Qt3g3gfEikeDRcjn/BksX6KJouKLlAAAAAElFTkSuQmCC'});

    let end = nativeImage.createEmpty()
    end.addRepresentation({dataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACHElEQVQ4T42TTWgTURSFz5lJphRsZUYXgtiF+IO6iboRdVtEoU1cRNCNiov4g1BXbTMEp9CJdNVKC24V3WgWTqjSpQWxIEIdUVRQQRRcWDNJtJv8XsnE2iQdSt/u3Xfvx333nkN0nKiZ20HBGYADACL+M/FaIE8BPMzaW763lnDlErdkU6Xs3QNxXMBJivKKYfXt47Gen/Fhb3MphLOE3KRgIawZ5zMWl5tsACevS1dXb/4lRL5AUy45ll7o7Kxxb4AqKmZA7Cv91o/NTbPkA6Kmd4cCxUkbiaDCzljMzE2KsDubNi5zYNjrU1Q81z7pOzMZ1laSxY5EaLpuYCdxUSt7vA8KlH5GTc8muOTY+lRrsowfEkh9iCn3dhAkOuoloKCvAVis10PnZm/1flwD8AMyj6qcpuW2zeWUtbxNK5fnGDO9nGPrWwFKMKDBkAIgF5lyndacqOktMZb0Ck5a19cFAEWwPkTTvbsKEMbM/K/mF6qIzU4Y3wI7EHmDkMQ46n5tfR8cKe5SlFqm0UEaxA/HNmbWDhFjTC1agUNMetcIbPfXqKp4VtD0vfMWqxte427vfa3G/lYhiZM2rm5ISMnclJBdWdu4sirlnvwCgM/QmFhPyuUQpik4UPqjH/0vZV/nvpny94VyBMJxrYYHmQmjeMIqGt1lOQjWDwvkBoEX4bBxoc1M7btt2lnIQQD7/znuHUSeCPGo085/AXJ8/Y5bx/GJAAAAAElFTkSuQmCC'});

    let setting = nativeImage.createEmpty()
    setting.addRepresentation({dataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABnklEQVQ4T7WTMUtbYRSGn3N7r1FpjblqMLGDFhGHFoodFIqDGVQcpT+h4OCmIIi2W7FFqNgWJx07hHaogwUHXXRw8B84iMqNIvRGE4NpJTlyo7ckGtNB+k3fd857nsP7HY5wzyP3rKcsIMGjRkElj3UgSAByryKcLrvYtQ24qeKmtwAOoc8gw8CiwFtPrGhc4KHC4yqSvU2Q9iElgEPq+xRjvZItRWdbSE6UBXhBh9CmIC+9u/m0E02lye07Bb1C1uJ3W5jM0S3AIfWteYwl0OeC2IHBGPZKHEQ4m5kjPfXuuka9Bp8iuN+8wF8LDsF+4cGqTw5++UDt6OvCM7e7x/GTrmJnc1HcsRJAgmAXGNuFlkBgIIb9Mw6GQebjAqnxN0UAnYySfF8C8LMO9ppAzHtb3S8w29s4//rdT2dM3OYwnN0xhdCQIiv/mMJCC8nRsgCF6gShNUGeAfPA9JVQNxSxQDsscj1hUjt3jvEXdl2Wi4hgnoPsXQtHDP78yGPWRDnxY4VUxV04oq5bMWqaOdkSyJaz9n+WqdIn3sxdAvdVcxE7AdRGAAAAAElFTkSuQmCC'});

    let qun = nativeImage.createEmpty()
    qun.addRepresentation({dataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACK0lEQVQ4T6XTT0jTYRgH8O/z25zZkKDWtjYw+idGUMbYJnYZtZBGrj/m/rVTWl0C6VDRoYOVSB6iQwcNMjJpcxi0LI2C6mJta2II0iWDwv3WstAyWaL7PbGJo7EZxN7j877v53n/PA+hyEFF7kcuYHkp1yWnahiSAczD8YhrBGglrbHKQAJqKUVRMUohwJFaTpwD6M2+SwBVQ6I+Jj5FzL1MJCfikyzhOohOMNGreNjZvgLgfxELC/vTGfSmu+u8huijtcpfZSrl5MGm1ueizjCwmuRz/bGwy7YS8CQWFuxpgIc0nSB8A9MHMDeDyKu90DElW1VyT4y4jxYENhj7vIIg1Vkrx0O3GrutpXbxSHohD6qPB96Z7WcferaBqEMMu/wFAY0psKlEhh/WrWM1XY47p0vrY4cywFONJ/Rxy+aG22c6F+XQfQ17xvIA1Z5geeliMsjgWQKV93i61u+tfD8K8HRids0+y82LMz9/l00DrOUFxbH4aMOnNJL9BZ3Jfw3MQfGt+/VSVu0OIDUPSaZYyvZlgmyY1xl9tSC0iBG3MwvoDIEKyFIPJAnn0sGr9f0bm4zDThArwCQHeGImqaTt7W096XmZQDckcHM84o5mTqA2398pZ8q+7JuWK40Vqu8mqkvMLd910lc1cPmZXXw8vjueiaVk3eKI43NeKfOQ2guQBaDenDJnSQ+i83QgsevveD4wqD4MEqoL9gjzAtkSbf8E/re5iu7GP8aRzxG02hKMAAAAAElFTkSuQmCC'});

    let gitHub = nativeImage.createEmpty()
    gitHub.addRepresentation({dataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABwUlEQVQ4T6WTvUtCURjGn7ebgyB4L1xt8H9wK2oobbKhqCVtyWqSaqilIOsvSLGiL/oCGyKSgkY1IdeioKCixaEtvTcoHCXfuDfuxavRB53pcM7z/M77dQj/XFTvl2XZ3wRMAfATkajdM/MrgHwVWFFVNV/rsQDcLleSgJHvgmIgWVKUMUNjAn5jNky1EB2ghS0QnRsCSZKQWFpCe0cHis/PSKVS2NneRqVSMYN7Z+7W0tEBblk+JaJ+be90OpHOZlEul+H1enVDNpOBx+NBTyBgQhjYLynKqAF4JSKnJo7F4/D5fGhrbbWU4uHxERvr61hbXdXPtcKWVFXSAS0uFxvqzNkZbm9uMDszYwFsbm1BEkUMhULmeVFRqAGQzeVQKBQwHolYAAeHh2gWBISCwUaAW5bNFOYXFtDZ1YXLiwvEFhdhs9kwF41iOBzG5MQETo6PjRTeSqoqftagpv8OhwOJ5WVcX11hb3cXoiTh7v4emXQaI+Gw+bqliPVtFAQBg8EgUkdHsNvt6O3r0/fMZqlgaWN9FD9+j2p1pfjyMq3p/jzKqDE3AIypbCIaBfOAMRtgfmKifJU5+e1n+jH0LwQf01m8EcLn4AUAAAAASUVORK5CYII='});

    const rightM = Menu.buildFromTemplate([
        {label: '开始全部任务', enabled: false, icon: start},
        {label: '暂停全部任务', enabled: false, icon: end},
        {label: '本次传输完自动关机'},
        {type: 'separator'},
        {label: '设置', icon: setting,},
        {
            label: '关于', click: () => {
                about()
            }
        },
        {
            label: '版本升级',
            click: () => {
                event.sender.send('appUpdate','appUpdate');
            }
        },

        {label: '去登陆'},
        {type: 'separator'},
        {
            label: '加入qq群',
            icon: qun,
            click: () => {
                shell.openExternal('tencent://groupwpa/?subcmd=all&param=7B2267726F757055696E223A3831343237303636392C2274696D655374616D70223A313533393531303138387D0A');
            }
        },
        {
            label: 'GitHub地址', icon: gitHub,
            click: () => {
                shell.openExternal('https://github.com/lihaotian0607/auth');
            }
        },
    ]);
    // Menu.setApplicationMenu(rightM);
    rightM.popup({});
});