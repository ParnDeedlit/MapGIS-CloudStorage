<template>
  <div class="uploadTabBar">
    <ul>
      <li key="upload">
        <Upload
          action="http://localhost:8898/upload"
          name="file"
          :on-progress="handleProgress"
          :on-success="handleSuccess"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
        >
          <i-button type="ghost" icon="ios-cloud-upload-outline">上传文件</i-button>
        </Upload>
      </li>
      <li key="upload-multi">
        <Upload action="http://localhost:8898/upload/1.png">
          <i-button multiple type="ghost" icon="ios-cloud-upload-outline">批量上传</i-button>
        </Upload>
      </li>
      <li key="download">
        <i-button size="small" type="ghost" icon="ios-cloud-download-outline">下载</i-button>
      </li>
      <li key="share">
        <i-button size="small" type="md-share" icon="md-share">分享</i-button>
      </li>
      <li key="delete">
        <i-button size="small" type="ghost" icon="ios-trash">删除</i-button>
      </li>
      <li key="new-folder">
        <i-button size="small" type="ghost" icon="md-add">新建文件夹</i-button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "uploadTabBar",
  methods: {
    handleProgress: function(event) {
      console.log("onProgress", event);
    },
    handleSuccess: function(event) {
      console.log("onSuccess", event);
    },
    handlePreview: function(event) {
      console.log("onPreview", event);
    },
    handleRemove: function(event) {
      console.log("onRemove", event);
    }
  }
};
</script>
<style scoped>
.uploadTabBar {
  height: 40px;
  background-color: #f9fafb;
  border-bottom: 1px solid #f0f0f0;
}

.uploadTabBar ul {
  display: flex;
  margin-left: 10px;
}

.uploadTabBar ul > li i {
  margin-right: 5px;
}
.uploadTabBar ul > li {
  height: 34px;
  list-style: none;
  line-height: 30px;
  margin-top: 3px;
  font-size: 13px;
  /*   border: 1px solid #0f0f0f; */
  font-family: 微软雅黑;
  padding: 0 5px;
  border-radius: 3px;
}

.ivu-btn-ghost {
  color: #515a6e;
  background: 0 0;
}

/* .uploadTabBar ul > li:hover {
  border: 1px solid #cbd9e5;
  cursor: pointer;
} */
</style>
