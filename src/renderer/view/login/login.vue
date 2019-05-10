<template>
<div style="background-color:#aabbcc;">
  <Layout>
     <Header style="background-color:#e8eaec;height:75px;text-align:center;">
        <div class="layout-logo" style="float:left;"></div>
        <div style="float:right;">
                        <span v-if="maximum" @click="restoreWindow"><Icon type="ios-contract" /></span>
                        <span v-else @click="restoreWindow"><Icon type="ios-expand"/></span>
                        <span @click="minWindow"><Icon type="md-remove"/></span>
                        <span @click="exitApp"><Icon type="md-close"/></span>
      </div>
     </Header>
  <Layout>
  <Content>
    <div  style="float:left;text-align:center;width:420px; height:455px; margin:35px;padding:30px;">
          <h2>扫一扫登录</h2><br><br>
          <h3 style="font-size:18px;font-weight:normal;">请使用百度网盘扫码登录</h3><br>
           <div>
             <img   style="width:230px;height:230px;"  src="../../assets/img/code.png"/>
           </div>
           <br>
           <Button type="primary">刷新二维码</Button>
    </div>
  <div style="float:right;width:390px;height:455px;margin-top:35px;padding:30px; margin-right:100px;">
    <div  style="float:left;"> <span style="font-size:18px">账号密码登录</span></div>
      <div  style="float:right"><a>短信快捷登录<Icon type="ios-arrow-forward" /></a></div>
     <br><br><br><br><br>
     <Form ref="AccountForm" :model="account" :rules="rule">
        <FormItem prop="user">
             <Input type="text" size="default" v-model="account.username" placeholder="Username">
               <Icon type="ios-person-outline" slot="prepend"></Icon>
             </Input>
             <br>
      </FormItem>
      <FormItem prop="password">
            <Input type="password" size="default" v-model="account.password" placeholder="Password">
               <Icon type="ios-lock-outline" slot="prepend" ></Icon>
           </Input>
      </FormItem>
      <FormItem>
      <CheckboxGroup v-model="check">
        <Checkbox label="记住密码"></Checkbox>
        <Checkbox label="自动登录"></Checkbox>
        <a  style="float:right">忘记密码?</a>
    </CheckboxGroup>
    </FormItem>
      <FormItem>
           <Button type="primary" @click="handleLogin(account)" :loading="logining" long>登录</Button>
      </FormItem>
      </Form>
      <br><br>
       <div>
           <a>注册账号</a>  
           <div  style="float:right;">
             <a><img style="width:50px;height:20px;" src="../../assets/img/1.png"></a>
              <a><img style="width:50px;height:20px;" src="../../assets/img/2.png"></a>
               <a><img style="width:50px;height:20px;" src="../../assets/img/3.png"></a>
           </div>
      </div>
    </div>
  </Content>
</Layout>
</Layout>
</div>
</template>

<style>
.layout-logo {
        width: 300px;
        height: 170px;
        background: url("../../assets/img/logo.png") no-repeat;
    }
</style>

<script>
export default {
  data() {
    return {
      account: {
        username: "admin",
        password: "123456"
      },
      logining:false,
      maximum:false,
      check:['自动登录'],
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
      this.$store.dispatch('logins',data).then(res => {
           if(this.$store.getters.role==='admin'){
             this.$router.push('/wenjian/fs');
           }else if(this.$store.getters.role==='user'){
                 this.$router.push('/index');
           }else{
             this.$router.push('/');
           }
        }).catch(() => {

        })  
   },
    exitApp() {
                this.$electron.ipcRenderer.send('exitApp');
            },
    minWindow() {
                this.$electron.ipcRenderer.send('minWindow');
            },
    restoreWindow() {
                this.$electron.ipcRenderer.send('maximizeWindow');
            }
  }
}
</script>