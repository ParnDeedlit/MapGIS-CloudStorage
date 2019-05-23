<template>
  <div id="global-uploader" ref="uploadDiv">
    <span class="unvisible-uploader">{{params}}</span>
    <!-- 上传 -->
    <uploader
      ref="uploader"
      :options="options"
      :autoStart="false"
      @file-added="onFileAdded"
      @file-success="onFileSuccess"
      @file-progress="onFileProgress"
      @file-error="onFileError"
      class="uploader-app"
    >
      <uploader-unsupport></uploader-unsupport>

      <uploader-btn id="global-uploader-btn" :attrs="attrs" ref="uploadBtn">选择文件</uploader-btn>

      <uploader-list v-show="visible">
        <div class="file-panel" slot-scope="props" id="global-uploader-list">
          <div class="file-title">
            <h2>文件列表</h2>
            <div class="operate">
              <ButtonGroup>
                <i-button
                  @click="handleAllStart"
                  type="default"
                  title="全部开始"
                  size="small"
                  icon="md-play"
                ></i-button>
                <i-button
                  @click="handleAllPause"
                  type="default"
                  title="全部暂停"
                  size="small"
                  icon="md-pause"
                ></i-button>
                <i-button
                  @click="handleAllCancel"
                  type="default"
                  title="全部取消"
                  size="small"
                  icon="md-power"
                ></i-button>
              </ButtonGroup>
            </div>
          </div>

          <ul class="file-list">
            <li v-for="file in props.fileList" :key="file.id">
              <uploader-file :class="'file_' + file.id" ref="files" :file="file" :list="true"></uploader-file>
            </li>
            <div class="no-file" v-if="!props.fileList.length">
              <i class="iconfont icon-empty-file"></i> 暂无待上传文件
            </div>
          </ul>
        </div>
      </uploader-list>
    </uploader>
  </div>
</template>

<script>
/**
 *   全局上传插件
 *   调用方法：Bus.$emit('openUploader', {}) 打开文件选择框，参数为需要传递的额外参数`
 *   监听函数：Bus.$on('fileAdded', fn); 文件选择后的回调
 *            Bus.$on('fileSuccess', fn); 文件上传成功的回调
 */
import { ACCEPT_CONFIG } from "./globalConfig";
import SparkMD5 from "spark-md5";

let globalCurrentFiles = [];

export default {
  data() {
    return {
      options: {
        target: "http://192.168.91.121:8082/boot/uploader/chunk", //"http://localhost:8877/uploader",
        chunkSize: 2 * 1024 * 1024,
        fileParameterName: "file",
        maxChunkRetries: 3,
        testChunks: true, //是否开启服务器分片校验
        // 服务器分片校验函数，秒传及断点续传基础
        checkChunkUploadedByResponse: function(chunk, message) {
          console.log("checkChunkUploadedByResponse", message);
          /* let objMessage = JSON.parse(message);
          if (objMessage.skipUpload) {
            return true;
          }

          return (objMessage.uploaded || []).indexOf(chunk.offset + 1) >= 0; */
          return true;
        },
        headers: {
          //Authorization: Ticket.get() && "Bearer " + Ticket.get().access_token
        },
        query() {}
      },
      attrs: {
        /*  accept: ACCEPT_CONFIG.getAll() */
      },
      panelShow: false //选择文件后，展示上传panel
    };
  },
  created() {
    self = this;
  },
  mounted() {},
  computed: {
    //Uploader实例
    uploader() {
      return this.$refs.uploader.uploader;
    },
    params() {
      //console.log("computed", this.$store.state.upload.param);
      if (this.$refs.uploadBtn) {
        document.getElementById("global-uploader-btn").click();
      }
      return this.$store.state.upload.param;
    },
    visible() {
      if (this.$refs.uploadDiv) {
        if (this.$store.state.upload.visible) {
          document.getElementById("global-uploader").style.zIndex = 100;
        } else {
          document.getElementById("global-uploader").style.zIndex = -100;
        }
      }
      return this.$store.state.upload.visible;
    }
  },
  methods: {
    onFileAdded(file) {
      this.$store.commit("addUploaderCount");
      this.$store.commit("addCurrentFile", { file: file });

      console.log("onFileAdded", this);

      globalCurrentFiles.push(file);
      this.computeMD5(file);
    },
    onFileProgress(rootFile, file, chunk) {
      console.log(
        "上传中" +
          file.name +
          chunk.startByte / 1024 / 1024 +
          "~" +
          chunk.endByte / 1024 / 1024
      );
    },
    onFileSuccess(rootFile, file, response, chunk) {
      //console.log("onFileSuccess", file);
      self.$store.commit("subUploaderCount");
      self.$store.commit("deleteCurrentFile", { file: file });
      self.$store.commit("addCompleteCount");
      self.$store.commit("addCompleteResult", { file: file });
      //let res = JSON.parse(response);

      // 服务器自定义的错误，这种错误是Uploader无法拦截的
      /*       if (!res.result) {
        this.$message({ message: res.message, type: "error" });
        return;
      } */

      // 如果服务端返回需要合并
      if (res.needMerge) {
        console.log("need meger", res);
        /* api
          .mergeSimpleUpload({
            tempName: res.tempName,
            fileName: file.name,
            ...this.params
          })
          .then(res => {
            // 文件合并成功
            Bus.$emit("fileSuccess");
          })
          .catch(e => {});

        // 不需要合并 */
      } else {
        console.log("上传成功");
      }
    },
    onFileError(rootFile, file, response, chunk) {
      this.$message({
        message: response,
        type: "error"
      });
    },

    /**
     * 计算md5，实现断点续传及秒传
     * @param file
     */
    computeMD5(file) {
      let fileReader = new FileReader();
      let time = new Date().getTime();
      let md5 = "";

      file.pause();

      fileReader.readAsArrayBuffer(file.file);

      fileReader.onload = e => {
        if (file.size != e.target.result.byteLength) {
          this.error(
            "Browser reported success but could not read the file until the end."
          );
          return;
        }

        md5 = SparkMD5.ArrayBuffer.hash(e.target.result);

        // 添加额外的参数
        this.uploader.opts.query = {
          ...this.params
        };

        console.log(
          `MD5计算完毕：${file.id} ${
            file.name
          } MD5：${md5} 用时：${new Date().getTime() - time} ms`
        );

        file.uniqueIdentifier = md5;
        file.pause();
        //file.resume();
      };

      fileReader.onerror = function() {
        this.error(
          "FileReader onerror was triggered, maybe the browser aborted due to high memory usage."
        );
      };
    },

    handleAllStart() {
      globalCurrentFiles.forEach(file => {
        file.resume();
      });
    },

    handleAllPause() {
      globalCurrentFiles.forEach(file => {
        file.pause();
      });
    },

    handleAllCancel() {
      globalCurrentFiles.forEach(file => {
        this.$store.commit("subUploaderCount");
        file.cancel();
      });
      globalCurrentFiles = [];
      this.uploader.cancel();
    },

    error(msg) {
      /* this.$notify({
        title: this.$t("c.false"),
        message: msg,
        type: "error",
        duration: 2000
      }); */
    }
  },
  watch: {},
  destroyed() {
    //Bus.$off("openUploader");
  },
  components: {}
};
</script>

<style scoped lang="less">
#global-uploader {
  position: fixed;
  width: calc(100vw - 190px);
  height: calc(100vh - 90px);
  z-index: -100;
  right: 15px;
  top: 90px;

  .uploader-app {
    width: 100%;
  }

  .file-panel {
    background-color: #fff;
    border: 1px solid #e2e2e2;
    border-radius: 7px 7px 0 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    z-index: 100;

    .file-title {
      display: flex;
      height: 40px;
      line-height: 40px;
      padding: 0 15px;
      border-bottom: 1px solid #ddd;

      .operate {
        flex: 1;
        text-align: right;
      }
    }

    .file-list {
      position: relative;
      height: calc(100vh - 140px);
      overflow-x: hidden;
      overflow-y: auto;
      background-color: #fff;

      > li {
        height: 49px;
        background-color: #fff;
      }
    }
  }

  .visible {
    z-index: 100;
    right: 15px;
    top: 90px;
    .file-title {
      background-color: #e7ecf2;
    }
  }

  .no-file {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
  }

  .uploader-file-icon {
    &:before {
      content: "" !important;
    }

    &[icon="image"] {
      background: url(./images/image-icon.png);
    }
    &[icon="video"] {
      background: url(./images/video-icon.png);
    }
    &[icon="document"] {
      background: url(./images/text-icon.png);
    }
  }

  .uploader-file-actions > span {
    margin-right: 6px;
  }
}

/* 隐藏上传按钮 */
#global-uploader-btn {
  position: absolute;
  clip: rect(0, 0, 0, 0);
}
.unvisible-uploader {
  display: none;
}
</style>