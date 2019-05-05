<template>
  <Card style="width:200px;padding-left:0px;margin-right:10px;margin-top:20px;">
    <div style="text-align:center;  display: table-cell;vertical-align:middle;">
        <img :src=getImage() style="vertical-align:middle;width:180px;height:200px;">
      <h3>{{ firstTitle }}</h3>
      <h5>{{ secTitle }}</h5>
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
    },
    title:{
        type: String,
        default: ""
    },
    secTitle:{
        type: String,
        default: ""
    }
  },
  data() {
    return {
      imgData:this.img,
      firstTitle: this.title
    };
  },
  mounted() {
  },
  methods: {
      getImage(){     
          return require('../../assets/img/FunctionPane/' + this.name + '.png') 
            || require("../../assets/img/Default/loading.png");
      },
      getTitle(){
        return this.title;
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