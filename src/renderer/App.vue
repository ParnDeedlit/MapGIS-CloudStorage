<template>
  <div id="app">
    <router-view></router-view>
    <!-- 将上传组件全局注册 -->
    <global-uploader></global-uploader>
  </div>
</template>

<script>
import globalUploader from "@/components/upload/GlobalUploader.vue";

export default {
  name: "mapgis-clouddisk",
  props: {
    upload: false,
    download: false
  },
  components: {
    globalUploader
  },
  computed: {
    hideGlobal() {
      console.log("App-computed", this.upload);
      if (this.upload) {
        this.$store.commit("showUploader");
      } else {
        this.$store.commit("hideUploader");
      }
    }
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
</style>
