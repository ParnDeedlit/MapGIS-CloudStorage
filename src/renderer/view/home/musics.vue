<template>
  <div>
    <uploadTabBar></uploadTabBar>
    <div class="content">
      <button @click="type">点击</button>
      <h1>音乐</h1>
    </div>
  </div>
</template>

<script>
    import uploadTabBar from '@/components/tabbar/uploadTabBar.vue'
    import { filetype } from "@/common/js/type";
    import file_permission from "@/view/home/file_permission.vue"
    export default {
        name: "musics",
        components: {uploadTabBar},
        methods: {  
            type(){
            filetype('C:\\Users\\Administrator\\Desktop\\file\\1.jpg')  
         }
}
}
</script>
