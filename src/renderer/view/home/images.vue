<template>
    <div>
        <uploadTabBar></uploadTabBar>
        <div class="content">
            <h1>图片</h1>
        </div>
    </div>
</template>

<script>
    import uploadTabBar from '@/components/tabbar/uploadTabBar.vue'

    export default {
        name: "images",
        components: {uploadTabBar}
    }
</script>
