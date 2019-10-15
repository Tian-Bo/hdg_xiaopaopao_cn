<!--
 * @Author: zlz5v5
 * @LastEditors: zlz
 * @Date: 2019-09-26 13:52:06
 * @LastEditTime: 2019-10-08 12:11:30
 -->
<template>
    <div class="table">
        <div class="select">
            <div class="selectList">
                <el-select v-model="select" filterable placeholder="全部" @change="HandleVal($event)">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.name"
                        :value="item.name"
                    ></el-option>
                </el-select>
            </div>
            <div class="please">
                <el-input v-model="message" placeholder="请输入内容"></el-input>
            </div>
            <div class="price">
                <span class="scope">支付金额</span>
                <span class="priceIoc">￥</span>
                <input placeholder v-model="fristPrice" />
                <span class="boundary">-</span>
                <span class="priceIoc">￥</span>
                <input placeholder v-model="lastPrice" />
            </div>
            <div class="payment">
                <span class="time">付款时间</span>
                <div class="selectTime">
                    <template>
                        <el-date-picker
                            class="onebox-change-data"
                            v-model="time"
                            type="datetimerange"
                            align="right"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format
                            :default-time="['12:00:00', '08:00:00']"
                            :picker-options="pickerOptions"
                        ></el-date-picker>
                    </template>
                </div>
            </div>
            <div class="screen" @click="queryData(1)">筛选</div>
        </div>
        <div class="listTitle">
            <div class="checkAll" v-if="!isShow" @click="checkAll()">全选</div>
            <div class="checkAll" v-else @click="cancel()">取消</div>
            <div class="listName" v-for="(item,index) in list" :key="index">{{ item.name }}</div>
        </div>
        <!--列表-->
        <div class="list" v-if="formData.length == 0">
            <p>暂无数据</p>
        </div>
        <div class="list" v-for="(item,index) in formData" :key="index">
            <div class="check">
                <el-checkbox v-model="item.show" @change="isClick(item)"></el-checkbox>
            </div>
            <div class="formList">
                <div class="formName">{{ item.id }}</div>
                <div class="formName">{{ item.product }}</div>
                <div class="formName">{{ item.cycle }}</div>
                <div class="formName">{{ item.create_time }}</div>
                <div class="formName">{{ item.pay_status }}</div>
                <div class="formName Price">￥{{ item.price }}</div>
            </div>
        </div>
        <div class="next">
            <div class="nextLeft">
                <el-pagination
                    :page-size="pagination.pageSize"
                    @current-change="currentChange"
                    :current-page="pagination.pageNumber"
                    :total="pagination.totalRows"
                    :layout="pagination.layout"
                    @size-change="sizeChange"
                ></el-pagination>
            </div>
            <div class="nextRight">
                <div class="selectedList">已选待开票金额 : ￥</div>
                <div class="priceCount" v-if="isShow">{{ total_price}}</div>
                <div class="priceCount" v-else>{{ radioPrice }}</div>

                <div v-if="isShow" class="submit">
                    <div class="default" v-if="total_price == 0">申请发票</div>
                    <div class="apply" v-else @click="HandleInspection()">申请发票</div>
                </div>
                <div v-else class="submit">
                    <div class="default" v-if="radioPrice == 0">申请发票</div>
                    <div class="apply" v-else @click="HandleInspection()">申请发票</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getChannelList,getList } from "@/api/api";
export default {
    data() {
        return {
            shop_id: "", // 门店ID
            token: "", // 用户TOKEN
            list: [
                { name: "id" },
                { name: "服务名称" },
                { name: "服务时长" },
                { name: "付款时间" },
                { name: "付款方式" },
                { name: "支付金额" }
            ],
            pagination: {
                totalRows: 0, //总条数
                pageSize: 10, //每页显示条数
                pageNumber: 1,
                layout: "total, prev, pager, next, jumper"
            },

            total_price: 0, // 总金额
            checked: true, // 数据列表
            formData: [],
            isShow: false,
            radioArr: [],
            newData: [],
            allId: [],
            cancelPrice: 0,
            alltotal_price: 0, // 再次点击全选
            radioPrice: 0, // 单选价格
            select: "", // 筛选部分
            selectType: "",
            message: "", // 版本内容
            fristPrice: "", // 前置价格
            lastPrice: "", // 后置价格
            time: [], //报名时间
            invoice_status: false,
            options: [{ name: "全部" }, { name: "版本名称" }],
            pickerOptions: {
                shortcuts: [
                    {
                        text: "最近一周",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 7
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "最近一个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 30
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "最近三个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 90
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    }
                ]
            }
        };
    },
    computed: {},
    created() {
        let _that = this;
        _that.token = localStorage.getItem("token");
        _that.shop_id = localStorage.getItem("shop_id");
        _that.queryData();
    },
    methods: {
        // 数据加字段
        DataList(data) {
            let _that = this;
            data.forEach((item, idnex) => {
                item["show"] = _that.isShow;
            });
            _that.formData = data;
        },
        // 请求数据
        queryData(e) {
            let _that = this;
            if (e == 1) {
                _that.pagination.pageNumber = 1;
            }
            // start-----模拟动态分页
            if (_that.selectShow == true) {
                if (!_that.message) {
                    this.$message.error("请输入填写内容");
                    return;
                }
            }
            let priceArray = [];
            if (_that.fristPrice == "" && _that.lastPrice == "") {
            } else if (
                (_that.fristPrice !== "" && _that.lastPrice == "") ||
                (_that.fristPrice == "" && _that.lastPrice !== "")
            ) {
                this.$message.error("请检查支付范围");
            } else {
                priceArray = `[${_that.fristPrice},${_that.lastPrice}]`;
            }
            let timeArray = [];
            if (_that.time === null) {
                _that.time = [];
            } else {
                for (let index = 0; index < _that.time.length; index++) {
                    let time = Math.ceil(_that.time[index].getTime() / 1000);
                    timeArray.push(time);
                }
            }
            let strTimeArray = `[${timeArray}]`;
            let allObject = {
                shop_id: _that.shop_id,
                token: _that.token,
                filter_type: _that.selectType,
                price: priceArray, // 价钱
                filter_content: _that.message,
                time: strTimeArray,
                page: _that.pagination.pageNumber
            };

            // 可选参数
            let new_getObject = {};
            for (const iterator in allObject) {
                if (
                    allObject[iterator] != "" ||
                    allObject[iterator].length != 0
                ) {
                    if (allObject[iterator] != "[]") {
                        new_getObject[iterator] = allObject[iterator];
                    }
                }
            }
            _that.$http
                .get(getList, {
                    params: new_getObject
                })
                .then(res => {
                    let Data = res.data.data;
                    _that.DataList(Data.items);
                    if (_that.isShow) {
                        let count = 0;
                        Data.items.forEach((fitem, index) => {
                            _that.radioArr.forEach((ritem, index) => {
                                if (fitem.id == ritem.id) {
                                    fitem["show"] = false;
                                    count += fitem.price;
                                }
                            });
                        });
                        _that.isShow = true;
                        _that.total_price = _that.cancelPrice;
                    } else {
                        Data.items.forEach((fitem, index) => {
                            _that.radioArr.forEach((ritem, index) => {
                                if (fitem.id == ritem.id) {
                                    fitem["show"] = true;
                                }
                            });
                        });
                    }
                    _that.total_price = Data.total_price;
                    _that.alltotal_price = Data.total_price;
                    _that.invoice_status = Data.invoice_status;
                    _that.pagination.totalRows = res.data.data.total;
                })
                .catch(err => {});
        },
        // 全选
        checkAll() {
            let _that = this;
            _that.radioArr = [];
            _that.newData = [];
            _that.total_price = _that.alltotal_price;
            _that.isShow = true;
            _that.formData.forEach((item, index) => {
                item["show"] = true;
            });
        },
        // 取消
        cancel() {
            let _that = this;
            _that.radioArr = [];
            _that.newData = [];
            _that.isShow = false;
            _that.radioPrice = 0;
            _that.formData.forEach((item, index) => {
                item["show"] = false;
            });
        },
        // 单选
        isClick(item) {
            let _that = this;
            // 判断全选 还是单选
            if (_that.isShow) {
                _that.radioArr.push(item);
                let isShow = item.show;
                isShow = true;
                if (item.show == isShow) {
                    _that.total_price = _that.total_price + item.price;
                    _that.cancelPrice = _that.total_price; //全选取消价格
                } else {
                    _that.total_price = _that.total_price - item.price;
                    _that.cancelPrice = _that.total_price; //全选取消价格
                }
            } else {
                let isShow = item.show;
                isShow = false;
                if (item.show == isShow) {
                    let finalArr = [];
                    _that.radioArr.forEach((items, idnex) => {
                        if (item.id !== items.id) {
                            finalArr.push(items);
                        }
                    });
                    _that.radioArr = finalArr;
                    _that.radioPrice = _that.radioPrice - item.price;
                } else {
                    _that.radioArr.push(item);
                    _that.radioPrice = _that.radioPrice + item.price;
                }
            }
        },
        // 分页
        currentChange(val) {
            let _that = this;
            _that.pagination.pageNumber = val;
            _that.queryData();
        },
        // 输入页数
        sizeChange(val) {
            let _that = this;
            _that.pagination.pageNumber = val;
            _that.queryData();
        },
        // 版本选中
        HandleVal($event) {
            let _that = this;
            if ($event == "版本名称") {
                _that.selectShow = true;
                _that.selectType = 1;
            }
            if ($event == "全部") {
                _that.selectShow = true;
                _that.selectType = 0;
            }
        },
        // 申请发票
        HandleInspection() {
            let _that = this;
            if (!_that.invoice_status) {
                _that.$router.push({ path: "/management" });
            } else {
                let ids = [];
                _that.radioArr.forEach((item, idnex) => {
                    ids.push(item.id);
                });

                // 全选数据
                let num = _that.pagination.totalRows - _that.radioArr.length;
                let allIds = [];
                _that.radioArr.forEach((item, idnex) => {
                    allIds.push(item.id);
                });
                if (_that.isShow == true) {
                    _that.$router.push({
                        path:
                            "/inspection/?ids=" +
                            allIds +
                            "&totalPage=" +
                            num +
                            "&total_price=" +
                            _that.total_price +
                            "&allID=" +
                            _that.isShow
                    });
                } else {
                    _that.$router.push({
                        path:
                            "/inspection/?ids=" +
                            ids +
                            "&totalPage=" +
                            _that.radioArr.length +
                            "&total_price=" +
                            _that.radioPrice
                    });
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.select {
    width: 100%;
    height: 70px;
    border-bottom: 1px solid #ccc;
    background-color: rgba(246, 250, 255, 1);
    padding-top: 10px;

    .selectList {
        float: left;
        width: 109px;
        margin-left: 20px;
        height: 40px;
        margin-top: 5px;
    }

    .please {
        float: left;
        width: 150px;
        margin: 5px 10px;
    }
    .price {
        float: left;
        .scope {
            float: left;
            font-size: 14px;
            color: #666;
            height: 36px;
            line-height: 50px;
            margin: 0 10px;
        }
        input {
            float: left;
            width: 80px;
            height: 38px;
            margin-top: 4px;
            border: 1px solid #ccc;
            border-radius: 3px;
        }
        .priceIoc {
            width: 13px;
            height: 37px;
            line-height: 36px;
            float: left;
            font-size: 12px;
            margin-top: 4px;
            background-color: rgba(242, 242, 242, 1);
        }
        .boundary {
            float: left;
            height: 24px;
            margin: 12px 4px;
        }
    }
    .payment {
        float: left;
        line-height: 50px;
        .time {
            float: left;
            margin: 0 20px;
        }
        .selectTime {
            float: left;
        }
    }

    .screen {
        float: left;
        width: 60px;
        height: 26px;
        line-height: 26px;
        background-color: rgba(64, 158, 255, 1);
        text-align: center;
        color: #fff;
        margin: 12px 20px;
        border-radius: 2px;
        font-size: 14px;
        cursor: pointer;
    }
}
.listTitle {
    width: 100%;
    height: 64px;
    line-height: 64px;
    display: flex;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    background: #fafafa;
    .checkAll {
        float: left;
        width: 64px;
        height: 64px;
        line-height: 64px;
        text-align: center;
        color: #2a82e4;
        cursor: pointer;
    }
    .listName {
        flex: 1;
        text-align: center;
    }
}

.list {
    width: 100%;
    height: 65px;
    background: #fff;
    border-bottom: 1px solid #ccc;
    p {
        text-align: center;
        line-height: 64px;
    }
    .check {
        float: left;
        width: 64px;
        line-height: 64px;
        text-align: center;
    }
    .formList {
        display: flex;
        .formName {
            width: 100%;
            height: 64px;
            flex: 1;
            text-align: center;
            line-height: 64px;
        }
        .Price {
            color: red;
        }
    }
}
.next {
    width: 100%;
    float: left;
    height: 80px;
    background: #fff;
    right: 20px;
    .nextLeft {
        margin: 30px 0 0 200px;
        float: left;
        text-align: center;
    }
}
.nextRight {
    margin-top: 20px;
    line-height: 40px;
    float: right;
    .selectedList {
        float: left;
        color: #6e6e6e;
        font-size: 16px;
    }
    .priceCount {
        float: left;
        color: #ff8291;
        font-size: 18px;
        margin: 0 15px 0 2px;
    }
    .apply {
        float: left;
        width: 136px;
        height: 35px;
        background-color: rgba(64, 158, 255, 1);
        text-align: center;
        color: #fff;
        line-height: 35px;
        border-radius: 3px;
        margin-right: 30px;
        cursor: pointer;
    }
    .default {
        float: left;
        width: 136px;
        height: 35px;
        background-color: #999;
        text-align: center;
        color: rgb(183, 183, 183);
        line-height: 35px;
        border-radius: 3px;
        margin-right: 30px;
        cursor: not-allowed;
        margin-left: 10px;
    }
}

.submit {
    width: 400px;
}
</style>
