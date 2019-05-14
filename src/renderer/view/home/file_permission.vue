<template>
  <div>
    <!-- <Card class="card-disk">
      <div class="head-disk">
        <img :src="imgDisk" class="img-disk">
      </div> -->
      <!-- <button @click="show">显示</button> -->
      <div>
        <label>文件类型</label>
				<p>{{filetype}}</p>
        <label>文件大小：</label>
				<p>{{size}}bite</p>
				<label>mode：</label>
				<p>{{mode}}</p>
				<label>其他人执行：</label>
				<p>{{otherseXecute}}</p>
				<label>其他人读</label>
				<p>{{othersRead}}</p>
				<label>组操作权限</label>
				<p>{{groupeXecute}}</p>
				<label>组读权限</label>
				<p>{{groupRead}}</p>
				<label>组写权限</label>
				<p>{{groupWrite}}</p>
				<label>拥有者操作权限</label>
				<p>{{ownereXecute}}</p>
        	<label>拥有者读权限</label>
				<p>{{ownerRead}}</p>
        	<label>拥有者写权限</label>
				<p>{{ownerWrite}}</p>
        	<label>是否为文件</label>
				<p>{{file}}</p>
        	<label>是否为文件夹</label>
				<p>{{directory}}</p>
        console.log({{path}})
        console.log({{size}})
      </div>
  </div>
</template>
<script>
var fs = require("fs")
var path=require('path')
export default{
  props: {
    pathStr:''
  },
  data(){
    return {
      size: "",
      mode: "",
      otherseXecute: "",
      othersWrite: "",
      othersRead: "",
      groupeXecute: "",
      groupWrite: "",
      groupRead: "",
      ownereXecute: "",
      ownerWrite: "",
      ownerRead: "",
      file: "",
      directory: "",
      filetype:""
    };
  },
 methods:{
  show(){
    var _this = this
    fs.stat(String(this.$props.pathStr),function(err,stats){
    _this.size = String(stats['size']),
    _this.mode = String(stats['mode']),
    _this.otherseXecute = String(stats['mode']&1 ? 'x':'-'),
    _this.othersWrite = String(stats['mode']&2?'w':'-'),
    _this.othersRead = String(stats['mode']&4?'r':'-'),
    _this.groupeXecute = String(stats['mode']&10?'x':'-'),
    _this.groupWrite = String(stats['mode']&20?'w':'-'),
    _this.groupRead = String(stats['mode']&40?'r':'-'),
    _this.ownereXecute = String(stats['mode']&100?'x':'-'),
    _this.ownerWrite = String(stats['mode']&200?'w':'-'),
    _this.ownerRead = String(stats['mode']&400?'r':'-'),
    _this.file = String(stats['mode']&100000?'f':'-'),
    _this.directory = String(stats['mode']&40000?'d':'-')
    _this.filetype = path.extname("1.jpg")
    console.log(_this.size)
 })
  }
 },
 created(){
   this.show()
}
}
</script>

 