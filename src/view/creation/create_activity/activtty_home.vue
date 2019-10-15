<!--
 * @Author: zlz5v5
 * @LastEditors: zlz
 * @Date: 2019-08-19 14:37:07
 * @LastEditTime: 2019-09-28 10:50:02
 -->
<template>
    <div>
        <div class="activtty-home" :style="{ background: backgroundType11 }">
            <!-- 手机信号栏 -->
            <div class="home-phone-nav">
                <div>
                    <i class="iconfont iconxinhao"></i>
                    中国联通&nbsp;4G
                </div>
                <div>
                    {{ newDate }}<span v-show="false">{{ cpmputNewTime }}</span>
                </div>
                <div>
                    <i class="iconfont iconweizhi-xianxing"></i>
                    93%
                    <i class="iconfont iconiconset0251"></i>
                </div>
            </div>
            <div v-for="(item, index) in cluster_array" :key="index">
                <!-- 返回导航栏 -->
                <div
                    class="home-return-nav"
                    v-if="item.type === 0"
                    @mousemove="eidtSetting(item.type)"
                    @mouseout="eidtSetting(0)"
                >
                    <div><i class="iconfont iconfanhui1"></i>&nbsp;返回</div>
                    <div class="return-nav-title font-words">
                        <!-- {{ item.active_title }} -->
                        <input
                            class="input-box"
                            type="text"
                            v-model="item.active_title"
                        />
                    </div>
                    <div>
                        <i class="iconfont icondiandiandian"></i>&nbsp;&nbsp;
                    </div>
                </div>
                <!-- 关注的模板 -->
                <div @mousemove="eidtSetting(item.type)" class="bgImg-box">
                    <followNav v-if="item.type === 1" :followNavInfo="item" />
                    <img
                        :src="bgImage"
                        class="bgImg-moudle"
                        :class="{
                            'bgImg-moudle-hover': settingIndex === item.type
                        }"
                    />
                </div>
                <!-- 封面模板 -->
                <div
                    @mousemove="eidtSetting(item.type)"
                    :class="{ 'bgImg-box': settingIndex === item.type }"
                >
                    <coverImage
                        v-if="item.type === 2"
                        :coverImageInfo="item"
                        :settingIndex="settingIndex"
                    />
                    <img
                        :src="bgImage"
                        v-show="settingIndex === item.type"
                        class="bgImg-moudle"
                        :class="{
                            'bgImg-moudle-hover': settingIndex === item.type
                        }"
                    />
                </div>
                <!-- 保障标识 -->
                <div @mousemove="eidtSetting(item.type)" class="bgImg-box">
                    <guarantee
                        v-if="item.type === 3"
                        :guaranteeInfo="item"
                        :settingIndex="settingIndex"
                    />
                    <img
                        :src="bgImage"
                        v-show="settingIndex === item.type"
                        class="bgImg-moudle"
                        :class="{
                            'bgImg-moudle-hover': settingIndex === item.type
                        }"
                    />
                </div>
                <!-- 倒计时 -->
                <div @mousemove="eidtSetting(item.type)" class="bgImg-box">
                    <countDown
                        v-if="item.type === 4"
                        :countDownInfo="item"
                        :settingIndex="settingIndex"
                    />
                    <img
                        :src="bgImage"
                        v-show="settingIndex === item.type"
                        class="bgImg-moudle"
                        :class="{
                            'bgImg-moudle-hover': settingIndex === item.type
                        }"
                    />
                </div>
                <!-- 拼团规则 -->
                <div @mousemove="eidtSetting(item.type)" class="bgImg-box">
                    <rulesOfCollage
                        v-if="item.type === 5"
                        :countDownInfo="item"
                        :rulesOfCollage="settingIndex"
                    />
                    <img
                        :src="bgImage"
                        v-show="settingIndex === item.type"
                        class="bgImg-moudle"
                        :class="{
                            'bgImg-moudle-hover': settingIndex === item.type
                        }"
                    />
                </div>
                <!-- 拼团人员 -->
                <div @mousemove="eidtSetting(item.type)" class="bgImg-box">
                    <participants
                        v-if="item.type === 6"
                        :participantsInfo="item"
                        :settingIndex="settingIndex"
                    />
                    <img
                        :src="bgImage"
                        v-show="settingIndex === item.type"
                        class="bgImg-moudle"
                        :class="{
                            'bgImg-moudle-hover': settingIndex === item.type
                        }"
                    />
                </div>
                <!-- 文本编辑器 -->
                <div @mousemove="eidtSetting(item.type)" class="bgImg-box">
                    <textEditor
                        v-if="item.type === 7"
                        :textEditorInfo="item"
                        :settingIndex="settingIndex"
                    />
                    <img
                        :src="bgImage"
                        v-show="settingIndex === item.type"
                        class="bgImg-moudle"
                        :class="{
                            'bgImg-moudle-hover': settingIndex === item.type
                        }"
                    />
                </div>
                <!-- 商家联盟 -->
                <div @mousemove="eidtSetting(item.type)" class="bgImg-box">
                    <information
                        v-if="item.type === 8"
                        :informationInfo="item"
                        :settingIndex="settingIndex"
                    />
                    <img
                        :src="bgImage"
                        v-show="settingIndex === item.type"
                        class="bgImg-moudle"
                        :class="{
                            'bgImg-moudle-hover': settingIndex === item.type
                        }"
                    />
                </div>
                <!-- 红包排行 -->
                <div @mousemove="eidtSetting(item.type)" class="bgImg-box">
                    <redPackRanking
                        v-if="item.type === 9"
                        :redPackRankInfo="item"
                        :settingIndex="settingIndex"
                    />
                    <img
                        :src="bgImage"
                        v-show="settingIndex === item.type"
                        class="bgImg-moudle"
                        :class="{
                            'bgImg-moudle-hover': settingIndex === item.type
                        }"
                    />
                </div>
                <!-- 红包排行 -->
                <div @mousemove="eidtSetting(item.type)" class="bgImg-box">
                    <bottomNav
                        v-if="item.type === 11"
                        :bottomNavInfo="item"
                        :settingIndex="settingIndex"
                    />
                    <img
                        :src="bgImage"
                        v-show="settingIndex === item.type"
                        class="bgImg-moudle"
                        :class="{
                            'bgImg-moudle-hover': settingIndex === item.type
                        }"
                    />
                </div>
            </div>
            <!--  -->
        </div>
    </div>
</template>

<script>
// 关注模板
import followNav from "./components/follow_nav";
// 封面模板
import coverImage from "./components/cover_image";
// 保障标识
import guarantee from "./components/guarantee";
// 倒计时
import countDown from "./components/count_down";
// 拼团规则
import rulesOfCollage from "./components/rules_of_collage";
// 拼团人员
import participants from "./components/participants";
// 文本编辑器
import textEditor from "./components/text_editor";
// 商家信息
import information from "./components/information";
// 红包排行
import redPackRanking from "./components/red_pack_ranking";
// 底部导航
import bottomNav from "./components/bottom_nav";

export default {
    props: ["cluster_array"],
    data() {
        return {
            newDate: "",
            settingIndex: 0,
            bgImage: require("@/assets/bgImg.png")
        };
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
        // 获取从父组件传过来的cluster_array中type:11 的背景颜色的值
        backgroundType11: function() {
            let _that = this;
            let bgColor = "#005be0";
            _that.cluster_array.forEach(element => {
                if (element.type === 11) {
                    bgColor = element.bg_color;
                }
            });
            return bgColor;
        }
    },
    methods: {
        eidtSetting(itemType) {
            let _that = this;
            _that.settingIndex = itemType;
        }
    },
    components: {
        followNav,
        coverImage,
        guarantee,
        countDown,
        rulesOfCollage,
        participants,
        information,
        redPackRanking,
        bottomNav,
        textEditor
    }
};
</script>

<style lang="scss" scoped>
.bgImg-box {
    position: relative;
    box-sizing: border-box;
}

.bgImg-moudle {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
}
.bgImg-moudle-hover {
    border: 2px #c8dcf8 dashed;
    border-bottom: 0px;
}
.activtty-home {
    z-index: 5;
    width: 375px;
    border: 1px #ccc solid;
    margin: 40px 0 30px 360px;
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
            .input-box {
                height: 20px;
                padding: 7px;
                border-radius: 2px;
                background: #000;
                color: #fff;
                text-align: center;
                cursor: pointer;
                border: 1px #2f2f2f solid;
                border-radius: 4px;
            }
            .input-box:focus {
                background: #fff;
                color: #000;
            }
        }
    }
}
.font-words {
    overflow: hidden; /*超过部分不显示*/
    text-overflow: ellipsis; /*超过部分用点点表示*/
    white-space: nowrap; /*不换行*/
}
</style>