<template>
  <Row>
    <i-col span="5" v-show="data.Type !== 'trans'">
      <Button-group>
        <i-button @click="NavControl('back')" :disabled="data.NavData.length===0">
          <Icon type="chevron-right"></Icon>回退
        </i-button>
        <i-button @click="NavControl('home')">主页</i-button>
        <i-button @click="NavControl('reload')">前进</i-button>
      </Button-group>
    </i-col>

    <i-col span="10">
      <Breadcrumb>
        <Breadcrumb-item>{{data.ClassifyName}}</Breadcrumb-item>
        <Breadcrumb-item v-for="item in data.NavData">{{item.disk_name}}</Breadcrumb-item>
      </Breadcrumb>
    </i-col>

    <i-col span="9" v-show="data.Type !== 'trans'">
      <!--      <input
        type="text"
        placeholder="搜索"
        v-model="SearchKey"
        @keyup.enter.native="SwitchSearch"
        :style="ShowSearch?{width:'170px',border:'1px solid #eee'}:''"
      >-->
      <Button-group>
        <i-button @click="SwitchSearch" v-show="data.Type=== 'disk'">磁盘</i-button>
        <i-button
          :class="'sf-icon-sort-amount-'+AmountSort"
          @click="ChangeSort('alpha','disk_name')"
        >排序</i-button>
        <i-button @click="ChangeState">展示</i-button>
      </Button-group>
    </i-col>
  </Row>
</template>

<script>
//import Icon from '@/components/icon/iconfront';
export default {
  name: "DiskNavigation",
  props: {
    data: {
      type: Object
    },
    loading: {
      type: Boolean
    },
    hide: {
      type: Boolean
    }
  },
  watch: {
    hide: {
      handler() {
        if (this.hide) {
          this.ShowSearch = !this.hide;
        }
      },
      deep: true
    }
  },
  data() {
    return {
      DiskShowState: "cd-disk-block-file", //网盘文件显示状态
      DiskStateIcon: "sf-icon-th-large", //文件显示状态类型,
      ShowSearch: false, //搜索框打开关闭
      SearchKey: "", //搜索关键词,
      AmountSort: "up"
    };
  },
  methods: {
    NavControl(commend) {
      //回调函数
      //this.$emit("callback", commend);
    },
    SwitchSearch() {
      //搜索有问题
      if (this.ShowSearch === false) {
        this.ShowSearch = true;
      } else if (this.SearchKey.length && this.ShowSearch) {
        //this.$emit("feature", "search", this.SearchKey, true);
      } else {
        this.ShowSearch = false;
      }
    },
    ChangeSort(type, key) {
      this.AmountSort === "up"
        ? (this.AmountSort = "down")
        : (this.AmountSort = "up");
      //this.$emit("feature", "sort", type, key);
    },
    ChangeState() {
      this.DiskShowState === "cd-disk-block-file"
        ? (this.DiskShowState = "cd-disk-list-file")
        : (this.DiskShowState = "cd-disk-block-file");
      this.DiskStateIcon === "sf-icon-th-large"
        ? (this.DiskStateIcon = "sf-icon-list-ul")
        : (this.DiskStateIcon = "sf-icon-th-large");
      //this.$emit("feature", "state", this.DiskShowState);
    }
  }
};
</script>

<style>
</style>