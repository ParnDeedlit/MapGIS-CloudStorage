<template>
    <div>
        <uploadTabBar></uploadTabBar>
        <div class="content">
            <h1>最近使用1</h1>
        </div>
    </div>
</template>

<script>
    import uploadTabBar from '@/components/tabbar/uploadTabBar.vue'

    export default {
        name: "index",
        components:{uploadTabBar},
    }
</script>

<style scoped>

</style>