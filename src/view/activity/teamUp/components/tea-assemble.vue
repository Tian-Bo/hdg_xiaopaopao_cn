<template>
    <div class="app-content" v-loading="loading">
        <!-- header-begin-->
        <div class="header">
            <div class="header-item">
                <span>全部团（个）</span>
                <p>{{ headerData.total_cluster }}</p>
            </div>
            <div class="header-item header-item-border">
                <span>进行中的（个）</span>
                <p>{{ headerData.proceed_cluster }}</p>
            </div>
            <div class="header-item header-item-f20">
                <span>已完成（个）</span>
                <p>{{ headerData.finish_cluster }}</p>
            </div>
        </div>
        <!-- header-end-->

        <!-- main-begin-->
        <el-table
            class="main"
            :data="tableData"
            style="width: 100%"
            :header-cell-style="{ background:'rgba(242, 242, 242, 1)', color:'#333', fontWeight: '400' }"
        >
            <el-table-column prop="id" label="团ID" width="100" align="center"></el-table-column>
            <el-table-column label="团成员" width="250">
                <template slot-scope="scope">
                    <div class="main-item-member">
                        <div
                            class="main-item-image"
                            v-for="(item, index) in scope.row.team"
                            :key="index"
                        >
                            <img :src="item" v-if="index < 7" />
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="进度" align="center" width="200">
                <template slot-scope="scope">
                    <div class="main-survey-enrolled">
                        <el-progress
                            :text-inside="true"
                            :stroke-width="16"
                            :percentage="scope.row.progress.percent"
                            class="main-progress"
                            :show-text="false"
                        ></el-progress>
                        <span class="main-progress-left">{{ scope.row.progress.finish }}人</span>
                        <span class="main-progress-right" v-if="scope.row.progress.diff != 0">还差{{ scope.row.progress.diff }}人</span>
                        <span class="main-progress-right" v-if="scope.row.progress.diff == 0">已满团</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column width="180" align="center">
                <template slot="header">
                    <el-select
                        name="select"
                        class="assemble-header-select"
                        v-model="select"
                        placeholder="拼团状态"
                        size="mini"
                        style="display: flex;"
                        @change="getCluesterlist"
                    >
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </template>
                <template slot-scope="scope">
                    <div class="main-item-conduct" v-if="scope.row.is_handle==0">进行中</div>
                    <div class="main-item-completed" v-if="scope.row.is_handle==1">已完成</div>
                    <div class="main-item-fail" v-if="scope.row.is_handle==2">已失败</div>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="开团时间/到期时间" width="180" align="center">
                <template slot-scope="scope">
                    <p>{{ scope.row.begin_time }}</p>
                    <p>{{ scope.row.end_time }}</p>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="操作" align="center">
                <template slot-scope="scope">
                    <router-link
                        tag="a"
                        class="main-item-link"
                        :to="'/assemble_info?active_id=' + active_id + 
                        '&begin_time=' + scope.row.begin_time + 
                        '&end_time=' + scope.row.end_time + 
                        '&finish=' + scope.row.progress.finish + 
                        '&diff=' + scope.row.progress.diff + 
                        '&id=' + scope.row.id"
                    >查看</router-link>
                </template>
            </el-table-column>
        </el-table>
        <!-- main-end-->
        <!-- 分页-begin-->
        <el-pagination
            style="margin-top: 20px; margin-bottom: 20px;text-align: center;"
            @current-change="getListAllInfo"
            layout="total, prev, pager, next, jumper"
            :total="total"
        ></el-pagination>
        <!-- 分页-end-->
    </div>
</template>

<script>
// 获取api
import { getCluesterDatalist } from "@/api/api";
export default {
    data() {
        return {
            loading: true,
            tableData: [], // 拼团数据
            headerData: [], // 顶部数据
            total: 0, // 总条数
            options: [
                {
                    value: "",
                    label: "拼团状态"
                },
                {
                    value: 0,
                    label: "进行中"
                },
                {
                    value: 1,
                    label: "已成功"
                },
                {
                    value: 2,
                    label: "已失败"
                }
            ],
            select: "", // 列表状态
            tabIndex: 1, // 分页
            active_id: this.$route.query.active_id // 活动id
        };
    },
    methods: {
        // 分页处理
        getListAllInfo(index) {
            this.loading = true;
            this.tabIndex = index;
            this.getCluesterlist();
        },
        // 获取拼团数据
        getCluesterlist() {
            let params = {
                token: localStorage.getItem("token"),
                shop_id: localStorage.getItem("shop_id"),
                cluster_id: this.active_id,
                page: this.tabIndex,
                select: this.select
            };
            this.$http.get(getCluesterDatalist, { params }).then(res => {
                if (res.data.status === 0) {
                    this.loading = false;
                    this.tableData = res.data.data.cluster_list.items;
                    this.headerData = res.data.data;
                    this.total = res.data.data.cluster_list.total;
                }
            });
        }
    },
    created() {
        this.getCluesterlist();
    }
};
</script>

<style lang="scss" scoped>
// header-begin
.header {
    display: flex;
    align-items: center;
    text-align: center;
    border: 1px solid #eee;
    height: 120px;
    border-radius: 3px;
    .header-item {
        flex: 1;
        p {
            margin-top: 15px;
            font-size: 24px;
        }
    }
    .header-item-border {
        border-left: 1px solid #eee;
        border-right: 1px solid #eee;
    }
    .header-item-f20 {
        p {
            color: #ff2f07;
        }
    }
}
// header-end

// main-begin
.main {
    margin-top: 5px;
    .main-item-member {
        display: flex;
        align-items: center;
        .main-item-image {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
            margin: 0 -5px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .main-item-image:first-of-type {
            width: 50px;
            height: 50px;
        }
    }
    // 进度条
    .main-survey-enrolled {
        position: relative;
        .main-progress {
            margin: 5px 0 10px 0;
        }
        span {
            position: absolute;
            top: 0;
            font-size: 12px;
            line-height: 18px;
            color: #fff;
        }
        .main-progress-left {
            left: 3px;
        }
        .main-progress-right {
            right: 3px;
        }
    }

    // 状态
    .main-item-conduct {
        display: inline-block;
        background-color: #409eff;
        border-radius: 3px;
        padding: 0 10px;
        color: #fff;
    }
    .main-item-completed {
        display: inline-block;
        color: #409eff;
        padding: 0 10px;
        border-radius: 3px;
        border: 1px solid #409eff;
    }
    .main-item-fail {
        display: inline-block;
        color: #f20;
        padding: 0 10px;
        border-radius: 3px;
        border: 1px solid #f20;
    }
    .main-item-link {
        color: #409eff;
    }
}
</style>
