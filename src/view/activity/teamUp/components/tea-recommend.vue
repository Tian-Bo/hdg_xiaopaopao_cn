<!--
 * @Author: tianbo
 * @LastEditors: tianbo
 * @Date: 2019-10-09 13:42:36
 * @LastEditTime: 2019-10-09 13:42:36
 -->
<template>
    <div>
        <!-- header begin-->
        <div class="header" v-loading="loading">
            <div class="header-item">
                <span>总返现（元）</span>
                <p>{{ dataList.total_return_moeny }}</p>
            </div>
            <div class="header-item header-item-border">
                <span>已支出（元）</span>
                <p>{{ dataList.success_disbursement }}</p>
            </div>
            <div class="header-item header-item-f20">
                <span>未支出（元）</span>
                <p>{{ dataList.fail_disbursement }}</p>
            </div>
        </div>
        <!-- header end-->

        <!-- main begin-->
        <div class="main">
            <table width="100%" class="reg-list-table">
                <thead>
                    <tr class="reg-list-header">
                        <td>排名</td>
                        <td>用户</td>
                        <td>姓名/手机号</td>
                        <td>成功推荐</td>
                        <td>总收益</td>
                        <td>一级</td>
                        <td>二级</td>
                        <td>操作</td>
                        <td style="color: #409eff">一键通知</td>
                    </tr>
                </thead>
                <tbody v-for="(item, index) in dataList.list" :key="index">
                    <tr class="reg-list-tbody">
                        <td>{{ index + 1 }}</td>
                        <td>
                            <div class="reg-image-box">
                                <div>
                                    <img :src="item.head_img || '../../../../assets/bgUser.jpg'" />
                                </div>
                                <div class="reg-image-name">
                                    <span>{{ item.nickname }}</span>
                                </div>
                            </div>
                        </td>
                        <td>{{ item.realname }}/{{ item.mobile }}</td>
                        <td>{{ item.recommand_num }}</td>
                        <td>{{ item.total_money }}</td>
                        <td>¥{{ item.one_money.one_money }}<span style="color: #c6c6c6;">（{{ item.one_money.desc }}）</span></td>
                        <td>¥{{ item.two_money.two_money }}<span style="color: #c6c6c6;">（{{ item.two_money.desc }}）</span></td>
                        <td>
                            <router-link tag="a" :to="'/recommend_info?active_id=' + cluster_id + '&user_id=' + item.id" style="color: #409eff">详情</router-link>
                        </td>
                        <td style="color: #409eff">发送通知</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- main end-->
        <!-- 分页 -->
        <el-pagination
            style="margin-top: 20px; margin-bottom: 20px;text-align: center;"
            @current-change="getListAllInfo"
            layout="total, prev, pager, next, jumper"
            :total="dataList.total"
        ></el-pagination>
    </div>
</template>

<script>
// 获取api
import { getCluesterRecommendList } from "@/api/api";
export default {
    data() {
        return {
            loading: true,
            page: 1, // 分页
            dataList: [], // 数据列表
            cluster_id: this.$route.query.active_id // 活动id
        };
    },
    created() {
        this.getDatalist();
    },
    methods: {
        // 获取推荐数据
        getDatalist() {
            let params = {
                token: localStorage.getItem("token"),
                shop_id: localStorage.getItem("shop_id"),
                cluster_id: this.cluster_id,
                page: this.page,
            };
            this.$http.get(getCluesterRecommendList, { params }).then(res => {
                if (res.data.status === 0) {
                    this.loading = false
                    this.dataList = res.data.data;
                }
            });
        },
        // 分页
        getListAllInfo(index) {
            this.this.loading = true
            this.page = index
            this.getDatalist()
        }
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
    margin-top: 10px;
}
// 表格
.reg-list-table {
    min-height: 25px;
    line-height: 25px;
    text-align: center;
    border-collapse: collapse;
    font-size: 14px;
    .reg-list-header {
        background: #f2f2f2;
        td {
            padding: 10px 0;
        }
    }
    .reg-list-tbody {
        td {
            padding: 10px 0;
            border-bottom: 1px #ccc solid;
        }
        .reg-image-box {
            display: flex;
            justify-content: space-around;
            img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }
            .reg-image-name {
                line-height: 50px;
                margin-left: 20px;
            }
        }
        .reg-list-tbody {
            transition: all 1s;
            td {
                padding: 10px 0;
                border-bottom: 0.5px #ccc #ebeef5;
            }
            .reg-image-box {
                display: flex;
                justify-content: center;
                img {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                }
                .reg-image-name {
                    line-height: 50px;
                    margin-left: 20px;
                }
            }
            .reg-table-btn {
                margin-left: 20px;
                display: inline-block;
                padding: 0 5px;
                cursor: pointer;
                background: #409eff;
                color: #fff;
                border-radius: 4px;
            }
        }
    }
    .reg-list-tbody:hover {
        transition: all 1s;
        background-color: #f5f7fa;
    }
    // 详情
    .reg-list-details {
        display: flex;
        margin: 20px 0% 0;
        .list-details-box {
            padding: 20px 1%;
            display: flex;
            background: #fafcff;
            border-bottom: 1px #ccc solid;
            .list-details-left {
                width: 150px;
                line-height: 150px;
                font-weight: bold;
            }
            // 核销完的标题样式
            .voucher-end {
                background: #fff !important;
                color: #ccc !important;
                border: 1px #ccc solid !important;
            }
            .list-details-right {
                line-height: 30px;
                text-align: left;

                .details-btn-box {
                    position: relative;
                    margin-bottom: 10px;

                    .alert-voucher-info {
                        color: #333;
                        position: absolute;
                        top: -40px;
                        right: -450px;
                        z-index: 5;
                        height: 200px;
                        background: #fff;
                        width: 420px;
                        padding: 2px 5px;
                        box-shadow: 2px 2px 5px rgba(84, 74, 74, 0.22);
                        .alert-voucher-close {
                            text-align: right;
                            padding-right: 0px;
                            color: #ccc;
                            span {
                                font-size: 20px;
                                padding: 2px 7px 3px;
                                border-radius: 50%;
                                cursor: pointer;
                            }
                        }
                        .voucher-info-box {
                            min-width: 400px;
                            max-height: 150px;
                            overflow-x: hidden;
                            overflow-y: auto;
                            td {
                                padding: 0 10px;
                            }
                        }
                    }
                    .details-right-btn {
                        height: 30px;
                        padding: 5px 15px;
                        border-radius: 2px;
                        margin-right: 20px;
                        color: #66b1ff;
                        border: 1px #66b1ff solid;
                        background: #ecf5ff;
                    }
                    .see-voucher {
                        color: #66b1ff;
                        cursor: pointer;
                        padding-left: 20px;
                    }
                }
            }
        }
    }
}
// main-end
</style>