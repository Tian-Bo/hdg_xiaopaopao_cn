<!--
 * @Author: zlz5v5
 * @LastEditors: zlz
 * @Date: 2019-08-21 11:24:18
 * @LastEditTime: 2019-09-17 11:50:45
 -->
<template>
    <div class="cover-image">
        <el-image
            v-for="(item, index) in guaranteeInfo.picture"
            :key="index"
            class="current-image"
            :src="item.url"
            v-show="item.choose"
        ></el-image>
        <!-- 操作界面 -->
        <div class="set-interface" v-show="settingIndex === guaranteeInfo.type">
            <div class="tip-title">
                保障标识：
                <span>
                    手机端可以点击展开公示资质：营业执照，执业许可证（不包含身份证）用户参加活动更放心。
                </span>
            </div>
            <div
                class="guarantee-radio"
                v-if="guaranteeInfo.auth_pictures_info.auth"
            >
                <div
                    style="display:flex"
                    v-for="(item, index) in guaranteeInfo.picture"
                    :key="index"
                >
                    <div
                        class="guarantee-radio-box"
                        @click="isGuarantee(index)"
                    >
                        <div style="display:flex">
                            <div class="radio-box-btn ">
                                <span
                                    class="radio-box-icon"
                                    :class="{
                                        'radio-box-icon-active':
                                            item.choose === true
                                    }"
                                ></span>
                            </div>
                            <el-image
                                class="radio-box-image"
                                :src="item.url"
                            ></el-image>
                        </div>
                        <div class="radio-box-text">
                            {{ item.msg }}
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="guarantee-false"
                v-if="guaranteeInfo.auth_pictures_info.auth === false"
            >
                亲!暂无认证,不能使用该功能
                <el-button type="text" @click="jumpAuthentication()">
                    去认证
                </el-button>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    props: ["guaranteeInfo", "settingIndex"],
    data() {
        return {};
    },
    methods: {
        isGuarantee(valueIndex) {
            let _that = this;
            _that.guaranteeInfo.picture.forEach((item, index) => {
                if (valueIndex === index) {
                    item.choose = true;
                } else {
                    item.choose = false;
                }
            });
        },
        jumpAuthentication() {
            let that = this;
            that.$router.push({
                path: "/setting"
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.cover-image {
    position: relative;
    .current-image {
        width: 100%;
        height: 30px;
        display: block;
    }

    .set-interface {
        position: absolute;
        top: 20%;
        right: -460px;
        z-index: 2;
        border: 1px #ccc solid;
        width: 400px;
        padding: 14px;
        .guarantee-false {
            text-align: center;
            font-size: 18px;
            margin: 10px;
        }
        .tip-title {
            font-size: 12px;
            span {
                color: #f20;
            }
        }
        .guarantee-radio {
            display: flex;
            flex-flow: column;
            margin: 10px 0px;

            .el-radio {
                margin: 10px 0;
                span.el-radio__input {
                    margin-top: -26px !important;
                }
                span.el-radio__inner {
                    margin-bottom: 25px !important;
                }
            }
            .guarantee-radio-box {
                font-size: 12px;
                overflow: hidden;
                margin-bottom: 23px;
                color: #ccc;
                cursor: pointer;
                .radio-box-btn {
                    height: 15px;
                    width: 15px;
                    text-align: center;
                    line-height: 15px;
                    margin-top: 9px;
                    border-radius: 50%;
                    border: 1px #ccc solid;
                    margin-right: 5px;
                    .radio-box-icon {
                        height: 9px;
                        width: 9px;
                        text-align: center;
                        display: inline-block;
                        line-height: 10px;
                        border-radius: 50%;
                    }
                    .radio-box-icon-active {
                        background: #409eff;
                    }
                }

                .radio-box-image {
                    height: 30px;
                    display: inline-block;
                    width: 90%;
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
}
</style>