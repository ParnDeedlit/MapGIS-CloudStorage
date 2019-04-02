<template>
    <div>
        <uploadTabBar></uploadTabBar>
        <div class="content">
            <h1>音乐</h1>
        </div>
    </div>
</template>

<script>
    import uploadTabBar from '@/components/tabbar/uploadTabBar.vue'

    export default {
        name: "musics",
        components: {uploadTabBar}
    }
</script>
