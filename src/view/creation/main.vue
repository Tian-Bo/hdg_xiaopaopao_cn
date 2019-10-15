<!--
 * @Author: zlz5v5
 * @LastEditors: zlz
 * @Date: 2019-07-10 18:32:23
 * @LastEditTime: 2019-09-30 18:09:16
 -->
 
<template>
    <div class="creation">
        <div class="creation-nav">
            <div>
                <img :src="bgImage" style="width:92px;height:65px"/>
            </div>
            <div
                v-for="(item, index) in creationNav"
                :key="index"
                class="creation-nav-div"
                :class="{
                    'iconfont-active': $route.query.title === item.name
                }"
                @click="jumpPage(index, item.name)"
            >
                <div
                    :class="{
                        triangle: $route.query.title === item.name
                    }"
                >
                    <i class="iconfont" :class="item.icon"></i>
                    {{ item.title }}
                </div>
            </div>
        </div>
        <div class="creation-body">
            <transition name="fade" mode="out-in">
                <createActivity
                    v-if="$route.query.title === 'create_activity'"
                />
                <createRule v-if="$route.query.title === 'create_rule'" />
                <createPoster v-if="$route.query.title === 'createp_poster'" />
            </transition>
        </div>
    </div>
</template>

<script>
// 导入活动页面组件
import createActivity from "./create_activity";
// 导入规则页面组件
import createRule from "./create_rule";
// 导入海报组件
import createPoster from "./create_poster";

// 导航数据
let creationNav = [
    { icon: "iconzhuangxiuxuqiu", title: "页面", name: "create_activity" },
    { icon: "iconguizeshezhi", title: "规则", name: "create_rule" },
    { icon: "iconyijianicon_haibao", title: "海报", name: "createp_poster" }
];

export default {
    data() {
        return {
            // 导航数据
            creationNav,
            // 导航的活动阁的图片
            bgImage: require("@/assets/bgUser.jpg")
        };
    },
    components: {
        createActivity,
        createRule,
        createPoster
    },
    methods: {
        /**
         * @description: 切换class状态跳转路由
         * @param {type} index:索引,url:路由
         * @return: vido
         */
        jumpPage(index, name) {
            let that = this;
            that.$router.push({
                path: "/create_home",
                query: { title: name }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.creation {
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s ease;
    }
    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
    display: flex;
    background: #fff;
    .creation-nav {
        width: 92px;
        background: #f6f4fc;
        min-height: 100%;
        text-align: center;
        color: #abdcff;
        font-size: 14px;
        position: fixed;
        z-index:9;
        .creation-nav-div {
            padding-top: 45px;
            position: relative;
            .iconfont {
                padding-bottom: 2px;
                display: block;
                font-size: 30px !important;
            }
        }
        .creation-nav-div:hover {
            color: #30a6ff;
            cursor: pointer;
        }
        .iconfont-active {
            color: #30a6ff;
        }
        // // 侧边三角形
        .triangle::after {
            content: "";
            top: 55px;
            /* left: 73px; */
            right: 0;
            width: 0;
            height: 0;
            border-width: 18px 18px 18px 0;
            border-style: solid;
            border-color: transparent #fff transparent transparent;
            position: absolute;
            z-index: 3;
        }
    }
    .creation-body {
        width: 100%;
        background: #fafafa;
    }
}
</style>