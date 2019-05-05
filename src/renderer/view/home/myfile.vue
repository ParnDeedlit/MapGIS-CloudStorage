<template>
  <div>
    <div class="content">
      <Table
        size="small"
        :columns="columns"
        :data="normalize(diskInfo)"
        @on-row-click="info"
        @on-row-dblclick="forward"
        v-show="$route.name === 'myfile1'"
      ></Table>
      <transition name="fade">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>
 
<script>
import wmic from "node-wmic";
import { toMem } from "@/extend/filters";
import { readFolder } from "@/common/js/file";
import { mapMutations } from "vuex";
export default {
  data() {
    // name: "myfile1";
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
    info(row) {
      this.diskDetail = row;
    },
    // //async await表示异步函数  此处是是否传了路由的：id
    async forward(row) {
      if (row.Description === "光盘") return;
      let path = row.Name + "\\\\";
      await readFolder(path).then(res => {
        this.getFolderInfo(res);
      });
      this.$router.replace({
        path: `/computer/${path}`
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
    wmic.disk().then(disk => {
      this.diskInfo = disk;
    });
  }
};
</script> 


