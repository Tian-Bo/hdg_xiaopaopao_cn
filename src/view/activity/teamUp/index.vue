<!--
 * @Author: zlz5v5
 * @LastEditors: tianbo
 * @Date: 2019-09-25 10:02:00
 * @LastEditTime: 2019-10-08 14:59:02
 -->
<template>
    <div class="registration">
        <!-- 头部 -->
        <div class="reg-header">
            <div class="reg-header-left">
                <router-link tag="span" class="reg-header-btn" to="activity">
                    <i class="el-icon-arrow-left"></i>
                    &nbsp;&nbsp; 返回活动列表
                </router-link>
            </div>
        </div>

        <div style="background:#fff;">
            <!-- 导航 -->
            <div class="reg-nav">
                <el-tabs
                    v-model="activeName"
                    @tab-click="choosePage()"
                    style="padding-left: 10px; display: inline-block;"
                >
                    <el-tab-pane label="订单数据" name="0"></el-tab-pane>
                    <el-tab-pane label="拼团数据" name="1"></el-tab-pane>
                    <el-tab-pane label="推荐数据" name="2"></el-tab-pane>
                </el-tabs>
                <div
                    class="reg-nav-screen"
                    v-show="activeName == 0"
                    @click="teaOrderBtnState = !teaOrderBtnState"
                >
                    筛选&导出
                    <i class="iconfont iconxia" v-show="!teaOrderBtnState"></i>
                    <i class="iconfont iconshang" v-show="teaOrderBtnState"></i>
                </div>
            </div>

            <!-- 列表 -->
            <div class="reg-list">
                <teaOrder
                    ref="teaOrder"
                    v-show="$route.query.activeName == 0"
                    :teaOrderBtnState="teaOrderBtnState"
                />
                <teaAssemble v-show="$route.query.activeName == 1" />
                <teaRecommend v-show="$route.query.activeName == 2" />
            </div>
        </div>
    </div>
</template>

<script>
// 订单数据
import teaOrder from "./components/tea-order";
// 平团数据
import teaAssemble from "./components/tea-assemble";
// 推荐数据
import teaRecommend from "./components/tea-recommend";

export default {
    components: {
        teaOrder,
        teaAssemble,
        teaRecommend
    },
    data() {
        return {
            teaOrderBtnState: false, // 订单数据显示隐藏筛选按钮
            activeName: this.$route.query.activeName, // 标签页
            teaOrderNumber: 0, // 订单数据
            teaAssembleNumber: 0, // 订单数据
            teaRecommendNumber: 0 // 推荐数据
        };
    },
    methods: {
        choosePage() {
            // 跳转路由
            let _that = this;
            _that.$router.push({
                path: "/team_up",
                query: {
                    activeName: _that.activeName,
                    active_id: _that.$route.query.active_id
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped >
// 头部
.registration {
    background: #f9f9f9;
    .reg-header {
        display: flex;
        justify-content: space-between;
        height: 60px;
        line-height: 60px;
        font-size: 14px;
        padding: 0 2%;
        .reg-header-btn {
            height: 30px;
            line-height: 15px;
            background: #409eff;
            color: #fff;
            padding: 8px 18px 8px 12px;
            border-radius: 2px;
            cursor: pointer;
        }
        .reg-header-right {
            display: flex;
            align-items: center;
            .el-button {
                width: 100px;
                height: 40px;
                padding: 0 10px;
                line-height: 15px;
                margin-right: -5px;
            }
        }
    }
    // 导航:
    .reg-nav {
        display: flex;
        justify-content: space-between;
        padding-left: 15px;
        .reg-nav-screen {
            margin-right: 25px;
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

    //
    .reg-list {
        margin: 0 2%;
    }
}
</style>
