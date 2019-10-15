<!--
 * @Author: zlz5v5
 * @LastEditors: zlz
 * @Date: 2019-08-22 11:40:14
 * @LastEditTime: 2019-09-30 10:07:41
 -->
<template>
    <div class="bottom-box">
        <div class="bottom-nav">
            <div class="bottom-nav-icon">
                <div
                    v-show="
                        bottomNavInfo.home_page.type === 0 ||
                            bottomNavInfo.home_page.type === 2
                    "
                >
                    <div><i class="iconfont iconshouye2"></i></div>
                    <div>首页</div>
                </div>
                <div>
                    <div><i class="iconfont iconkefu"></i></div>
                    <div>客服</div>
                </div>
            </div>
            <div class="bottom-nav-grounp">
                <div class="nav-groun-left">分享赚</div>
                <div class="nav-groun-center">
                    <div>¥299</div>
                    <div>单独报名</div>
                </div>
                <div class="nav-groun-right">
                    <div>¥299</div>
                    <div>立即开团</div>
                </div>
            </div>
        </div>
        <div class="set-interface" v-show="settingIndex === bottomNavInfo.type">
            <div class="label-box">
                <div class="label-text-1">
                    活动首页:
                </div>
                <div style="padding-top: 3px;display:flex">
                    <el-radio v-model="bottomNavInfo.home_page.type" :label="0">
                        显示
                    </el-radio>
                    <el-radio v-model="bottomNavInfo.home_page.type" :label="1">
                        隐藏
                    </el-radio>
                    <el-radio v-model="bottomNavInfo.home_page.type" :label="2">
                        自定义
                    </el-radio>
                </div>
                <div v-show="bottomNavInfo.home_page.type === 2">
                    <el-input
                        v-model="bottomNavInfo.home_page.url"
                        placeholder="请输入外部链接"
                        size="mini"
                        class="home_page-input"
                    >
                    </el-input>
                </div>
            </div>

            <div class="label-box">
                <div class="label-text">活动客服:</div>
                <el-input
                    v-model="bottomNavInfo.service.name"
                    placeholder="客服名称"
                    size="mini"
                    class="label-input"
                ></el-input>
                <el-input
                    v-model="bottomNavInfo.service.tel"
                    placeholder="客服电话"
                    type="number"
                    size="mini"
                    class="label-input"
                ></el-input>
            </div>

            <div class="label-box">
                <el-input
                    v-model="bottomNavInfo.service.qrcode"
                    placeholder="二维码图标"
                    size="mini"
                    style="width:290px;margin-left:80px;"
                    :disabled="true"
                >
                    <template slot="append">
                        <el-upload
                            action="/file/upload"
                            :before-upload="uoloadFile"
                            :show-file-list="false"
                        >
                            <el-button size="mini">上传图片</el-button>
                        </el-upload>
                    </template>
                </el-input>
            </div>
        </div>
    </div>
</template>
<script>
import { PostImg } from "@/api/api";
export default {
    props: ["settingIndex", "bottomNavInfo"],
    data() {
        return {};
    },
    methods: {
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
                    if (res.data.status === 0) {
                        _that.bottomNavInfo.service.qrcode = res.data.data.url;
                        _that.$message.success("上传成功")
                    }
                })
                .catch(err => {
                    _that.$message.error(err);
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.bottom-box {
    position: relative;

    .bottom-nav {
        background: #fff;
        display: flex;
        padding: 10px;
        height: 68px;
        .bottom-nav-grounp,
        .bottom-nav-icon {
            display: flex;
        }
        .bottom-nav-icon {
            text-align: center;
            justify-content: space-between;
            line-height: 20px;
            font-size: 12px;
            width: 60px;
            margin-top: 5px;
            margin-right: 10px;
            .iconfont {
                font-size: 22px !important;
            }
        }
        .bottom-nav-grounp {
            width: calc(100% - 70px);
            background: #f20;
            justify-content: space-between;
            padding: 0px 12px;
            margin: 2px 0;
            border-radius: 25px;
            line-height: 20px;
            font-size: 12px;
            color: #fff;
            background: linear-gradient(90deg, #ff6459, #ff3251);
            cursor: pointer;
            .nav-groun-left,
            .nav-groun-center,
            .nav-groun-right {
                flex: 1;
                text-align: center;
            }
            .nav-groun-left {
                line-height: 45px;
            }
            .nav-groun-center {
                border-left: 1px #d4b0b0 solid;
                border-right: 1px #d4b0b0 solid;
            }
        }
    }
    .set-interface {
        position: absolute;
        top: 20%;
        right: -500px;
        z-index: 2;
        border: 1px #ccc solid;
        width: 434px;
        padding: 20px;
        .set-interface-top {
            display: flex;
            height: 40px;
            line-height: 40px;
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
    .label-box {
        display: flex;
        margin-top: 20px;
        flex-wrap: wrap;
        .label-text {
            line-height: 30px;
            margin-right: 20px;
        }
        .label-text-1 {
            margin-top: 0;
            width: 84px;
        }
        .label-input {
            width: 140px;
            margin-right: 10px;
        }
        .home_page-input {
            width: 290px;
            margin-left: 80px;
            padding-top: 12px;
        }
    }
}
</style>