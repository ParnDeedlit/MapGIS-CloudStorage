<template>
    <Menu active-name="1" theme="light" width="auto" :open-names="['2']"
        style="background-color:#F9FAFB;width:165px;" :style="{height:menuHeight+'px'}">
        <MenuItem name="1" :to="{name:'shareSession'}"><Icon type="ios-list-box-outline"/>会话</MenuItem>
        <MenuItem name="2" :to="{name:'shareFriend'}"><Icon type="ios-person-outline" />好友</MenuItem>
        <MenuItem name="3" :to="{name:'shareGroup'}"><Icon type="ios-people-outline" />群组</MenuItem>
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