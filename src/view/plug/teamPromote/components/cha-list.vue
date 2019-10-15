<!--
 * @Author: tianbo
 * @LastEditors: tianbo
 * @Date: 2019-09-27 17:34:35
 * @LastEditTime: 2019-10-11 15:11:09
 -->
<template>
    <div>
        <table width="100%" class="reg-list-table" v-loading="loading">
            <thead>
                <tr class="reg-list-header">
                    <td>头像/昵称</td>
                    <td>姓名</td>
                    <td>手机号</td>
                    <td>项目规格</td>
                    <td>金额</td>
                    <td>支付状态</td>
                    <td>商户订单号</td>
                    <td>报名时间</td>
                    <!-- <td>推荐人</td> -->
                    <td>操作</td>
                </tr>
            </thead>
            <tbody v-for="(item, index) in management.items" :key="index">
                <tr class="reg-list-tbody">
                    <td>
                        <div class="reg-image-box">
                            <div>
                                <img
                                    :src="
                                        item.head_img ||
                                            '../../../../assets/bgUser.jpg'
                                    "
                                />
                            </div>
                            <div class="reg-image-name">
                                <span>{{ item.nickname }}</span>
                            </div>
                        </div>
                    </td>
                    <td>{{ item.realname }}</td>
                    <td>{{ item.mobile }}</td>
                    <td>{{ item.ticket_name }}</td>
                    <td>{{ item.pay_price / 100 }}元</td>
                    <td>{{ item.pay_status }}</td>
                    <td>{{ item.order_code }}</td>
                    <td>{{ item.create_time }}</td>
                    <!-- <td>{{ item.upper_name }}</td> -->
                    <td>
                        <span
                            @click="changeShowDetails(index)"
                            class="reg-table-btn"
                            style="margin-left: 20px; display: inline-block; padding: 0 5px; cursor: pointer; background: #409eff; color: #fff; border-radius: 4px;"
                            >详情</span
                        >
                        <!-- <span v-show="(item.status === 1 && item.voucher.lenght == 0)">
                          补发核销券
                        </span> -->
                    </td>
                </tr>
                <tr v-show="index === showDetails">
                    <td colspan="10">
                        <div class="reg-list-details">
                            <div class="list-details-box" style="width:25%">
                                <div class="list-details-left">表单信息</div>
                                <div class="list-details-right">
                                    <div>姓名:{{ item.nickname }}</div>
                                    <div>手机:{{ item.mobile }}</div>
                                    <div>
                                        微信:{{
                                            item.whchat_account || "未绑定微信"
                                        }}
                                    </div>
                                    <div>
                                        年龄:{{ item.age || "未填写微信" }}
                                    </div>
                                    <div>
                                        身份证:{{
                                            item.identity || "未绑定身份证"
                                        }}
                                    </div>
                                </div>
                            </div>
                            <div class="list-details-box" style="width:50%">
                                <div class="list-details-left">核销券信息</div>
                                <div
                                    class="list-details-right"
                                    v-show="item.voucher !== 0"
                                >
                                    <div
                                        class="details-btn-box"
                                        v-for="(o, i) in item.voucher"
                                        :key="i"
                                    >
                                        <span
                                            class="details-right-btn"
                                            :class="{
                                                'voucher-end': o.limit == 0
                                            }"
                                            >{{ o.title }}</span
                                        >
                                        <span>剩余：{{ o.limit }}</span>
                                        <span
                                            v-show="o.voucher_time.length === 0"
                                            class="see-voucher"
                                            style="color:#ccc"
                                        >
                                            暂无核销
                                        </span>
                                        <div style="display: inline-table;">
                                            <span
                                                v-show="
                                                    o.voucher_time.length !== 0
                                                "
                                                class="see-voucher"
                                                @click="openVoucherList(o, i)"
                                            >
                                                查看核销情况
                                            </span>
                                            <div
                                                class="alert-voucher-info"
                                                v-show="
                                                    o.voucher_time.length !==
                                                        0 && isShow === i
                                                "
                                            >
                                                <div
                                                    class="alert-voucher-close"
                                                    @click="close()"
                                                >
                                                    <span
                                                        ><i
                                                            class="iconfont iconguanbi2"
                                                        ></i
                                                    ></span>
                                                </div>
                                                <div class="voucher-info-box">
                                                    <table>
                                                        <tr
                                                            style="text-align:center"
                                                        >
                                                            <th>次数</th>
                                                            <th>核销时间</th>
                                                            <th>核销人</th>
                                                        </tr>
                                                        <tr
                                                            v-for="(item,
                                                            index) in voucherList"
                                                            :key="index"
                                                        >
                                                            <td>
                                                                第{{
                                                                    index + 1
                                                                }}次
                                                            </td>
                                                            <td>
                                                                {{ item.time }}
                                                            </td>
                                                            <td>
                                                                {{ item.name }}
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="list-details-right"
                                    v-show="item.voucher === 0"
                                >
                                    <div style="color:#ccc">
                                        暂无核销数据
                                    </div>
                                </div>
                            </div>
                            <div class="list-details-box" style="width:25%">
                                <div class="list-details-left">上级推荐人</div>
                                <div class="list-details-right">
                                    <div>姓名:{{ item.upper_name }}</div>
                                    <div>手机号:{{ item.upper_mobile }}</div>
                                    <div>获红包:{{ item.price }}元</div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: "regList",
    props: ["management", "loading"],
    data() {
        return {
            // 是否显示详情
            showDetails: -1,
            defaultImg: "../../../assets/bgUser.jpg",
            voucherList: {},
            isShow: -1
        };
    },
    methods: {
        changeShowDetails(index) {
            if (this.showDetails === index) {
                this.showDetails = -1;
            } else {
                this.showDetails = index;
                this.isShow = -1;
            }
        },
        // 打开核销券的弹窗
        openVoucherList(info, index) {
            let that = this;
            that.voucherList = info.voucher_time;
            that.isShow = index;
        },
        //关闭弹窗
        close() {
            this.isShow = -1;
        }
    }
};
</script>
<style lang="scss" scoped>
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
            justify-content: flex-start;
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
            td {
                padding: 10px 0;
                border-bottom: 1px #ccc solid;
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
</style>

