<template>
    <div>
        <div class="uploadTabBar">
            <ul>
                <li><Icon type="ios-copy-outline" />复制链接</li>
                <li><Icon type="ios-close-circle-outline" />取消链接</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "shareTabBar"
    }
</script>
<style scoped>
    .uploadTabBar {
        height: 40px;
        background-color: #F9FAFB;
        border-bottom: 1px solid #F0F0F0;
    }

    .uploadTabBar ul {
        display: flex;
        margin-left: 10px;

    }

    .uploadTabBar ul > li i{
        margin-right: 5px;
    }
    .uploadTabBar ul > li {
        height: 34px;
        list-style: none;
        line-height: 30px;
        margin-top: 3px;
        font-size: 13px;
        border: 1px solid #FFFFFF;
        font-family: 微软雅黑;
        padding: 0 12px;
        border-radius: 3px;
    }

    .uploadTabBar ul > li:hover {
        border: 1px solid #CBD9E5;
        cursor: pointer;
    }
</style>
