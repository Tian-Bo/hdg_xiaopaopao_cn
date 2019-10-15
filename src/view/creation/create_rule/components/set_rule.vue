<!--
 * @Author: zlz5v5
 * @LastEditors: zlz
 * @Date: 2019-08-08 18:43:56
 * @LastEditTime: 2019-09-28 16:18:45
 -->
<template>
    <div class="create-rule">
        <div class="create-rule-title">
            组队拼团规则设置
        </div>
        <div class="list-table-box">
            <table width="100%" class="reg-list-table">
                <thead>
                    <tr class="reg-list-header">
                        <td>成团人数</td>
                        <td>拼团价格（元）</td>
                        <td>一级返现(元)</td>
                        <td>二级返现(元)</td>
                        <td>成团限时(小时)</td>
                        <td
                            style="position: relative;cursor: pointer;"
                            @mouseover="onmouIndex(1)"
                            @mouseout="onmouIndex(0)"
                        >
                            虚拟成团
                            <i class="iconfont iconwenhao"></i>
                            <div class="absolute-box" v-show="showIndex === 1">
                                开启时：成团限时结束，未满团的团将自动成团，并且每一个推荐订单的
                                <span style="color:#f20">
                                    返现红包为即时秒发
                                </span>
                                <br />
                                关闭时：成团限时结束，未满团的团将自动退款，每一个推荐订单的
                                <span style="color:#f20">
                                    返现红包为成团后发放
                                </span>
                            </div>
                        </td>
                        <td>操作</td>
                    </tr>
                </thead>
                <tbody v-for="(item, index) in role_config" :key="index">
                    <tr class="reg-list-tbody">
                        <td>
                            <input
                                type="number"
                                v-model="item.cluster_num"
                                class="list-tbody-input"
                                min="0"
                                @blur="editClusterRuleFunc(item)"
                            />
                            <i
                                class="iconfont iconbianji1"
                                style="margin-left:-30px;"
                            ></i>
                        </td>
                        <td>
                            <div
                                v-for="(o, i) in item.include_rule"
                                :key="i"
                                class="reg-list-td"
                            >
                                <div class="td-text-font">
                                    {{ o.ticket_name }}
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        v-model="o.price"
                                        class="list-tbody-input"
                                        min="0"
                                        @blur="editClusterRuleFunc(item, i)"
                                    />
                                </div>
                            </div>
                        </td>
                        <td>
                            <div
                                v-for="(o, i) in item.include_rule"
                                :key="i"
                                class="reg-list-td-2"
                            >
                                <input
                                    type="number"
                                    v-model="o.one_money"
                                    class="list-tbody-input"
                                    min="0"
                                    @blur="editClusterRuleFunc(item, i)"
                                />
                            </div>
                        </td>
                        <td>
                            <div
                                v-for="(o, i) in item.include_rule"
                                :key="i"
                                class="reg-list-td-2"
                            >
                                <input
                                    type="number"
                                    v-model="o.two_money"
                                    class="list-tbody-input"
                                    min="0"
                                    @blur="editClusterRuleFunc(item, i)"
                                />
                            </div>
                        </td>
                        <td>
                            <input
                                type="number"
                                v-model="item.limit_time"
                                class="list-tbody-input"
                                min="0"
                                @blur="editClusterRuleFunc(item)"
                            />
                        </td>
                        <td>
                            <el-switch
                                v-model="item.is_virtual"
                                size="mini"
                                :active-value="1"
                                :inactive-value="0"
                                @change="editClusterRuleFunc(item)"
                            >
                            </el-switch>
                        </td>
                        <td>
                            <el-button
                                type="text"
                                @click="deteleActiveTicketFunc(index)"
                            >
                                <span v-show="isDeleteBtn">删除</span>
                                <span v-show="isDeleteBtn === false">
                                    <i class="el-icon-loading"></i>
                                </span>
                            </el-button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="create-price-btn">
                <span @click="addClusterRoleFUnc()">添加价格设置</span>
            </div>
        </div>
    </div>
</template>

<script>
import { addClusterRole, deteleActiveTicket, editClusterRule } from "@/api/api";
import { setInterval } from "timers";
export default {
    props: ["role_config", "voucher_config"],
    data() {
        return {
            shop_id: localStorage.getItem("shop_id"),
            token: localStorage.getItem("token"),
            // 拼团id
            cluster_id: localStorage.getItem("clusterId"),
            // 删除按钮的状态
            isDeleteBtn: true,
            // 虚拟拼团的弹框状态
            showIndex: 0
        };
    },
    methods: {
        // 添加拼团规则设置
        addClusterRoleFUnc() {
            let _that = this;
            let dataParams = {
                token: _that.token,
                cluster_id: _that.cluster_id
            };
            _that.$http
                .post(addClusterRole, _that.$qs.stringify(dataParams))
                .then(res => {
                    if (res.data.status === 0) {
                        this.$message({
                            message: "添加成功",
                            type: "success"
                        });
                        res.data.data.index = _that.role_config.length;
                        _that.role_config.push(res.data.data);
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        // 删除拼团规则设置
        deteleActiveTicketFunc(index) {
            let _that = this;
            let dataParams = {
                token: _that.token,
                cluster_id: _that.cluster_id,
                type: 3,
                index
            };
            _that.isDeleteBtn = false;
            _that.$http
                .post(deteleActiveTicket, _that.$qs.stringify(dataParams))
                .then(res => {
                    _that.isDeleteBtn = true;
                    if (res.data.status === 0) {
                        _that.role_config.splice(index, 1);
                        this.$message({
                            message: "删除成功",
                            type: "success"
                        });
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        // 编辑拼团规则设置
        editClusterRuleFunc(item, childIndex) {
            let _that = this;
            let role_info = JSON.stringify(item);
            // 组装数据
            let dataParams = {
                token: _that.token,
                cluster_id: _that.cluster_id,
                type: 2,
                role_info
            };
            // 判断修改的价格是否符合拼团逻辑
            if (childIndex !== undefined) {
                let childIndexRule = item.include_rule[childIndex];
                // 判断拼团价格不能大于原价
                if (
                    parseInt(childIndexRule.price) >
                    parseInt(_that.voucher_config[childIndex].price)
                ) {
                    this.$alert(
                        "数据错误,拼团价格不能大于原价,将重新刷新",
                        "温馨提示",
                        {
                            confirmButtonText: "确定",
                            callback: action => {
                                location.reload();
                            }
                        }
                    );
                    return;
                }
                // 处理的二级红包成number
                let is_one_money =
                    parseInt(childIndexRule.one_money * 100) / 100;
                // 处理的一级红包number
                let is_two_money =
                    parseInt(childIndexRule.two_money * 100) / 100;
                if (is_two_money < 1 && is_two_money !== 0) {
                    this.$alert(
                        "数据错误,返现红包不能小于1元,将重新刷新",
                        "温馨提示",
                        {
                            confirmButtonText: "确定",
                            callback: action => {
                                location.reload();
                            }
                        }
                    );
                    return;
                }
                if (is_one_money < 1 && is_one_money !== 0) {
                    this.$alert(
                        "数据错误,返现红包不能小于1元,将重新刷新",
                        "温馨提示",
                        {
                            confirmButtonText: "确定",
                            callback: action => {
                                location.reload();
                            }
                        }
                    );
                    return;
                }
                // 判断返现红包之和不能大于总价格
                if (
                    is_one_money + is_two_money >
                    item.include_rule[childIndex].price
                ) {
                    this.$alert(
                        "数据错误,返现红包不能大于总价格,将重新刷新",
                        "温馨提示",
                        {
                            confirmButtonText: "确定",
                            callback: action => {
                                location.reload();
                            }
                        }
                    );
                    return;
                }
                // 二级红包不能大于以及红包
                if (is_two_money > is_one_money) {
                    this.$alert(
                        "数据错误,二级红包不能大于以及红包,将重新刷新",
                        "温馨提示",
                        {
                            confirmButtonText: "确定",
                            callback: action => {
                                location.reload();
                            }
                        }
                    );
                    return;
                }
            }

            _that.$http
                .post(editClusterRule, _that.$qs.stringify(dataParams))
                .then(res => {
                    if (res.data.status === 0) {
                        this.$message({
                            message: "更新成功",
                            type: "success"
                        });
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        // 触碰触发样式
        onmouIndex(index) {
            let _that = this;
            _that.showIndex = index;
        }
    }
};
</script>
<style lang="scss" scoped>
// 表格
.create-rule {
    background: #fff;
    padding: 10px 20px 40px;
    margin: 60px 30px 20px 71px;
    .create-rule-title {
        border-left: 2px #409eff solid;
        padding-left: 20px;
        margin: 30px 0;
    }
    .list-table-box {
        padding: 0 30px;
        text-align: left;
    }
    .reg-list-table {
        min-height: 25px;
        line-height: 25px;
        text-align: center;
        border-collapse: collapse;
        font-size: 14px;
        padding: 0 30px;
        .reg-list-header {
            background: #f2f2f2;
            td {
                padding: 10px 0;
            }
            .absolute-box {
                position: absolute;
                top: -142px;
                left: -73px;
                border: 1px #ccc solid;
                width: 312px;
                height: 142px;
                text-align: left;
                padding: 9px;
                border-radius: 5px;
                background: #fdf6ec;
                border: 1px #ffefc1 solid;
                font-size: 14px;
            }
            .absolute-box:before,
            .absolute-box:after {
                content: "";
                left: 167px;
                width: 0;
                height: 0;
                border-width: 15px;
                border-style: solid;
                position: absolute;
                z-index: 3;
            }
            .absolute-box:after {
                bottom: -28px;
                border-color: #fdf6ec transparent transparent transparent;
            }
            .absolute-box:before {
                bottom: -30px;
                border-color: #ffefc1 transparent transparent transparent;
            }
        }
        .reg-list-tbody {
            td {
                padding: 20px 0;
                border-bottom: 1px #eee solid;
            }
            .reg-list-td {
                display: flex;
                justify-content: space-around;
                padding-bottom: 8px;
                .td-text-font {
                    width: 150px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
            .reg-list-td-2 {
                padding-bottom: 8px;
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
            .reg-table-btn {
                display: flex;
                justify-content: center;
            }
            .list-tbody-input {
                height: 25px;
                line-height: 25px;
                width: 100px;
                text-align: center;
                border-radius: 4px;
                cursor: pointer;
            }
            .list-tbody-input:hover,
            .list-tbody-input:focus {
                border: 1px #40b8ff solid;
            }
        }

        .reg-list-bottom {
            text-align: left;
            display: flex;
            flex-wrap: wrap;
            padding: 20px 0 10px;
            background: #fafcff;
            position: relative;
            .reg-list-bottom-1 {
                position: absolute;
                width: 0;
                height: 0;
                top: -31px;
                right: 11%;
                border: 15px solid;
                border-color: transparent transparent #ccc transparent;
            }
            .reg-list-bottom-1::after {
                content: "";
                position: absolute;
                bottom: -16.5px;
                right: -15px;
                border: 15px solid;
                border-color: transparent transparent #fafcff transparent;
            }
        }
    }
    .create-price-btn {
        text-align: center;
        margin: 30px 20px 0;
        padding: 5px 0;
        span {
            display: inline-block;
            padding: 5px 200px;
            border: 1px #eee solid;
            cursor: pointer;
            color: #909090;
            border-radius: 4px;
        }
        span:hover {
            color: #409eff;
            border-color: #409eff;
        }
        span:active {
            background: #409eff;
            color: #fff;
            border-color: #fff;
        }
    }
}
</style>

