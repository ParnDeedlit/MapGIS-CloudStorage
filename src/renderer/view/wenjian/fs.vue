<template>
  <Row class="wrapper" style="margin-left:50px;">
    <Col span="18" class="container">
      <div class="header">
        <header>文件</header>
      </div>
      <Table
        size="small"
        :columns="columns"
        :data="normalize(diskInfo)"
        @on-row-dblclick="forward"
        v-show="$route.name === 'fs'"
      ></Table>
      <transition name="fade">
        <keep-alive>
          <router-view name="folder"></router-view>
        </keep-alive>
      </transition>
    </Col>
  </Row>
</template>
<script>
import wmic from "node-wmic";
import { toMem } from "@/extend/filters";
import { readFolder } from "@/common/js/file";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      diskInfo: [],
      folderInfo: [],
      columns: [
        {
          title: "盘符名",
          key: "Name",
          render: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: "social-windows",
                  color: "#33aefc"
                }
              }),
              h("strong", `${params.row.VolumeName} (${params.row.Name})`)
            ]);
          }
        },
        {
          title: "文件系统",
          key: "FileSystem"
        },
        {
          title: "剩余总量",
          key: "FreeSpace",
          render: (h, params) => {
            return h("div", [toMem(params.row.FreeSpace)]);
          }
        },
        {
          title: "总容量",
          key: "Size",
          render: (h, params) => {
            return h("div", [toMem(params.row.Size)]);
          }
        }
      ],
      diskDetail: {}
    };
  },
  methods: {
    toMem: toMem,
    ...mapMutations({
      getFolderInfo: "GET_FOLDER_INFO"
    }),
    async forward(row) {
      var self = this
      if (row.Description === "光盘") {
        return;
      }
      let path = row.Name + "\\\\";
      await readFolder(path).then(res => {
        this.getFolderInfo(res);
        self.way = res[0]['location']
      });
      this.$router.replace({
        path: `/wenjian/fs/${path}`
      });
    },
    normalize(arr) {
      let ret = [];
      arr.forEach((item, index) => {
        if (arr[index].FileSystem) {
          ret.push(arr[index]);
        }
      });
      return ret;
    }
  },
  watch: {
    $route() {}
  },
  created() {
    wmic.LogicalDisk().then(disk => {
      this.diskInfo = disk;
    });
  }
};
</script>
<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter,
.fade-leave {
  opacity: 0;
}
.wrapper {
  height: 100%;
  overflow-y: auto;
}
.ivu-col-span-6 {
  height: 100%;
}
.header {
  padding: 10px;
  header {
    font: bold 20px/150% "Microsoft Yahei";
  }
}
.ivu-table-wrapper {
  border: none !important;
}
</style>
