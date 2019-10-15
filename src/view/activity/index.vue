<!--
 * @Author: zlz5v5
 * @LastEditors: tianbo
 * @Date: 2019-09-17 10:23:01
 * @LastEditTime: 2019-10-08 14:37:51
 -->
<template>
    <div class="activity">
        <!-- 扩客红包搜索-begin -->
        <div class="act-header" v-show="activeName == 0">
            <el-input placeholder="请输入活动名称" v-model="name" class="input-with-select">
                <el-button
                    slot="append"
                    icon="el-icon-search"
                    class="search-btn"
                    @click="searchBtn"
                >搜索</el-button>
            </el-input>
            <el-button type="primary" @click="getRecycle">
                {{
                recycleIn
                }}
            </el-button>
        </div>
        <!-- 扩客红包搜索-end -->
        <!-- 组队拼团搜索-begin -->
        <div class="act-header" v-show="activeName == 1">
            <el-input placeholder="请输入活动名称" v-model="assembleName" class="input-with-select">
                <el-button
                    slot="append"
                    icon="el-icon-search"
                    class="search-btn"
                    @click="assembleSearchBtn"
                >搜索</el-button>
            </el-input>
            <el-button type="primary" @click="getAssembleRecycle">
                {{
                assembleText
                }}
            </el-button>
        </div>
        <!-- 组队拼团搜索-end -->
        <!-- 标签tabs-begin -->
        <el-tabs
            v-model="activeName"
            @tab-click="handleClick"
            style="padding-left: 10px; display: inline-block;"
        >
            <el-tab-pane label="红包拓客" name="0"></el-tab-pane>
            <el-tab-pane label="组队拼团" name="1"></el-tab-pane>
        </el-tabs>
        <act-main
            v-loading="loading"
            :data="data"
            :listState="listState"
            @editDelte="editDelte"
            v-show="activeName == 0"
        />
        <actAssemble ref="actAssemble" v-show="activeName == 1 && assembleState == true" />

        <actAssembleRetrieve
            ref="actAssembleRetrieve"
            v-show="activeName == 1 && assembleState == false"
        />

        <!-- 标签tabs-end -->

        <!-- 拓客红包分页-begin -->
        <div class="act-Footer">
            <el-pagination
                v-show="activeName == 0"
                @current-change="currentChange"
                background
                :total="total"
                layout="total, prev, pager, next, jumper"
                :current-page="currentPaging"
                :show-summary="false"
            ></el-pagination>
        </div>
        <!-- 拓客红包分页-end -->
    </div>
</template>

<script>
// 工具函数
import { timeStamp } from "@/assets/js/unlis.js";
// ajax
import { getManageInfo } from "@/api/api";
// 扩客红包
import actMain from "./components/act-main";
// 组队拼团
import actAssemble from "./components/act-assemble";
// 组件拼团回收站
import actAssembleRetrieve from "./components/act-assemble-retrieve";

export default {
    components: {
        actMain,
        actAssemble,
        actAssembleRetrieve
    },
    name: 'activity',
    data() {
        return {
            activeName: "0", // tabs 标签
            loading: true,

            data: [], // 红包数据
            name: "", // 搜索数据
            nameAff: "",
            nameNo: "",
            total: 0, // 分页数
            recycleIn: "活动回收站", //活动回收站文字
            listState: true, // 活动回收站状态
            isDel: 0, // 活动回收站切换
            page: 1, // 当前分页记录值
            pageAff: 1, // 普通分页记录值
            pageNo: 1, // 回收站分页记录值
            pageShow: false, //搜索重定向到第一页
            currentPaging: 1, // 重定向分页记录值

            assembleState: true, // 拼团回收站状态
            assembleText: "活动回收站", // 拼团回收站文字
            assembleName: "", // 拼团搜索内容
            assembleNameAff: "", // 拼团搜索内容
            assembleNameNo: "" // 拼团搜索内容
        };
    },
    methods: {
        // 组队拼团 begin

        // 标签页
        handleClick() {
            if (this.activeName == 0) {
                this.getData();
            }
            if (this.activeName == 1) {
                if (this.assembleState) {
                    this.$refs.actAssemble.getAssembleData(this.assembleName);
                } else {
                    this.$refs.actAssembleRetrieve.getAssembleData();
                }
            }
        },

        // 切换组队拼团列表
        getAssembleRecycle() {
            if (this.assembleState) {
                this.assembleName = this.assembleNameNo;
                this.assembleState = false;
                this.assembleText = "返回";
                this.$refs.actAssembleRetrieve.getAssembleData(
                    this.assembleName
                );
            } else {
                this.assembleName = this.assembleNameAff;
                this.assembleState = true;
                this.assembleText = "活动回收站";
                this.assembleIsDel = 0;
                this.$refs.actAssemble.getAssembleData(this.assembleName);
            }
        },
        // 拼团搜索
        assembleSearchBtn() {
            if (this.assembleState) {
                this.assembleNameAff = this.assembleName;
                this.$refs.actAssemble.getAssembleData(this.assembleName);
            } else {
                this.assembleNameNo = this.assembleName;
                this.$refs.actAssembleRetrieve.getAssembleData(
                    this.assembleName
                );
            }
        },

        // 组队拼团 end

        // 扩客红包 begin

        // 获取红包数据
        getData() {
            this.loading = true;
            if (this.activeName == 0) {
                if (this.listState) {
                    this.page = this.pageAff;
                    this.name = this.nameAff;
                } else {
                    this.page = this.pageNo;
                    this.name = this.nameNo;
                }

                if (this.pageShow) {
                    this.page = 1;
                }

                let params = {
                    shop_id: localStorage.getItem("shop_id"),
                    token: localStorage.getItem("token"),
                    page: this.page,
                    name: this.name,
                    is_del: this.isDel
                };

                getManageInfo({ params }).then(res => {
                    if (res.data.status === 0) {
                        this.pageShow = false;
                        // 1, 获取当前时间戳
                        let currentTime = new Date().getTime();

                        // 2, 把数组对象的start_time, end_time时间转时间戳

                        res.data.data.items.forEach((item, index) => {
                            let end_time = timeStamp(item.end_time);
                            let start_time = timeStamp(item.start_time);
                            item["edit_quota"] = false;
                            item["ref"] = "input" + index;
                            // 3, 比对时间戳 重新追加状态到数组中
                            // 3.1 未开启===满足条件: 开始时间 > 当前时间 赋值2代表未开启
                            if (start_time > currentTime) {
                                item["is_pause"] = 2;
                                return;
                            }

                            // 3.2 已结束===满足条件: 结束时间 < 当前时间 赋值3代表已结束
                            if (end_time < currentTime) {
                                item["is_pause"] = 3;
                                return;
                            }

                            // 3.3 已满额===满足条件: 剩余报名数 = 0 赋值4代表已满额
                            if (item.diff == 0) {
                                item["full_amount"] = true;
                                return;
                            }

                            // 3.4 即将结束===满足条件: 结束时间-当前时间 < 一天 赋值5代表即将结束
                            if (
                                end_time - currentTime <
                                24 * 60 * 60 * 1000 - 1
                            ) {
                                item["overdue"] = true;
                            }
                        });

                        this.total = res.data.data.total;
                        this.currentPaging = this.page;
                        this.data = res.data.data;
                        this.loading = false;
                    }
                });
            }
        },
        // 编辑删除
        editDelte() {
            if (this.activeName == 0) {
                if (this.page > 1 && this.data.length == 1) {
                    if (this.listState) {
                        this.pageAff--;
                    } else {
                        this.pageNo--;
                    }
                }
                this.getData();
            }
        },
        // 搜索
        searchBtn() {
            if (this.activeName == 0) {
                this.pageShow = true;
                if (this.listState) {
                    this.nameAff = this.name;
                } else {
                    this.nameNo = this.name;
                }
                this.getData();
            }
        },
        // 活动回收站
        getRecycle() {
            if (this.activeName == 0) {
                if (this.listState) {
                    this.recycleIn = "返回";
                    this.listState = false;
                    this.isDel = 1;
                    this.getData();
                } else {
                    this.recycleIn = "活动回收站";
                    this.listState = true;
                    this.isDel = 0;
                    this.getData();
                }
            }
        },
        // 分页
        currentChange(val) {
            if (this.activeName == 0) {
                if (this.listState) {
                    this.pageAff = val;
                } else {
                    this.pageNo = val;
                }
                this.getData();
            }
        }
        // 获取红包数据 end

        // 重定向
    },
    created() {
        this.getData();
        this.activeName = this.$route.query.tab || "0";
    }
};
</script>

<style scoped lang="scss">
.activity {
    background: #fff;
    padding-top: 20px;
    margin-bottom: 20px;
}

// header 搜索
.act-header {
    padding-right: 20px;
    float: right;
    margin-bottom: 30px;
    .el-input {
        width: 300px;
        margin-right: 10px;
    }
    .el-input-group__append button.el-button {
        background-color: #409eff;
        color: #fff;
        border: 1px solid #409eff;
    }
}

// footer 分页
.act-Footer {
    padding: 30px 0;
    text-align: center;
}
</style>
