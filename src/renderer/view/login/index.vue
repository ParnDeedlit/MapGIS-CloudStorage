<template>
  <div>
    <Layout>
      <Header class="header"></Header>
      <Layout style="margin-top: 16px;-webkit-user-select: none;">
        <Layout style="background-color: #FFFFFF;">
          <Content :style="{background: '#fff'}">
            <h1 v-show="!islogin">尚未登录</h1>
            <button @click="login" v-show="!islogin" style="cursor:pointer">登录</button>
            <h1 v-show="islogin">已登录</h1>
            <button @click="logout" v-show="islogin" style="cursor:pointer">注销</button>
            <MenuItem name="1" :to="{name:'index'}" style="-webkit-app-region: no-drag;">我的网盘</MenuItem>
          </Content>
        </Layout>
      </Layout>
    </Layout>
    <Update></Update>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
     islogin: false,
    };
  },
  methods: {
    checkLogin: function() {
      return this.$login.checkLogin(this);
    },
    login: function() {
      this.$login.login(this);
    },
    logout: function() {
      this.$login.logout(this, "http://localhost:9080" + "/");
    }
  },
  mounted:function () {
      this.islogin = this.checkLogin();
  }
};
</script>

<style scoped>
.header {
  -webkit-app-region: drag;
  padding: 0;
  background-color: red;
  -webkit-user-select: none;
  /* font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif; */
}

</style>
