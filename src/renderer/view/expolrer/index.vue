<template>
  <div
    class="expolrer-main"
    @keydown.stop.ctrl.67="isDisk?DiskFeatureControl('Copy'):''"
    @keydown.stop.ctrl.88="isDisk? DiskFeatureControl('Cut'):''"
    @keydown.stop.ctrl.86="isDisk? DiskFeatureControl('paste'):''"
    @keydown.stop.ctrl.85="isDisk? DiskFeatureControl('upload'):''"
    @keydown.stop.ctrl.82="isTrash? DiskFeatureControl('restore'):''"
    @keydown.stop.!ctrl.46="isDisk? DiskFeatureControl('trash'):''"
    @keydown.stop.ctrl.46="isTrash? DiskFeatureControl('delete'):''"
    @keydown.stop.ctrl.79="isDisk? DiskFeatureControl('open',''):''"
    @keydown.stop.ctrl.77="isDisk? DiskFeatureControl('rename'):''"
    @keydown.stop.113="isDisk? DiskFeatureControl('rename'):''"
    @keydown.stop.alt.enter="isDisk? DiskFeatureControl('info'):''"
    @keydown.stop.ctrl="DiskData.KeyFlag = 'Ctrl'"
    @keydown.stop.shift="DiskData.KeyFlag = 'Shift'"
    @keyup="DiskData.KeyFlag =null"
    tabindex="1"
    ref="CloudDiskMain"
  >
    <Row class="expolrer-head-tool">
      <DiskNavigation
        :data="DiskData"
        :loading="LoadCompany"
        :hide="NeedHide"
        @callback="NavigationControl"
        @feature="DiskFeatureControl"
      ></DiskNavigation>
      <!--  <DiskRecoverBar
        :show="isTrash"
        :disabled="UserDiskData.length===0"
        @callback="UserDiskData =[]"
      ></DiskRecoverBar>
      <DiskSortBar
        :show="DiskData.DiskShowState!=='cd-disk-block-file'&&NoTransType"
        :DiskData="UserDiskData"
        @callback="DiskFeatureControl"
        ref="DiskSortBar"
      ></DiskSortBar>-->
    </Row>
    <Row class="expolrer-content">
      <div
        @mousedown="MainMouseFunc"
        @dragover.prevent.stop="ShowUploadTips=true"
        @dragleave.prevent.stop="ShowUploadTips=false"
        @drop.prevent.stop="UploadDrop"
        ref="CloudDiskMain"
        :style="{height:AutoHeight}"
      >
        <DiskFile
          @SelectFiles="SelectFiles"
          @OpenFile="DiskFeatureControl"
          v-if="LoadCompany&&NoTransType"
          :data="UserDiskData"
          :DiskData="DiskData"
        ></DiskFile>
        <div class="cd-mouse-select" v-show="MouseSelectData.width" :style="MouseSelectData"></div>
      </div>
      <MouseMenu
        :type="loadClassify"
        :node="$refs.CloudDiskMain"
        :DiskData="DiskData"
        @callback="DiskFeatureControl"
        ref="MouseMenu"
      ></MouseMenu>
    </Row>
  </div>
</template>

<script>
import { filelist, filenav } from "./data.js";
import DiskNavigation from "./DiskNavigation"; //网盘导航栏
import DiskRecoverBar from "./DiskRecoverBar"; //回收站提示栏
import DiskSortBar from "./DiskSortBar"; //排序工具栏
import DiskFile from "./DiskFile"; //网盘文件块
import MouseMenu from "./MouseMenu"; //右键菜单
export default {
  name: "expolrer",
  components: {
    DiskNavigation,
    DiskRecoverBar,
    DiskSortBar,
    DiskFile,
    MouseMenu
  },
  data() {
    return {
      DiskData: {
        ClipboardType: false, //剪切板是复制还是剪切
        Clipboard: [], //剪切板的文件
        SelectFiles: [], //选择的文件
        NavData: filenav, //记录导航栏数据
        KeyFlag: false, //全局键盘记录
        NowSelect: {}, //记录一个选择的文件
        DiskShowState: "cd-disk-block-file", //文件显示类型，默认图标,
        SelectTips: "0个项目", //选择文件提示
        Type: "disk", //头部分类标签,
        ClassifyName: "网盘", //地址栏左侧分类显示文本,
        DiskSize: {
          /*网盘大小*/
          total: 0,
          use: 0,
          Percent: "0%",
          Background: "#2682fc",
          text: "0B/0B"
        }
      },
      UserDiskData: filelist, //存放用户网盘数据
      DiskPage: 1, //网盘加载的页数
      loadClassify: "normal", //网盘加载的分类
      LoadCompany: true, //是否加载完成
      NeedHide: false, //是否需要隐藏菜单
      /*网盘一些记录的参数*/
      DiskPosting: false,
      NowDiskID: null,
      DiskAllCount: 0,
      DiskLoadCount: 0,
      /*树目录参数*/
      showTree: false,
      SelectTrees: false,
      /*解压到参数*/
      ShowUnZip: false,
      /*分享窗口参数*/
      showShare: false,
      /*拖拽选择参数*/
      MouseSelectData: {
        left: 0,
        top: 0,
        width: 0,
        height: 0
      },
      /*上传提示*/
      ShowUploadTips: false,
      /*文件传输列表参数*/
      TransformData: [],
      SelectUploadFiles: [], //选择上传的文件
      SelectDownLoadFiles: [], //选择下载的文件
      DiskUploadData: [], //上传文件记录
      DiskDownLoadData: [], //下载文件记录，
      UploadCount: 0, //上传技术
      DownloadCount: 0, //下载计数
      FinishCount: 0, //完成计数
      NoticeSrc: "",
      ConfigObject: {
        NoticeFlag: true,
        NoticeBubble: true
      }
    };
  },
  computed: {
    isDisk() {
      return (
        this.loadClassify !== "trash" &&
        this.DiskData.Type === "disk" &&
        (this.DiskData.SelectFiles.length > 1 ||
          this.DiskData.NowSelect.disk_id !== undefined)
      );
    },
    isTrash() {
      return (
        this.loadClassify === "trash" &&
        this.DiskData.Type === "disk" &&
        (this.DiskData.SelectFiles.length > 1 ||
          this.DiskData.NowSelect.disk_id !== undefined)
      );
    },
    NoTransType() {
      return this.DiskData.Type !== "trans";
    },
    IsLoadCompany() {
      return !this.LoadCompany && this.NoTransType;
    },
    IsNoDiskData() {
      return this.LoadCompany && this.NoTransType;
    },
    AutoHeight() {
      return (
        "calc(100% - 120px - " +
        (this.isTrash ? "32ppx" : "0") +
        (this.DiskData.DiskShowState !== "cd-disk-block-file" &&
        this.NoTransType
          ? "32px"
          : "0px") +
        ")"
      );
    }
  },
  watch: {
    loadClassify: {
      handler() {
        if (this.DiskData.Type === "trans") {
          this.$nextTick(() => {
            this.TransformData.forEach(item => {
              item.shows =
                this.loadClassify === item.state ||
                (item.trans_type === this.loadClassify &&
                  item.state !== "completed");
            });
          });
        }
      },
      deep: true
    }
  },
  created() {
    this.Bind();
  },
  methods: {
    /*初始化*/
    Bind: function() {
      window.addEventListener(
        "dragenter",
        function(e) {
          e.preventDefault();
        },
        false
      );
      window.addEventListener(
        "dragover",
        function(e) {
          e.preventDefault();
        },
        false
      );
      window.addEventListener(
        "dragleave",
        function(e) {
          e.preventDefault();
        },
        false
      );
      window.addEventListener(
        "drop",
        function(e) {
          e.preventDefault();
        },
        false
      );
    },
    /*选择文件数据操作方法*/
    SelectFiles(event, item, index) {
      console.log("SelectFiles", event, item, index);
      this.$refs.CloudDiskMain.focus();
      this.$refs.MouseMenu.MenuShow("file");
      if (event.button === 0) {
        event.stopPropagation();
        if (this.DiskData.KeyFlag === "Ctrl") {
          //Ctrl多选
          item.active = !item.active; //反选
        } else if (this.DiskData.KeyFlag === "Shift") {
          //Shift多选
          let Start = index,
            End;
          item.active = true;
          if (this.DiskData.NowSelect) {
            for (let i = 0; i < this.UserDiskData.length; i++) {
              if (this.UserDiskData[i] === this.DiskData.NowSelect) {
                Start = i;
              }
              if (this.UserDiskData[i] === item) {
                End = i;
              }
            }
          }
          for (
            let j = Math.min(End, Start);
            j < Math.max(End, Start) + 1;
            j++
          ) {
            this.UserDiskData[j].active = true;
          }
        } else if (!this.DiskData.KeyFlag) {
          //单选
          this.ClearSelect();
          item.active = true;
          this.DiskData.NowIndex = index; //记录当前是第几个
          this.DiskData.NowSelect = item;
        }
      } else if (event.button === 2) {
        this.DiskData.NowIndex = index;
        this.DiskData.NowSelect = item;
      }
    },
    RemoveSelect(index) {
      this.DiskData.SelectFiles.splice(index, 1);
    },
    ClearSelect() {
      this.UserDiskData.forEach(item => {
        item.active = false;
      });
      this.DiskData.SelectFiles = [];
    },
    /*网盘功能控制*/
    DiskFeatureControl(commend, datas, flag) {
      return;
    },
    NavigationControl(){

    },
    MainMouseFunc() {
      console.log("MainMouseFunc", event);
      this.$refs.CloudDiskMain.focus();
      if (this.NoTransType) {
        this.$refs.MouseMenu.MenuShow();
        if (event.button === 0) {
          this.MouseSelect();
        }
      }
    },
    MouseSelect() {
      event.preventDefault();
      event.stopPropagation();
      let area = event.target;
      let start = {
        x: event.clientX - area.getBoundingClientRect().left + area.scrollLeft,
        y: event.clientY - area.getBoundingClientRect().top + area.scrollTop,
        maxy: area.scrollHeight
      };
      this.MouseSelectData.left = start.x;
      this.MouseSelectData.top = start.y;
      document.onmouseup = () => {
        this.MouseSelectData = {
          left: 0,
          top: 0,
          width: 0,
          height: 0
        };
        document.onmousemove = null;
      };
      document.onmousemove = ev => {
        let end = {
          x: ev.clientX - area.getBoundingClientRect().left + area.scrollLeft,
          y: ev.clientY - area.getBoundingClientRect().top + area.scrollTop,
          scrolldown:
            Math.min(
              ev.clientY - area.getBoundingClientRect().top,
              event.clientY - area.getBoundingClientRect().top
            ) +
            10 +
            area.offsetHeight,
          scrollup: Math.min(
            ev.clientY - area.getBoundingClientRect().top,
            event.clientY - area.getBoundingClientRect().top
          )
        };
        this.MouseSelectData = {
          left: Math.min(start.x, end.x) + "px",
          top: Math.min(start.y, end.y) + "px",
          width: Math.abs(end.x - start.x) + "px",
          height: Math.abs(end.y - start.y) + "px"
        };
        let area_data = {
          left: Math.min(start.x, end.x),
          top: Math.min(start.y, end.y),
          width: Math.abs(end.x - start.x),
          height: Math.abs(end.y - start.y)
        };
        let selList = document.getElementsByClassName(
          this.DiskData.DiskShowState
        );
        this.ClearSelect();
        for (let i = 0; i < selList.length; i++) {
          let sl = selList[i].offsetWidth + selList[i].offsetLeft,
            st = selList[i].offsetHeight + selList[i].offsetTop;
          let area_l = area_data.left + area_data.width;
          let area_t = area_data.top + area_data.height;
          if (
            sl > area_data.left &&
            st > area_data.top &&
            selList[i].offsetLeft < area_l &&
            selList[i].offsetTop < area_t
          ) {
            if (this.UserDiskData[i].active === false) {
              this.UserDiskData[i].active = true;
            }
          } else {
            if (this.UserDiskData[i].active) {
              this.UserDiskData[i].active = false;
            }
          }
        }
      };
    }
  }
};
</script>

<style scoped>
.expolrer-main {
  float: left;
  width: 100vw;
  height: calc(100vh - 120px);
}

.expolrer-head-tool{
  float: left;
	width: 100%;
	/* height: 50px; */
}

.expolrer-content {
  float: left;
  width: calc(100% - 170px);
  /* margin: 2px auto; */
  /* margin: 0 15px; */
  height: calc(100vh - 152px);
  overflow-y: auto;
  position: relative;
}

/*拖选框*/
.cd-mouse-select {
  position: absolute;
  background: #f4f5f7;
  opacity: 0.7;
  border: 2px solid #eee;
  z-index: 1;
}
</style>