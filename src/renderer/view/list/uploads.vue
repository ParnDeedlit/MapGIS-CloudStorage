<template>
  <div class="content">
    <div v-if="visible"></div>
  </div>
</template>

<script>
export default {
  name: "uploads",
  props: {
    upload: false
  },
  data() {
    return {};
  },
  computed: {
    visible: function() {
      if (this.upload) {
        this.$store.commit("showUploader");
      } else {
        this.$store.commit("hideUploader");
      }
      return this.upload;
    }
  }
};
</script>

<style scoped>
</style>