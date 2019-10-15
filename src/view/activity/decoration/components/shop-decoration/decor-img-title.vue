<template>
    <div class="home-box">
        <!-- 页面 左边的拖拽-->
        <div class="box-left">
            <div class="box-left-nav">
                <div style="font-size:18px;">{{ decorImgTitle.title }}</div>
                <div style="font-size:14px;">
                    全部({{ decorImgTitle.limit }})
                    <i class="el-icon-arrow-right"></i>
                </div>
            </div>
            <div class="box-left-body">
                <div class="left-body-label" v-for="(item,index) in decorImgTitle.index" :key="index">
                    <img :src="item.cover_img" alt="" srcset="" />
                    <div class="left-body-title">{{item.active_title}}</div>
                    <div class="left-body-time">{{item.end_time}}</div>
                </div>
            </div>
        </div>
        <!-- 操作 -->
        <div class="box-right">
            <span class="box-right-span" v-show="decorImgTitle.show == true"
                >显示</span
            >
            <span class="box-right-span" v-show="decorImgTitle.show != true"
                >不显示</span
            >
            <el-switch style="display: block" v-model="decorImgTitle.show">
            </el-switch>
            <!-- 右边的绝对定位框 -->
            <div class="right-set-nav" v-show="operationStatus === 4">
                <decorJiaList :decorSideslip="decorImgTitle"/>
                <div class="right-add-btn" @click="uplaodTheme()">
                    保存
                </div>
            </div>
        </div>
    </div>
</template>


<script>

import decorJiaList from "./decor-jia-list";
export default {
    props: {
        decorImgTitle: {
            type: Object,
            default() {
                return {};
            }
        },
        // 操作的状态
        operationStatus: {
            type: Number,
            default() {
                return {};
            }
        },
        // 从父组件传过来的上传门店装修函数
        uplaodTheme: {
            type: Function,
            default: null
        }
    },
    components: {decorJiaList},
    data() {
        return {};
    }
};
</script>

<style lang="scss" scoped>
.active {
    border-bottom: 2px #409eff solid;
}
// 公共样式
.right-add-btn {
    text-align: center;
    padding: 4px 0;
    margin-top: 10px;
    cursor: pointer;
    background: #409eff;
    color: #fff;
}
.home-box {
    display: flex;
    .box-left {
        display: flex;
        flex-wrap: wrap;
        width: 375px;
        margin-right: 20px;
        border: 1px #ccc solid;
        text-align: center;
        padding: 10px;
    }
    .box-right {
        display: flex;
        margin-top: 25px;
        .box-right-span {
            margin-right: 20px;
        }
    }
    .right-set-nav {
        margin-left: 145px;
        position: absolute;
        width: 475px;
        border: 1px #ccc solid;
        border-radius: 5px;
        padding: 30px;
        box-shadow: 4px 3px 5px 0px #e2e2e2;
    }
}
.box-left-nav {
    display: flex;
    justify-content: space-between;
    width: 100%;
}
.box-left-body {
    display: flex;
    margin: 20px 0;
    width: 100%;
    overflow-x: scroll;
    .left-body-label {
       width: 88px;
        margin-right: 10px;
        img {
            width: 100%;
            height: 110px;
            border-radius: 8px;
        }
        .left-body-title {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .left-body-time{
            font-size: 10px;
            text-align: left;
            color: #ccc;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}
</style>
