<!--
 * @Author: zlz5v5
 * @LastEditors: zlz
 * @Date: 2019-08-08 18:43:56
 * @LastEditTime: 2019-09-28 14:44:04
 -->
<template>
    <div class="create-rule">
        <div class="create-rule-title">
            项目（套餐）价格设置
        </div>
        <div class="list-table-box">
            <table width="100%" class="reg-list-table">
                <thead>
                    <tr class="reg-list-header">
                        <td>规格名称</td>
                        <td>原价(元)</td>
                        <td>总数量</td>
                        <td>每人最多购买</td>
                        <td>操作</td>
                    </tr>
                </thead>
                <tbody v-for="(item, index) in voucher_config" :key="index">
                    <tr class="reg-list-tbody">
                        <td>
                            <!-- item.ticket_name -->
                            <input
                                type="text"
                                class="tbody-text-input"
                                v-model="item.ticket_name"
                                @blur="editClusterRuleFunc(item)"
                                style="width:197px"
                                @click="isFlagIndex(index, 0)"
                                :class="{
                                    'tbody-text-input-checked':
                                        flagIndex === index + '0'
                                }"
                            />
                            <i
                                class="iconfont iconbianji1"
                                style="margin-left:-20px;"
                            ></i>
                        </td>
                        <td>
                            <input
                                min="0"
                                type="number"
                                class="tbody-text-input"
                                v-model="item.price"
                                @blur="editClusterRuleFunc(item)"
                                @click="isFlagIndex(index, 1)"
                                :class="{
                                    'tbody-text-input-checked':
                                        flagIndex === index + '1'
                                }"
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                min="0"
                                class="tbody-text-input"
                                v-model="item.person_num_limit"
                                @blur="editClusterRuleFunc(item)"
                                @click="isFlagIndex(index, 2)"
                                :class="{
                                    'tbody-text-input-checked':
                                        flagIndex === index + '2'
                                }"
                            />
                            <el-dropdown
                                style="margin-left:10px"
                                v-show="untiInput === false"
                                @command="
                                    value =>
                                        editClusterRuleFunc(item, index, value)
                                "
                            >
                                <span class="el-dropdown-link">
                                    {{ item.unit }}
                                    <i
                                        class="el-icon-arrow-down el-icon--right"
                                    ></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item
                                        v-for="item in companyData.data"
                                        :key="item.id"
                                        :command="item.company"
                                    >
                                        {{ item.company }}
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                            <input
                                v-show="untiInput"
                                type="text"
                                class="tbody-text-input"
                                v-model="item.unit"
                                @blur="editClusterRuleFunc(item)"
                                @click="isFlagIndex(index, 10)"
                                :class="{
                                    'tbody-text-input-checked':
                                        flagIndex === index + '10'
                                }"
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                min="0"
                                class="tbody-text-input"
                                v-model="item.limit"
                                @blur="editClusterRuleFunc(item)"
                                @click="isFlagIndex(index, 3)"
                                :class="{
                                    'tbody-text-input-checked':
                                        flagIndex === index + '3'
                                }"
                            />
                            <span class="el-dropdown-link">
                                {{ item.unit }}
                            </span>
                        </td>
                        <td>
                            <div class="reg-table-btn">
                                <el-button
                                    type="text"
                                    @click="changeShowDetails(index, item.id)"
                                    >包含票券</el-button
                                >
                                <el-button
                                    type="text"
                                    @click="opendeleteDialog(item.id, 1, index)"
                                >
                                    删除
                                </el-button>
                            </div>
                        </td>
                    </tr>
                    <tr v-show="index === showDetails">
                        <td colspan="5">
                            <div class="reg-list-bottom">
                                <div class="reg-list-bottom-1"></div>
                                <div
                                    class="coupon-style"
                                    v-for="(o, i) in item.voucher_ids"
                                    :key="i"
                                    style="cursor: pointer;"
                                    @click="opendeleteVouter(o.id, 2, index, i)"
                                >
                                    <div class="abs-div">{{ o.number }}</div>

                                    <div class="top-o"></div>
                                    <div class="top-o-1"></div>
                                    <div class="coupon-style-title font-words">
                                        {{ o.title }}
                                    </div>
                                    <div class="coupon-style-vouter font-words">
                                        使用场所:{{ o.store_id }}
                                    </div>
                                    <div class="coupon-style-time font-words">
                                        有效期至:
                                        {{ o.end_time }}
                                    </div>

                                    <div class="bottom-o"></div>
                                    <div class="bottom-o-1"></div>
                                </div>
                                <div
                                    class="add-coupon"
                                    @click="getaddCoupon(0, item.id)"
                                >
                                    <i class="iconfont icontianjia"></i>
                                    添加
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <input />
            <div class="create-price-btn">
                <span @click="addActiveTicketFunc()">添加规格</span>
            </div>
        </div>
        <!-- 添加核销券的弹窗 -->
        <el-dialog
            class="dialog-add-coupon"
            title="添加票券(项目卡券)"
            :visible.sync="addCoupon"
        >
            <el-table
                :data="activeVoucher.voucher"
                style="width: 100%"
                v-loading="loading"
                height="400"
            >
                <el-table-column label="核销券">
                    <template slot-scope="scope">
                        <div class="coupon-style">
                            <div class="abs-div">{{ scope.row.number }}</div>
                            <div class="top-o"></div>
                            <div class="top-o-1"></div>
                            <div class="coupon-style-title font-words">
                                {{ scope.row.title }}
                            </div>
                            <div class="coupon-style-vouter font-words">
                                使用场所:{{ scope.row.store_id }}
                            </div>
                            <div class="coupon-style-time font-words">
                                有效期至:
                                {{ scope.row.end_time }}
                            </div>
                            <div class="bottom-o"></div>
                            <div class="bottom-o-1"></div>
                        </div>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="number" label="库存">
                    </el-table-column>-->
                <el-table-column
                    prop="price"
                    label="价值(元)"
                ></el-table-column>
                <el-table-column prop="address" label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="addCouponOne(scope.row, scope.$index)"
                            v-show="scope.row.choose == 0"
                        >
                            添加
                        </el-button>
                        <el-button
                            size="mini"
                            v-show="scope.row.choose == 1"
                            disabled
                        >
                            已添加
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="jump-add-coupon">
                未找到合适的, 点击
                <el-button type="text" @click="jumpAddCardTicket()">
                    【创建新的票券（项目卡券）】
                </el-button>
            </div>
            <div class="dialog-add-bottom">
                <div class="add-bottom-text">
                    已找到 {{ activeVoucher.total }}个票券（项目卡券）
                </div>
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="activeVoucher.total"
                    @size-change="handleSizeChange"
                    @current-change="handleSizeChange"
                    :current-page.sync="currentPage"
                ></el-pagination>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    getActiveVoucher,
    addActiveTicket,
    deteleActiveTicket,
    addTicketVoucher,
    editClusterRule
} from "@/api/api";
import companyData from "./company.json";
export default {
    props: ["voucher_config", "role_config"],
    data() {
        return {
            shop_id: localStorage.getItem("shop_id"),
            token: localStorage.getItem("token"),
            // 拼团id
            cluster_id: localStorage.getItem("clusterId"),
            loading: false,
            companyData,
            // 核销券页码
            currentPage: 1,
            // 是否显示详情
            showDetails: -1,
            isShow: -1,
            // 票券的数组
            activeVoucher: [],
            // 添加票券弹窗的状态
            addCoupon: false,
            // 规则id
            ticket_id: "",
            // 规则索引
            ticket_id_index: "",
            // 编辑的input的状态
            flagIndex: "",
            // 单位input的状态
            untiInput: false
        };
    },
    methods: {
        // 下拉菜单
        changeShowDetails(index, id) {
            // 将传过来的id赋值ticket_id 票券ID
            let _that = this;
            _that.ticket_id = id;
            _that.ticket_id_index = index;
            if (this.showDetails === index) {
                this.showDetails = -1;
            } else {
                this.showDetails = index;
                this.isShow = -1;
            }
        },
        // 添加规格
        addActiveTicketFunc(index) {
            let _that = this;
            let dataParams = {
                token: _that.token,
                cluster_id: _that.cluster_id
            };

            _that.$http
                .post(addActiveTicket, _that.$qs.stringify(dataParams))
                .then(res => {
                    if (res.data.status === 0) {
                        // 后端会返回当前列表的json,前端这边将这段json Push进来
                        // 但是返回的json没有voucher_ids,所以手动增加
                        res.data.data.voucher_ids = [];
                        _that.voucher_config.push(res.data.data);
                        // 这段是双向绑定 push 组队拼团规则设置
                        let includeRuleElement = {
                            one_money: 0,
                            price: res.data.data.price,
                            ticket_id: res.data.data.id,
                            ticket_name: res.data.data.ticket_name,
                            two_money: 0,
                            index
                        };

                        _that.role_config.forEach(element => {
                            element.include_rule.push(includeRuleElement);
                        });
                        this.$message({
                            message: "添加成功",
                            type: "success"
                        });
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        // 删除规格的弹窗
        opendeleteDialog(InfoId, type, index) {
            let _that = this;
            _that
                .$confirm("此操作将永久删除, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                .then(() => {
                    _that.deteleActiveTicketFunc(InfoId, type, index);
                })
                .catch(() => {
                    _that.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        // 删除核销券的弹窗
        opendeleteVouter(InfoId, type, index, childIndex) {
            let _that = this;
            _that
                .$confirm("此操作将永久删除, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                .then(() => {
                    _that.deteleActiveTicketFunc(
                        InfoId,
                        type,
                        index,
                        childIndex
                    );
                })
                .catch(() => {
                    _that.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        // 删除规格/票券
        // @ parm 请求参数的id
        // @ type类型(1删除规格/InfoId规格id,2删除票券/InfoId规格票券id)
        deteleActiveTicketFunc(InfoId, type, index, childIndex) {
            let _that = this;
            let dataParams;
            // 删除规格
            if (type === 1) {
                dataParams = {
                    token: _that.token,
                    ticket_id: InfoId,
                    cluster_id: _that.cluster_id,
                    type
                };
            }
            // 删除票券
            if (type === 2) {
                dataParams = {
                    token: _that.token,
                    ticket_id: _that.ticket_id,
                    voucher_id: InfoId,
                    type
                };
            }
            _that.$http
                .post(deteleActiveTicket, _that.$qs.stringify(dataParams))
                .then(res => {
                    if (res.data.status === 0) {
                        // 请求成功后删除当前规格
                        if (type === 1) {
                            _that.voucher_config.splice(index, 1);
                            // 双向绑定组队拼团规则设置
                            _that.role_config.forEach(element => {
                                element.include_rule.splice(index, 1);
                            });
                        }
                        // 请求成功后删除当前规格的当前票券
                        if (type === 2) {
                            _that.voucher_config[index].voucher_ids.splice(
                                childIndex,
                                1
                            );
                        }
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
        // 获取商铺核销券
        //@page查询所有的列表 大于0整数为分页
        getaddCoupon(page) {
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
                        // 给_that.activeVoucher.voucher添加按钮状态
                        let voucherDate = res.data.data;
                        voucherDate.voucher.forEach(element => {
                            element.choose = 0;
                        });
                        _that.activeVoucher = voucherDate;
                        // 前端处理逻辑
                        // 这是列表的数据
                        let voucherIdsArray =
                            _that.voucher_config[_that.ticket_id_index]
                                .voucher_ids;
                        // 这是弹框的数据
                        let voucherArray = _that.activeVoucher.voucher;
                        // 将两个数据双for循环对比(请尽量减少这种前端处理的代码)
                        voucherIdsArray.forEach(element => {
                            voucherArray.forEach(
                                (voucherElement, voucherElementIndex) => {
                                    if (element.id === voucherElement.id) {
                                        _that.activeVoucher.voucher[
                                            voucherElementIndex
                                        ].choose = 1;
                                    }
                                }
                            );
                        });
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        // 添加核销券
        addCouponOne(item, index) {
            let _that = this;
            // 组装数据
            let dataParams = {
                token: _that.token,
                ticket_id: _that.ticket_id, // 这个id 是在打开弹窗的瞬间得到的
                voucher_id: item.id
            };

            _that.$http
                .post(addTicketVoucher, _that.$qs.stringify(dataParams))
                .then(res => {
                    // 组装数据
                    let setItem = {
                        end_time: item.end_time,
                        id: item.id,
                        number: item.number,
                        store_id: item.store_id,
                        title: item.title
                    };
                    if (res.data.status === 0) {
                        // 改变添加按钮的状态
                        _that.activeVoucher.voucher[index].choose = 1;
                        // 将得到的数据添加到与原有数组中
                        _that.voucher_config[
                            _that.ticket_id_index
                        ].voucher_ids.push(setItem);
                        this.$message({
                            message: "添加成功",
                            type: "success"
                        });
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
        // 编辑信息
        // @item:传给后端的值
        // @index:使用下拉框编辑会增加这个参数
        // @value:下拉框的自定义(当时写的垃圾代码,明明可以用css控制input状态非要用js)
        editClusterRuleFunc(item, index, value) {
            let _that = this;
            //失去焦点去除样式
            _that.flagIndex = "";
            if (value !== undefined) {
                _that.voucher_config[index].unit = value;
            }
            if (value === "自定义") {
                return (_that.untiInput = true);
            }
            let setItem = item;
            for (const key in setItem) {
                const element = setItem[key];
                if (element === "") {
                    return this.$message({
                        message: "修改失败,不能为空哦",
                        type: "warning"
                    });
                }
            }
            let dataParams = {
                token: _that.token,
                cluster_id: _that.cluster_id,
                type: 1,
                ticket_info: JSON.stringify(setItem)
            };
            // 将组件set_rule的数据双向绑定
            let compareNum = false;
            _that.role_config.forEach((element, elIndex) => {
                element.include_rule.forEach(itemElement => {
                    if (itemElement.ticket_id === item.id) {
                        itemElement.ticket_name = item.ticket_name;
                        if (
                            parseInt(itemElement.price) > parseInt(item.price)
                        ) {
                            compareNum = true;
                        }
                    }
                });
            });

            // 判断原价不能小于拼团价格
            if (compareNum) {
                this.$alert(
                    "数据错误,原价不能小于拼团价格,将重新刷新",
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
            _that.$http
                .post(editClusterRule, _that.$qs.stringify(dataParams))
                .then(res => {
                    if (res.data.status === 0) {
                        _that.untiInput = false;
                        _that.$message({
                            message: "编辑成功",
                            type: "success"
                        });
                    }
                })
                .catch(err => {
                    _that.$message.error(err);
                });
        },
        // 编辑信息input状态
        // indexX:判断X轴
        // indexY:判断Y轴(当时写的垃圾代码,明明可以用css控制input状态非要用js)
        isFlagIndex(indexX, indexY) {
            let _that = this;
            if (_that.flagIndex !== "") {
                _that.flagIndex = "";
            }
            _that.flagIndex = `${indexX}${indexY}`;
        },
        // 跳转添加页面
        jumpAddCardTicket() {
            let _that = this;
            _that.$router.push({
                path: "/card_ticket/add",
                query: { url: "create_home" }
            });
        }
    }
};
</script>
<style lang="scss" scoped>
// 表格
.create-rule {
    padding: 10px 20px 40px;
    margin: 92px 30px 20px 71px;
    background: #fff;
    .dialog-add-rule {
        display: flex;
        justify-content: space-around;
    }
    .create-rule-title {
        border-left: 2px #409eff solid;
        padding-left: 20px;
        margin: 20px 0 30px;
        margin-top: 30px;
    }
    .list-table-box {
        padding: 0 30px;
        text-align: left;
    }
    .font-words {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
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
        }
        .reg-list-tbody {
            position: relative;
            .list-tbody-inpu {
                border: none;
                text-align: center;
            }
            el-input .el-input__inner {
                border-color: #fff !important;
            }
            .tbody-text-input {
                text-align: center;
                width: 50px;
            }
            .tbody-text-input:hover,
            .tbody-text-input-checked {
                border: 1px #409eff solid;
                height: 40px;
                line-height: 40px;
                border-radius: 5px;
                cursor: pointer;
            }

            td {
                padding: 20px 0;
                border-bottom: 1px #eee solid;
                cursor: pointer;
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
                right: 9%;
                border: 15px solid;
                border-color: transparent transparent #ccc transparent;
            }
            .reg-list-bottom-1::after {
                content: "";
                position: absolute;
                bottom: -16px;
                right: -15px;
                border: 15px solid;
                border-color: transparent transparent #fafcff transparent;
            }
            // 核销券样式
            .coupon-style,
            .add-coupon {
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
                padding-left: 8px;
                margin: 10px 0;
                margin-left: 55px;
                .abs-div {
                    position: absolute;
                    top: 4px;
                    right: 12px;
                    border: 1px #409eff solid;
                    width: 25px;
                    text-align: center;
                    height: 15px;
                    font-size: 12px;
                    line-height: 15px;
                    border-radius: 25px;
                    background: #fff;
                }
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
            .add-coupon {
                border: 1px #409eff dashed;
                background: #fff;
                line-height: 90px;
                text-align: center;
                padding: 0;
                font-size: 14px;
                cursor: pointer;
                .iconfont {
                    font-weight: bold;
                    font-size: 18px !important;
                }
            }
            .add-coupon:active {
                background: #bddaff;
                color: #fff;
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
    // 弹窗添加项目卡券
    .dialog-add-coupon {
        .dialog-add-select {
            display: flex;
            margin-bottom: 20px;
            .add-input {
                margin-left: 40px;
                width: 200px;
            }
            .add-btn {
                margin-left: -8px;
            }
        }
        .jump-add-coupon {
            text-align: center;
            margin: 20px 0;
        }
        .dialog-add-bottom {
            display: flex;
            justify-content: center;
            .add-bottom-text {
                line-height: 30px;
                font-weight: bold;
            }
        }
        // 核销券样式
        .coupon-style,
        .add-coupon {
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
            margin: 10px 0;
            .abs-div {
                position: absolute;
                top: 4px;
                right: 12px;
                border: 1px #409eff solid;
                width: 25px;
                text-align: center;
                height: 15px;
                font-size: 12px;
                line-height: 15px;
                border-radius: 25px;
                background: #fff;
            }
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
        .add-coupon {
            border: 1px #409eff dashed;
            background: #fff;
            line-height: 90px;
            text-align: center;
            padding: 0;
            font-size: 14px;
            cursor: pointer;
            .iconfont {
                font-weight: bold;
                font-size: 18px !important;
            }
        }
        .add-coupon:active {
            background: #bddaff;
            color: #fff;
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
    }
}
</style>

