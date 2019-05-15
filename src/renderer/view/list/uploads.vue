<template>
  <div class="content">
    <uploader :options="options" class="uploader-example">
      <uploader-unsupport></uploader-unsupport>
      <uploader-drop>
        <p>拖拽文件到此处上传</p>
        <uploader-btn>选择文件</uploader-btn>
        <uploader-btn :attrs="attrs">选择图片</uploader-btn>
        <uploader-btn :directory="true">选择文件夹</uploader-btn>
      </uploader-drop>
      <uploader-list></uploader-list>
    </uploader>
  </div>
</template>

<script>
export default {
  name: "uploads",
  data() {
    return {
      options: {
        // https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js
        target: "http://localhost:8898/upload",
        testChunks: false
      },
      attrs: {
        accept: "image/*"
      }
    };
  }
};
</script>

<style scoped>
.uploader-example {
  width: 97%;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}
.uploader-example .uploader-btn {
  margin-right: 4px;
}
.uploader-example .uploader-list {
  max-height: 440px;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>