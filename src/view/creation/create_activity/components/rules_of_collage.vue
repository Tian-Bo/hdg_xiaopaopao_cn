<!--
 * @Author: zlz5v5
 * @LastEditors: zlz
 * @Date: 2019-08-21 11:24:18
 * @LastEditTime: 2019-08-30 11:14:48
 -->
<template>
    <div class="cover-image">
        <div class="count-down">
            <div class="count-down-ka">
                <div class="count-down-box">
                    <div class="count-down-title">拼团规则{{rulesOfCollageInfo}}</div>
                    <div class="rules-of-collage">
                        <div class="rules-div">
                            <div class="rules-div-num ">
                                <span
                                    style="background: #fe4066;border: #fe4066 1px solid;color:#fff"
                                >
                                    1
                                </span>
                            </div>
                            <div
                                class="rules-div-content"
                                style="color: #fe4066;"
                            >
                                支付开团或参团
                            </div>
                        </div>
                        <div class="rules-div">
                            <div class="rules-div-num">
                                <span>2</span>
                            </div>
                            <div class="rules-div-content">
                                推荐好友参团支付
                            </div>
                        </div>
                        <div class="rules-div">
                            <div class="rules-div-num">
                                <span>3</span>
                            </div>
                            <div class="rules-div-content">
                                人满成团失败退款
                            </div>
                        </div>
                    </div>
                    <!-- 定位的进度条 -->
                    <div class="collage-strip"></div>
                    <div class="collage-strip collage-strip-1"></div>
                </div>
            </div>
        </div>
        <!-- 操作界面 -->
        <div class="bgimg-interface">
            <el-image class="bgimg-down" :src="bgImage" lazy></el-image>
            <div class="edit-text">该组件不支持修改，删除</div>
        </div>
        <!-- <div class="set-interface">
            <div class="">
                <div>分享页</div>
                <div class="">
                    <el-radio v-model="radio" label="1">备选项</el-radio>
                    <el-radio v-model="radio" label="2">备选项</el-radio>
                    <el-radio v-model="radio" label="2">备选项</el-radio>
                </div>
            </div>
            <div></div>
        </div> -->
    </div>
</template>


<script>
export default {
    props:['rulesOfCollageInfo'],
    data() {
        return {
            url: require("@/assets/bgUser.jpg"),
            bgImage: require("@/assets/bgImg.png"),
            value1: [new Date(), new Date()]
        };
    }
};
</script>

<style lang="scss" scoped>
.cover-image {
    position: relative;
    .count-down {
        height: 147px;
        width: 100%;
        line-height: 20px;
        display: block;
        text-align: center;
        padding: 25px 10px;
        .count-down-ka {
            box-shadow: rgba(66, 133, 232, 0.54) 0px -15px 1px;
            border-radius: 10px;
        }
        .count-down-box {
            background: #fff;
            padding: 10px 0;
            border-radius: 10px;
            box-shadow: 0px -8px 1px #c8dcf8;
            position: relative;
            .count-down-title {
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            .rules-of-collage {
                display: flex;
                justify-content: space-between;
                padding: 0 40px;
                .rules-div {
                    width: 60px;
                    z-index: 1;
                    .rules-div-num > span {
                        border: 1px #ccc solid;
                        border-radius: 50%;
                        display: inline-block;
                        width: 20px;
                        height: 20px;
                        line-height: 18px;
                        font-size: 12px;
                        background: #fff;
                    }
                    .rules-div-content {
                        padding-top: 5px;
                    }
                }
            }
            .collage-strip {
                position: absolute;
                top: 44px;
                left: 71px;
                border: 1px #ccc solid;
                width: 198px;
                height: 14px;
                border-radius: 25px;
                z-index: 0;
            }
            .collage-strip-1 {
                width: 50px;
                background: linear-gradient(90deg, #ef0030, #ff6c8a);
                border: #fe4066 1px solid;
            }
        }
    }
    .bgimg-interface {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 2;
        cursor: pointer;
        .bgimg-down {
            height: 147px;
            width: 100%;
            display: block;
        }
        .edit-text {
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            color: #ccc;
            text-align: center;
            z-index: 2;
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