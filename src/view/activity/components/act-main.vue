<!--
 * @Author: zlz5v5
 * @LastEditors: tianbo
 * @Date: 2019-08-13 17:38:36
 * @LastEditTime: 2019-10-10 14:25:37
 -->
<template>
    <div class="act-main">
        <el-table
            :data="data.items"
            :header-cell-style="{
                background: 'rgba(242, 242, 242, 1)',
                color: '#333',
                fontWeight: '400'
            }"
            style="width: 100%"
        >
            <el-table-column label="活动名称/时间/类型" min-width="300">
                <template slot-scope="scope">
                    <div class="main-item">
                        <div class="activ-head">
                            <img :src="scope.row.cover_img" />
                        </div>
                        <div class="activ-name">
                            <span class="activ-name-title ellipsis">
                                {{
                                scope.row.active_title
                                }}
                            </span>
                            <span>{{ scope.row.start_time }}</span>
                            <span>{{ scope.row.end_time }}</span>
                            <div>{{ scope.row.model_title }}</div>
                        </div>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="状态" width="200" align="center">
                <template slot-scope="scope">
                    <div class="activ-state">
                        <div
                            v-if="
                                scope.row.is_pause == 1 ||
                                    scope.row.is_pause == 0
                            "
                        >
                            <div
                                :style="{
                                    paddingRight:
                                        scope.row.is_pause == 1
                                            ? scope.row.full_amount
                                                ? '0px'
                                                : scope.row.overdue
                                                ? '15px'
                                                : '0px'
                                            : '0px'
                                }"
                            >
                                <el-switch
                                    v-model="scope.row.is_pause"
                                    :inactive-text="
                                        scope.row.is_pause == 1
                                            ? scope.row.diff <= 0
                                                ? '已满额'
                                                : scope.row.overdue
                                                ? '即将结束'
                                                : '进行中'
                                            : '已暂停'
                                    "
                                    :active-value="1"
                                    :inactive-value="0"
                                    @change="
                                        conductState(
                                            scope.row.active_id,
                                            0,
                                            scope.row.is_pause
                                        )
                                    "
                                    :disabled="!listState"
                                ></el-switch>
                                <el-tooltip class="activ-hint" effect="light" placement="top-start">
                                    <div slot="content" style="width: 200px">
                                        <div>可暂停活动,暂停后手机端不可报名</div>
                                    </div>
                                    <i class="el-icon-question"></i>
                                </el-tooltip>
                            </div>
                        </div>

                        <div v-else-if="scope.row.is_pause == 2">
                            <div>
                                <el-switch
                                    inactive-text="未开启"
                                    :inactive-value="scope.row.is_pause"
                                    :disabled="true"
                                ></el-switch>
                                <el-tooltip class="activ-hint" effect="light" placement="top-start">
                                    <div slot="content" style="width: 300px">
                                        <div>
                                            活动未开启, 将在{{
                                            scope.row.start_time
                                            }}开启活动
                                        </div>
                                    </div>
                                    <i class="el-icon-question"></i>
                                </el-tooltip>
                            </div>
                        </div>

                        <div v-else-if="scope.row.is_pause == 3">
                            <div>
                                <el-switch
                                    inactive-text="已结束"
                                    :inactive-value="scope.row.is_pause"
                                    :disabled="true"
                                ></el-switch>
                                <el-tooltip class="activ-hint" effect="light" placement="top-start">
                                    <div slot="content">
                                        <div>活动已结束</div>
                                    </div>
                                    <i class="el-icon-question"></i>
                                </el-tooltip>
                            </div>
                        </div>

                        <div>
                            <el-switch
                                v-model="scope.row.is_recommend"
                                :inactive-text="
                                    scope.row.is_recommend == 1
                                        ? '已推荐'
                                        : '未推荐'
                                "
                                :active-value="1"
                                :inactive-value="0"
                                @change="
                                    conductState(
                                        scope.row.active_id,
                                        1,
                                        scope.row.is_recommend
                                    )
                                "
                                :disabled="!listState"
                            ></el-switch>
                            <el-tooltip class="activ-hint" effect="light" placement="top-start">
                                <div slot="content" style="width: 300px">
                                    <div
                                        style="margin-bottom: 15px;"
                                    >开启推荐，可将活动推荐至活动阁官方活动平台，享全站粉丝流量曝光。</div>
                                    <div>关闭推荐，则默认为自己推广活动，无平台流量。</div>
                                </div>
                                <i class="el-icon-question"></i>
                            </el-tooltip>
                        </div>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="数据概况" width="350" align="center">
                <template slot-scope="scope">
                    <div class="activ-survey">
                        <b>
                            ￥{{
                            (scope.row.income - scope.row.expend).toFixed(2)
                            }}
                            <el-tooltip class="activ-hint" effect="light" placement="top-start">
                                <div slot="content" style="width: 200px">
                                    <div>该金额为活动收款金额扣除支出金额，为最终的收益金额</div>
                                </div>
                                <i class="el-icon-question"></i>
                            </el-tooltip>
                        </b>
                        <div class="activ-survey-enrolled">
                            <el-progress
                                :text-inside="true"
                                :stroke-width="16"
                                :percentage="
                                    scope.row.diff == 0
                                        ? 100
                                        : (parseInt(scope.row.total) /
                                              (parseInt(scope.row.total) +
                                                  parseInt(scope.row.diff))) *
                                          100
                                "
                                class="activ-progress"
                                :show-text="false"
                            ></el-progress>
                            <span>已报名{{ scope.row.total }}人</span>
                        </div>
                        <div class="activ-survey-item">
                            <span>访客量：{{ scope.row.page_view }}</span>
                            <span>
                                收款：￥{{ scope.row.income }}
                                <el-tooltip class="activ-hint" effect="light" placement="top-start">
                                    <div slot="content" style="width: 200px">
                                        <div>该收款为活动总收款</div>
                                    </div>
                                    <i class="el-icon-question"></i>
                                </el-tooltip>
                            </span>
                        </div>
                        <div class="activ-survey-item">
                            <span>报名率：{{ scope.row.percent }}</span>
                            <span>
                                支出：￥{{ scope.row.expend }}
                                <el-tooltip class="activ-hint" effect="light" placement="top-start">
                                    <div slot="content" style="width: 200px">
                                        <div style="line-height: 180%">
                                            <p>
                                                红包支出金额:{{
                                                scope.row.expend -
                                                scope.row.bucklePoint
                                                }}+交易费率金额:{{
                                                scope.row.bucklePoint
                                                }}
                                            </p>
                                            <p>
                                                当前店铺交易费率为{{
                                                scope.row.rate
                                                }}
                                            </p>
                                        </div>
                                    </div>
                                    <i class="el-icon-question"></i>
                                </el-tooltip>
                            </span>
                        </div>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="剩余名额" align="center" width="120">
                <template slot-scope="scope">
                    <div class="activ-residue-regist">
                        <div v-if="listState">
                            <div v-if="scope.row.fix">
                                <el-input
                                    v-show="scope.row.edit_quota"
                                    v-model="scope.row.diff"
                                    :ref="scope.row.ref"
                                    onkeyup="this.value = this.value.replace(/[^\.\d]/g,'')"
                                    @blur="editSignUp(scope.$index, $event)"
                                ></el-input>
                                <span
                                    v-show="!scope.row.edit_quota"
                                    @click="getFocus(scope.$index)"
                                >
                                    {{ scope.row.diff || 0 }}
                                    <i class="iconfont iconbianji1"></i>
                                </span>
                            </div>

                            <div v-else>
                                <el-tooltip class="activ-hint" effect="light" placement="top-start">
                                    <div slot="content">多规格不支持快速修改</div>
                                    <span>
                                        {{ scope.row.diff || 0 }}
                                        <i class="iconfont iconbianji1"></i>
                                    </span>
                                </el-tooltip>
                            </div>
                        </div>

                        <div v-else>
                            <span>{{ scope.row.diff || 0 }}</span>
                        </div>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="操作" align="center" min-width="250">
                <template slot-scope="scope">
                    <div class="activ-operation">
                        <div v-if="listState">
                            <a @click="preview(scope.row)">预览</a>
                            <a
                                :href="
                                    '/merchant/manage_active/edit?id=' +
                                        scope.row.active_id +
                                        '&model_id=' +
                                        scope.row.m_id
                                "
                            >编辑</a>
                            <router-link
                                tag="a"
                                :to="
                                    '/registration?active_id=' + scope.row.active_id
                                "
                            >报名管理</router-link>
                            <a class="activ-hover">
                                更多
                                <ul>
                                    <li>
                                        <a
                                            :href="
                                                '/merchant/manage_active/red?aid=' +
                                                    scope.row.active_id
                                            "
                                        >红包数据</a>
                                    </li>
                                    <li>
                                        <a @click="jumpRoute(scope.row)">渠道数据</a>
                                    </li>
                                    <li>
                                        <a
                                            :href="
                                                '/merchant/manage_active/data?aid=' +
                                                    scope.row.active_id
                                            "
                                        >传播数据</a>
                                    </li>
                                    <li>
                                        <a @click="deleteActivity(scope.$index)">删除</a>
                                    </li>
                                </ul>
                            </a>
                        </div>
                        <div v-else>
                            <a @click="reduction(scope.row.active_id)">还原</a>
                        </div>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <!-- <el-dialog :visible.sync="qrcodeVisible" width="360px" :center="true">
            <div style="margin-bottom: 15px; text-align: center;">
                微信扫码查看活动页面
            </div>
            <vue-qr
                :text="url + '/wap/active/index/' + qrcode"
                :margin="0"
                :size="150"
                :auto-color="true"
                :dot-scale="1"
                style="display: block; margin: 0 auto;"
            ></vue-qr>
            <span slot="footer" class="dialog-footer">
                <el-button
                    type="primary"
                    v-clipboard:success="copy"
                    v-clipboard:copy="url + '/wap/active/index/' + qrcode"
                    >点击复制</el-button
                >
            </span>
        </el-dialog>-->
        <!-- 二维码弹窗-begin -->
        <el-dialog
            :title="centerDialogText"
            width="750px"
            :visible.sync="centerDialogVisible"
            :modal-append-to-body="false"
        >
            <qrcode
                :cluster_id="cluster_id"
                :cover_img="cover_img"
                :model_id="2"
                :channel_status="channel_status"
                :show="show"
                @editTitle="editTitle"
            />
        </el-dialog>
        <!-- 二维码弹窗-end -->
    </div>
</template>

<script>
// 生成二维码
// import vueQr from "vue-qr";
import qrcode from "@/view/activity/components/qrcode";
// 工具函数
// import { __globalApl } from "@/assets/js/unlis";
// ajax
import { getApplymanage } from "@/api/api";

export default {
    components: { qrcode },
    props: ["data", "listState"],
    data() {
        return {
            centerDialogVisible: false, // 二维码弹窗显示隐藏
            centerDialogText: "预览", // 弹窗标题文字
            cluster_id: "", // 拼团
            cover_img: "",
            show: true, // 弹出层
            channel_status: false, // 是否开通渠道管理
            // qrcodeVisible: false, // 二维码弹窗显示隐藏
            // url: __globalApl, // 域名
            // qrcode: "", // 二维码路径
            id: 0, // 提交修改活动id
            type: 0, // 提交修改活动类型
            content: 0, // 提交修改参数值
            ticket_id: "" // 提交ticket_id
        };
    },
    methods: {
        // 修改标题
        editTitle() {
            this.centerDialogText = "渠道专属链接";
            this.show = false;
        },
        // 跳转渠道
        jumpRoute(item) {
            if (item.channel_status) {
                this.$router.push({
                    path: "/teamPromote",
                    query: {
                        active_id: item.active_id,
                        model_id: 2
                    }
                });
            } else {
                this.$router.push({
                    path: "/unlock",
                    query: {
                        plugin_id: 19,
                    }
                });
            }
        },
        // 自动获取焦点
        getFocus(index) {
            let _that = this;
            _that.data.items[index].edit_quota = true;
            _that.$nextTick(() => {
                _that.$refs[_that.data.items[index].ref].focus();
            });
        },
        // 编辑剩余人名额
        editSignUp(index, event) {
            let _that = this;
            let active_id = _that.data.items[index].active_id;
            _that.data.items[index].diff = event.target.value;
            let ticket_id = _that.data.items[index].ticket_id;
            let diff = event.target.value;
            if (diff == "") {
                diff = 0;
            }
            _that.data.items[index].edit_quota = false;

            _that.id = active_id;
            _that.ticket_id = ticket_id;
            _that.type = 3;
            _that.content = diff;
            _that.toOperate();
        },
        // 活动进行暂停切换
        conductState(id, index, val) {
            let _that = this;
            _that.id = id;
            _that.type = index;
            _that.content = val;
            _that.toOperate();
        },
        // 删除
        deleteActivity(index) {
            let _that = this;
            let active_id = _that.data.items[index].active_id;
            let is_pause = _that.data.items[index].is_pause;
            let full_amount = _that.data.items[index].full_amount;
            let overdue = _that.data.items[index].overdue;

            if (is_pause == 0 || is_pause == 1 || full_amount || overdue) {
                _that.$message({
                    type: "warning",
                    message: "当前活动不能删除!"
                });
            } else {
                _that
                    .$confirm("此操作将删除该活动, 是否继续?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    })
                    .then(() => {
                        _that.id = active_id;
                        _that.type = 2;
                        _that.content = 1;
                        _that.toOperate();
                        _that.$emit("editDelte");
                        _that.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                    })
                    .catch(() => {
                        _that.$message({
                            type: "info",
                            message: "已取消删除"
                        });
                    });
            }
        },
        // 还原
        reduction(id) {
            let _that = this;
            _that
                .$confirm("此操作将还原该活动, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                .then(() => {
                    _that.id = id;
                    _that.type = 2;
                    _that.content = 0;
                    _that.toOperate();
                    _that.$emit("editDelte");
                    _that.$message({
                        type: "success",
                        message: "还原成功!"
                    });
                })
                .catch(() => {
                    _that.$message({
                        type: "info",
                        message: "已取消还原"
                    });
                });
        },
        // 预览
        preview(item) {
            let _that = this;

            if (_that.data.can_preview) {
                _that.cluster_id = item.active_id;
                _that.cover_img = item.cover_img
                _that.channel_status = item.channel_status;
                _that.centerDialogVisible = true;
                _that.show = true;
                _that.centerDialogText = "预览";
            } else {
                _that
                    .$confirm("请补全店铺信息,才能进行预览", "提示", {
                        confirmButtonText: "去补全",
                        cancelButtonText: "取消",
                        type: "warning"
                    })
                    .then(() => {
                        // 跳转到设置页面
                        this.$router.push({ path: "/setting" });
                    })
                    .catch(() => {
                        _that.$message({
                            type: "info",
                            message: "已取消补全"
                        });
                    });
            }
        },
        // 复制
        copy() {
            let _that = this;
            _that.$message({
                message: "复制成功",
                type: "success"
            });
        },
        // 删除、编辑
        toOperate() {
            let _that = this;
            let params = {
                active_id: _that.id,
                type: _that.type,
                content: _that.content
            };
            if (_that.type == 3) {
                let params = {
                    active_id: _that.id,
                    type: _that.type,
                    content: _that.content,
                    ticket_id: _that.ticket_id
                };
                getApplymanage({ params }).then(res => {
                    if (res.data.status === 0) {
                    }
                });
            } else if (_that.type == 2) {
                getApplymanage({ params }).then(res => {
                    if (res.data.status === 0) {
                        _that.$emit("editDelte");
                    }
                });
            } else {
                getApplymanage({ params }).then(res => {
                    if (res.data.status === 0) {
                    }
                });
            }
        }
    }
};
</script>

<style lang="scss">
.act-main {
    .main-item {
        display: flex;
        padding: 20px 0;
    }
    // 活动名称/时间/类型
    .activ-head {
        width: 86px;
        height: 120px;
        background-color: #eee;
        border-radius: 3px;
        overflow: hidden;
        margin-right: 15px;
        margin-left: 30px;
        img {
            width: 100%;
            height: 100%;
            display: block;
        }
    }
    .activ-name {
        width: calc(100% - 131px);
        span {
            color: #a1a1a1;
            display: block;
            font-size: 12px;
        }
        .activ-name-title {
            color: #333;
            min-width: calc(300px - 131px);
            margin: 5px 0;
            font-size: 14px;
        }
        p {
            color: #333;
        }
        div {
            margin-top: 15px;
            font-size: 12px;
            display: inline-block;
            border-radius: 5px;
            padding: 0 10px;
            color: #fff;
            background-color: #f68080;
        }
    }
    // 状态
    .activ-state {
        i {
            color: #ccc;
            font-size: 18px;
            margin-left: 10px;
            vertical-align: middle;
        }
        .el-switch {
            margin: 10px 0;
        }
    }
    // 数据概况
    .activ-survey {
        padding: 0 30px;
        b {
            font-size: 24px;
            color: #f68080;
            font-weight: bold;
            i {
                padding-bottom: 5px;
                font-size: 18px;
                color: #ccc;
                margin-left: 10px;
                vertical-align: middle;
            }
        }
        .activ-progress {
            margin: 5px 0 10px 0;
        }
        .activ-survey-item {
            display: flex;
            justify-content: space-between;
            color: #a1a1a1;
            i {
                color: #ccc;
                margin-left: 10px;
                vertical-align: middle;
            }
        }
        .activ-survey-enrolled {
            position: relative;
            span {
                position: absolute;
                top: 0;
                left: 0;
                font-size: 12px;
                line-height: 18px;
                padding-left: 5px;
                color: #fff;
            }
        }
    }
    // 剩余报名数
    .activ-residue-regist {
        .el-input {
            width: 60px;
        }
        span {
            i {
                display: none;
            }
        }
    }
    .el-table__row:hover {
        span {
            i {
                display: inline-block;
            }
        }
    }
    // 操作
    .activ-operation {
        > div {
            > a {
                font-size: 16px;
                color: #409eff;
                cursor: pointer;
            }
        }
        .activ-hover {
            color: #333;
            border-left: 1px solid #bbb;
            padding-left: 10px;
            margin-left: 10px;
            position: relative;
            ul {
                position: absolute;
                z-index: 1;
                top: 10px;
                left: -25%;
                background-color: #fff;
                width: 80px;
                display: none;
                box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
                li {
                    float: left;
                    width: 100%;
                    text-align: center;
                }
                li:hover {
                    background-color: #409eff;
                    a {
                        color: #fff;
                    }
                }
                a {
                    font-size: 12px;
                    display: block;
                    width: 100%;
                    height: 100%;
                    color: #666;
                }
            }
        }
        .activ-hover:hover {
            ul {
                display: block;
            }
        }
    }
}

// 二维码样式
.el-dialog--center .el-dialog__body {
    margin: 0 auto;
    display: inline-block;
}
.fix-popup .el-input__inner {
    width: 100px;
}
// element内置样式修改
.el-progress-bar__outer {
    background-color: #d3e1fb;
}
.el-table th > .cell {
    padding-left: 10px;
}
.el-table .cell,
.el-table th div {
    overflow: visible !important;
}
.el-table__body-wrapper {
    overflow-x: auto;
}
</style>
