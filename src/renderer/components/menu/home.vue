<template>
    <Menu active-name="1" theme="light" width="auto" :open-names="['2']"
        style="background-color:#F9FAFB;width:165px;" :style="{height:menuHeight+'px'}">
        <MenuItem name="1" :to="{name:'index'}">
            <Icon type="ios-clock-outline"/>
            最近使用
        </MenuItem>
        <Submenu name="2">
            <template slot="title">
                <Icon type="ios-paper-outline"/>
                全部文件
            </template>
            <MenuItem :to="{name:'images'}" name="2-1">图片</MenuItem>
            <MenuItem :to="{name:'videos'}" name="2-2">视频</MenuItem>
            <MenuItem :to="{name:'musics'}" name="2-3">音乐</MenuItem>
            <MenuItem :to="{name:'documents'}" name="2-4">文档</MenuItem>
            <MenuItem :to="{name:'seeds'}" name="2-5">种子</MenuItem>
            <MenuItem :to="{name:'other'}" name="2-6">其他</MenuItem>
        </Submenu>
        <MenuItem name="2" :to="{name:'share'}">
            <Icon type="md-share"/>
            我的分享
        </MenuItem>
        <MenuItem name="3">
            <Icon type="ios-trash"/>
            回收站
        </MenuItem>
    </Menu>
</template>

<script>
    export default {
        name: "home",
        data() {
            return {
                menuHeight: parseInt(document.documentElement.clientHeight) - 80,
            }
        },
        mounted() {
            window.onresize = () => {
                this.menuHeight = parseInt(document.documentElement.clientHeight) - 80
            };
        },
    }
</script>