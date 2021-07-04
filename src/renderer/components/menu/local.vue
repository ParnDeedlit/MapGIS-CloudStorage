<template>
    <Menu active-name="1" theme="light" width="auto" :open-names="['2']"
        style="background-color:#F9FAFB;width:165px;" :style="{height:menuHeight+'px'}">
        <MenuItem name="1" :to="{name:'localCommon'}"><Icon type="ios-clock-outline"/>常用文件</MenuItem>
        <MenuItem name="2" :to="{name:'localGeo'}"><Icon type="ios-clock-outline"/>地理格式</MenuItem>
        <MenuItem name="3" :to="{name:'localOther'}"><Icon type="ios-clock-outline"/>其他格式</MenuItem>
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