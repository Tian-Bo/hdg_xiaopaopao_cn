<!--
 * @Author: tianbo
 * @LastEditors: tianbo
 * @Date: 2019-09-25 19:00:58
 * @LastEditTime: 2019-10-09 14:35:54
 -->
<template>
    <div class="general-main">
        <div :class="[ channelList.active.length == 0 ? 'between-center' : 'between' ]">
            <router-link tag="span" to="/createChannel" v-if="channelList.active.length == 0">
                <el-button type="primary" icon="el-icon-plus">创建渠道</el-button>
            </router-link>

            <div class="header-active" v-else>
                <div class="header-active-img">
                    <img :src="channelList.active.cover_image" />
                </div>
                <div class="header-active-msg">
                    <div>{{ channelList.active.title }}</div>
                    <p>{{ channelList.active.begin }}</p>
                    <p>{{ channelList.active.end }}</p>
                    <span
                        :class="{ 'bg-color-f68080': channelList.active.type=='组队拼团' }"
                    >{{ channelList.active.type }}</span>
                </div>
            </div>

            <div v-for="(item, index) in searchList" :key="index" v-show="activeName==index">
                <div class="nav-right center-end" v-show="item.show">
                    <el-select
                        v-model="item.select"
                        placeholder="请选择渠道类型"
                        class="m-r-10"
                        name="select"
                    >
                        <el-option
                            v-for="item in selectList"
                            :key="item.value"
                            :label="item.text"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                    <div class="center-end">
                        <el-input v-model="item.message" placeholder="请输入渠道名称" name="message"></el-input>
                        <el-button type="primary" @click="search(item, index)">搜索</el-button>
                        <el-button type="primary" @click="channelRecycle(item, index, false)">渠道回收站</el-button>
                    </div>
                </div>
                <div class="nav-right center-end" v-show="!item.show">
                    <el-select
                        v-model="item.select_del"
                        placeholder="请选择渠道类型"
                        class="m-r-10"
                        name="select"
                    >
                        <el-option
                            v-for="item in selectList"
                            :key="item.value"
                            :label="item.text"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                    <div class="center-end">
                        <el-input v-model="item.message_del" placeholder="请输入渠道名称" name="message"></el-input>
                        <el-button type="primary" @click="search(item, index)">搜索</el-button>
                        <el-button type="primary" @click="channelRecycle(item, index, true)">返回</el-button>
                    </div>
                </div>
            </div>
        </div>

        <div class="center-end m-t-20">
            <div class="educe-btn" @click="exportList">
                <i class="iconfont icondaochu font16"></i>
                <span>导出</span>
            </div>
        </div>

        <el-tabs v-model="activeName">
            <el-tab-pane label="所有渠道" name="0"></el-tab-pane>
        </el-tabs>

        <chaTotalList
            ref="chaTotalList"
            :search="searchList[activeName]"
            @getActiveData="getActiveData"
            v-show="activeName == '0' && searchList[activeName].show"
        />
        <chaDelList
            ref="chaDelList"
            :search="searchList[activeName]"
            v-show="activeName == '0' && !searchList[activeName].show"
        />
    </div>
</template>
<script>
import { getChannelList, setDeleteChannel } from "@/api/api";
import chaTotalList from "./components/cha-total-list.vue";
import chaDelList from "./components/cha-del-list.vue";

export default {
    components: { chaTotalList, chaDelList },
    data() {
        return {
            show: true,
            model_id: this.$route.query.model_id || "",
            active_id: this.$route.query.active_id || "",
            activeName: "0", // tab
            searchList: [
                {
                    select: "",
                    message: "",
                    select_del: "",
                    message_del: "",
                    show: true
                }
            ],
            channelList: {
                active: [],
                items: []
            }, // 渠道列表
            selectList: [
                // 下拉列表
                {
                    value: "",
                    text: "全部渠道"
                },
                {
                    value: 0,
                    text: "商家门店"
                },
                {
                    value: 1,
                    text: "团队"
                },
                {
                    value: 2,
                    text: "平台"
                },
                {
                    value: 3,
                    text: "其他"
                }
            ]
        };
    },
    methods: {
        // 活动回收站
        channelRecycle(item, index, state) {
            this.searchList[index].show = state;
            if (index == 0 && state == true) {
                this.$refs.chaTotalList.switch(item);
            }
            if (index == 0 && state == false) {
                this.$refs.chaDelList.switch(item);
            }
        },
        // 获取活动数据
        getActiveData(data) {
            this.channelList = data;
        },
        // 搜索
        search(item, index) {
            if (index == 0) {
                if (item.show) {
                    this.$refs.chaTotalList.query(item);
                } else {
                    this.$refs.chaDelList.query(item);
                }
            }
        },
        // 导出
        exportList() {
            if (this.searchList[0].show) {
                this.$refs.chaTotalList.exportList();
            } else {
                this.$refs.chaDelList.exportList();
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.general-main {
    padding: 40px;
    .nav-right .select1 {
        padding-left: 5px;
        padding-right: 5px;
        width: 90px;
        height: 36px;
        color: #464a4c;
        background-color: #fff;
        margin-right: 10px;
        border: 1px solid rgba(0, 0, 0, 0.15);
    }
    .nav-right .select2 {
        width: 190px;
        height: 36px;
        border: 1px solid #ccc;
        vertical-align: middle;
        color: #666;
        padding-left: 3px;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
    }
    .search-btn {
        width: 50px;
        height: 36px;
        background-color: #409eff;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
    }
    .educe-btn {
        width: 70px;
        height: 36px;
        background-color: #409eff;
        line-height: 36px;
        text-align: center;
        color: #fff;
        border-radius: 3px;
        cursor: pointer;
    }
}

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

.header-active {
    display: flex;
    align-items: center;
    .header-active-img {
        margin-right: 15px;
        width: 86px;
        height: 120px;
        overflow: hidden;
        border-radius: 3px;
        background-color: #f5f5f5;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .header-active-msg {
        div {
            line-height: 200%;
        }
        p {
            line-height: 200%;
            font-size: 13px;
            color: #a1a1a1;
        }
        span {
            background-color: #409eff;
            line-height: 150%;
            font-size: 12px;
            padding: 0 10px;
            font-size: 12px;
            margin-top: 15px;
            display: inline-block;
            border-radius: 5px;
            color: #fff;
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