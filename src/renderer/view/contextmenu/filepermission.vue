<template>
 <Card>
    <div slot="title">
      <Icon type="ios-warning" /></Icon>相关权限
    </div>
  <div>
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
</Card>
</template>
<script>
var fs = require("fs");
var path = require("path");

export default {
  name: "file-permission",
  props: {
    pathStr:''
  },
  data() {
    return {
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
      filetype: ""
    };
  },
  watch: {
    pathStr:function(){
     var _this = this;
      fs.stat(String(this.$props.pathStr), function(err, stats) {
        if (!err) {
            (_this.mode = String(stats["mode"])),
            (_this.otherseXecute = String(stats["mode"] & 1 ? "x" : "-")),
            (_this.othersWrite = String(stats["mode"] & 2 ? "w" : "-")),
            (_this.othersRead = String(stats["mode"] & 4 ? "r" : "-")),
            (_this.groupeXecute = String(stats["mode"] & 10 ? "x" : "-")),
            (_this.groupWrite = String(stats["mode"] & 20 ? "w" : "-")),
            (_this.groupRead = String(stats["mode"] & 40 ? "r" : "-")),
            (_this.ownereXecute = String(stats["mode"] & 100 ? "x" : "-")),
            (_this.ownerWrite = String(stats["mode"] & 200 ? "w" : "-")),
            (_this.ownerRead = String(stats["mode"] & 400 ? "r" : "-"))
        }
      })
    },
  }
}
</script>

<style scoped>
.permiss {
  width: 100%;
  height: 100%;
  border-right: 1px solid #dddfe1;
  font-size: 15px;
  font-weight: bold;
  color: #ed4014;
}
</style>