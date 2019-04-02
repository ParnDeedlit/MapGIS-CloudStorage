<template>
    <Menu active-name="1" theme="light" width="auto" :open-names="['2']"
          style="background-color:#F9FAFB;width:165px;" :style="{height:menuHeight+'px'}">
        <MenuItem name="1" :to="{name:'listIndex'}"><Icon type="ios-clock-outline"/>正在下载</MenuItem>
        <MenuItem name="2" :to="{name:'listUploads'}"><Icon type="ios-clock-outline"/>正在上传</MenuItem>
        <MenuItem name="3" :to="{name:'listComplete'}"><Icon type="ios-clock-outline"/>传输完成</MenuItem>
    </Menu>
</template>

<script>
    export default {
        name: "home",
        data(){
            return{
                menuHeight: parseInt(document.documentElement.clientHeight) - 80
            }
        },
        mounted() {
            window.onresize = () => {
                this.menuHeight = parseInt(document.documentElement.clientHeight) - 80
            };
        },
    }
</script>