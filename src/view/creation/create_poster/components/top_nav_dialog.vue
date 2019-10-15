<!--
 * @Author: zlz5v5
 * @LastEditors: zlz
 * @Date: 2019-09-09 15:53:00
 * @LastEditTime: 2019-09-25 14:56:12
 * @顶部的按钮弹窗的预览
 -->

<template >
    <div>
        <!-- 设置页面分享样式 -->
        <div class="seting-share" v-show="isShow === 0">
            <div class="seting-share-left">
                <!-- 手机信号栏 -->
                <div class="home-phone-nav">
                    <div>
                        <i class="iconfont iconxinhao"></i>
                        中国联通&nbsp;4G
                    </div>
                    <div>
                        {{ newDate }}
                        <span v-show="false">{{ cpmputNewTime }}</span>
                    </div>
                    <div>
                        <i class="iconfont iconweizhi-xianxing"></i>
                        93%
                        <i class="iconfont iconiconset0251"></i>
                    </div>
                </div>
                <!-- 返回框 -->
                <div class="return-btn">
                    <div><i class="iconfont iconfanhui1"></i>活动阁XX</div>
                    <div>
                        <i class="iconfont iconyuandiancaidan-copy-copy"></i>
                    </div>
                </div>
                <!-- 发送的信息 -->
                <div class="send-msg">
                    <div class="msg-info">
                        <div class="font-width">
                            {{ share_config.title }}
                        </div>
                        <div class="msg-info-bottom">
                            <div class="info-bottom-left">
                                {{ share_config.description }}
                            </div>
                            <div class="info-bottom-right">
                                <img
                                    class="bottom-right-img"
                                    :src="share_config.icon"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="heard-img">
                        <img class="d-img" :src="bgImage" />
                    </div>
                </div>
                <!-- 底部的对话框 -->
                <div class="bottom-input">
                    <div><i class="iconfont icon-xiaoxi"></i></div>
                    <div style="margin:0 10px;">
                        <el-input
                            placeholder="请输入内容"
                            :disabled="true"
                            size="mini"
                        >
                        </el-input>
                    </div>
                    <div><i class="iconfont iconmanyi"></i></div>
                    <div><i class="iconfont iconfabu"></i></div>
                </div>
            </div>
            <div class="seting-share-right">
                <div
                    class="share-right-title"
                    style="padding-top: 0 !important;"
                >
                    设置页面分享样式（不设置则默认)
                </div>
                <div style="text-align: right;margin-top:10px">
                    <el-row v-show="isAlertDalog === 1">
                        <el-button
                            size="mini"
                            round
                            @click="addName('{shopname}')"
                        >
                            店铺名称
                        </el-button>
                        <el-button
                            size="mini"
                            round
                            @click="addName('{nickname}')"
                        >
                            用户名称
                        </el-button>
                    </el-row>
                </div>
                <el-form
                    ref="form"
                    label-width="80px"
                    class="seting-share-from"
                    width="200px"
                >
                    <el-form-item label="活动名称">
                        <el-input
                            v-model="share_config.title"
                            size="mini"
                            maxlength="60"
                            show-word-limit
                            @focus="alertDalog(1)"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="设置描述">
                        <el-input
                            v-model="share_config.description"
                            size="mini"
                            type="textarea"
                            :rows="4"
                            maxlength="100"
                            show-word-limit
                            @focus="alertDalog(0)"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="分享图标">
                        <el-input
                            v-model="share_config.icon"
                            size="mini"
                            maxlength="60"
                            show-word-limit
                            :disabled="true"
                        >
                            <template slot="append">
                                <el-upload
                                    action="/file/upload"
                                    :before-upload="uoloadFile"
                                    :show-file-list="false"
                                >
                                    <el-button size="mini" type="primary">
                                        上传图片
                                    </el-button>
                                </el-upload>
                            </template>
                        </el-input>
                        <div class="from-text-tip">
                            图片尺寸大小推荐：100px * 100px
                        </div>
                    </el-form-item>
                </el-form>
                <div class="seting-share-bottom">
                    <el-button class="share-bottom-btn" @click="childMethod()">
                        取消
                    </el-button>
                    <el-button
                        type="primary"
                        class="share-bottom-btn"
                        @click="uploadShare()"
                    >
                        确定
                    </el-button>
                </div>
            </div>
        </div>
        <!-- 设置二维码查看 -->
        <div class="seting-share" v-show="isShow === 1">
            <div class="seting-share-left">
                <img :src="bgPage" alt="" style="width:100%;height:100%" />
            </div>
            <div class="seting-share-right">
                <div class="share-right-box">
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
                        <el-button type="text" @click="downloadBase64">
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
                <div class="seting-share-bottom">
                    <el-button class="share-bottom-btn" @click="isShow = 0">
                        上一步
                    </el-button>
                    <el-button
                        type="primary"
                        class="share-bottom-btn"
                        @click="successJump()"
                    >
                        确定
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    globalUrlBase,
    httpString,
    PostImg,
    uploadShareConfig,
    checkClusterFinish
} from "@/api/api";
import VueQr from "vue-qr";
export default {
    props: ["share_config"],
    data() {
        return {
            token: localStorage.getItem("token"),
            // 拼团id
            cluster_id: localStorage.getItem("clusterId"),
            shop_id: localStorage.getItem("shop_id"),
            // 用户图片
            bgImage: require("@/assets/bgUser.jpg"),
            // 海报背景
            bgPage: require("@/assets/pageCreation.png"),
            // 当前时间
            newDate: "",
            isShow: 0,
            // 拼接二维码
            qrcodelUrl:
                httpString +
                "www." +
                globalUrlBase +
                "/wap/active/assemble?cid=" +
                localStorage.getItem("clusterId"),
            dataUrl: "",
            // 弹窗状态
            isAlertDalog: 0,
            // 上传图片的状态
            uploadImgStatus: false
        };
    },
    components: {
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
        },
        // 上传图片
        uoloadFile(file) {
            let _that = this;
            let param = new FormData();
            param.append("file", file);
            let config = {
                headers: { "Content-Type": "multipart/form-data" }
            };
            _that.$http
                .post(PostImg, param, config)
                .then(res => {
                    _that.share_config.icon = res.data.data.url;
                })
                .catch(err => {
                    _that.$message.error(err);
                });
        },
        // 上传分享样式
        uploadShare() {
            let _that = this;
            let oldCOnfig = {
                title: _that.share_config.title,
                description: _that.share_config.description,
                icon: _that.share_config.icon
            };
            let config = JSON.stringify(oldCOnfig);
            let dataParams = {
                token: _that.token,
                cluster_id: _that.cluster_id,
                config
            };

            _that.$http
                .post(uploadShareConfig, _that.$qs.stringify(dataParams))
                .then(res => {
                    _that.checkClusterFinishFunc();
                    if (res.data.status === 0) {
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        // 调用父组件的方法
        childMethod() {
            this.$emit("openDalog");
        },
        // 验证是否该保存 并发布该活动
        checkClusterFinishFunc() {
            let _that = this;
            let params = {
                shop_id: _that.shop_id,
                cluster_id: _that.cluster_id,
                token: _that.token
            };

            _that.$http
                .get(checkClusterFinish, {
                    params
                })
                .then(res => {
                    _that.loading = false;
                    if (res.data.status === 0) {
                        _that.$message.success("成功发布");
                        _that.isShow = 1;
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        // 发布成功后页面跳转
        successJump() {
            let _that = this;
            // 删除的clusterId 拼团ID
            localStorage.removeItem("clusterId");
            // 跳转页面
            _that.$router.push("/activity?tab=1");
        },
        // 添加title name的函数
        addName(name) {
            let _that = this;
            _that.share_config.title += name;
        },
        alertDalog(status) {
            let _that = this;
            _that.isAlertDalog = status;
        }
    }
};
</script>
<style lang="scss" scoped>
.seting-share {
    display: flex;
    .seting-share-left {
        width: 334px;
        height: 665px;
        border: 1px #ccc solid;
        position: relative;
        background: #ededed;
        .bottom-input {
            display: flex;
            height: 50px;
            line-height: 50px;
            background: #f7f7f7;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 0 10px;
            .iconfont {
                font-size: 25px !important;
                margin: 0 5px;
            }
        }
        .home-phone-nav {
            background: #000;
            color: #fff;
            display: flex;
            justify-content: space-between;
            padding: 0 4px;
            font-size: 12px;
            width: 100%;
            height: 18px;
            line-height: 18px;
        }
        .return-btn {
            display: flex;
            justify-content: space-between;
            padding: 10px;
            border-bottom: 1px #f1f1f1 solid;
        }
        .send-msg {
            display: flex;
            justify-content: flex-end;
            padding: 20px;

            .msg-info {
                height: 100px;
                width: 232px;
                border: 1px #c1bebe solid;
                border-radius: 8px;
                padding: 10px;
                background: #fff;
                .font-width {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .msg-info-bottom {
                    display: flex;
                    margin-top: 5px;
                    font-size: 10px;
                    color: #ccc;
                    .info-bottom-left {
                        width: 156px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 3;
                        height: 50px;
                        padding: 2px;
                    }
                    .info-bottom-right {
                        width:50px;
                        height: 50px;
                        border-radius: 2px;
                        .bottom-right-img {
                            width: 100%;
                            height: 100%;
                            border-radius: 2px;
                        }
                    }
                }
            }
            .msg-info::after {
                margin-left: 110px;
                float: left;
                width: 0;
                height: 0;
                border-width: 100px;
                border-style: solid;
                border-color: transparent #0099cc transparent transparent;
            }
            .heard-img {
                margin-left: 10px;
                height: 50px;
                width: 60px;
                border: 1px #f1f1f1 solid;
                border-radius: 4px;
                .d-img {
                    width: 100%;
                    height: 100%;
                    border-radius: 4px;
                }
            }
        }
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
        .share-right-title {
            padding-left: 10px;
            border-left: 2px #409eff solid;
            text-align: left;
        }
        .seting-share-from {
            margin-top: 10px;
            .from-text-tip {
                color: #ccc;
                font-size: 12px;
            }
        }
        .seting-share-bottom {
            position: absolute;
            bottom: 25px;
            left: 0;
            right: 0;
            text-align: center;
        }
    }
}
</style>