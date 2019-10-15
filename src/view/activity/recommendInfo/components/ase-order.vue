<!--
 * @Author: zlz5v5
 * @LastEditors: zlz
 * @Date: 2019-09-23 10:57:08
 * @LastEditTime: 2019-09-28 17:53:07
 -->
<template>
    <div class="app-content" v-loading="loading">
        <!-- header-begin-->
        <div class="header">
            <div class="header-item header-item-f20">
                <span>全部返现</span>
                <p>¥{{ tableData.total_money }}</p>
            </div>
            <div class="header-item header-item-border">
                <span>直接客户</span>
                <p style="color: #c6c6c6;">{{ upper.upper_num }}（¥ {{ upper.upper_money }}）</p>
            </div>
            <div class="header-item">
                <span>间接客户</span>
                <p style="color: #c6c6c6;">{{ top.top_num }}（¥{{ top.top_money }}）</p>
            </div>
        </div>
        <!-- header-end-->

        <!-- main-begin-->
        <el-table
            class="main"
            :data="tableData.list"
            style="width: 100%"
            :header-cell-style="{ background:'rgba(242, 242, 242, 1)', color:'#333', fontWeight: '400' }"
        >
            <el-table-column label="成交项目" width="150" align="center">
                <template slot-scope="scope">
                    <span class="main-item-meal ellipsis">{{ scope.row.ticket_name }}</span>
                </template>
            </el-table-column>

            <el-table-column width="200">
                <template slot="header">
                    <el-select
                        class="assemble-header-select"
                        v-model="relation"
                        size="mini"
                        style="display: flex; width: 150px;"
                        @change="getCluesterlist"
                    >
                        <el-option :key="0" label="全部下级" :value="0"></el-option>
                        <el-option :key="1" label="直接客户" :value="1"></el-option>
                        <el-option :key="2" label="间接客户" :value="2"></el-option>
                    </el-select>
                </template>
                <template slot-scope="scope">
                    <div class="main-item-grade">
                        <div class="main-item-grade-image">
                            <img :src="scope.row.head_img" alt />
                        </div>
                        <div class="main-item-grade-text ellipsis">
                            <p class="main-item-grade-top ellipsis">{{ scope.row.realname }}</p>
                            <p class="main-item-grade-bottom">{{ scope.row.relation }}</p>
                        </div>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="用户信息" align="center" width="200">
                <template slot-scope="scope">
                    <div>{{ scope.row.nickname }}/{{ scope.row.mobile }}</div>
                </template>
            </el-table-column>

            <el-table-column label="返现奖励" align="center" width="150">
                <template slot-scope="scope">
                    <div class="main-item-reward" style="font-weight: bold;">¥{{ scope.row.price }}</div>
                </template>
            </el-table-column>

            <el-table-column width="150" align="center">
                <template slot="header">
                    <el-select
                        class="assemble-header-select"
                        v-model="status"
                        size="mini"
                        style="display: flex; width: 150px;"
                        @change="getCluesterlist"
                    >
                        <el-option :key="0" label="全部" :value="0"></el-option>
                        <el-option :key="1" label="发放成功" :value="1"></el-option>
                        <el-option :key="2" label="发放失败" :value="2"></el-option>
                    </el-select>
                </template>
                <template slot-scope="scope">
                    <div class="main-item-completed" v-if="scope.row.flag.status==1">
                        <i class="iconfont iconhongbao3" style="color: #F68080" v-if="scope.row.flag.type==1"></i>
                        <i class="iconfont iconweixinzhifu" style="color: #6BE100" v-if="scope.row.flag.type==2"></i>
                        成功
                    </div>
                    <div class="main-item-completed" v-else>
                        <i class="iconfont iconweixinzhifu" style="color: #eee"></i>
                        失败
                    </div>
                    <!-- <el-tooltip
                        class="item"
                        effect="light"
                        :content=""
                        placement="top"
                        v-else
                    >
                        <div class="main-item-completed">
                            <i class="iconfont iconweixinzhifu" style="color: #eee"></i>
                            失败
                        </div>
                    </el-tooltip> -->
                </template>
            </el-table-column>

            <el-table-column label="商户订单号" width="200" align="center">
                <template slot-scope="scope">
                    <p>{{ scope.row.order_code }}</p>
                </template>
            </el-table-column>
            <!-- width='150' -->
            <el-table-column label="发放时间" align="center">
                <template slot-scope="scope">
                    <div>{{ scope.row.push_time }}</div>
                </template>
            </el-table-column>

            <!-- <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <div style="color: #3a8ee6; cursor: pointer;">补发</div>
                </template>
            </el-table-column> -->
        </el-table>
        <!-- main-end-->

        <!-- 分页-begin-->
        <el-pagination
            style="margin-top: 20px; margin-bottom: 20px;text-align: center;"
            @current-change="getListAllInfo"
            layout="total, prev, pager, next, jumper"
            :total="tableData.total"
        ></el-pagination>
        <!-- 分页-end-->
    </div>
</template>

<script>
// 获取api
import { getCluesterRecommendInfo } from "@/api/api";
export default {
    data() {
        return {
            loading: true,
            top: '', // 直接客户
            upper: '', // 简直客户
            relation: 0, // 下级
            status: 0, // 状态
            tableData: [], // 拼团数据
            tabIndex: 1, // 分页
            active_id: this.$route.query.active_id, // 活动id
            user_id: this.$route.query.user_id, // 用户id
        };
    },
    methods: {
        // 分页处理
        getListAllInfo(index) {
            this.loading = true
            this.tabIndex = index;
            this.getCluesterlist();
        },
        // 获取拼团数据
        getCluesterlist() {
            let params = {
                token: localStorage.getItem("token"),
                shop_id: localStorage.getItem("shop_id"),
                cluster_id: this.active_id,
                page: this.tabIndex,
                user_id: this.user_id,
                relation: this.relation,
                status: this.status  
            };
            this.$http.get(getCluesterRecommendInfo, { params }).then(res => {
                if (res.data.status === 0) {
                    this.tableData = res.data.data
                    this.top = res.data.data.top
                    this.upper = res.data.data.upper
                    this.loading = false
                }
            });
        }
    },
    created() {
        this.active_id = this.$route.query.active_id || 1056;
        this.getCluesterlist();
    }
};
</script>

<style lang="scss" scoped>
// header-begin
.header {
    display: flex;
    align-items: center;
    text-align: center;
    border: 1px solid #eee;
    height: 120px;
    border-radius: 3px;
    .header-item {
        flex: 1;
        p {
            margin-top: 15px;
            font-size: 24px;
        }
    }
    .header-item-border {
        border-left: 1px solid #eee;
        border-right: 1px solid #eee;
    }
    .header-item-f20 {
        p {
            color: #ff2f07;
        }
    }
}
// header-end

// main-begin
.main {
    margin-top: 5px;
    .main-item-meal {
        color: #fff;
        background-color: rgba(159, 203, 255, 1);
        font-size: 12px;
        border-radius: 5px;
        padding: 5px 10px;
    }
    .main-item-grade {
        display: flex;
        align-items: center;
        .main-item-grade-image {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            overflow: hidden;
            background-color: #eee;
            margin-right: 5px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .main-item-grade-text {
            width: calc(100% - 50px);
            .main-item-grade-bottom {
                display: inline-block;
                background-color: rgba(195, 195, 195, 1);
                color: #fff;
                font-size: 12px;
                padding: 0px 10px;
                border-radius: 3px;
            }
        }
        .main-item-reward {
            font-size: 14px;
            color: #333;
            font-weight: bold;
        }
    }
}

</style>
