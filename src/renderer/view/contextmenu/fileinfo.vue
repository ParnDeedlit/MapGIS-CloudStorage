<template>
  <div>
    <p>
      <span class="file-title">文件名：</span>
      <span>{{fileDetail.name}}</span>
    </p>
    <p>
      <span class="file-title">文件类型：</span>
      <span>{{fileDetail.type}}</span>
    </p>
    <p>
      <span class="file-title">文件大小：</span>
      <span>{{this.toMem(fileDetail.size) || '0Kb'}}</span>
    </p>
    <p>
      <span class="file-title">文件创建时间：</span>
      <span>{{new Date(fileDetail.birthtime).toLocaleString()}}</span>
    </p>
    <p>
      <span class="file-title">文件所在目录：</span>
      <span>{{fileDetail.path}}</span>
    </p>
    <p>
      <span class="file-title">文件设备ID号：</span>
      <span>{{fileDetail.dev}}</span>
    </p>
    <p>
      <span class="file-title">文件的权限标志：</span>
      <span>{{fileDetail.mode}}</span>
    </p>
    <p>
      <span class="file-title">文件硬连接数量：</span>
      <span>{{fileDetail.nlink}}</span>
    </p>
    <p>
      <span class="file-title">文件Indoe节点号：</span>
      <span>{{fileDetail.ino}}</span>
    </p>
    <p>
      <span class="file-title">文件所有者用户ID：</span>
      <span>{{fileDetail.uid}}</span>
    </p>
    <p>
      <span class="file-title">文件所有者用户组ID：</span>
      <span>{{fileDetail.gid}}</span>
    </p>
  </div>
</template>
<script>
var fs = require("fs");
var path = require("path");
export default {
  props: {
    file: {}
  },
  data() {
    return {
      fileDetail: this.$props.fileDetail
    };
  },
  methods: {
    show() {},
    mounted: function() {
      var _this = this;
    }
  }
};
</script>
<style scoped>
.permiss {
  width: 100%;
  height: 100%;
  border-right: 1px solid #dddfe1;
  font-size: 15px;
  font-weight: bold;
  color: #5cadff;
}
</style>
