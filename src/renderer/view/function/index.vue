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
    <br><br>
    <Row type="flex" justify="space-around" class="code-row-bg">
      <Col :xs="{ span: 4  }">
        <SimpleCard :path="imgPath" :name="imgBackup" :title="titleName[0].title"  :secTitle="titleName[0].secTitle"/>
      </Col>
      <Col :xs="{ span: 4, offset: 1 }">
        <SimpleCard :path="imgPath" :name="imgClean"  :title="titleName[1].title"   :secTitle="titleName[1].secTitle"/>
      </Col>
      <Col :xs="{ span: 4, offset: 1 }">
        <SimpleCard :path="imgPath" :name="imgCable"  :title="titleName[2].title"   :secTitle="titleName[2].secTitle"/>
      </Col>
      <Col :xs="{ span: 4, offset: 1 }" >
       <SimpleCard :path="imgPath" :name="imgLock"   :title="titleName[3].title"   :secTitle="titleName[3].secTitle"/>
      </Col>
      <Col :xs="{ span: 4,offset: 1 }">
        <SimpleCard :path="imgPath" :name="imgRecycle" :title="titleName[4].title"  :secTitle="titleName[4].secTitle"/>
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
      imgPath: "../../assets/img/FunctionPane /",
      imgBackup: "Backup",
      imgClean: "Clean",
      imgCable: "DataCable",
      imgLock: "Lock",
      imgRecycle: "Recycle",
      titleName:[
         {
         title:'垃圾文件清理',
          secTitle:'节省网盘空间'
         },
         {
          title:'自动备份',
          secTitle:'随时备份，告别丢失'
         },{
           title:'回收站',
          secTitle:'帮你找回删回文件'
         },
         {
           title:'数据线',
          secTitle:'手机和电脑无线传输'
         },
         {
           title:'锁定网盘',
          secTitle:'防止他人偷窥数据'
         }
      ]
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
   
   
