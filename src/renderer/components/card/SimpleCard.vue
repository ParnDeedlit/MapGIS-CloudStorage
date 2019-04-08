<template>
  <Card style="width:150px">
    <div style="text-align:center">
      <span>
        <img :src=getImage()>
      </span>
      <h3>一级标题</h3>
      <h5>二级标题</h5>
    </div>
  </Card>
</template>
<script>
export default {
  name: "SimpleCard",
  props: {
    img: {
      type: String,
      default: () => "../../assets/img/Default/loading.png"
    },
    path:{
        type: String,
        default: "." 
    },
    name:{
        type: String,
        default: "default"
    },
    prefix:{
        type: String,
        default: ".png"
    }
  },
  data() {
    return {
      imgData: require("../../assets/img/Default/loading.png")
    };
  },
  mounted() {
    //this.imgData = this.img ? require(this.img) :require("../../assets/img/Default/loading.png");
  },
  methods: {
      getImage(){
          console.log(this.path, this.name, this.prefix);
          //return require(this.path + this.name + '.png') || require("../../assets/img/Default/loading.png");          
          return require('../../assets/img/FunctionPane/' + this.name + '.png') || require("../../assets/img/Default/loading.png");
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
}
</style>