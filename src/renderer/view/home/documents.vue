<template>
    <div>
        <uploadTabBar></uploadTabBar>
        <div class="content">
            <h1>文档</h1>
        </div>
    </div>
</template>

<script>
    import uploadTabBar from '@/components/tabbar/uploadTabBar.vue'

    export default {
        name: "documents",
        components: {uploadTabBar}
    }
</script>
