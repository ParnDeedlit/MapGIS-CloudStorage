<template>
  <div class="uploadTabBar">
    <ul>
      <li key="upload">
        <!-- <uploader :options="options" class="uploader-example">
          <uploader-unsupport></uploader-unsupport>
          <uploader-btn>选择文件</uploader-btn>
        </uploader>-->
        <i-button @click="uploadFile">上传</i-button>
      </li>
      <li key="upload-multi">
        <Upload action="http://localhost:8877/upload">
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
import { mapState } from "vuex";
export default {
  name: "uploadTabBar",
  data() {
    return {
      options: {
        // https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js
        target: "http://localhost:8877/upload",
        testChunks: false
      }
    };
  },
  methods: {
    uploadFile() {
      //本质上这个点击事件什么都不做，通过这个点击操作==>触发隐藏的全局上传空间的点击事件
      // 打开文件选择框
      this.$store.commit("openUploader", {
        //下面哪怕是空的对象也要传入，主要是electron这个框架会截获vuex的状态导致不更新视图，千万别注释了
        param: {
          state: "toggle-click-event" // 传入的参数
        }
      });
    }
  },
  computed: mapState({ param: state => state.param })
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
