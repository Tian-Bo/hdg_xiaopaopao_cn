<!--
 * @Author: zlz5v5
 * @LastEditors: zlz
 * @Date: 2019-08-19 14:37:07
 * @LastEditTime: 2019-09-29 14:55:25
 -->
<template>
    <div class="create-poster">
        <posterTopNav
            @click="clickSavePoster(1)"
            :posterInfo="posterInfo"
            :VueDragResize="VueDragResize"
        />
        <div class="create-poster-title">海报设置</div>
        <div style="display:flex">
            <div class="activtty-home">
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
                <!-- 返回导航栏 -->
                <div class="home-return-nav">
                    <div><i class="iconfont iconfanhui1"></i>&nbsp;返回</div>
                    <div class="return-nav-title font-words">
                        item.active_title
                    </div>
                    <div>
                        <i class="iconfont icondiandiandian"></i>&nbsp;&nbsp;
                    </div>
                </div>
                <!-- 关注组件 -->
                <div class="poster-bgimg-box">
                    <followNav :followNavInfo="followNavInfo" />

                    <!-- 背景图片 -->
                    <div
                        class="poster-bgimg"
                        style="{ background: http://pic26.nipic.com/20121221/9252150_142515375000_2.jpg }"
                    ></div>
                    <!-- 蒙版 -->
                    <div class="poster-box-1"></div>
                    <!-- 海报 -->
                    <div class="poster-box">
                        <img
                            :src="posterInfo.poster_img_url"
                            v-if="posterInfo.poster_img_url !== ''"
                            style="width:100%;height:100%;"
                        />
                        <!-- 头像图像 -->
                        <VueDragResize
                            :isActive="false"
                            :w="VueDragResize.head_img_width"
                            :h="VueDragResize.head_img_height"
                            :x="VueDragResize.head_img_left"
                            :y="VueDragResize.head_img_top"
                            :parentLimitation="true"
                            v-on:resizestop="
                                value => {
                                    resize(1, value);
                                }
                            "
                            v-on:dragstop="
                                value => {
                                    resize(1, value);
                                }
                            "
                            v-show="posterInfo.is_show_head_img == 1"
                        >
                            <img
                                :src="bgImg"
                                style="width:100%;height:100%;"
                                v-show="posterInfo.head_img_type === 0"
                            />
                            <img
                                :src="bgImg"
                                style="width:100%;height:100%;border-radius: 50%;"
                                v-show="posterInfo.head_img_type === 1"
                            />
                        </VueDragResize>
                        <!-- 昵称文字 -->
                        <VueDragResize
                            :isActive="false"
                            :w="VueDragResize.nickname_width"
                            :h="VueDragResize.nickname_height"
                            :x="VueDragResize.nickname_left"
                            :y="VueDragResize.nickname_top"
                            :parentLimitation="true"
                            v-on:resizestop="
                                value => {
                                    resize(2, value);
                                }
                            "
                            v-on:dragstop="
                                value => {
                                    resize(2, value);
                                }
                            "
                            v-show="posterInfo.is_show_nickname == 1"
                        >
                            <div
                                :style="{
                                    color: posterInfo.nickname_font_color,
                                    'font-size':
                                        posterInfo.nickname_font_size + 'px'
                                }"
                            >
                                用户昵称
                            </div>
                        </VueDragResize>
                        <!-- 二维码 -->
                        <VueDragResize
                            :isActive="false"
                            :w="VueDragResize.qrcode_width"
                            :h="VueDragResize.qrcode_height"
                            :x="VueDragResize.qrcode_left"
                            :y="VueDragResize.qrcode_top"
                            :parentLimitation="true"
                            v-on:resizestop="
                                value => {
                                    resize(3, value);
                                }
                            "
                            v-on:dragstop="
                                value => {
                                    resize(3, value);
                                }
                            "
                        >
                            <img
                                :src="qrcode"
                                style="width:100%;height:100%;"
                            />
                        </VueDragResize>
                    </div>
                </div>
                <!-- 底部的文字 -->
                <div class="botttom-text">
                    <div>长按保存你的专属二维码海报</div>
                    <div>每推荐1位好友参与活动，你将获得50元奖励</div>
                    <div class="triangle"></div>
                </div>
            </div>
            <div class="activtty-setting">
                <el-form label-width="100px">
                    <el-form-item label="海报背景">
                        <div class="activtty-setting-bg">
                            <el-input
                                v-model="posterInfo.poster_img_url"
                                size="mini"
                                style="width:200px"
                                disabled
                            ></el-input>
                            <div class="bg-btn-1">
                                <el-upload
                                    action="/file/upload"
                                    :before-upload="
                                        value => {
                                            uoloadFile(value, '海报');
                                        }
                                    "
                                    :show-file-list="false"
                                >
                                    <el-button size="mini">上传</el-button>
                                </el-upload>
                            </div>
                            <div class="bg-btn-2">
                                <el-button
                                    size="mini"
                                    type="primary"
                                    @click="openCKT"
                                    >在线设计</el-button
                                >
                            </div>
                        </div>
                        <div v-show="uploadImgStatus" class="upload-img-status">
                            正在上传中...
                        </div>
                        <div class="bg-tip-text">
                            建议上传640px*1008px 海报背景图
                        </div>
                    </el-form-item>
                    <el-form-item label="海报元素">
                        <div class="activtty-setting-element">
                            <el-button
                                type="primary"
                                size="mini"
                                @click="
                                    setHeardImgStutas(
                                        posterInfo.is_show_head_img
                                    )
                                "
                                v-show="posterInfo.is_show_head_img === 1"
                            >
                                用户头像
                            </el-button>
                            <el-button
                                type="info"
                                size="mini"
                                @click="
                                    setHeardImgStutas(
                                        posterInfo.is_show_head_img
                                    )
                                "
                                v-show="posterInfo.is_show_head_img === 0"
                                >用户头像</el-button
                            >
                            <el-button
                                type="primary"
                                size="mini"
                                @click="
                                    setNicknameStutas(
                                        posterInfo.is_show_nickname
                                    )
                                "
                                v-show="posterInfo.is_show_nickname === 1"
                                >用户昵称</el-button
                            >
                            <el-button
                                type="info"
                                size="mini"
                                @click="
                                    setNicknameStutas(
                                        posterInfo.is_show_nickname
                                    )
                                "
                                v-show="posterInfo.is_show_nickname === 0"
                                >用户昵称</el-button
                            >
                        </div>
                    </el-form-item>
                    <!-- 头像设置 -->
                    <el-form-item
                        label="头像形状"
                        v-show="posterInfo.is_show_head_img === 1"
                    >
                        <el-radio-group v-model="posterInfo.head_img_type">
                            <el-radio :label="0">方形</el-radio>
                            <el-radio :label="1">圆形</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <!-- 头像设置 end -->
                    <el-form-item
                        label="昵称颜色"
                        v-show="posterInfo.is_show_nickname === 1"
                    >
                        <div class="activtty-setting-bg">
                            <el-input
                                v-model="posterInfo.nickname_font_color"
                                size="mini"
                                style="width:100px"
                                disabled
                            ></el-input>
                            <div style="margin-top: 6px;">
                                <el-color-picker
                                    v-model="posterInfo.nickname_font_color"
                                    size="mini"
                                ></el-color-picker>
                            </div>
                        </div>
                    </el-form-item>
                    <!-- 昵称设置 -->
                    <el-form-item
                        label="昵称大小"
                        v-show="posterInfo.is_show_nickname === 1"
                        style="margin-top: 120px;"
                    >
                        <el-slider
                            v-model="posterInfo.nickname_font_size"
                            :min="10"
                            :max="25"
                        ></el-slider>
                    </el-form-item>

                    <!-- 昵称设置 end -->
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
// 关注模板
import followNav from "../create_activity/components/follow_nav";
import posterTopNav from "./components/poster_top_nav";
import VueDragResize from "vue-drag-resize";
import { getPoster, getCKTKey, PostImg, downloadFile } from "@/api/api";
import axiosHttp from "axios";
import axiosQs from "qs";

export default {
    data() {
        return {
            token: localStorage.getItem("token"),
            // 拼团id
            cluster_id: localStorage.getItem("clusterId"),
            newDate: "",
            // 海报背景的信息
            followNavInfo: {
                type: 1,
                cluster_info: {
                    shop_name: "华信软件开发",
                    shop_cover:
                        "//huodongge-1254430703.cosgz.myqcloud.com/uploads/image/20190718/1563447690phpbbagSD.jpeg",
                    is_share: 0
                }
            },
            // 从接口获取的海报数据
            posterInfo: [],
            bgImg: require("@/assets/bgUser.jpg"),
            // 海报元素的状态
            posterIndex: 0,
            // 二维码
            qrcode: require("@/assets/zixun.png"),
            //   传值不能为0
            VueDragResize: {
                head_img_width: 100, // 头像的宽高 位置(上,左)
                head_img_height: 100,
                head_img_top: 10,
                head_img_left: 10,
                nickname_width: 10, // 名字的宽高 位置(上,左),
                nickname_height: 10,
                nickname_top: 10,
                nickname_left: 10,
                qrcode_width: 10, // 二维码的宽高 位置(上,左)
                qrcode_height: 10,
                qrcode_top: 10,
                qrcode_left: 10
            },
            // 上传图片的状态
            uploadImgStatus: false
        };
    },
    components: { followNav, VueDragResize, posterTopNav },
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
    created() {
        this.getPosterInfo();
    },
    methods: {
        // 拖拽函数
        resize(value, index) {
            let _that = this;
            // 为1的时候控制head_img
            if (value === 1) {
                _that.VueDragResize.head_img_width = index.width;
                _that.VueDragResize.head_img_height = index.height;
                _that.VueDragResize.head_img_top = index.top;
                _that.VueDragResize.head_img_left = index.left;
            }
            if (value === 2) {
                _that.VueDragResize.nickname_width = index.width;
                _that.VueDragResize.nickname_height = index.height;
                _that.VueDragResize.nickname_top = index.top;
                _that.VueDragResize.nickname_left = index.left;
            }
            if (value === 3) {
                _that.VueDragResize.qrcode_width = index.width;
                _that.VueDragResize.qrcode_height = index.height;
                _that.VueDragResize.qrcode_top = index.top;
                _that.VueDragResize.qrcode_left = index.left;
            }
        },
        // 获取海报的信息
        getPosterInfo() {
            let _that = this;
            // 这块功能需要得到 cluster_id ,但是这个值只有从/create_home能得到
            if (localStorage.getItem("clusterId") === null) {
                _that.$router.push({
                    path: "/create_home",
                    query: { title: "create_activity" }
                });
                return;
            }
            let params = {
                model_id: 4,
                active_id: _that.cluster_id,
                token: _that.token
            };
            _that.$http
                .get(getPoster, {
                    params
                })
                .then(res => {
                    _that.loading = false;
                    if (res.data.status !== 0) {
                        _that.$message.error(res.data.message);
                    } else {
                        // 后端没有处理这个数所以才写那么多 传值不能为0 将字符串转换number
                        _that.posterInfo = res.data.data;
                        _that.VueDragResize.head_img_width = parseInt(
                            _that.posterInfo.head_img_width
                        );
                        _that.VueDragResize.head_img_height = parseInt(
                            _that.posterInfo.head_img_height
                        );
                        _that.VueDragResize.head_img_top = parseInt(
                            _that.posterInfo.head_img_position_top
                        );
                        _that.VueDragResize.head_img_left = parseInt(
                            _that.posterInfo.head_img_position_left
                        );
                        // 名字的宽高 位置(上,左),
                        _that.VueDragResize.nickname_width = parseInt(
                            _that.posterInfo.nickname_width
                        );
                        _that.VueDragResize.nickname_height = parseInt(
                            _that.posterInfo.nickname_height
                        );
                        _that.VueDragResize.nickname_top = parseInt(
                            _that.posterInfo.nickname_position_top
                        );
                        _that.VueDragResize.nickname_left = parseInt(
                            _that.posterInfo.nickname_position_left
                        );
                        // 二维码的宽高 位置(上,左)
                        _that.VueDragResize.qrcode_width = parseInt(
                            _that.posterInfo.qrcode_wh_width
                        );
                        _that.VueDragResize.qrcode_height = parseInt(
                            _that.posterInfo.qrcode_wh_height
                        );
                        _that.VueDragResize.qrcode_top = parseInt(
                            _that.posterInfo.qrcode_position_top
                        );
                        _that.VueDragResize.qrcode_left = parseInt(
                            _that.posterInfo.qrcode_position_left
                        );

                        // 初始化创客贴上传的函数
                        window.chuangkitComplete = function(data) {
                            if (data.kind == 2) {
                                let imgUrl = "http:" + data["thumb-urls"][0];
                                let dataParams = {
                                    url: imgUrl,
                                    token: localStorage.getItem("token")
                                };
                                axiosHttp
                                    .post(
                                        downloadFile,
                                        axiosQs.stringify(dataParams)
                                    )
                                    .then(res => {
                                        if (res.data.status === 0) {
                                            _that.posterInfo.poster_img_url =
                                                res.data.data.url;
                                        }
                                    })
                                    .catch(err => {
                                        _that.$message.error(err);
                                    });
                            }
                        };
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        // 打开创客贴
        openCKT() {
            let _that = this;
            let params = {
                kind: 166,
                token: _that.token
            };
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
        },
        // 获取生成的海报地址:将创客贴生成的海报地址上传到服务器后返回存在服务器的地址上
        // @index:传过来的图片
        // @value:识别上传那张图片
        uoloadFile(index, value) {
            let _that = this;
            let param = new FormData();
            _that.uploadImgStatus = true;
            param.append("file", index);
            let config = {
                headers: { "Content-Type": "multipart/form-data" }
            };
            _that.$http
                .post(PostImg, param, config)
                .then(res => {
                    _that.uploadImgStatus = false;
                    if (value === "海报") {
                        _that.posterInfo.poster_img_url = res.data.data.url;
                    }
                })
                .catch(err => {
                    _that.$message.error(err);
                });
        },
        // 切换用户头像和用户名称的按钮
        // @index:
        setHeardImgStutas(index) {
            let _that = this;
            if (index === 1) {
                _that.posterInfo.is_show_head_img = 0;
            } else {
                _that.posterInfo.is_show_head_img = 1;
            }
        },
        setNicknameStutas(index) {
            let _that = this;
            if (index === 1) {
                _that.posterInfo.is_show_nickname = 0;
            } else {
                _that.posterInfo.is_show_nickname = 1;
            }
        }
    },
    // 过滤器
    filters: {
        // 将num转换为字符串
        numToString: function(value) {
            return parseInt(value);
        }
    }
};
</script>

<style lang="scss" scoped>
.activtty-home {
    z-index: 5;
    width: 375px;
    margin: 50px 100px;
    .close-set-btn {
        background: #ccc !important;
        color: #fff !important;
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
    .home-return-nav {
        background: #000;
        color: #fff;
        display: flex;
        justify-content: space-between;
        padding: 0 8px;
        height: 42px;
        line-height: 42px;
        .return-nav-title {
            width: 200px;
            text-align: center;
        }
    }
    .botttom-text {
        text-align: center;
        position: relative;
        padding: 20px 0;
        div {
            padding-bottom: 10px;
        }
        .triangle {
            position: absolute;
            margin-left: 110px;
            float: left;
            width: 1px;
            height: 0;
            border-width: 41px;
            border-style: solid;
            border-color: transparent #ffffff transparent transparent;
            -webkit-transform: rotate(90deg);
            transform: rotate(90deg);
            top: -86px;
            left: 35px;
        }
    }
}
.activtty-setting {
    margin-top: 50px;
    z-index: 0;
    .el-form-item {
        margin-bottom: 60px;
    }
    .activtty-setting-bg {
        display: flex;
        .bg-btn-1 {
            margin-left: -8px;
            margin-top: -1px;
        }
        .bg-btn-2 {
            margin-left: 12px;
            margin-top: -1px;
        }
    }

    .bg-tip-text {
        color: #ccc;
        font-size: 10px;
    }
}
.create-poster {
    background: #fff;
    padding-top: 5px;
    margin: 100px 34px 0 126px;
}
.create-poster-title {
    margin: 20px;
    border-left: 2px #409eff solid;
    padding-left: 18px;
}
.poster-bgimg-box {
    position: relative;
    background: #ccc;
    .poster-bgimg {
        height: 540px;
    }
    .poster-box-1 {
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        border: 1px #ccc solid;
        background: #00000061;
        height: 100%;
        width: 100%;
    }
    .poster-box {
        position: absolute;
        top: 40px;
        left: 36px;
        right: 36px;
        border-radius: 8px;
        height: 475px;
        background: #97cd37;
    }
}

.font-words {
    overflow: hidden; /*超过部分不显示*/
    text-overflow: ellipsis; /*超过部分用点点表示*/
    white-space: nowrap; /*不换行*/
}
.upload-img-status {
    color: #ccc;
}
</style>