<template>
  <div>
    <Row>
      <Col span="8" offset="8">
        <div class="function-title">
          <h1>功能宝箱</h1>
          <h3>更多功能，带给您更贴心的体验</h3>
        </div>
      </Col>
    </Row>
    <br>
    <Row type="flex" justify="space-around" class="code-row-bg">
      <Col span="4" offset="2">
        <SimpleCard :path="imgPath" :name="imgBackup"/>
      </Col>
      <Col span="4">
        <SimpleCard :path="imgPath" :name="imgClean"/>
      </Col>
      <Col span="4">
        <SimpleCard :path="imgPath" :name="imgCable"/>
      </Col>
      <Col span="4">
        <SimpleCard :path="imgPath" :name="imgLock"/>
      </Col>
      <Col span="4">
        <SimpleCard :path="imgPath" :name="imgRecycle"/>
      </Col>
    </Row>
  </div>
</template>

<script>
import SimpleCard from "@/components/card/SimpleCard";

export default {
  name: "function",
  components: { SimpleCard },
  data() {
    return {
      imgPath: "../../assets/img/FunctionPane/",
      imgBackup: "Backup",
      imgClean: "Clean",
      imgCable: "DataCable",
      imgLock: "Lock",
      imgRecycle: "Recycle"
    };
  }
};
</script>

<style scoped>
.function-title {
  text-align: center;
  margin-top: 30px;
}
</style>
   
   
