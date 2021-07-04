<template>
  <div>
    <uploadTabBar></uploadTabBar>
    <expolrer></expolrer>
  </div>
</template>

<script>
import uploadTabBar from "@/components/tabbar/uploadTabBar.vue";
import expolrer from "@/view/expolrer/index.vue";
export default {
  name: "documents",
  components: { uploadTabBar, expolrer }
};
</script>
