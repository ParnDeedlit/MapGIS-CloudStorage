<template>
  <div class="content" style="margin: 5px">
    <Collapse :v-model="expend">
      <Panel name="download">上传列表</Panel>
      <Panel name="upload">
        下载列表
        <Table slot="content" :columns="columnsUpload" :data="dataUpload"></Table>
      </Panel>
    </Collapse>
  </div>
</template>

<script>
export default {
  name: "complete",
  data() {
    return {
      expand: ["download", "upload"],
      columnsUpload: [
        {
          title: "名称",
          key: "name"
        },
        {
          title: "类型",
          key: "fileType"
        },
/*         {
          title: "图示",
          key: "fileImg"
        }, */
        {
          title: "大小",
          key: "size"
        }
      ]
    };
  },
  computed: {
    dataUpload: function() {
      let result = this.$store.state.complete.result.map(file => {
        if (file.fileType == "image/png") {
          file.fileImg = {};
          file.fileImg = "";
        }
        return file;
      });
      return result;
    }
  }
};
</script>

<style scoped>
</style>