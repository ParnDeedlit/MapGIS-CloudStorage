<template>
    <div class="content">
        <div class="share-session-logo"></div>
        <div class="share-session-text">
            <Button type="info">给好友分享文件</Button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped>
    .share-session-logo {
        width: 300px;
        height: 200px;
        background: url("../../assets/img/SharePane/EmptySession.png") no-repeat;
        background-size: 300px;
        border-radius: 3px;
        margin:0 auto;
        position: relative;
        top: 130px;
    }
    .share-session-text {
        width: fit-content;        
        height: 200px;
        margin:0 auto;
        position: relative;
        top: 80px;
    }
</style>
   
   
