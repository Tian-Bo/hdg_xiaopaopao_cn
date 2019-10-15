<!--
 * @Author: zlz5v5
 * @LastEditors: zlz
 * @Date: 2019-08-21 11:24:18
 * @LastEditTime: 2019-09-30 10:09:56
 -->
<template>
    <div class="cover-image">
        <div class="count-down">
            <div class="count-down-ka">
                <div class="count-down-box participants">
                    <div class="part-title">
                        <div>已有{{ participantsInfo.participation }}参与</div>
                        <div>以下为即将满员的团</div>
                    </div>
                    <div
                        class="part-list"
                        v-for="(item, index) in participantsInfo.limit"
                        :key="index"
                    >
                        <div class="pictures-img-box">
                            <!-- 团长 -->
                            <div>
                                <el-image
                                    class="main-people"
                                    :src="form_info.regimental_img"
                                ></el-image>
                            </div>
                            <!-- 团员 -->
                            <div class="list-img-box">
                                <div
                                    class="jion-people-box"
                                    v-for="(o, i) in 3"
                                    :key="i"
                                >
                                    <el-image
                                        class="jion-people"
                                        :src="form_info.league_img"
                                    ></el-image>
                                </div>
                            </div>
                        </div>
                        <div class="part-xis">
                            <div>还差{{ form_info.team_count }}人成团</div>
                            <div>剩余{{ form_info.diff }}</div>
                        </div>
                        <div>
                            <el-button
                                size="mini"
                                class="jion-btn"
                                type="danger"
                            >
                                去参团
                            </el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="set-interface"
            v-show="settingIndex === participantsInfo.type"
        >
            <div class="set-interface-top">
                <div>参团页</div>
                <div style="margin-left:20px;">
                    <el-radio v-model="participantsInfo.show" :label="false">
                        默认不显示
                    </el-radio>
                    <el-radio v-model="participantsInfo.show" :label="true">
                        显示
                    </el-radio>
                </div>
            </div>
            <div class="set-interface-top">
                <div>列表数量</div>
                <div style="margin-left:20px;width:250px;">
                    <el-slider
                        v-model="participantsInfo.limit"
                        :max="6"
                    ></el-slider>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    props: ["participantsInfo", "settingIndex"],
    data() {
        return {
            radio: "",
            // 假数据
            form_info: {
                regimental_img: require("@/assets/shop_version.png"),
                league_img: require("@/assets/bgUser.jpg"),
                team_count: 5,
                diff: 1
            }
        };
    }
};
</script>

<style lang="scss" scoped>
.cover-image {
    position: relative;
    .count-down {
        width: 100%;
        line-height: 20px;
        display: block;
        padding: 25px 10px 5px;
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
        .participants {
            padding: 0 10px;
            font-size: 14px;
            .part-title {
                display: flex;
                justify-content: space-between;
                padding: 4px 0;
            }
            .part-list {
                display: flex;
                line-height: 40px;
                height: 40px;
                margin: 8px 0px;
                justify-content: space-between;
                .pictures-img-box {
                    display: flex;
                    width: 200px;
                }
                .main-people {
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                }
                .list-img-box {
                    margin-top: 4px;
                    margin-left: 8px;
                    display: flex;
                    .jion-people-box {
                        border: 1px #ccc solid;
                        padding: 2px;
                        width: 30px;
                        height: 30px;
                        line-height: 30px;
                        margin-right: -7px;
                        border-radius: 50%;
                        background: #fff;
                        .jion-people {
                            width: 24px;
                            height: 24px;
                            border-radius: 50%;
                        }
                    }
                }
                .part-xis {
                    line-height: 18px;
                    margin-left: 33px;
                    font-size: 12px;
                    width: 150px;
                }
                .jion-btn {
                    padding: 5px 8px;
                    margin-left: 14px;
                    height: 30px;
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