<template>
  <Card>
    <p slot="title">
      <Icon type="ios-film-outline"></Icon>基本信息
    </p>
    <p>
      <span class="file-title">文件名：</span>
      <span>{{stats.name}}</span>
    </p>
    <p>
      <span class="file-title">文件类型：</span>
      <span>{{stats.type}}</span>
    </p>
    <p>
      <span class="file-title">文件大小：</span>
      <span>{{this.toMem(stats.size) || '0Kb'}}</span>
    </p>
    <p>
      <span class="file-title">文件创建时间：</span>
      <span>{{new Date(stats.birthtime).toLocaleString()}}</span>
    </p>
    <p>
      <span class="file-title">文件所在目录：</span>
      <span>{{stats.path}}</span>
    </p>
    <p>
      <span class="file-title">文件设备ID号：</span>
      <span>{{stats.dev}}</span>
    </p>
    <p>
      <span class="file-title">文件的权限标志：</span>
      <span>{{stats.mode}}</span>
    </p>
    <p>
      <span class="file-title">文件硬连接数量：</span>
      <span>{{stats.nlink}}</span>
    </p>
    <p>
      <span class="file-title">文件Indoe节点号：</span>
      <span>{{stats.ino}}</span>
    </p>
    <p>
      <span class="file-title">文件所有者用户ID：</span>
      <span>{{stats.uid}}</span>
    </p>
    <p>
      <span class="file-title">文件所有者用户组ID：</span>
      <span>{{stats.gid}}</span>
    </p>
  </Card>
</template>
<script>
var fs = require("fs");
var path = require("path");
import { toMem } from "@/extend/filters";
const fsStats = fs.Stats;

export default {
  name: "file-info",
  props: {
    stats: { type: fsStats }
  },
  data() {
    return {};
  },
  methods: {
    show() {
      //父组件改变props，子组件如果直接使用props，会触发子组件更新
      //父组件改变props，子组件如果将props放进data中再使用，不会触发子组件更新
      //父组件改变props，子组件如果将props放进computed中再使用，会触发子组件更新
      //data，props和computed的变化都会触发组件更新
    },
    toMem: toMem
  }
};
</script>
<style scoped>
</style>
