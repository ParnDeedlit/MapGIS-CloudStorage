<template>
  <div></div>
</template>

<script>
export default {
  name: "ssologin",
  props: {
    hashcode: ""
  },
  data() {
    return {
      state: "",
      code: ""
    };
  },
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
      console.log(to, from)
    }
  },
  methods: {
    getToken: function() {
      this.$token.getTokenFromService(
        this,
        this.code,
        response => {
          this.$token.savetoken(response.data);
          this.$router.push("/index");
        },
        function(error) {
          alert(error);
        }
      );
    }
  },
  mounted: function() {
    this.code = this.$route.query.code;
    this.state = this.$route.query.state;
    console.log("code", this.code, this.$route, this.hashcode);
    if (this.code) {
      console.log("code-valid", this.code);
      this.getToken();
    }
  }
};
</script>

<style>
</style>

