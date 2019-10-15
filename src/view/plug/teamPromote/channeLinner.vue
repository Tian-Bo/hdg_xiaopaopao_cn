<!--
 * @Author: tianbo
 * @LastEditors: tianbo
 * @Date: 2019-09-25 19:00:58
 * @LastEditTime: 2019-10-08 18:32:15
 -->
<template>
    <div class="registration">
        <div class="between-center reg-header">
            <el-button type="primary" icon="el-icon-arrow-left" @click="jumpClose">返回</el-button>
        </div>

        <div class="header" v-if="model_id != ''">
            <div class="header-active">
                <div class="header-active-img">
                    <img :src="active_info.active_img" />
                </div>
                <div class="header-active-msg">
                    <div>{{ active_info.active_title }}</div>
                    <p>{{ active_info.start_time }}</p>
                    <p>{{ active_info.end_time }}</p>
                    <span
                        :class="{ 'bg-color-f68080': active_info.mark=='组队拼团' }"
                    >{{ active_info.mark }}</span>
                </div>
            </div>

            <div class="channel-item between-center">
                <div class="item-userInfo between-center">
                    <img class="item-head" :src="channe_info.channel_logo" alt />
                    <div class="flex_1 m-l-20">
                        <div class="only_line">{{ channe_info.channel_name }}</div>
                        <div class="user-tag around-center">{{ channe_info.channel_type }}</div>
                    </div>
                    <div class="price">
                        <div class="price-main">
                            ¥
                            <span class="price-num">{{ channe_info.performance }}</span>
                        </div>
                        <div>总业绩</div>
                    </div>
                </div>
                <div class="generalize-info flex_1 between-center">
                    <div class="generalize-item">
                        <div class="font20">{{ channe_info.promote_order }}</div>
                        <div class="m-t-10">总推广订单</div>
                    </div>
                    <div class="generalize-item">
                        <div class="font20">{{ channe_info.direct_promote }}</div>
                        <div class="m-t-10">直接推广（人）</div>
                    </div>
                    <div class="generalize-item">
                        <div class="font20">{{ channe_info.indirect_promote }}</div>
                        <div class="m-t-10">间接推广（人）</div>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <!-- 导航 -->
            <div class="reg-nav">
                <el-tabs v-model="activeName" @tab-click="tabClick">
                    <el-tab-pane label="全部订单" name="0"></el-tab-pane>
                    <el-tab-pane label="直属下级" name="1"></el-tab-pane>
                    <el-tab-pane label="间接下级" name="2"></el-tab-pane>
                </el-tabs>
                <div class="reg-nav-screen" @click="show=!show" v-show="activeName == 0">
                    筛选&导出
                    <i class="iconfont iconxia" v-show="!show"></i>
                    <i class="iconfont iconshang" v-show="show"></i>
                </div>
            </div>

            <!-- 列表 -->
            <div class="reg-list">
                <chaWhole
                    ref="chaWhole"
                    :show="show"
                    @getActiveData="getActiveData"
                    v-show="activeName == 0"
                />
                <chaDirect ref="chaDirect" v-show="activeName == 1" />
                <chaIndirect ref="chaIndirect" v-show="activeName == 2" />
            </div>
        </div>
    </div>
</template>

<script>
// 全部订单
import chaWhole from "./components/cha-whole";
// 直属下级
import chaDirect from "./components/cha-direct";
// 间接下级
import chaIndirect from "./components/cha-indirect";

export default {
    components: {
        chaWhole,
        chaDirect,
        chaIndirect
    },
    data() {
        return {
            activeName: this.$route.query.tab || 0, // tab分页
            show: false,
            model_id: this.$route.query.model_id || "",
            active_id: this.$route.query.active_id || "",
            active_info: [], // 活动详情
            channe_info: [] // 渠道详情
        };
    },
    methods: {
        // 获取活动数据
        getActiveData(data) {
            this.active_info = data.active_info;
            this.channe_info = data.channel_info;
        },
        // 切换标签页
        tabClick() {
            if (this.activeName == 0) {
                this.$refs.chaWhole.getListAllInfo();
            }
            if (this.activeName == 1) {
                this.$refs.chaDirect.getDatalist();
            }
            if (this.activeName == 2) {
                this.$refs.chaIndirect.getDatalist();
            }
        },
        // 返回渠道列表
        jumpClose() {
            this.$router.push({
                path: "/teamPromote",
                query: {
                    model_id: this.model_id,
                    active_id: this.active_id
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped >
// 头部
.registration {
    padding: 40px;
    .reg-header {
        margin-bottom: 30px;
    }
}

.reg-nav {
    display: flex;
    justify-content: space-between;
    .reg-nav-screen {
        margin-top: 10px;
        cursor: pointer;
        height: 32px;
        width: 120px;
        line-height: 32px;
        text-align: center;
        color: #fff;
        border-radius: 2px;
        background-color: #409eff;
    }
}

.header {
    display: flex;
    justify-content: space-between;
    border: 1px solid #eee;
    margin-bottom: 20px;
}

.header-active {
    display: flex;
    align-items: center;
    .header-active-img {
        margin-right: 15px;
        width: 86px;
        height: 120px;
        overflow: hidden;
        border-radius: 3px;
        background-color: #f5f5f5;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .header-active-msg {
        div {
            line-height: 200%;
        }
        p {
            line-height: 200%;
            font-size: 13px;
            color: #a1a1a1;
        }
        span {
            background-color: #409eff;
            line-height: 150%;
            font-size: 12px;
            padding: 0 10px;
            font-size: 12px;
            margin-top: 15px;
            display: inline-block;
            border-radius: 5px;
            color: #fff;
        }
    }
}

.channel-item {
    height: 120px;
    .item-userInfo {
        width: 380px;
        background-color: #ecf5ff;
        height: 100%;
        padding-left: 20px;
        padding-right: 20px;
        .item-head {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin-right: 20px;
        }
        .user-tag {
            width: 50px;
            height: 20px;
            color: #409eff;
            border: 1px solid #409eff;
            border-radius: 3px;
            font-size: 12px;
            margin-top: 5px;
        }
        .price {
            text-align: center;
            .price-num {
                font-size: 32px;
                font-weight: 700;
                margin-left: 5px;
            }
            .price-main {
                font-size: 16px;
            }
        }
    }
    .generalize-info {
        text-align: left !important;
        padding-left: 40px;
        .generalize-item {
            padding: 0 25px;
            text-align: center;
            display: inline-block;
        }
        .generalize-item:not(first-child) {
            border-right: 1px dashed #eee;
        }
    }
}

//  flex布局
.column-between {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -webkit-flex-direction: column;
    justify-content: space-between;
    -webkit-justify-content: space-between;
}

.column-around {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -webkit-flex-direction: column;
    justify-content: space-around;
    -webkit-justify-content: space-around;
}

.between {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    -webkit-justify-content: space-between;
}

.column-center-b {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -webkit-flex-direction: column;
    justify-content: space-between;
    -webkit-justify-content: space-between;
    align-items: center;
    -webkit-align-items: center;
}

.column-center-c {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -webkit-flex-direction: column;
    justify-content: space-around;
    -webkit-justify-content: space-around;
    align-items: center;
    -webkit-align-items: center;
}

.around-center {
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    align-items: center;
    -webkit-justify-content: space-around;
    -webkit-align-items: center;
}

.left-center {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
}

.between-center {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    -webkit-justify-content: space-between;
    align-items: center;
    -webkit-align-items: center;
}

.center {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
}

.center-end {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    justify-content: flex-end;
    -webkit-justify-content: flex-end;
}

.flex_1 {
    flex: 1;
    -webkit-flex: 1;
    display: block;
    min-width: 0;
}

.only_line {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
</style>
