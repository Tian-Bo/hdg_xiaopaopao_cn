<!--
 * @Author: zlz5v5
 * @LastEditors: zlz
 * @Date: 2019-08-21 11:24:18
 * @LastEditTime: 2019-09-30 15:11:04
 -->
<template>
    <div class="cover-image">
        <el-image
            class="current-image"
            :src="coverImageInfo.cover_image"
            lazy
            v-show="isShow === 0"
        ></el-image>
        <video
            :src="coverImageInfo.cover_image"
            controls="controls"
            class="current-image"
            v-show="isShow === 1"
        >
            您的浏览器不支持 video 标签。
        </video>
        <div
            class="set-interface"
            v-show="settingIndex === coverImageInfo.type"
        >
            <div class="set-interface-top">
                <div class="upload-box">
                    <el-input
                        class="upload-img-input"
                        v-model="coverImageInfo.cover_image"
                        placeholder="请输入内容"
                        disabled
                        size="mini"
                    ></el-input>
                    <el-upload
                        action="/file/upload"
                        :before-upload="uoloadFile"
                        :show-file-list="false"
                        list-type="picture"
                        accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                    >
                        <el-button
                            class="upload-img-btn-1"
                            @click="isShowFunc(0)"
                        >
                            上传图片
                        </el-button>
                    </el-upload>
                </div>
                <div>
                    <el-button class="upload-img-btn-2" @click="openCKT(0)">
                        在线设计
                    </el-button>
                </div>
            </div>

            <div class="upload-box-tips">
                图片尺寸大小推荐：750px * 1014px，且不超过500KB
            </div>
            <div class="set-interface-bottom">
                <div class="upload-box">
                    <el-input
                        v-model="coverImageInfo.cover_image"
                        placeholder="请输入内容"
                        disabled
                        size="mini"
                        style="width:220px"
                    ></el-input>
                    <el-upload
                        action="/file/upload"
                        :before-upload="uoloadFile"
                        :show-file-list="false"
                        accept=".mp4"
                    >
                        <el-button
                            class="upload-img-btn-1"
                            @click="isShowFunc(1)"
                        >
                            上传&nbsp;竖版9:16 视频
                        </el-button>
                    </el-upload>
                </div>
            </div>
            <div v-show="uploadImgStatus" class="upload-img-status">
                正在上传中...
            </div>
        </div>
    </div>
</template>


<script>
import { PostImg, getCKTKey, downloadFile } from "@/api/api";
import axiosHttp from "axios";
import axiosQs from "qs";
export default {
    props: ["coverImageInfo", "settingIndex"],
    data() {
        return {
            // 控制时图片还是视频状态
            isShow: this.coverImageInfo.isImg || 0,
            // 获取token
            token: localStorage.getItem("token"),
            // 上传图片的状态
            uploadImgStatus: false
        };
    },
    created() {
        this.chuangkitComplete();
    },
    methods: {
        // 上传图片
        uoloadFile(file) {
            let _that = this;
            let param = new FormData();
            param.append("file", file);
            let config = {
                headers: { "Content-Type": "multipart/form-data" }
            };
            _that.uploadImgStatus = true;
            _that.$http
                .post(PostImg, param, config)
                .then(res => {
                    _that.coverImageInfo.cover_image = res.data.data.url;
                    _that.uploadImgStatus = false;
                })
                .catch(err => {
                    _that.$message.error(err);
                });
        },
        isShowFunc(index) {
            let _that = this;
            _that.isShow = index;
            _that.coverImageInfo.isImg = index;
        },
        chuangkitComplete() {
            let _that = this;
            // 初始化创客贴上传的函数。
            window.chuangkitComplete = function(data) {
                if (data.kind == 2) {
                    let imgUrl = "http:" + data["thumb-urls"][0];
                    let dataParams = {
                        url: imgUrl,
                        token: localStorage.getItem("token")
                    };

                    axiosHttp
                        .post(downloadFile, axiosQs.stringify(dataParams))
                        .then(res => {
                            if (res.data.status === 0) {
                                _that.coverImageInfo.cover_image =
                                    res.data.data.url;
                            }
                        })
                        .catch(err => {
                            _that.$message.error(err);
                        });
                }
            };
        },
        // 打开创客贴
        openCKT(index) {
            let _that = this;
            let params = {
                kind: 13,
                token: _that.token
            };
            _that.isShow = index;
            _that.coverImageInfo.isImg = index;
            _that.$http
                .get(getCKTKey, {
                    params
                })
                .then(res => {
                    _that.loading = false;
                    if (res.data.status !== 0) {
                        _that.$message.error(res.data.message);
                    } else {
                        let cktIframe = new ChuangkitIframe(res.data.data);
                        cktIframe.openIframe();
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.cover-image {
    position: relative;
    padding: 0;
    margin: 0;
    .current-image {
        height: 509px;
        width: 100%;
        display: block;
    }

    .set-interface {
        position: absolute;
        top: 20%;
        right: -500px;
        z-index: 2;
        width: 434px;
        padding: 20px;
        border: 1px #ccc solid;
        .set-interface-top {
            display: flex;
            .upload-box {
                display: flex;
                .upload-img-input {
                    height: 28px;
                    line-height: 28px;
                    padding: 0 10px;
                    width: 192px;
                    margin-right: -8px;
                }
                .upload-img-btn-1 {
                    height: 28px;
                    line-height: 4px;
                    color: #66b1ff;
                    border: 1px #66b1ff solid;
                    background: #ecf5ff;
                    z-index: 3;
                }
            }
            .upload-img-btn-2 {
                height: 28px;
                line-height: 4px;
                color: #ffff;
                border: 1px #66b1ff solid;
                background: #66b1ff;
                margin-left: 12px;
            }
        }
        .upload-box-tips {
            color: #ccc;
            font-size: 10px;
            padding: 5px 0 20px;
        }
        .set-interface-bottom {
            display: flex;
            margin-left: 10px;
            .upload-box {
                display: flex;
                .upload-img-input {
                    height: 28px;
                    line-height: 28px;
                    width: 223px;
                    border: 1px #ccc solid;
                    padding: 0 10px;
                    margin-right: -2px;
                }
                .upload-img-btn-1 {
                    height: 28px;
                    line-height: 4px;
                    color: #66b1ff;
                    border: 1px #66b1ff solid;
                    background: #ecf5ff;
                    z-index: 3;
                }
            }
        }
    }
    // 侧边三角形
    .set-interface::after {
        content: "";
        top: 10px;
        left: -17px;
        width: 0;
        height: 0;
        border-width: 18px 18px 18px 0;
        border-style: solid;
        border-color: transparent #fff transparent transparent;
        position: absolute;
        z-index: 3;
    }
    .set-interface::before {
        content: "";
        top: 10px;
        left: -18px;
        width: 0;
        height: 0;
        border-width: 18px 18px 18px 0;
        border-style: solid;
        border-color: transparent #ccc transparent transparent;
        position: absolute;
        z-index: 3;
    }
    .upload-img-status {
        color: #ccc;
        margin: 13px;
    }
}
</style>