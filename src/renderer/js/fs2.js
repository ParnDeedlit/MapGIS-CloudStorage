
const fs=require('fs');
//写入
fs.open('D:\\Desktop\\nodejs\\fs.txt','r+',function(err,fd){
    if(err){
        console.error(err);
        return;
    }else{
        var buffer=new Buffer("写入数据用于了解功能");
        fs.write(fd,buffer,3,9,12,function(err,bytesRead,buffer){
            if(err)  {
               console.log("写入文件失败");
               console.error(err);
            } else{
                   console.log(buffer.toString());
                   fs.write(fd,buffer,12,9,null,function(err,bytesRead,buffer){
                       console.log(buffer.toString());
                   })
            }
        });
    }
});
//读取---ead或readSync方法读取文件内容是不断地将文件中的一小块内容读入缓存区，最后从该缓存区中读取文件内容;以字节为单位来写、读
fs.open('D:\\Desktop\\nodejs\\3.txt','r',function(err,fd){
    if(err)  {
        console.log(err);
        return;
    }else{
var buffer=new Buffer('我爱编程');
fs.read(fd,buffer,0,9,3,function(err,bytesRead,buffer){
    if(err)   throw err;
    else{
        console.log(bytesRead);
        console.log(buffer.slice(0,bytesRead).toString());
        fs.read(fd,buffer,0,9,null,function(err,bytesRead,buffer){
            console.log(bytesRead);
            console.log(buffer.slice(0,bytesRead).toString());
        });
    }
});
}
});
//打开
fs.open('D:\\Desktop\\nodejs\\3.txt','r',function(err,fd){
    if(err)  throw err;
    console.log('success');
});
//关闭
fs.open('D:\\Desktop\\nodejs\\3.txt','r',function(err,fd){
             if(err)   throw err;
             console.log('打开文件成功');
             fs.close(fd,function(err){
                 console.log('关闭文件成功！！');
             })
})
// 截取文件 
fs.truncate('D:\\Desktop\\nodejs\\3.txt',3,function(err){
    if(err)  throw  err;
    console.log('文件截取成功');
})
//写入
fs.writeFile('D:\\Desktop\\nodejs\\fs.txt','hahahhhhhhhhhhhha',function(err){
    if(err)  throw err;
    console.log('success');
})
 //读取文件---------readFile方法是将要读取的文件内容完整读入缓存区，再从该缓存区中读取文件内容
 fs.readFile('D:\\Desktop\\nodejs\\fs.txt','utf8',function(err,data){
     if(err)  throw err;
     console.log(data);
 })
 //追加
 fs.appendFile('D:\\Desktop\\nodejs\\2.txt','啦啦啦啦啦啦啦啦啦绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿',function(err){
     if(err)  throw err;
     fs.readFile('D:\\Desktop\\nodejs\\2.txt','utf8',function (err,data) {
        if(err)  throw  err;
        console.log(data); 
     })
 })
 //判断文件类型
 /*fs.stat('D:\\Desktop\\nodejs',function (err,stat) {
     if(stat.isFile())  console.log('文件');
     if(stat.isDirectory())  console.log('目录');
 })
*/
//重命名
/*fs.rename('D:\\Desktop\\nodejs\\big.file','D:\\Desktop\\nodejs\\names',function(err){
    if(err)   throw err;
    console.log('sucess9999');
})
*/
//监听文件
fs.watchFile('D:\\Desktop\\nodejs\\2.txt', (curr, prev) => {
    console.log(`当前的最近修改时间是: ${curr.mtime}`);
    console.log(`之前的最近修改时间是: ${prev.mtime}`);
  });
//读取文件目录
fs.readdir('D:\\Desktop\\nodejs',function(err,files){
    if(err) throw err;
    var length=files.length;
    console.log('共有文件'+length);
})
//删除文件
fs.unlink('D:\\Desktop\\nodejs\\names',function(err){
    if(err) throw err;
    console.log('删除成功！！！');
})
//文件拷贝
 fs.copyFile('D:\\Desktop\\资料\\electron\\vue.txt','D:\\Desktop\\nodejs\\2.txt',function(err){
     if(err) throw err;
     console.log('拷贝成功');
 })
 //查看文件权限
 fs.access('D:\\Desktop\\资料\\electron\\vue.txt',function(err){
     if(err)  console.log('没有权限');
     else  console.log('可读');
 })
 //创建文件夹
   fs.mkdir('D:\\Desktop\\nodejs\\kkk',function(err){
       if(err) throw  err;
       console.log('创建成功！！！');
   })
//删除文件夹
fs.rmdir('D:\\Desktop\\nodejs\\kkk',function(err){
    if(err) throw  err;
    console.log('删除成功！！！');
})
//改变文件权限
fs.chmod('D:\\Desktop\\资料\\electron\\vue.txt',765,function(err){
    if(err)  throw err;
    console.log('资料拥有者可读可写可执行，指定组群可读可写，其他人可读可执行');
})
//变更文件所有者
fs.chown('D:\\Desktop\\资料\\electron\\vue.txt',1,1,function(err){
    if(err)  throw err;
    console.log('success');
})
//创建一个临时目录
fs.mkdtemp('D:\\Desktop\\nodejs\\folder', (err, folder) => {
    if (err) throw err;
    console.log(folder);
  });
//createReadStream  从流中读取数据,该方法创建一个将文件内容读取为流数据的ReadStream对象
   var data = '111111';
    // 创建可读流
   var rs = fs.createReadStream('D:\\Desktop\\nodejs\\2.txt');
      // 设置编码为 utf8。
       rs.setEncoding('UTF8');
       // 处理流事件 --> data, end, and error
rs.on('data', function(chunk) {
   data += chunk;
});
rs.on('end',function(){
   console.log(data);
});
rs.on('error', function(err){
   console.log(err.stack);
});
console.log("程序执行完毕");

////////////////////////////////
const fs = require('fs');
const read = fs.createReadStream('D:\\Desktop\\nodejs\\2.txt');
const write = fs.createWriteStream('D:\\Desktop\\nodejs\\3.txt');
read.on('data',(chunk)=>{
    if(!write.write(chunk))read.pause();
});
write.on('drain',()=>{
    console.log('drain');
    read.resume();
})
read.on('end',()=>{
    console.log(`finish`);
})