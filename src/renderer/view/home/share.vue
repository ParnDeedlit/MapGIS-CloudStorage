<template>
    <div>
        <shareTabBar></shareTabBar>
        <div class="content">
            <h1>我的分享</h1>
        </div>
    </div>
</template>

<script>
    import shareTabBar from '@/components/tabbar/shareTabBar.vue'

    export default {
        name: "share",
        components: {shareTabBar}
    }
</script>
