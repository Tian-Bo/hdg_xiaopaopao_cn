<!--
 * @Author: zlz5v5
 * @LastEditors: zlz
 * @Date: 2019-08-20 13:56:45
 * @LastEditTime: 2019-09-25 17:44:43
 -->
<template>
    <div class="create-coupon">
        <div class="add-coupon" @click="JumpAddTicket()">
            <i class="iconfont icontianjia"></i><span>添加票券</span>
        </div>
        <el-table
            :data="activeVoucher.voucher"
            class="coupon-table"
            :header-cell-style="headerCellStyle"
            v-loading="loading"
        >
            <el-table-column fixed prop="date" label="名称" align="center">
                <template slot-scope="scope">
                    <!--slot-scope="scope" {{scope.row}} -->
                    <div class="coupon-style">
                        <div class="top-o"></div>
                        <div class="top-o-1"></div>
                        <div class="coupon-style-title font-words">
                            {{ scope.row.title }}
                        </div>
                        <div class="coupon-style-vouter font-words">
                            使用场所:
                            <span
                                v-for="(item, index) in scope.row.store_id"
                                :key="index"
                                >{{ item }};</span
                            >
                        </div>
                        <div class="coupon-style-time font-words">
                            有效期至:{{ scope.row.end_time }}
                        </div>
                        <div class="bottom-o"></div>
                        <div class="bottom-o-1"></div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="number" label="核销次数" align="center">
            </el-table-column>
            <el-table-column prop="price" label="价值(元)" align="center">
            </el-table-column>
            <el-table-column prop="store_id" label="核销场所" align="center">
                <template slot-scope="scope">
                    <!--slot-scope="scope" {{scope.row}} -->
                    <div>
                        <!-- {{ scope.row }} -->
                        <span
                            v-for="(item, index) in scope.row.store_id"
                            :key="index"
                        >
                            {{ item }};
                        </span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="end_time" label="有效时间" align="center">
            </el-table-column>
            <el-table-column prop="address" label="操作" align="center">
                <template slot-scope="scope">
                    <!-- slot-scope="scope"{{scope.row}} -->
                    <div class="coupon-setting">
                        <div @click="jumpEditVouterPage(scope.row.id)">
                            编辑
                        </div>
                        <div
                            @click="
                                deteleVouterAlert(scope.row.id, scope.$index)
                            "
                        >
                            删除
                        </div>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-box">
            <div>已找到 {{ activeVoucher.total }}个票券（项目卡券）</div>
            <el-pagination
                background
                layout="prev, pager, next"
                :total="activeVoucher.total"
                @size-change="handleSizeChange"
                @current-change="handleSizeChange"
                :current-page.sync="currentPage"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
// 获取api
import { getActiveVoucher, deleteActiveVoucher } from "@/api/api";

export default {
    data() {
        return {
            // 列表的头部
            headerCellStyle: {
                background: "rgba(242, 242, 242, 1)",
                color: "#333",
                fontWeight: "400"
            },
            shop_id: localStorage.getItem("shop_id"),
            token: localStorage.getItem("token"),
            loading: true,
            activeVoucher: [],
            // 核销券页码
            currentPage: 1
        };
    },
    created() {
        this.getCardTicket(0);
    },
    methods: {
        // 获取核销券
        getCardTicket(page) {
            let _that = this;
            _that.loading = true;
            _that.addCoupon = true;

            let params = {
                shop_id: _that.shop_id,
                token: _that.token
            };
            if (page !== 0) {
                params.page = page;
                _that.currentPage = page;
            } else {
                _that.currentPage = 1;
            }
            _that.$http
                .get(getActiveVoucher, {
                    params
                })
                .then(res => {
                    _that.loading = false;
                    if (res.data.status !== 0) {
                        _that.$message.error(res.data.message);
                    } else {
                        _that.activeVoucher = res.data.data;
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        // 获取商铺核销券
        //@page查询所有的列表 大于0整数为分页
        getaddCoupon(page) {
            let _that = this;
            _that.loading = true;
            let params = {
                shop_id: _that.shop_id,
                token: _that.token
            };
            if (page !== 0) {
                params.page = page;
                _that.currentPage = page;
            } else {
                _that.currentPage = 1;
            }
            _that.$http
                .get(getActiveVoucher, {
                    params
                })
                .then(res => {
                    _that.loading = false;
                    if (res.data.status !== 0) {
                        _that.$message.error(res.data.message);
                    } else {
                        // 给_that.activeVoucher.voucher添加按钮状态
                        _that.activeVoucher = res.data.data;
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        // 当前页/下一页
        handleSizeChange(val) {
            let _that = this;
            // 分页状态
            _that.currentPage = val;
            // 通过分页请求参数
            _that.getaddCoupon(val);
        },
        // 跳转到添加票券
        JumpAddTicket() {
            let that = this;
            that.$router.push({
                path: "/card_ticket/add",
                query: { url: "card_ticket" }
            });
        },
        // 删除核销券弹窗
        deteleVouterAlert(id, index) {
            let _that = this;
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    _that.deteleVouter(id, index);
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        // 删除核销券
        deteleVouter(voucher_id, index) {
            let _that = this;
            let params = {
                shop_id: _that.shop_id,
                token: _that.token,
                voucher_id
            };
            _that.$http
                .post(deleteActiveVoucher, _that.$qs.stringify(params))
                .then(res => {
                    if (res.data.status !== 0) {
                        _that.$message.error(res.data.message);
                    } else {
                        _that.$message.success("删除成功");
                        _that.activeVoucher.voucher.splice(index, 1);
                        _that.activeVoucher.total -= 1;
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        //  跳转到编辑的核销券
        jumpEditVouterPage(id) {
            let _that = this;
            _that.$router.push({
                path: "/card_ticket/add",
                query: { vouter_id: id, url: "card_ticket" }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.create-coupon {
    background: #fff;
    padding: 20px;

    .add-coupon {
        background: #409eff;
        display: inline-block;
        width: 140px;
        height: 30px;
        text-align: center;
        color: #fff;
        line-height: 30px;
        border-radius: 5px;
        cursor: pointer;
        .iconfont {
            padding-right: 10px;
            font-size: 16px !important;
        }
    }
    .coupon-table {
        margin: 20px 0;
        width: 100%;
        .icon-span {
            background: #409eff;
            color: #fff;
            padding: 5px;
            border-radius: 4px;
        }
        .coupon-style {
            position: relative;
            text-align: left;
            width: 185px;
            height: 90px;
            line-height: 20px;
            background: #ecf5ff;
            border: 1px #409eff solid;
            color: #409eff;
            font-size: 12px;
            border-radius: 8px;
            padding-top: 15px;
            padding-left: 15px;
            margin-left: 40px;
            .coupon-style-title {
                font-size: 16px;
                font-weight: bold;
            }
            .coupon-style-time {
                font-size: 12px;
                color: #aeaeae;
            }
            .top-o,
            .bottom-o {
                width: 10px;
                height: 10px;
                background: #409eff;
                border-radius: 50%;
                position: absolute;
                left: 50px;
                border: 1px #409eff solid;
            }
            .top-o {
                top: -6px;
            }
            .bottom-o {
                bottom: -6px;
            }
            .top-o-1,
            .bottom-o-1 {
                width: 10px;
                height: 10px;
                background: #fff;
                border-radius: 50%;
                position: absolute;
                left: 50px;
                z-index: 5;
            }
            .top-o-1 {
                top: -7px;
            }
            .bottom-o-1 {
                bottom: -7px;
            }
        }
        .coupon-setting {
            display: flex;
            justify-content: center;
            div {
                padding: 0 10px;
                cursor: pointer;
                color: #409eff;
            }
        }
        // 核销券锯齿
        .coupon-style:before,
        .coupon-style:after {
            content: " ";
            width: 0;
            height: 100%;

            /* 绝对定位进行偏移 */
            position: absolute;
            top: 0;
        }
        .coupon-style:before {
            /* 圆点型的border */
            border-right: 10px dotted #409eff;
            /* 偏移一个半径，让圆点的一半覆盖div */
            right: -5px;
        }

        .coupon-style:after {
            border-left: 10px dotted #fff;
            right: -6px;
        }
        // 核销券锯齿 end
        // 文字截断
        .font-words {
            overflow: hidden; /*超过部分不显示*/
            text-overflow: ellipsis; /*超过部分用点点表示*/
            white-space: nowrap; /*不换行*/
        }
    }
    .pagination-box {
        display: flex;
        line-height: 30px;
        width: 100%;
        justify-content: center;
    }
}
</style>