<!--
 * @Author: zlz5v5
 * @LastEditors: zlz
 * @Date: 2019-09-09 15:53:00
 * @LastEditTime: 2019-09-25 14:56:25
 * @顶部的按钮弹窗的预览
 -->

<template >
    <div>
        <!-- 设置页面分享样式 -->
        <div class="seting-share">
            <div class="seting-share-left">
                <img :src="bgImage" alt="" style="width:100%;height:100%" />
            </div>
            <div class="seting-share-right">
                <div class="share-right-box">
                    <!-- {{qrcodelUrl}} -->
                    <vue-qr
                        :text="qrcodelUrl"
                        :margin="0"
                        :size="250"
                        :auto-color="true"
                        :dot-scale="1"
                        :callback="test"
                    ></vue-qr>
                    <div class="qr-btn">
                        <el-button type="text" disabled>微信扫一扫</el-button>
                        <el-button type="text" @click="downloadBase64()">
                            下载二维码
                        </el-button>
                    </div>
                    <el-input
                        placeholder="请输入内容"
                        v-model="qrcodelUrl"
                        :disabled="true"
                    >
                        <template slot="append">
                            <el-button
                                type="primary"
                                v-clipboard:success="copy"
                                v-clipboard:copy="qrcodelUrl"
                            >
                                复制连接
                            </el-button>
                        </template>
                    </el-input>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { globalUrlBase, httpString } from "@/api/api";

// import Clipboard from 'v-clipboard'
import qrcode from "./qrcode";
import VueQr from "vue-qr";

export default {
    props: ["cluster_id"],
    data() {
        return {
            newDate: "",
            bgImage: require("@/assets/pageCreation.png"),
            isShow: 0,
            dataUrl: ""
        };
    },
    components: {
        qrcode,
        VueQr
    },
    computed: {
        // 计算当前时间
        cpmputNewTime: function() {
            let that = this;
            return setInterval(function() {
                let date1 = new Date();
                that.newDate = date1.toTimeString().substr(0, 8);
            }, 1000);
        },
        //计算路由的链接
        qrcodelUrl: function(params) {
            return (
                httpString +
                "www." +
                globalUrlBase +
                "/wap/active/assemble?cid=" +
                this.cluster_id
            );
        }
    },
    methods: {
        // 将生成的base64图片地址赋值
        test(dataUrl) {
            let _that = this;
            _that.dataUrl = dataUrl;
        },
        // 使用base64 下载 图片
        // 这段代码是粘贴百度的
        downloadBase64() {
            let _that = this;
            let dataUrl = _that.dataUrl;
            if (window.navigator.msSaveOrOpenBlob) {
                let bstr = atob(dataUrl.split(",")[1]);
                let n = bstr.length;
                let u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                let blob = new Blob([u8arr]);
                window.navigator.msSaveOrOpenBlob(
                    blob,
                    "chart-download" + "." + "png"
                );
            } else {
                // 这里就按照chrome等新版浏览器来处理
                let a = document.createElement("a");
                a.href = dataUrl;
                a.setAttribute("download", "chart-download");
                a.click();
            }
        },
        // 复制
        copy() {
            let _that = this;
            _that.$message({
                message: "复制成功",
                type: "success"
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.seting-share {
    display: flex;

    height: 665px;
    .seting-share-left {
        width: 334px;
        border: 1px #ccc solid;
        position: relative;
        background: #ededed;
    }
    .seting-share-right {
        width: calc(100% - 354px);
        margin-left: 20px;
        padding: 50px 20px;
        position: relative;
        text-align: center;
        .share-right-box {
            border: 1px #ccc solid;
            display: inline-block;
            padding: 30px;
        }
        .qr-btn {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
        }
        .seting-share-bottom {
            position: absolute;
            bottom: 25px;
            left: 0;
            right: 0;
            text-align: center;
            .share-bottom-btn {
                padding: 10px 80px;
            }
        }
    }
}
</style>