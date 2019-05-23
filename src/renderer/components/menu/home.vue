<template>
  <Menu
    active-name="1"
    theme="light"
    width="auto"
    :open-names="['2']"
    style="background-color:#F9FAFB;width:165px;padding-top:0px; padding-bottom:0px"
    :style="{height:menuHeight+'px'}"
  >
    <MenuItem name="1">
      <Icon type="ios-trash"/>回收站
    </MenuItem>
    <Submenu name="2">
      <template slot="title">
        <Icon type="ios-folder"/>我的文档
      </template>
      <MenuItem style="padding-top:0px; padding-bottom:5px">
        <Tree :data="myfile" :load-data="loadData1"></Tree>
      </MenuItem>
      <MenuItem style="font-size:13px;padding-top:0px; margin-left:15px; padding-bottom:5px">
        <Icon type="ios-folder"/>保密箱
      </MenuItem>
    </Submenu>
    <Submenu name="3">
      <template slot="title" style="padding-top:0px; padding-bottom:5px">
        <Icon type="ios-people"/>工作空间
      </template>
      <MenuItem style="padding-top:0px; padding-bottom:5px">
        <Tree :data="downloadfile" :load-data="loadData2"></Tree>
      </MenuItem>
      <MenuItem style="padding-top:0px; padding-bottom:5px">
        <Tree :data="mydata" :load-data="loadData3"></Tree>
      </MenuItem>
      <MenuItem style="padding-top:0px; padding-bottom:0px">
        <Tree :data="sharedata" :load-data="loadData4"></Tree>
      </MenuItem>
    </Submenu>
    <Submenu name="4">
      <template slot="title">
        <Icon type="md-share"/>共享文件
      </template>
      <MenuItem style="font-size:13px;padding-top:0px; margin-left:15px; padding-bottom:5px">
        <Icon type="ios-folder"/>我收到的
      </MenuItem>
      <MenuItem style="font-size:13px;padding-top:0px; margin-left:15px; padding-bottom:0px">
        <Icon type="ios-folder"/>我分享的
      </MenuItem>
    </Submenu>
  </Menu>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import { getChildTreeNode } from "../../../axios/tree.js";
import { close } from "fs";
var path = require("path");

export default {
  data() {
    return {
      menuHeight: parseInt(document.documentElement.clientHeight) - 80,
      myfile: [
        {
          title: "我的文件",
          loading: false,
          children: [],
          render: (h, { root, node, data }) => {
            return h("span", [
              h("Icon", {
                props: {
                  type: "ios-folder"
                },
                style: {
                  paddingRight: "5px"
                }
              }),
              h("span", data.title)
            ]);
          }
        }
      ],
      downloadfile: [
        {
          title: "下载文件夹",
          loading: false,
          children: [],
          render: (h, { root, node, data }) => {
            return h("span", [
              h("Icon", {
                props: {
                  type: "ios-folder"
                },
                style: {
                  paddingRight: "5px"
                }
              }),
              h("span", data.title)
            ]);
          }
        }
      ],
      mydata: [
        {
          title: "我的数据",
          loading: false,
          children: [],
          render: (h, { root, node, data }) => {
            return h("span", [
              h("Icon", {
                props: {
                  type: "ios-folder"
                },
                style: {
                  paddingRight: "5px"
                }
              }),
              h("span", data.title)
            ]);
          }
        }
      ],
      sharedata: [
        {
          title: "共享数据",
          loading: false,
          children: [],
          render: (h, { root, node, data }) => {
            return h("span", [
              h("Icon", {
                props: {
                  type: "ios-folder"
                },
                style: {
                  paddingRight: "5px"
                }
              }),
              h("span", data.title)
            ]);
          }
        }
      ]
    };
  },

  methods: {
    loadData1(item, callback) {
      if (item.title == "我的文件") {
        getChildTreeNode(item, this.$store.state.user.role)
          .then(res => {
            callback(res.data);
            this.$store.state.user.node = item.title;
          })
          .catch(err => {
            console.log("请求失败");
          });
      }
    },
    loadData2(item,callback) {
      if (item.title == "下载文件夹") {
        getChildTreeNode(item, this.$store.state.user.role)
          .then(res => {
            callback(res.data);
          })
          .catch(err => {
            console.log("请求失败");
          });
      }
    },
    loadData3(item,callback) {
      if (item.title == "我的数据") {
        getChildTreeNode(item, this.$store.state.user.role)
          .then(res => {
            callback(res.data);
          })
          .catch(err => {
            console.log("请求失败");
          });
      }
    },
    loadData4(item,callback){
      if (item.title == "共享数据") {
        getChildTreeNode(item, this.$store.state.user.role)
          .then(res => {
            callback(res.data);
          })
          .catch(err => {
            console.log("请求失败");
          });
      } 
    }
  },     
  mounted() {
    window.onresize = () => {
      this.menuHeight = parseInt(document.documentElement.clientHeight) - 80;
    };
  }
};
</script>

<style>
</style>



<!--
<template>
 
    <Menu active-name="1" theme="light" width="auto" :open-names="['2']"
        style="background-color:#F9FAFB;width:165px;" :style="{height:menuHeight+'px'}">
         <MenuItem name="1" :to="{name:'index'}">
            <Icon type="ios-document"/>
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
--> 