<!--
 * @Author: zlz5v5
 * @LastEditors: tianbo
 * @Date: 2019-09-12 10:22:54
 * @LastEditTime: 2019-10-10 14:26:00
 -->
<template>
    <div class="act-main" v-loading="loading">
        <el-table
            :data="assembleData.items"
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
                            <span class="activ-name-title ellipsis">{{ scope.row.title }}</span>
                            <span>{{ scope.row.start_time }}</span>
                            <span>{{ scope.row.end_time }}</span>
                            <div>组队拼团</div>
                        </div>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="状态" width="200" align="center">
                <template slot-scope="scope">
                    <div class="activ-state">
                        <div v-if="scope.row.state == 0">
                            <div>
                                <el-switch
                                    v-model="scope.row.is_pause"
                                    :inactive-text="
                                        scope.row.is_pause == 0
                                            ? scope.row.overdue
                                                ? '即将结束'
                                                : '进行中'
                                            : '已暂停'
                                    "
                                    :active-value="0"
                                    :inactive-value="1"
                                    @change="
                                        conductState(
                                            scope.row.cluster_id,
                                            1,
                                            scope.row.is_pause
                                        )
                                    "
                                ></el-switch>
                                <el-tooltip class="activ-hint" effect="light" placement="top-start">
                                    <div slot="content" style="width: 200px">
                                        <div>可暂停活动,暂停后手机端不可报名</div>
                                    </div>
                                    <i class="el-icon-question"></i>
                                </el-tooltip>
                            </div>
                        </div>

                        <div v-else-if="scope.row.state == 1">
                            <div>
                                <el-switch inactive-text="未开启" :inactive-value="1" :disabled="true"></el-switch>
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

                        <div v-else-if="scope.row.state == 2">
                            <div>
                                <el-switch inactive-text="已结束" :inactive-value="2" :disabled="true"></el-switch>
                                <el-tooltip class="activ-hint" effect="light" placement="top-start">
                                    <div slot="content">
                                        <div>活动已结束</div>
                                    </div>
                                    <i class="el-icon-question"></i>
                                </el-tooltip>
                            </div>
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
                                                scope.row.expend - scope.row.bucklePoint
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

            <el-table-column label="操作" align="center" min-width="250">
                <template slot-scope="scope">
                    <div class="activ-operation">
                        <div>
                            <a @click="preview(scope.row)">预览</a>
                            <router-link
                                tag="a"
                                :to="
                                    '/create_home?title=create_activity&cluster_id=' +
                                        scope.row.cluster_id +
                                        '&activityShow=0'
                                "
                                target="_blank"
                            >编辑</router-link>
                            <router-link
                                tag="a"
                                :to="
                                    '/team_up?activeName=0&active_id=' +
                                        scope.row.cluster_id
                                "
                            >报名管理</router-link>
                            <a class="activ-hover">
                                更多
                                <ul>
                                    <li>
                                        <a @click="jumpRoute(scope.row)">渠道数据</a>
                                    </li>
                                    <li>
                                        <a
                                            :href="
                                                '/merchant/manage_active/data?aid=' +
                                                    scope.row.cluster_id
                                            "
                                        >传播数据</a>
                                    </li>
                                    <li>
                                        <a
                                            @click="
                                                deleteActivity(
                                                    scope.row.cluster_id
                                                )
                                            "
                                        >删除</a>
                                    </li>
                                </ul>
                            </a>
                        </div>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页-begin -->
        <div class="footer">
            <el-pagination
                @current-change="currentChange"
                background
                :total="assembleData.total"
                layout="total, prev, pager, next, jumper"
                :current-page="1"
                :show-summary="false"
            ></el-pagination>
        </div>
        <!-- 分页-end -->
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
                :model_id="4"
                :channel_status="channel_status"
                :show="show"
                @editTitle="editTitle"
            />
        </el-dialog>
        <!-- 二维码弹窗-end -->
    </div>
</template>

<script>
// 工具函数
import { __globalApl, timeStamp } from "@/assets/js/unlis";
// ajax
import { getApplymanage, getManageInfo } from "@/api/api";
import qrcode from "@/view/activity/components/qrcode";
export default {
    props: ["assembleIsDel", "listState", "assembleIsDel"],
    components: {
        qrcode
    },
    data() {
        return {
            loading: false,
            centerDialogVisible: false, // 二维码弹窗显示隐藏
            centerDialogText: "预览", // 弹窗标题文字
            cluster_id: "", // 拼团
            cover_img: "",
            assembleData: [], // 拼团数据
            page: 1, // 分页
            name: "", // 查询数据
            show: true, // 弹出层
            channel_status: false // 是否开通渠道管理
        };
    },
    created() {
        this.activeName = this.$route.query.tab;
        if (this.activeName == 1) {
            this.getAssembleData();
        }
    },
    methods: {
        // 修改标题
        editTitle() {
            this.centerDialogText = "渠道专属链接";
            this.show = false;
        },
        // 获取拼团数据
        getAssembleData(name) {
            this.loading = true;
            // 1, 获取当前时间戳
            let currentTime = new Date().getTime();

            this.name = name;
            let params = {
                shop_id: localStorage.getItem("shop_id"),
                token: localStorage.getItem("token"),
                page: this.page,
                name: name,
                is_del: 0,
                type: 1
            };
            getManageInfo({ params }).then(res => {
                if (res.data.status === 0) {
                    res.data.data.items.forEach((item, index) => {
                        let end_time = timeStamp(item.end_time);
                        if (end_time - currentTime < 24 * 60 * 60 * 1000 - 1) {
                            item["overdue"] = true;
                        }
                        item["state"] = 0;
                        if (currentTime < timeStamp(item.start_time)) {
                            item["state"] = 1;
                        }
                        if (currentTime > timeStamp(item.end_time)) {
                            item["state"] = 2;
                        }
                    });
                    this.assembleData = res.data.data;
                    this.loading = false;
                }
            });
        },
        // 获取分页
        currentChange(val) {
            this.loading = true;
            this.page = val;
            this.getAssembleData(this.name);
        },
        // 进行中和暂停切换
        conductState(id, index, val) {
            let params = {
                active_id: id,
                model_id: 4,
                type: index,
                content: val
            };
            getApplymanage({ params }).then(res => {
                if (res.data.status === 0) {
                }
            });
        },
        // 删除
        deleteActivity(cluster_id) {
            let params = {
                active_id: cluster_id,
                type: 2,
                model_id: 4,
                content: 1
            };
            getApplymanage({ params }).then(res => {
                if (res.data.status === 0) {
                    if (this.page > 1 && this.assembleData.length == 1) {
                        this.page--;
                    }
                    this.getAssembleData(this.name);
                }
            });
        },
        // 预览
        preview(item) {
            if (this.assembleData.can_preview) {
                this.cluster_id = item.cluster_id;
                this.cover_img = item.cover_img
                this.channel_status = item.channel_status;
                this.centerDialogVisible = true;
                this.show = true;
                this.centerDialogText = "预览";
                // 在此操作预览
            } else {
                this.$confirm("请补全店铺信息,才能进行预览", "提示", {
                    confirmButtonText: "去补全",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        // 跳转到设置页面
                        this.$router.push({ path: "/setting" });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消补全"
                        });
                    });
            }
        },
        jumpRoute(item) {
            if (item.channel_status) {
                this.$router.push({
                    path: "/teamPromote",
                    query: {
                        active_id: item.cluster_id,
                        model_id: 4
                    }
                })
            } 
            else {
                this.$router.push({
                    path: "/unlock",
                    query: {
                        plugin_id: 19,
                    }
                })
            }
        }
    }
};
</script>

<style lang="scss" scoped>
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
            background-color: rgba(64, 158, 255, 1);
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

// footer 分页
.footer {
    padding: 30px 0;
    text-align: center;
}

.qrcode {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 850px;
    height: 800px;
    background: #fff;
    box-shadow: 0px 2px 10px rgba(202, 202, 202, 1);
}
</style>
