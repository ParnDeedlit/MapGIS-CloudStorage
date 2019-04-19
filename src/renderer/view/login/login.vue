<template>
  <div style="margin-left:350px;margin-top:120px;padding:50px; height300px;width:300px;text-align:center;">
    <Form ref="form" :model="form" :rules="rule">
      <FormItem prop="user">
        <Input type="text" v-model="form.username" placeholder="Username">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
        <br>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="form.password" placeholder="Password">
          <Icon type="ios-lock-outline" slot="prepend" ></Icon>
        </Input>
        <br>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit" :loading="logining" >登录</Button>
      </FormItem>
    </Form>
  </div>
</template>
 import axios  form  'axios'
<script>
export default {
 //import {requestLogin} from '../api/api';
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      logining:false,
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
    handleSubmit() {
      this.$refs.form.validate((valid) => {
          if (valid) {
            this.logining = true;
            var loginParams = { username: this.form.username, password: this.form.password };
            axios.post('users',loginParams).then(data => {
              this.logining = false;
              let { msg, code, token } = data;
              if(code == '200'){
               this.$message.succes('success');
               sessionStorage.setItem('access_token',token);
                this.$router.push('/index');
              }else{
                this.$message.error('error');
              }
              
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    }
  }
};
</script>

<style>
   div{
     background:url('../../assets/img/girl.jpg')  repeat;
   }
</style>
