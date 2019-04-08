<template>
    <Menu active-name="1" theme="light" width="auto" :open-names="['2']"
        style="background-color:#F9FAFB;width:165px;" :style="{height:menuHeight+'px'}">
        <MenuItem name="1" :to="{name:'otherFilm'}"><Icon type="ios-clock-outline"/>电影</MenuItem>
        <MenuItem name="2" :to="{name:'otherApp'}"><Icon type="ios-clock-outline"/>app商城</MenuItem>
        <MenuItem name="3" :to="{name:'otherNovel'}"><Icon type="ios-clock-outline"/>小说</MenuItem>
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