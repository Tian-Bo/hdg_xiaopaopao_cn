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
                <el-tabs
                    v-model="activeName"
                    style="padding-left: 10px; display: inline-block;"
                >
                    <el-tab-pane label="推荐数据详情" name="0"></el-tab-pane>
                </el-tabs>
                <!-- <div class="reg-nav-screen" v-show="activeName == 0" @click="aseOrderBtnState=!aseOrderBtnState">
                    筛选&导出
                    <i class="iconfont iconxia" v-show="!aseOrderBtnState"></i>
                    <i class="iconfont iconshang" v-show="aseOrderBtnState"></i>
                </div> -->
            </div>
            <!-- 列表 -->
            <div class="reg-list">
                <aseOrder
                    ref="teaOrder"
                    v-show="activeName == 0"
                    :aseOrderBtnState="aseOrderBtnState"
                    @passFaValue="showPassFaValue"
                />
            </div>
        </div>
    </div>
</template>

<script>
// 订单数据
import aseOrder from "./components/ase-order";

export default {
    components: {
        aseOrder
    },
    data() {
        return {
            aseOrderBtnState: false, // 订单数据显示隐藏筛选按钮

            activeName: "0", // 标签页
            teaOrderNumber: 0, // 订单数据
            teaAssembleNumber: 0, // 订单数据
            teaRecommendNumber: 0 // 推荐数据
        };
    },
    methods: {
        setTeaOrderShowScreen() {
            this.$refs.teaOrder.setShowScreen();
        },
        // 获取订单数据
        showPassFaValue(data) {
            this.sreanTotal = data;
        },
        jumpClose() {
            let _that = this;
            _that.$router.push({
                path: "/team_up",
                query: {
                    activeName: "2",
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
