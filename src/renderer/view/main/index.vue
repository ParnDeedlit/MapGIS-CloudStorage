<template>
  <div>
    <Layout>
      <Header class="header">
        <Menu
          mode="horizontal"
          active-name="1"
          theme="light"
          style="height: 80px;background-color: #EEF0F6;padding-top: 5px;"
        >
          <div class="layout-logo"></div>
          <div class="layout-nav">
            <MenuItem name="1" :to="{name:'index'}" style="-webkit-app-region: no-drag;">我的网盘</MenuItem>

            <MenuItem name="2" :to="{name:'listIndex'}" style="-webkit-app-region: no-drag;">
              传输列表
              <Badge :count="count"></Badge>
            </MenuItem>

            <MenuItem name="3" :to="{name:'shareSession'}" style="-webkit-app-region: no-drag;">好友分享</MenuItem>
            <MenuItem name="4" :to="{name:'functionList'}" style="-webkit-app-region: no-drag;">功能宝箱</MenuItem>
            <MenuItem name="5" :to="{name:'otherFilm'}" style="-webkit-app-region: no-drag;">更多资源</MenuItem>
            <MenuItem name="6" :to="{name:'fs'}" style="-webkit-app-region: no-drag;">文件管理</MenuItem>
          </div>
          <div class="right">
            <Dropdown trigger="click">
              <a href="javascript:void(0)" style="font-size:15px;  color: black">
                登录
                <Icon type="ios-arrow-down"></Icon>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem>
                  <span @click="loginOut(isLogin) ">退出登录</span>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <span @click="appSetting">
              <Icon type="ios-settings-outline"/>
            </span>
            <span v-if="maximum" @click="restoreWindow">
              <Icon type="ios-contract"/>
            </span>
            <span v-else @click="restoreWindow">
              <Icon type="ios-expand"/>
            </span>
            <span @click="minWindow">
              <Icon type="md-remove"/>
            </span>
            <span @click="exitApp">
              <Icon type="md-close"/>
            </span>
          </div>
        </Menu>
      </Header>
      <Layout style="margin-top: 16px;-webkit-user-select: none;">
        <Sider :width="sidebarWith()" style="background-color: #FFFFFF;">
          <router-view name="menu" :menuHeight="100"/>
        </Sider>
        <Layout style="background-color: #FFFFFF;">
          <Content :style="{background: '#fff'}">
            <router-view name="main"/>
          </Content>
        </Layout>
      </Layout>
    </Layout>
    <Update></Update>
  </div>
</template>

<script>
import router from "vue-router";
import Update from "@/components/update";
import { Notice } from "iview";
export default {
  name: "index",
  components: { Update },
  props: {
    sidebar: true
  },
  data() {
    return {
      maximum: false,
      sidewidth: this.sidebar ? 165 : 0,
      isLogin: true
    };
  },
  methods: {
    sidebarWith() {
      return this.sidebar ? 165 : 0;
    },
    appSetting() {
      this.$electron.ipcRenderer.send("setting");
    },
    exitApp() {
      this.$electron.ipcRenderer.send("exitApp");
    },
    minWindow() {
      this.$electron.ipcRenderer.send("minWindow");
    },
    restoreWindow() {
      this.$electron.ipcRenderer.send("maximizeWindow");
    },
    loginOut(isLogin) {
      console.log("vuex", this.$store.state);
      this.$store
        .dispatch("loginOut", isLogin)
        .then(sucess => {
          console.log("退出成功");
          Notice.open({
            title: "退出成功",
            desc: JSON.stringify(sucess)
          });
          this.$router.push("/");
        })
        .catch(fail => {
          console.log("退出失败");
          Notice.open({
            title: "退出失败",
            desc: JSON.stringify(fail)
          });
          this.$router.push("/index");
        });
    }
  },
  computed: {
    count() {
      if (!this.$store.state.upload.count) return 0;
      else if (this.$store.state.upload.count < 0) {
        return 0;
      } else {
        return this.$store.state.upload.count;
      }
    }
  }
};
</script>

<style scoped>
.header {
  -webkit-app-region: drag;
  padding: 0;
  background-color: red;
  -webkit-user-select: none;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.layout-logo {
  width: 150px;
  height: 30px;
  background: url("../../assets/img/logo.png") no-repeat;
  background-size: 118px;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 10px;
  margin-right: 20px;
}

.layout-nav {
  -webkit-app-region: no-drag;
  width: 600px;
  float: left;
}

.right {
  float: right;
  margin-right: 10px;
  font-size: 20px;
  -webkit-app-region: no-drag;
}

.right span {
  cursor: pointer;
  margin: 0 5px;
}

.right span:hover {
  color: #e4393c;
}

.ivu-badge-count {
  font-family: "Monospaced Number";
  line-height: 1;
  vertical-align: middle;
  position: absolute;
  -webkit-transform: translateX(50%);
  -ms-transform: translateX(50%);
  transform: translateX(50%);
  top: 0px;
  right: 0;
  height: 20px;
  border-radius: 10px;
  min-width: 20px;
  background: #ed4014;
  border: 1px solid transparent;
  color: #fff;
  line-height: 18px;
  text-align: center;
  padding: 0 6px;
  font-size: 12px;
  white-space: nowrap;
  -webkit-transform-origin: -10% center;
  -ms-transform-origin: -10% center;
  transform-origin: -10% center;
  z-index: 10;
  -webkit-box-shadow: 0 0 0 1px #fff;
  box-shadow: 0 0 0 1px #fff;
}
</style>
