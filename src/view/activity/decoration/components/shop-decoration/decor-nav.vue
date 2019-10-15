<template>
    <div class="home-box">
        <!-- 页面 -->
        <div class="box-left nav-box-center" style="margin-bottom:15px;">
            <!-- 版型一 -->
            <div class="box-left-nav-1" v-show="decorNav.pattern === 1">
                <img
                    class="nav-image"
                    :src="decorNav.picture || defaultImg"
                    alt="图片加载失败"
                />
                <!-- 店铺图片/名字 获取关注-->
                <div class="nav-absolute">
                    <div class="nav-absolute-left">
                        <div class="absolute-left-img">
                            <img
                                :src="decorNav.shop_cover"
                                alt="图片加载失败"
                            />
                        </div>
                        <span>{{ decorNav.shop_name }}</span>
                    </div>
                    <div
                        class="nav-absolute-right"
                        @click="qrCodeStatus = true"
                    >
                        <span class="follow-span">关注</span>
                    </div>
                </div>
            </div>
            <!-- 版型二 轮播图-->
            <div
                v-show="decorNav.pattern === 2"
                class="box-left-nav-1"
                style="background:#ccc"
            >
                <div class="block">
                    <el-carousel
                        trigger="click"
                        height="150px"
                        indicator-position="none"
                    >
                        <el-carousel-item
                            v-for="(item, index) in decorNav.carousel"
                            :key="index"
                        >
                            <img
                                :src="item.picture || defaultImg"
                                style="width:100%;height:100%;"
                                alt="图片加载失败"
                            />
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
        </div>

        <!-- 操作 -->
        <div class="box-right">
            <span class="box-right-span" v-show="decorNav.show == true"
                >显示</span
            >
            <span class="box-right-span" v-show="decorNav.show != true"
                >不显示</span
            >
            <el-switch style="display: block" v-model="decorNav.show">
            </el-switch>
            <div class="right-set-nav" v-show="operationStatus === 1">
                <div class="right-set-nav-box">
                    <div>
                        <span class="set-nav-span">模型选择 : </span>
                        <span
                            class="set-nav-span"
                            @click="decorNav.pattern = 1"
                            :class="{ active: decorNav.pattern === 1 }"
                        >
                            默认顶部
                        </span>
                        <span
                            class="set-nav-span"
                            @click="decorNav.pattern = 2"
                            :class="{ active: decorNav.pattern === 2 }"
                        >
                            轮播图
                        </span>
                    </div>
                    <div v-show="decorNav.pattern === 2">
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="编辑完成后请记得保存"
                            placement="top"
                        >
                            <el-button
                                size="mini"
                                type="primary"
                                @click="addCarousel()"
                            >
                                添加
                            </el-button>
                        </el-tooltip>
                    </div>
                    <div v-show="decorNav.pattern === 1">
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="编辑完成后请记得保存"
                            placement="top"
                        >
                            <el-button
                                size="mini"
                                type="primary"
                                @click="uplaodTheme()"
                            >
                                保存
                            </el-button>
                        </el-tooltip>
                    </div>
                </div>
                <!-- 操作版型一 -->
                <div class="" v-show="decorNav.pattern === 1">
                    <div class="change-header-img">
                        <el-upload
                            action="/file/upload"
                            :before-upload="beforePattern"
                            :show-file-list="false"
                        >
                            <div style="display:flex;width:400px;">
                                <el-input
                                    placeholder="请点击选择默认图片"
                                    :value="decorNav.picture"
                                    :disabled="true"
                                    size="small"
                                >
                                </el-input>
                                <el-button
                                    size="small"
                                    type="primary"
                                    style="margin-left:20px"
                                >
                                    上传导航图片
                                </el-button>
                            </div>
                        </el-upload>
                    </div>
                    <!-- 添加二维码 -->
                    <div class="change-header-img">
                        <el-upload
                            action="/file/upload"
                            :before-upload="beforeQtCode"
                            :show-file-list="false"
                        >
                            <div style="display:flex;width:400px;">
                                <el-input
                                    placeholder="请点击选择默认图片"
                                    :value="decorNav.qr_code"
                                    :disabled="true"
                                    size="small"
                                >
                                </el-input>
                                <el-button
                                    size="small"
                                    type="primary"
                                    style="margin-left:20px"
                                >
                                    上传关注二维码
                                </el-button>
                            </div>
                            <div>
                                <img
                                    class="qr-code-img"
                                    :src="decorNav.qr_code"
                                />
                            </div>
                        </el-upload>
                    </div>
                </div>
                <!-- 操作版型二 -->
                <div v-show="decorNav.pattern === 2">
                    <div
                        class="set-upcarousel-box"
                        v-for="(item, index) in decorNav.carousel"
                        :key="index"
                    >
                        <!-- 删除按钮-->
                        <div
                            class="upcarousel-close-btn"
                            @click="deleteCarousel()"
                        >
                            X
                        </div>
                        <div class="upcarousel-box-left">
                            <img :src="item.picture" />
                        </div>
                        <div class="upcarousel-box-right">
                            <!-- 上传轮播图 -->
                            <div>
                                <el-upload
                                    action="/file/upload"
                                    :before-upload="beforeCarousel"
                                    :show-file-list="false"
                                >
                                    <div
                                        style="display:flex;width:220px;"
                                        @click="setCarouselIndex(index)"
                                    >
                                        <el-input
                                            placeholder="请点击选择默认图片"
                                            :value="item.picture"
                                            :disabled="true"
                                            size="small"
                                        >
                                        </el-input>
                                        <el-button size="small" type="primary">
                                            点击上传
                                        </el-button>
                                    </div>
                                </el-upload>
                            </div>
                            <!-- 上传链接 -->
                            <div style="display:flex;width:220px;">
                                <el-input
                                    placeholder="请输入地址"
                                    v-model="item.url"
                                    size="small"
                                >
                                </el-input>
                                <el-button size="small" type="primary">
                                    设置链接
                                </el-button>
                            </div>
                        </div>
                    </div>
                    <!-- 添加按钮-->
                    <div class="set-upcarousel-btn" @click="uplaodTheme()">
                        保存
                    </div>
                </div>
            </div>
        </div>
        <el-dialog
            title="公众号二维码"
            :visible.sync="qrCodeStatus"
            width="200px"
            center
        >
            <div style="text-align: center; margin: 0 auto;">
                <img
                    :src="decorNav.qr_code || defaultImg"
                    style="width: 100px;height: 100px;"
                />
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="qrCodeStatus = false">
                    确 定
                </el-button>
            </span>
        </el-dialog>
    </div>
</template>


<script>
import { PostImg } from "@/api/api";
export default {
    props: {
        decorNav: {
            type: Object,
            default() {
                return {};
            }
        },
        // 操作的状态
        operationStatus: {
            type: Number,
            default() {
                return {};
            }
        },
        // 从父组件传过来的上传门店装修函数
        uplaodTheme: {
            type: Function,
            default: null
        }
    },
    components: {},
    data() {
        return {
            // 默认图片
            defaultImg: "../../../../static/image/bgUser.jpg",
            // 该模块是否显示
            show: "",
            // 二维码状态
            qrCodeStatus: false,
            // 上传成功的轮播图
            carouseImg: "",
            // 轮播图的索引
            carouselIndex: 0
        };
    },
    methods: {
        // 上传导航图片
        beforePattern(file) {
            let _that = this;
            let param = new FormData();
            param.append("file", file);
            let config = {
                headers: { "Content-Type": "multipart/form-data" }
            };
            _that.$http
                .post(PostImg, param, config)
                .then(res => {
                    _that.decorNav.picture = res.data.data.url;
                })
                .catch(err => {
                    _that.$message.error(err);
                });
        },
        // 上传关注二维码
        beforeQtCode(file) {
            let _that = this;
            let param = new FormData();
            param.append("file", file);
            let config = {
                headers: { "Content-Type": "multipart/form-data" }
            };
            _that.$http
                .post(PostImg, param, config)
                .then(res => {
                    _that.decorNav.qr_code = res.data.data.url;
                })
                .catch(err => {
                    _that.$message.error(err);
                });
        },
        // 改变轮播图的索引
        setCarouselIndex(index) {
            this.carouselIndex = index;
        },
        // 上传轮播图
        beforeCarousel(file) {
            let _that = this;
            let param = new FormData();
            param.append("file", file);

            let config = {
                headers: { "Content-Type": "multipart/form-data" }
            };
            _that.$http
                .post(PostImg, param, config)
                .then(res => {
                    _that.decorNav.carousel[_that.carouselIndex].picture =
                        res.data.data.url;
                })
                .catch(err => {
                    _that.$message.error(err);
                });
        },
        // 增加轮播图一个数组元素
        addCarousel() {
            let _that = this;
            _that.decorNav.carousel.push({
                picture: _that.defaultImg,
                url: ""
            });
        },
        // 删除当前轮播图
        deleteCarousel(index) {
            let _that = this;
            _that.decorNav.carousel.splice(index, 1);
        }
    }
};
</script>

<style lang="scss" scoped>
.active {
    border-bottom: 2px #409eff solid;
}
.el-input-group__append {
    background: #ff2e50;
}
.el-input.is-disabled .el-input__inner {
    width: 250px;
}
.home-box {
    display: flex;
    .nav-box-center {
        display: flex;
        justify-content: space-around;
        width: 375px;
        height: 150px;
        margin-right: 20px;
        border: 1px #e6e6e6 solid;
        .box-left-nav-1 {
            width: 100%;
            height: 100%;
            position: relative;
            .nav-image {
                width: 100%;
                height: 100%;
            }
            .nav-absolute {
                position: absolute;
                bottom: -15px;
                font-size: 14px;
                left: 0;
                right: 0;
                height: 50px;
                padding: 0 10px;
                display: flex;
                justify-content: space-between;
                .nav-absolute-left {
                    display: flex;
                    line-height: 40px;
                    color: #fff;
                    font-size: 18px;
                    .absolute-left-img {
                        box-shadow: 2px 2px 5px rgba(134, 134, 134, 0.55);
                        border-radius: 50%;
                    }
                    img {
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                    }
                    span {
                        margin-left: 10px;
                        font-size: 16px;
                    }
                }
                .nav-absolute-right {
                    line-height: 40px;
                    .follow-span {
                        border: 1px #ccc solid;
                        background: #fff;
                        padding: 2px 15px;
                        border-radius: 5px;
                        margin-top: 5px;
                        font-size: 14px;
                        cursor: pointer;
                    }
                }
            }
        }
    }
    .box-right {
        display: flex;
        margin-top: 25px;
        .box-right-span {
            margin-right: 20px;
        }
    }
    .right-set-nav {
        margin-left: 145px;
        position: absolute;
        width: 475px;
        border: 1px #ccc solid;
        border-radius: 5px;
        padding: 30px;
        box-shadow: 4px 3px 5px 0px #e2e2e2;
        .right-set-nav-box {
            display: flex;
            justify-content: space-between;
            .set-nav-span {
                margin-right: 20px;
                cursor: pointer;
                padding-bottom: 5px;
            }
        }
        .change-header-img {
            margin-top: 20px;
            input {
                border: 1px #ccc solid;
                height: 32px;
                border-radius: 5px;
                padding: 0 10px;
                width: 375px;
            }
            .qr-code-img {
                width: 100px;
                height: 100px;
                float: left;
                background: #ccc;
                margin-top: 20px;
                border: 5px #efefef solid;
            }
        }
        .set-upcarousel-box {
            margin-top: 20px;
            border: 1px #ccc solid;
            padding: 5px;
            display: flex;
            position: relative;
            .upcarousel-close-btn {
                position: absolute;
                right: -8px;
                top: -10px;
                background: #ccc;
                width: 18px;
                height: 18px;
                text-align: center;
                border-radius: 50%;
                line-height: 18px;
                font-size: 10px;
                color: #fff;
                cursor: pointer;
            }
            .upcarousel-box-left {
                width: 150px;
                height: 100px;
                margin-right: 10px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .upcarousel-box-right {
                width: calc(100% - 160px);
                display: flex;
                flex-flow: column;
                justify-content: space-between;
                padding: 10px;
                input {
                    width: 136px;
                    height: 32px;
                    padding: 0 5px;
                    font-size: 12px;
                    border: 1px #ccc solid;
                    border-radius: 5px;
                }
            }
        }
        .set-upcarousel-btn {
            text-align: center;
            border: 1px #ccc solid;
            padding: 2px 0;
            margin-top: 20px;
            cursor: pointer;
            background: #409eff;
            color: #fff;
        }
    }
}
</style>
