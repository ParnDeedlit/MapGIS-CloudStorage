<template>
  <Card style="width:200px;padding-left:0px;margin-right:10px;margin-top:20px;">
    <div style="text-align:center;  display: table-cell;vertical-align:middle;">
        <img :src=getImage() style="vertical-align:middle;width:180px;height:200px;">
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
      imgData:this.img
      /* imgData: this.img ? require(this.img) : require("../../assets/img/Default/loading.png") */
    };
  },
  mounted() {
    this.imgData = this.img ? require(this.img) :require("../../assets/img/Default/loading.png");
  },
  methods: {
      getImage(){
          //console.log("data", this.path, this.name, this.prefix);
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