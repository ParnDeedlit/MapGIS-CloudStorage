<template>
    <Modal class="update" v-model="show" width="400" footer-hide :mask-closable="false">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>应用更新</span>
        </p>
        <div style="text-align:center">
            <div class="body">
            <p>更新进度</p>
            <p class="percentage">{{percent}}%</p>
            <div class="progress">
            <div class="length" :style="{width:percent+'%'}"></div>
            </div>
            </div>
        </div>
    </Modal>
</template>

<script>
    export default {
        name: "update",
        data() {
            return {
                show: false,
                percent: 5
            }
        },
        methods:{
            close(){
                this.show = false;
            }
        },
        mounted() {
            this.$electron.ipcRenderer.on('appUpdate', (event, data) => {
                this.$electron.ipcRenderer.send('checkForUpdate');
            });

            this.$electron.ipcRenderer.on('checkForUpdate', () => {
                console.log('checkForUpdate')
            });

            this.$electron.ipcRenderer.on('downloadProgress', (event, data) => {
                this.$Message.destroy();
                this.percent = (data.percent).toFixed(2);
                if (data.percent >= 100) {
                  this.$Message.success({content:'下载完毕,三秒钟后应用程序将退出安装更新!',duration:4});
                    this.show = false;
                    setTimeout(()=>{
                        this.$electron.ipcRenderer.on('isUpdateNow');
                    },3000)
                }
            });

            this.$electron.ipcRenderer.on('message', (event, data) => {
                switch (data.status) {
                    case 0:
                        this.$Message.destroy();
                        this.$Message.loading(data.msg);
                        break;
                    case 1:
                        this.$Message.destroy();
                        this.$Message.success(data.msg);
                        this.show = true;
                        break;
                    case -1:
                        this.$Message.destroy();
                        this.$Message.error(data.msg);
                        break;
                }
            })
        }
    }
</script>


<style>


    .update .body {
        padding-top: 20px;
        text-align: center;
    }

    .update .body .percentage {
        margin-top: 20px;
    }

    .update .body .progress {
        width: 350px;
        height: 30px;
        border: 1px solid #CCCCCC;
        border-radius: 8px;
        margin: 10px auto;
    }

    .update .body .progress .length {
        background-color: #E4393c;
        border-radius: 8px;
        width: 10px;
        height: 30px;
    }
</style>