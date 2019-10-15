<!--
 * @Author: zlz5v5
 * @LastEditors: zlz
 * @Date: 2019-08-23 10:33:38
 * @LastEditTime: 2019-09-27 18:32:17
 -->
<template>
    <div>
        <!-- 选择服务、产品项目类型 -->
        <div class="basic-info">
            <div class="basic-info-title">
                选择服务、产品项目类型
            </div>
            <div class="basic-info-from">
                <div class="info-from-title">名称</div>
                <div class="info-from-content">
                    <el-input
                        v-model="title"
                        maxlength="40"
                        show-word-limit
                    ></el-input>
                </div>
            </div>
            <div class="basic-info-from">
                <div class="info-from-title">核销场地(门店)</div>
                <div class="info-from-content">
                    <div class="store-info-box">
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="点击可移除"
                            placement="top-start"
                            v-for="(item, index) in storeListInfoArray"
                            :key="index"
                        >
                            <div
                                class="info-box-div"
                                @click="deteleShopStore(item, index)"
                            >
                                <el-image
                                    class="info-box-img"
                                    :src="item.shop_store_img"
                                >
                                </el-image>
                                {{ item.name }}
                            </div>
                        </el-tooltip>
                    </div>
                    <el-button
                        type="primary"
                        @click="getStoreListInfo()"
                        style="margin-left:-8px"
                    >
                        选择核销场地(门店)
                    </el-button>
                </div>
            </div>
            <div class="basic-info-from">
                <div class="info-from-title">
                    有效时间
                </div>
                <div class="info-from-content">
                    <el-radio
                        v-model="valid_radio"
                        :label="1"
                        @click="showValidRadio(1)"
                    >
                        <!-- <el-button style="margin-left: -30px;" size="mini">
                            获得后
                        </el-button> -->
                        <el-input
                            v-model="valid_time"
                            style="width:80px;"
                            type="number"
                            @click="showValidRadio(1)"
                            min="0"
                            max="999"
                        >
                        </el-input>
                        <el-button
                            style="margin-left:-8px"
                            @click="showValidRadio(1)"
                        >
                            天有效(0为永久有效)
                        </el-button>
                    </el-radio>
                    <div style="display:flex" @click="showValidRadio(2)">
                        <el-radio
                            v-model="valid_radio"
                            :label="2"
                            class="effective-time"
                        >
                            在
                        </el-radio>
                        <div style="display:flex">
                            <el-date-picker
                                v-model="date_time"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                style="width:85%;"
                            >
                            </el-date-picker>
                            <el-button style="margin-left:-8px">
                                内有效
                            </el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 选择门店的弹窗 -->
        <el-dialog title="选择门店" :visible.sync="dialogTableVisible">
            <el-table :data="storeListInfo" height="450" v-loading="loading">
                <el-table-column fixed label="店铺" width="150">
                    <template slot-scope="scope">
                        <div class="dialog-table-name">
                            <el-image
                                class="table-name-img"
                                :src="scope.row.shop_store_img"
                            >
                            </el-image>
                            <div class="dtable-name-text">
                                {{ scope.row.name }}
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="地址">
                    <template slot-scope="scope">
                        {{ scope.row.area }}{{ scope.row.addr }}
                    </template>
                </el-table-column>
                <el-table-column
                    property="work_time"
                    label="工作时间"
                ></el-table-column>
                <el-table-column fixed="right" property="name" label="操作">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="small"
                            @click="addShopStore(scope.row, scope.$index)"
                            v-show="scope.row.show === 0"
                        >
                            添加
                        </el-button>
                        <el-button
                            type="text"
                            size="small"
                            v-show="scope.row.show === 1"
                        >
                            已添加
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <!-- 价值库存 -->
        <div class="inventory-info">
            <div class="inventory-info-title">价值库存</div>
            <div class="basic-info-from">
                <div class="info-from-title">价值</div>
                <el-input
                    placeholder="请输入内容"
                    v-model="price"
                    class="basic-info-input"
                    type="number"
                    min="0"
                >
                    <template slot="append">
                        元
                    </template>
                </el-input>
            </div>
        </div>
        <!-- 其他设置 -->
        <div class="inventory-info">
            <div class="inventory-info-title">其他设置</div>
            <div class="basic-info-from">
                <div class="info-from-title">票券颜色</div>
                <el-input
                    disabled
                    placeholder="请输入内容"
                    v-model="voucher_color"
                    class="basic-info-input"
                >
                </el-input>
                <el-color-picker
                    v-model="voucher_color"
                    style="margin-left:-40px"
                ></el-color-picker>
            </div>
            <div class="basic-info-from" style="line-height: 40px;">
                <div class="info-from-title">多次核销</div>
                <div class="info-from-grant">
                    <el-switch
                        v-model="voucher_more"
                        active-color="#409eff"
                        inactive-color="#ccc"
                        :active-value="1"
                        :inactive-value="0"
                    >
                    </el-switch>
                    <div class="is-voucher" v-show="voucher_more === 1">
                        该凭证可以核销
                        <el-input
                            placeholder="请输入内容"
                            v-model="number"
                            class="basic-info-input"
                            type="number"
                            min="1"
                        >
                        </el-input>
                        次
                    </div>
                </div>
            </div>
            <div class="basic-info-from" style="line-height: 40px;">
                <div class="info-from-title">核销密码</div>
                <div class="info-from-grant">
                    <el-switch
                        v-model="voucher_postword"
                        active-color="#409eff"
                        inactive-color="#ccc"
                    >
                    </el-switch>
                    <div class="is-voucher" v-show="voucher_postword">
                        <el-input
                            placeholder="请输入核销密码"
                            v-model="handle_code"
                            class="basic-info-input"
                            type="number"
                            min="1"
                            style="width:200px"
                        >
                        </el-input>
                    </div>
                </div>
            </div>
            <div class="basic-info-from" style="line-height: 40px;">
                <div class="info-from-title">使用说明</div>
                <div class="info-from-grant">
                    <el-input
                        type="textarea"
                        style="width:400px;"
                        placeholder="请输入内容"
                        v-model="instructions"
                        maxlength="200"
                        show-word-limit
                        :autosize="{ minRows: 6 }"
                    >
                    </el-input>
                </div>
            </div>
        </div>
        <!-- 取消和确定按钮 -->
        <el-row class="bottom-btn-group">
            <el-button>&nbsp;&nbsp;取消&nbsp;&nbsp;</el-button>
            <el-button
                type="primary"
                @click="addVoucher('add')"
                v-show="buttonStatus === true"
            >
                确定创建
            </el-button>
            <el-button
                type="primary"
                @click="addVoucher('edit')"
                v-show="buttonStatus === false"
            >
                确定修改
            </el-button>
        </el-row>
    </div>
</template>
<script>
import {
    getStoreList,
    vouterStoreListInfo,
    getActiveVoucherInfo,
    addActiveVoucher,
    editActiveVoucher
} from "@/api/api";
import { timeFilter } from "@/assets/js/unlis";


export default {
    data() {
        return {
            shop_id: localStorage.getItem("shop_id"),
            token: localStorage.getItem("token"),
            loading: false,
            // 添加门店弹窗的状态
            dialogTableVisible: false,
            // 门店列表
            storeListInfo: [],
            storeListInfoArray: [],
            storeListInfoString: "",
            // 核销券的标题
            title: "",
            // 天数有效期
            valid_radio: 1,
            valid_time: 0,
            date_time: [],
            // 日期有效
            create_time: "",
            end_time: "",
            // 票券颜色
            voucher_color: "#409eff",
            // 多次核销状态
            voucher_more: 1,
            // 核销密码核销状态
            voucher_postword: false,
            // 多次核销的值
            number: 1,
            //  核销密码的值
            handle_code: "",
            // 文本域
            instructions: "",
            // 价格
            price: "",
            // 按钮的状态
            buttonStatus: true
        };
    },
    created() {
        // 判断如果是从是不是编辑页面过来的
        if (this.$route.query.vouter_id !== undefined) {
            this.getActiveVoucherInfoFunc(this.$route.query.vouter_id);
            this.buttonStatus = false;
        }
    },
    methods: {
        // 从编辑页面过来获取核销券信息
        getActiveVoucherInfoFunc(id) {
            let _that = this;
            _that.$http
                .get(getActiveVoucherInfo, {
                    params: {
                        shop_id: _that.shop_id,
                        token: _that.token,
                        voucher_id: id
                    }
                })
                .then(res => {
                    if (res.data.status !== 0) {
                        _that.$message.error(res.data.message);
                    } else {
                        // 核销券的标题
                        _that.title = res.data.data.title;
                        // 核销店铺
                        _that.storeListInfoArray = res.data.data.store_list;
                        // 价值
                        _that.price = res.data.data.price;
                        // 核销券的颜色
                        _that.voucher_color = res.data.data.voucher_color;
                        // 是否多次核销
                        _that.voucher_more = res.data.data.voucher_more;
                        // 核销次数
                        _that.number = res.data.data.number;
                        // 核销密码
                        _that.handle_code = res.data.data.hendle_code;
                        // 密码不为空,打开核销密码的状态
                        if (_that.handle_code !== "") {
                            _that.voucher_postword = true;
                        }
                        // 简介
                        _that.instructions = res.data.data.instructions;
                        // 固定的时间
                        _that.valid_time = res.data.data.valid_time;
                        // 时间处理
                        _that.valid_radio = res.data.data.type;
                        if (_that.valid_radio === 1) {
                            _that.valid_time = res.data.data.end_time;
                        }
                        if (_that.valid_radio === 2) {
                            _that.date_time = [
                                res.data.data.create_time*1000,
                                res.data.data.end_time*1000
                            ];
                        }
                    }
                    _that.loading = false;
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        // 获取弹窗门店信息
        getStoreListInfo() {
            let _that = this;
            _that.loading = _that.dialogTableVisible = true;
            _that.$http
                .get(getStoreList, {
                    params: {
                        shop_id: _that.shop_id,
                        token: _that.token
                    }
                })
                .then(res => {
                    _that.loading = false;
                    if (res.data.status !== 0) {
                        _that.$message.error(res.data.message);
                    } else {
                        let vouterStoreListInfo = res.data.data;
                        // 两个数组对比
                        vouterStoreListInfo.forEach(element => {
                            element.show = 0;
                            _that.storeListInfoArray.forEach(item => {
                                if (element.id == item.id) {
                                    element.show = 1;
                                }
                            });
                        });
                        _that.storeListInfo = vouterStoreListInfo;
                    }
                    _that.loading = false;
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        // 切换有效期单选框的状态
        showValidRadio(index) {
            let _that = this;

            if (index === 1) {
                _that.valid_radio = 1;
                // _that.date_time = [];
            }
            if (index === 2) {
                _that.valid_radio = 2;
                // _that.valid_time = 0;
            }
        },
        // 添加门店
        addShopStore(content, index) {
            let _that = this;
            _that.storeListInfo[index].show = 1;
            _that.storeListInfoArray.push(content);
        },
        //删除门店
        deteleShopStore(content, index) {
            let _that = this;
            // _that.storeListInfo[index].show = 0;
            _that.storeListInfoArray.splice(index, 1);
        },
        // 添加/编辑核销券/
        // @typeStr:add 添加  @typeStr:edit 编辑
        addVoucher(typeStr) {
            let _that = this;
            // 当核销券为单次时核销次数默认1次
            if (_that.voucher_more === 0) _that.number = 1;

            // 转换日期的格式
            if (_that.date_time !== "") {
                _that.create_time = timeFilter(_that.date_time[0], 1, 1);
                _that.end_time = timeFilter(_that.date_time[1], 1, 1);
            }

            // 格式化门店Id
            let storeArray = [];
            for (let item of _that.storeListInfoArray) {
                storeArray.push(item.id);
            }
            _that.storeListInfoString = storeArray.join(",");

            let dataParams = {
                shop_id: _that.shop_id,
                token: _that.token,
                title: _that.title,
                store_id: _that.storeListInfoString,
                valid_time: _that.valid_time,
                create_time: _that.create_time,
                end_time: _that.end_time,
                voucher_color: _that.voucher_color,
                voucher_more: _that.voucher_more,
                price: _that.price,
                instructions: _that.instructions,
                number: _that.number,
                handle_code: _that.handle_code,
                type: _that.valid_radio
            };

            // 判断单选的按钮选择的时间，决定删除的字段
            if (_that.valid_radio === 1) {
                delete dataParams["create_time"];
                delete dataParams["end_time"];
            }
            if (_that.valid_radio === 2) {
                delete dataParams["valid_time"];
            }
            // 当核销密码的状态未false 不传handle_code
            if (_that.voucher_postword === false) {
                delete dataParams["handle_code"];
            }

            for (const key in dataParams) {
                const element = dataParams[key];
                if (element === "") {
                    _that.$message.error("填写信息不能为空");
                    return;
                }
            }

            // 数字不能小于0
            if (_that.price < 0) {
                return this.$message("价格不能为负数");
            }
            if (_that.valid_time < 0) {
                return this.$message("有效期不能为负数");
            }
            if (_that.valid_time > 999) {
                let masage = `当前填写时间${_that.valid_time}天,`
                return this.$message(masage+"明确有效期不能大于999天");
            }
            if (_that.number < 0) {
                return this.$message("核销次数不能为负数");
            }
            // 添加核销券
            if (typeStr === "add") {
                _that.$http
                    .post(addActiveVoucher, _that.$qs.stringify(dataParams))
                    .then(res => {
                        if (res.data.status === 0) {
                            this.$message({
                                message: "添加成功",
                                type: "success"
                            });
                            _that.$router.push({
                                path: "/" + _that.$route.query.url,
                                query: { title: "create_rule" }
                            });
                        }
                    })
                    .catch(err => {
                        this.$message.error(err);
                    });
            }
            // 编辑核销券
            if (typeStr === "edit") {
                dataParams.voucher_id = _that.$route.query.vouter_id;
                _that.$http
                    .post(editActiveVoucher, _that.$qs.stringify(dataParams))
                    .then(res => {
                        if (res.data.status === 0) {
                            this.$message({
                                message: "修改成功",
                                type: "success"
                            });
                            _that.$router.push({
                                path: "/" + _that.$route.query.url
                            });
                        }
                    })
                    .catch(err => {
                        this.$message.error(err);
                    });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.dialog-table-name {
    display: flex;
    .table-name-img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    .dtable-name-text {
        margin-top: 10px;
        margin-left: 10px;
    }
}
.return-btn {
    color: #868686;
    cursor: pointer;
}
.return-btn:hover {
    color: #409eff;
}
.choose-service,
.basic-info,
.inventory-info {
    background: #fff;
    border: 1px #e2e2e2 solid;
    border-radius: 5px;
    margin: 20px 0;
}
.choose-service-title,
.basic-info-title,
.inventory-info-title {
    padding: 20px 40px 0px;
    color: #000;
    font-weight: bold;
    font-size: 14px;
}
.choose-service-list {
    padding: 10px 20px 20px;
}
.choose-service-list {
    display: flex;
    flex-wrap: wrap;
    .service-list-item {
        margin: 20px;
        width: calc(20% - 60px);
        height: 70px;
        line-height: 25px;
        border: 1px #ccc solid;
        border-radius: 8px;
        padding: 11px 25px;
        display: flex;
        justify-content: space-between;
        position: relative;
        .item-title {
            font-weight: bold;
            .iconfont {
                color: #ccc;
            }
        }
        .item-old-title {
            color: #ccc;
        }
        .list-item-icon {
            line-height: 50px;
            .iconfont {
                font-size: 40px !important;
            }
        }
        .ab-icon {
            position: absolute;
            bottom: -6px;
            right: -6px;
            background: #409eff;
            width: 18px;
            height: 18px;
            line-height: 18px;
            text-align: center;
            border-radius: 50%;
            color: #fff;
        }
    }
}
.basic-info-from {
    display: flex;
    margin: 40px;
    .info-from-title {
        line-height: 40px;
        width: 100px;
    }
    .info-from-content {
        width: 50%;
        display: flex;
        .store-info-box {
            min-height: 40px;
            width: 620px;
            border-radius: 3px;
            padding: 0 10px;
            display: flex;
            flex-wrap: wrap;
            background: #f3f3f3;
            .info-box-div {
                border: 1px #ccc solid;
                padding: 0px 10px;
                cursor: pointer;
                height: 20px;
                font-size: 10px;
                margin: 10px 0 10px 5px;
            }
            .info-box-div:hover {
                background: #409eff;
                color: #fff;
                border: 1px #409eff solid;
            }
            .info-box-img {
                width: 10px;
                height: 10px;
                border-radius: 50%;
            }
        }
        input {
            height: 40px;
            line-height: 40px;
        }
        .effective-time {
            line-height: 40px;
            margin-right: 10px;
        }
    }
    .basic-info-input {
        width: 200px;
    }
    .info-from-grant {
        .basic-info-input {
            width: 104px;
        }
        .basic-info-select {
            width: 100px;
            margin-left: -8px;
        }
        .is-voucher {
            display: inline-block;
            margin-left: 20px;
        }
    }
}
.bottom-btn-group {
    text-align: center;
    margin-top: 80px;
    .el-button {
        padding: 10px 40px;
    }
}
</style>