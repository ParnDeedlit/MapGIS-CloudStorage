<template>
  <Layout>
    <Header class="header">
      <Menu
        mode="horizontal"
        active-name="1"
        theme="light"
        style="height: 80px;background-color: #EEF0F6;padding-top: 5px;"
      >
        <div class="layout-logo"></div>
        <div class="layout-toolbar-right">
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
    <Layout>
      <Content>
        <Row :gutter="16">
          <i-col span="12">
            <div class="layout-main-left">
              <h2>扫一扫登录</h2>
              <br>
              <h3>请使用百度网盘扫码登录</h3>
              <br>
              <div>
                <img src="../../assets/img/code.png">
              </div>
              <br>
              <Button type="primary">刷新二维码</Button>
            </div>
          </i-col>
          <i-col span="10">
            <div class="layout-main-right">
              <div class="float-left">
                <span>账号密码登录</span>
              </div>
              <div class="float-right">
                <a>
                  短信快捷登录
                  <Icon type="ios-arrow-forward"/>
                </a>
              </div>
              <br>
              <Form ref="AccountForm" :model="account" :rules="rule">
                <FormItem prop="user">
                  <Input
                    type="text"
                    size="default"
                    v-model="account.username"
                    placeholder="Username"
                  >
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                  </Input>
                  <br>
                </FormItem>
                <FormItem prop="password">
                  <Input
                    type="password"
                    size="default"
                    v-model="account.password"
                    placeholder="Password"
                  >
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                <FormItem>
                  <CheckboxGroup v-model="check">
                    <Checkbox label="记住密码"></Checkbox>
                    <Checkbox label="自动登录"></Checkbox>
                    <a class="float-right">忘记密码?</a>
                  </CheckboxGroup>
                </FormItem>
                <FormItem>
                  <Button type="primary" @click="handleLogin(account)" :loading="logining" long>登录</Button>
                </FormItem>
              </Form>
              <br>
              <div>
                <a>注册账号</a>
                <div class="float-right">
                  <a>
                    <img src="../../assets/img/1.png">
                  </a>
                  <a>
                    <img src="../../assets/img/2.png">
                  </a>
                  <a>
                    <img src="../../assets/img/3.png">
                  </a>
                </div>
              </div>
            </div>
          </i-col>
        </Row>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
export default {
  data() {
    return {
      account: {
        username: "admin",
        password: "123456"
      },
      logining: false,
      maximum: false,
      check: ["自动登录"],
      rule: {
        username: [
          {
            required: true,
            message: "Please fill in the user name",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Please fill in the password.",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "The password length cannot be less than 6 bits",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleLogin(data) {
      this.$store
        .dispatch("logins", data)
        .then(res => {
          if (this.$store.getters.role === "admin") {
            this.$router.push("/wenjian/fs");
          } else if (this.$store.getters.role === "user") {
            this.$router.push("/index");
          } else {
            this.$router.push("/");
          }
        })
        .catch(() => {});
    },
    exitApp() {
      this.$electron.ipcRenderer.send("exitApp");
    },
    minWindow() {
      this.$electron.ipcRenderer.send("minWindow");
    },
    restoreWindow() {
      this.$electron.ipcRenderer.send("maximizeWindow");
    }
  }
};
</script>

<style scoped>
.ivu-layout {
  height: 100vh;
  overflow: hidden;
}
.ivu-layout-header {
  background: "rgb(238, 240, 246)";
  padding: 0 100px;
  height: 80px;
  line-height: 64px;
}

.header {
  -webkit-app-region: drag;
  padding: 0;
  -webkit-user-select: none;
  /* font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif; */
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
  left: 50px;
  margin-right: 20px;
}

.layout-toolbar-right {
  float: right;
  margin-right: 10px;
  font-size: 20px;
  -webkit-app-region: no-drag;
}
.layout-main-left {
  text-align: center;
  padding: 30px;
}

.layout-main-left h3 {
  font-size: 18px;
  font-weight: normal;
}
.layout-main-left img {
  width: 230px;
  height: 230px;
}
.layout-main-right {
  margin-top: 35px;
  padding: 30px;
}

.layout-main-right span {
  font-size: 18px;
}
.layout-main-right img {
  width: 50px;
  height: 20px;
}

.float-left {
  float: left;
}
.float-right {
  float: right;
}
</style>