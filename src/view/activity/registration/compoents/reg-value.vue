<template>
    <div class="reg-value">
        <!-- 筛选 -->
        <div class="reg-value-screen">
            <!-- 基础信息 -->
            <div class="screen-value">
                线上总收款：¥{{ management.income }}
                <span class="span-icon">
                    <i class="el-icon-minus"></i>
                </span>
                线上总支出：¥{{ management.expend }}
                <span class="span-icon">=</span>
                活动收入
                <span class="span-pice">¥{{ management.diff }}</span>
            </div>
            <!-- 按钮 -->
            <div>
                <span class="screen-btn" @click="showScreen = !showScreen">
                    筛选
                    <i class="el-icon-arrow-up" v-show="showScreen"></i>
                    <i
                        class="el-icon-arrow-down"
                        v-show="showScreen === false"
                    ></i>
                </span>
            </div>
        </div>
        <!-- 筛选详情 -->
        <transition name="fade" mode="out-in">
            <div class="reg-value-details" v-show="showScreen">
                <!--第一行 商户下拉选择器  报名时间 -->
                <div class="reg-details-box">
                    <div class="reg-children-box onebox-select">
                        <el-select
                            v-model="user_filter"
                            placeholder="请选择类型"
                            style="width:25%"
                        >
                            <el-option
                                v-for="(item, index) in fitterObject.user_filer"
                                :key="index"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                        <div
                            class="onebox-select-input"
                            style="margin-left:15px;"
                        >
                            <el-input
                                type="number"
                                placeholder="请输入信息"
                                v-show="user_filter === 3"
                                v-model="user_filter_content"
                            >
                            </el-input>
                            <el-input
                                type="text"
                                placeholder="请输入信息"
                                v-show="user_filter !== 3"
                                v-model="user_filter_content"
                                :disabled="isDisabled"
                            >
                            </el-input>
                        </div>
                    </div>
                    <div class="reg-children-box reg-one-box">
                        <template>
                            <span class="one-box-span">报名时间</span>
                            <el-date-picker
                                class="onebox-change-data"
                                v-model="time"
                                type="datetimerange"
                                align="right"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :default-time="['12:00:00', '08:00:00']"
                                :picker-options="pickerOptions"
                            ></el-date-picker>
                        </template>
                    </div>
                </div>
                <!-- 第二行 套餐规格 渠道来源 支付渠道 支付状态 -->
                <div class="reg-details-box">
                    <div class="reg-children-box-1 twobox-select">
                        <span>套餐规格</span>
                        <el-select v-model="ticket" placeholder="请选择">
                            <el-option
                                v-for="(item, index) in fitterObject.ticket"
                                :key="index"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="reg-children-box-1 twobox-select">
                        <span>渠道来源</span>
                        <el-select v-model="channel" placeholder="请选择">
                            <el-option
                                v-for="(item, index) in fitterObject.channel"
                                :key="index"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="reg-children-box-1 twobox-select">
                        <span>支付渠道</span>
                        <el-select v-model="pay_channel" placeholder="请选择">
                            <el-option
                                v-for="(item,
                                index) in fitterObject.pay_channel"
                                :key="index"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="reg-children-box-1 twobox-select">
                        <span>支付状态</span>
                        <el-select
                            v-model="pay_status"
                            placeholder="已支付"
                            v-if="voucher_status !== 0 && voucher_status !== ''"
                        >
                            <el-option
                                v-for="(item, index) in fitterObject.pay_status"
                                :key="index"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                        <el-select
                            v-model="pay_status"
                            placeholder="请选择"
                            v-else
                        >
                            <el-option
                                v-for="(item, index) in fitterObject.pay_status"
                                :key="index"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </div>
                </div>
                <!-- 第三行 核销场地 支付金额  核销状态 性别 -->
                <div class="reg-details-box" style="justify-content: left;">
                    <div class="reg-children-box-1 twobox-select">
                        <span>核销场地</span>
                        <el-select v-model="store_id" placeholder="请选择">
                            <el-option
                                v-for="(item, index) in fitterObject.store"
                                :key="index"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="reg-children-box-1 twobox-select">
                        <span>核销状态</span>
                        <el-select
                            v-model="voucher_status"
                            placeholder="请选择"
                        >
                            <el-option
                                v-for="(item,
                                index) in fitterObject.voucher_status"
                                :key="index"
                                :label="item.name"
                                :value="item.id"
                            >
                            </el-option>
                        </el-select>
                    </div>
                    <div class="reg-children-box-1 twobox-select">
                        <span>性别</span>
                        <el-select v-model="sex" placeholder="请选择">
                            <el-option
                                v-for="(item, index) in fitterObject.sex"
                                :key="index"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="reg-children-box-1 twobox-select">
                        <span style="width:225px;margin-right:0">支付金额</span>
                        <div style="display:flex">
                            <el-input
                                placeholder="¥"
                                v-model="startPice"
                                type="number"
                            >
                            </el-input>
                            <div style="margin:0 2%;line-height:40px">
                                <i class="el-icon-minus"></i>
                            </div>
                            <el-input
                                placeholder="¥"
                                v-model="endPice"
                                type="number"
                            >
                            </el-input>
                        </div>
                    </div>
                </div>
                <!-- 第四行  筛选/导出表格=>按钮 -->
                <div class="reg-details-box">
                    <div
                        class="reg-children-box"
                        style="display:flex;justify-content: flex-end;"
                    >
                        <el-button type="primary" @click="getListAllInfo()">
                            立即查询
                        </el-button>
                        <el-button type="primary" @click="getListAllInfo(1)">
                            <i class="el-icon-folder-add"></i> 导出表格
                        </el-button>
                    </div>
                </div>
            </div>
        </transition>
        <!-- 表格 -->
        <div>
            <regList :management="management" :loading="loading" />
        </div>
        <!-- 分页 -->
        <el-pagination
            style="margin-top: 20px;text-align: center;"
            @current-change="getListAllInfo('', $event)"
            layout="total, prev, pager, next, jumper"
            :total="management.total"
        >
        </el-pagination>
    </div>
</template>


<script>
import regList from "./reg-list";
// 获取api
import { getManageFitter, getManagement } from "@/api/api";
export default {
    name: "regRegistration",
    data() {
        return {
            // 加载
            loading: true,
            // 日期选择器的快捷参数
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
            },
            // 筛选的数据
            // axios请求筛选的值
            fitterObject: {},
            disabled: true,
            // 获取列表的信息
            management: {},
            // 活动ID
            active_id: 0,
            //第一行 商户下拉选择器  报名时间
            user_filter: "", //下拉选中的id
            user_filter_content: "", //输入下拉的值
            time: [], //报名时间
            // 第二行
            ticket: "", //套餐规格
            channel: "", //渠道来源
            pay_channel: "", //支付渠道
            pay_status: "", //支付状态
            // 第三行 核销场地  核销状态 支付金额 性别
            store_id: "", //核销场地
            voucher_status: "", //核销状态
            sex: "", //性别
            startPice: "", //支付金额--->开始
            endPice: "", //支付金额-->结束
            // 是否下载
            export: "",
            // 是否显示筛选列表
            showScreen: false,
            // 分页
            page: ""
        };
    },
    components: {
        regList
    },
    created() {
        this.active_id = this.$route.query.active_id || 446;
        this.getInfo();
    },
    methods: {
        // 进入页面需要执行的函数
        getInfo() {
            this.getFitter();
            this.getListAllInfo();
        },
        // 获取筛选条件
        getFitter() {
            let _that = this;
            _that.$http
                .get(getManageFitter, {
                    params: {
                        active_id: _that.active_id
                    }
                })
                .then(res => {
                    if (res.data.status !== 0) {
                        this.$message.error(res.data.message);
                    } else {
                        _that.fitterObject = res.data.data;
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        // 获取列表/点击筛选/分页/下载表格
        getListAllInfo(indexExport, page) {
            let _that = this;
            _that.loading = true;
            // 传indexExport===1 时就会下载表格
            _that.export = indexExport;
            // 分页
            _that.page = page;
            // 校验报名时间
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

            // 组装金额
            let piceArray;
            if (
                _that.startPice !== "" &&
                _that.endPice !== "" &&
                _that.startPice <= _that.endPice
            ) {
                let startPice = _that.startPice * 100;
                let endPice = _that.endPice * 100;
                piceArray = `[${startPice},${endPice}]`;
            } else {
                piceArray = [];
            }

            // 核销判断:如果核销状态不是选择全部,支付状态为已支付
            if (
                _that.voucher_status !== 0 &&
                _that.voucher_status !== "" &&
                _that.pay_status === ""
            ) {
                _that.pay_status = 1;
            }

            // 组装所有的参数
            let getObject = {
                active_id: _that.active_id,
                token: localStorage.getItem("token"),
                user_filter: _that.user_filter,
                user_filter_content: _that.user_filter_content,
                time: strTimeArray,
                ticket: _that.ticket,
                channel: _that.channel,
                pay_channel: _that.pay_channel,
                pay_status: _that.pay_status,
                store_id: _that.store_id,
                sex: _that.sex,
                voucher_status: _that.voucher_status,
                price: piceArray,
                export: _that.export,
                page: _that.page
            };
            // 可选参数
            let new_getObject = {};
            for (const iterator in getObject) {
                if (
                    getObject[iterator] != "" ||
                    getObject[iterator].length != 0
                ) {
                    if (getObject[iterator] != "[]") {
                        new_getObject[iterator] = getObject[iterator];
                    }
                }
            }
            // 请求ajax
            _that.$http
                .get(getManagement, {
                    params: new_getObject
                })
                .then(res => {
                    if (_that.export == 1) {
                        // 是否下载表格
                        window.location.href = res.request.responseURL;
                        _that.loading = false;
                    }
                    if (res.data.status !== 0) {
                        this.$message.error(res.data.message);
                    } else {
                        // // 循环在数据res.data.data.items --->res.data.data.items.voucher中 加一个show ==false(不需要)
                        // if (res.data.data.items !== undefined) {
                        //     res.data.data.items.forEach((item, index) => {
                        //         for (let i = 0; i < item.voucher.length; i++) {
                        //           item.voucher[i]["show"] = i
                        //         }
                        //     });
                        // }
                        _that.management = res.data.data;
                        _that.loading = false;
                        _that.passValue();
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        // 传父组件
        passValue() {
            this.$emit("passFaValue", this.management.total);
        }
    },
    computed: {
        // 计算input框禁用
        isDisabled: function() {
            let _that = this;
            if (_that.user_filter === "") {
                return (_that.disabled = true);
            } else {
                return (_that.disabled = false);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
// 动画
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
.reg-value {
    margin: 30px 0 0;
    padding-bottom: 30px;
    .reg-value-screen {
        display: flex;
        margin-bottom: 30px;
        justify-content: space-between;
        // 基础信息
        .screen-value {
            font-size: 18px;
            color: #888;
            .span-icon {
                padding: 0 6px;
            }
            .span-pice {
                font-size: 22px;
                color: #ff8291;
            }
        }
        // 筛选按钮
        .screen-btn {
            height: 30px;
            line-height: 15px;
            background: #409eff;
            color: #fff;
            padding: 8px 22px;
            border-radius: 2px;
            cursor: pointer;
        }
    }
    // 筛选详情
    .reg-value-details {
        margin: 0px 2% 30px;
        .reg-details-box {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 20px;
            // 筛选的公共样式
            .reg-children-box {
                text-align: left;
                width: 50%;
            }
            .reg-one-box {
                text-align: left;
                .one-box-span {
                    // width: 120px;
                    // display: inline-block;
                    // text-align: center;
                    margin-right: 8.5%;
                }
                .onebox-change-data {
                    width: 78%;
                }
            }
            .reg-children-box-1 {
                text-align: left;
                width: 23%;
                margin-right: 2%;
                display: flex;
            }
            // 第一行的样式
            .onebox-select {
                .onebox-select-input {
                    display: inline-grid;
                    width: 67%;
                    input {
                        height: 38px;
                        font-size: 16px;
                        border-radius: 5px;
                        border: 1px #dcdfe6 solid;
                        padding: 0 20px;
                    }
                }
            }
            // 第二行的样式
            .twobox-select {
                span {
                    font-size: 15px;
                    margin-right: 2%;
                    width: 120px;
                    // text-align: center;
                    line-height: 40px;
                }
            }
        }
    }
}
</style>
