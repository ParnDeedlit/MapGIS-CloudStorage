const fs = require('fs');
var FILE_TYPE_CONFIG = {
    'ffd8ff': 'jpg',
    '89504e47': 'png',
    '47494638': 'gif',
    '424d': 'bmp',
    '3c21444f435459504520': 'html',
    '7b5c72': 'rtf',
    '5265': 'emial',
    '255044': 'pdf',
    '0000001866747970': 'mp4',
    '494433': 'mp3'
}
/**
 * @export
 * @param {String} path
 * @feature 识别文件类型
 */
export function filetype(path) {
    // return new Promise((resolve, reject) => {
        let fd = fs.openSync(path, 'r');
        let buffer = new Buffer.alloc(8);
        fs.readSync(fd, buffer, 0, 8, 0);
        let newBuf = buffer.slice(0, 4);
        let head_1 = newBuf[0].toString(16);
        let head_2 = newBuf[1].toString(16);
        let head_3 = newBuf[2].toString(16);
        let head_4 = newBuf[3].toString(16);
        let head_iden = head_1 + head_2;
        let tempFileType = FILE_TYPE_CONFIG[head_iden];
        if (!tempFileType) {
            head_iden += head_3;
            tempFileType = FILE_TYPE_CONFIG[head_iden];
            if (!tempFileType) {
                var msg = "Unknow fileType " + new_file_path + '-' + fileType;
                showLog(msg);
            }
        }
        //resolve(tempFileType)
        console.log(tempFileType)
    }
// export function fileextname(path){
//     var path=require('path');  /*nodejs自带的模块*/
//     var extname=path.extname("123.html");     //获取文件的后缀名
// }

//filetype('C:\\Users\\Administrator\\Desktop\\file\\1.jpg')