<template>
    <div class="content">
        <div class="share-session-logo"></div>
        <div class="share-session-info">
            你还没有加入群哦~
        </div>
        <div class="share-session-text">
            <Button type="info">添加好友</Button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "group"
    }
</script>

<style scoped>
    .share-session-logo {
        width: 200px;
        height: 200px;
        background: url("../../assets/img/SharePane/Empty.png") no-repeat;
        background-size: 200px;
        border-radius: 3px;
        margin:0 auto;
        position: relative;
        top: 130px;
    }

    .share-session-info {
        width: fit-content;        
        height: 50px;
        margin:0 auto;
        position: relative;
        top: 80px;
    }

    .share-session-text {
        width: fit-content;        
        height: 60px;
        margin:0 auto;
        position: relative;
        top: 60px;
    }
</style>
   
   
