<!--
 * @Author: zlz5v5
 * @LastEditors: zlz
 * @Date: 2019-08-21 11:24:18
 * @LastEditTime: 2019-09-18 21:16:56
 -->
<template>
    <div class="cover-image">
        <div class="count-down">
            <div class="count-down-ka">
                <div class="count-down-box red-ranking">
                    <div class="red-ranking-title">
                        红包排行
                    </div>
                    <div
                        class="red-ranking-list"
                        v-for="(item, index) in redPackRankInfo.limit"
                        :key="index"
                    >
                        <div class="ranking-list-icon">
                            <i class="iconfont iconpaihang"></i>
                        </div>
                        <div class="ranking-list-name">
                            <div class="list-name-img">
                                <el-image
                                    class="name-img"
                                    :src="from_info.head_img"
                                ></el-image>
                            </div>
                            <div class="list-name-text">
                                {{ from_info.store_name }}
                            </div>
                        </div>
                        <div class="ranking-list-jion">
                            邀请了{{ from_info.number }}人
                        </div>
                        <div class="ranking-list-pice">
                            获 ¥{{ from_info.price }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 操作界面 -->
        <div
            class="set-interface"
            v-show="settingIndex === redPackRankInfo.type"
        >
            <div class="set-interface-top">
                <div>分享页</div>
                <div style="margin-left:20px;">
                    <el-radio v-model="redPackRankInfo.pay_status" :label="0">
                        默认显示
                    </el-radio>
                    <el-radio v-model="redPackRankInfo.pay_status" :label="1">
                        支付后显示
                    </el-radio>
                </div>
            </div>
            <div class="set-interface-top">
                <div>列表数量</div>
                <div style="margin-left:20px;width:250px;">
                    <el-slider
                        v-model="redPackRankInfo.limit"
                        :max="10"
                    ></el-slider>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    props: ["redPackRankInfo", "settingIndex"],
    data() {
        return {
            radio: "",
            // 红包排行的假数据
            from_info: {
                head_img: require("@/assets/bgUser.jpg"),
                store_name: "用户",
                number: 10,
                price: 20
            }
        };
    }
};
</script>

<style lang="scss" scoped>
.cover-image {
    position: relative;
    .count-down {
        // height: 323px;
        width: 100%;
        line-height: 20px;
        display: block;
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
        }
        .red-ranking {
            padding: 10px 20px;
            .red-ranking-title {
                padding-bottom: 1px;
                border-bottom: 1px #eee solid;
            }
            .red-ranking-list {
                display: flex;
                justify-content: space-between;
                height: 50px;
                line-height: 40px;
                padding-top: 10px;
                border-bottom: 1px #ccc solid;
                font-size: 12px;
                .ranking-list-icon {
                    .iconfont {
                        font-size: 20px !important;
                    }
                }
                .ranking-list-name {
                    display: flex;
                    .list-name-img {
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        border: 1px #ccc solid;
                        text-align: center;
                        margin-right: 2px;
                        .name-img {
                            width: 24px;
                            height: 24px;
                            margin-top: 2px;
                            border-radius: 50%;
                        }
                    }
                }
                .ranking-list-pice {
                    color: #f20;
                }
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
}
</style>