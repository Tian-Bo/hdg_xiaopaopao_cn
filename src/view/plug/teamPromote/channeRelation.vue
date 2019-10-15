<!--
 * @Author: zlz5v5
 * @LastEditors: zlz
 * @Date: 2019-09-25 10:02:00
 * @LastEditTime: 2019-09-28 17:42:51
 -->
<template>
    <div class="registration">
        <!-- 头部 -->
        <div class="reg-header">
            <div class="reg-header-left">
                <span class="reg-header-btn" @click="jumpClose">
                    <i class="el-icon-arrow-left"></i>
                    &nbsp;&nbsp; 返回
                </span>
            </div>
        </div>
        <div style="background:#fff;">
            <!-- 导航 -->
            <div class="reg-nav">
                <el-tabs v-model="activeName" style="padding-left: 10px; display: inline-block;">
                    <el-tab-pane label="推荐数据详情" name="0"></el-tab-pane>
                </el-tabs>
            </div>
            <!-- 列表 -->
            <div class="reg-list">
                <chaRelationList v-show="activeName == 0" />
            </div>
        </div>
    </div>
</template>

<script>
// 订单数据
import chaRelationList from "./components/cha-relation-list";

export default {
    components: {
        chaRelationList
    },
    data() {
        return {
            active_id: this.$route.query.active_id || '', // 活动id
            channel_id: this.$route.query.channel_id || '', // 渠道id
            model_id: this.$route.query.model_id || '', // 模型id
            tab: this.$route.query.tab || '', // 用户id
            activeName: "0", // 标签页
            tab: this.$route.query.tab || 0
        };
    },
    methods: {
        jumpClose() {
            this.$router.push({
                path: "/channeLinner",
                query: {
                    channel_id: this.channel_id,
                    active_id: this.active_id,
                    model_id: this.model_id,
                    tab: this.tab
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
