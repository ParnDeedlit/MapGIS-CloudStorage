<template>
  <div>
    <!-- <Card class="card-disk">
      <div class="head-disk">
        <img :src="imgDisk" class="img-disk">
      </div> -->
      <button type="primary" @click="show" >显示</button>
      <div class="permiss">
				<label>mode：{{mode}}</label>
				<p></p>
				<label>其他人执行：{{otherseXecute}}</label>
				<p></p>
				<label>其他人读: {{othersRead}}</label>
				<p></p>
				<label>组操作权限: {{groupeXecute}}</label>
				<p></p>
				<label>组读权限: {{groupRead}}</label>
				<p></p>
				<label>组写权限: {{groupWrite}}</label>
				<p></p>
				<label>拥有者操作权限: {{ownereXecute}}</label>
				<p></p>
        	<label>拥有者读权限: {{ownerRead}}</label>
				<p></p>
        	<label>拥有者写权限: {{ownerWrite}}</label>
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
    if(!err){
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
    _this.ownerRead = String(stats['mode']&400?'r':'-')
    //_this.file = String(stats['mode']&100000?'f':'-'),
    //_this.directory = String(stats['mode']&40000?'d':'-')
    //_this.filetype = path.extname(String(_this.$props.pathStr))
    }
 })
 },
 mounted:function(){
   var _this = this
   _this.show()
}
}
}
</script>
<style scoped>
  .permiss{
    width: 100%;
    height: 100%;
    border-right: 1px solid #dddfe1;
    font-size: 15px;
    font-weight: bold;
    color:#5cadff;
    }
</style>
