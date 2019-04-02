<template>
    <div>
        <uploadTabBar></uploadTabBar>
        <div class="content">
            <h1>视频</h1>
        </div>
    </div>
</template>

<script>
    import uploadTabBar from '@/components/tabbar/uploadTabBar.vue'

    export default {
        name: "videos",
        components: {uploadTabBar}
    }
</script>
