<!--
 * @Author: tianbo
 * @LastEditors: tianbo
 * @Date: 2019-09-30 15:22:06
 * @LastEditTime: 2019-10-11 14:42:47
 -->
<template>
    <div>
        <!-- 渠道列表 -->
        <div class="channel-list" v-loading="loading">
            <div
                v-for="(item, index) in channelList.items"
                :key="index"
                class="channel-item between-center"
            >
                <div class="item-userInfo between-center">
                    <img class="item-head" :src="item.logo" alt />
                    <div class="flex_1 m-l-20">
                        <div class="only_line">{{item.name}}</div>
                        <div class="user-tag around-center">{{item.type}}</div>
                    </div>
                    <div class="price">
                        <div class="price-main">
                            ¥
                            <span class="price-num">{{item.price}}</span>
                        </div>
                        <div>总业绩</div>
                    </div>
                </div>
                <div class="generalize-info flex_1 between-center">
                    <div class="generalize-item">
                        <div class="font20">{{item.total_number}}</div>
                        <div class="m-t-10">总推广订单</div>
                    </div>
                    <div class="generalize-item">
                        <div class="font20">{{item.direct_number}}</div>
                        <div class="m-t-10">直接推广（人）</div>
                    </div>
                    <div class="generalize-item">
                        <div class="font20">{{item.indirect_number}}</div>
                        <div class="m-t-10">间接推广（人）</div>
                    </div>
                </div>
                <span
                    style="padding-right: 30px;"
                    class="color-409eff pointer"
                    @click="delChannel(item)"
                >还原</span>
            </div>
        </div>
        <div class="footer" v-show="channelList.items.length==0">暂无数据哦！</div>

        <!-- 分页-begin -->
        <div class="footer">
            <el-pagination
                @current-change="currentChange"
                background
                :total="channelList.total"
                layout="total, prev, pager, next, jumper"
                :page-size="5"
                :current-page="page"
                :show-summary="false"
            ></el-pagination>
        </div>
        <!-- 分页-end -->
    </div>
</template>

<script>
import { getChannelList, setDeleteChannel } from "@/api/api";
export default {
    data() {
        return {
            model_id: this.$route.query.model_id || "",
            active_id: this.$route.query.active_id || "",
            loading: true,
            activeName: "0", // tab
            select: "", // 下拉框选择数据
            message: "", // 搜索信息
            page: 1, // 分页
            channelList: {
                active: [],
                items: []
            }
        };
    },
    methods: {
        // 搜索
        query(item) {
            this.select = item.select_del;
            this.message = item.message_del;
            this.page = 1;
            this.queryData();
        },
        // 回收站返回切换
        switch(item) {
            this.select = item.select;
            this.message = item.message;
            this.queryData();
        },
        // 获取渠道数据
        queryData() {
            this.loading = true;
            let params = {
                token: localStorage.getItem("token"),
                shop_id: localStorage.getItem("shop_id"),
                model_id: this.model_id,
                active_id: this.active_id,
                message: this.message,
                type: this.select,
                page: this.page,
                is_del: 1
            };
            this.$http.get(getChannelList, { params: params }).then(res => {
                this.loading = false;
                if (res.data.status == 0) {
                    this.channelList = res.data.data;
                } else {
                    this.$message.error(res.data.message);
                }
            });
        },
        // 导出
        exportList() {
            let params = {
                token: localStorage.getItem("token"),
                shop_id: localStorage.getItem("shop_id"),
                model_id: this.model_id,
                active_id: this.active_id,
                message: this.message,
                type: this.select,
                page: this.page,
                is_del: 1,
                export: 1
            };
            this.$http.get(getChannelList, { params: params }).then(res => {
                window.location.href = res.request.responseURL;
            });
        },
        // 获取分页
        currentChange(val) {
            this.page = val;
            this.queryData();
        },
        // 还原
        delChannel(item) {
            let params = {
                token: localStorage.getItem("token"),
                channel_id: item.id,
                status: 0,
                headers: { "content-type": "application/x-www-form-urlencoded" }
            };
            this.$http
                .post(setDeleteChannel, this.$qs.stringify(params))
                .then(res => {
                    if (res.data.status == 0) {
                        if (
                            this.channelList.items.length == 1 &&
                            this.page != 1
                        ) {
                            this.page--;
                        }
                        this.queryData();
                    }
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.channel-item {
    height: 120px;
    margin-bottom: 30px;
    border: 1px solid #eee;
    .item-userInfo {
        width: 380px;
        background-color: #ecf5ff;
        height: 100%;
        padding-left: 20px;
        padding-right: 20px;
        .item-head {
            width: 80px;
            height: 80px;
            border-radius: 50%;
        }
        .user-tag {
            width: 50px;
            height: 20px;
            color: #409eff;
            border: 1px solid #409eff;
            border-radius: 3px;
            font-size: 12px;
            margin-top: 5px;
        }
        .price {
            text-align: center;
            .price-num {
                font-size: 32px;
                font-weight: 700;
                margin-left: 5px;
            }
            .price-main {
                font-size: 16px;
            }
        }
    }
    .generalize-info {
        text-align: left !important;
        padding-left: 40px;
        .generalize-item {
            padding: 0 25px;
            text-align: center;
            display: inline-block;
        }
        .generalize-item:not(first-child) {
            border-right: 1px dashed #eee;
        }
    }
}

// footer 分页
.footer {
    padding: 30px 0;
    text-align: center;
}

.font16 {
    font-size: 16px !important;
}

.m-t-20 {
    margin-top: 20px;
}

.m-l-20 {
    margin-left: 20px;
}
.m-r-10 {
    margin-right: 10px;
}

.font20 {
    font-size: 20px;
}
.bg-color-f68080 {
    background-color: #f68080 !important;
}

.color-409eff {
    color: #409eff;
}

.pointer {
    cursor: pointer;
}

.m-t-10 {
    margin-top: 10px;
}

//  flex布局
.column-between {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -webkit-flex-direction: column;
    justify-content: space-between;
    -webkit-justify-content: space-between;
}

.column-around {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -webkit-flex-direction: column;
    justify-content: space-around;
    -webkit-justify-content: space-around;
}

.between {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    -webkit-justify-content: space-between;
}

.column-center-b {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -webkit-flex-direction: column;
    justify-content: space-between;
    -webkit-justify-content: space-between;
    align-items: center;
    -webkit-align-items: center;
}

.column-center-c {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -webkit-flex-direction: column;
    justify-content: space-around;
    -webkit-justify-content: space-around;
    align-items: center;
    -webkit-align-items: center;
}

.around-center {
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    align-items: center;
    -webkit-justify-content: space-around;
    -webkit-align-items: center;
}

.left-center {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
}

.between-center {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    -webkit-justify-content: space-between;
    align-items: center;
    -webkit-align-items: center;
}

.center {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
}

.center-end {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    justify-content: flex-end;
    -webkit-justify-content: flex-end;
}

.flex_1 {
    flex: 1;
    -webkit-flex: 1;
    display: block;
    min-width: 0;
}

.only_line {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
</style>