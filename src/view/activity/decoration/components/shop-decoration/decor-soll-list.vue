<template>
    <div class="home-box">
        <!-- 页面 左边的拖拽-->
        <div class="box-left">
            <div class="box-left-nav">
                <div style="font-size:18px;">{{ decorSollList.title }}</div>
                <div style="font-size:14px;">
                    全部({{ decorSollList.limit }})
                    <i class="el-icon-arrow-right"></i>
                </div>
            </div>
            <!-- 内容 -->
            <div v-for="(item, index) in decorSollList.index" :key="index">
                <decorList :item="item" />
            </div>
        </div>
        <!-- 操作 -->
        <div class="box-right">
            <span class="box-right-span" v-show="decorSollList.show == true"
                >显示</span
            >
            <span class="box-right-span" v-show="decorSollList.show != true"
                >不显示</span
            >
            <el-switch style="display: block" v-model="decorSollList.show">
            </el-switch>
            <!-- 右边的绝对定位框 -->
            <div class="right-set-nav" v-show="operationStatus === 5">
                <!-- 活动名称 -->
                <decorJiaList :decorSideslip="decorSollList" />
                <div class="right-add-btn" @click="uplaodTheme()">
                    保存
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import decorList from "./decor-list";

import decorJiaList from "./decor-jia-list";
export default {
    props: {
        // 父组件传过来的值
        decorSollList: {
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
    components: { decorList, decorJiaList },
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
        border: 1px#e6e6e6 solid;
        text-align: center;
        padding: 10px;
        padding-left: 23px;
        .box-left-nav {
            width: 100%;
            display: flex;
            justify-content: space-between;
            line-height: 22px;
            margin-left: -5px;
        }
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
        .right-set-name {
            margin-bottom: 15px;
        }
        .set-nav-radio {
            margin: 5px;
        }
        .exhibits-num {
            display: flex;
        }
        .right-set-choose {
            display: flex;
            margin: 10px 0;
        }
    }
}
.decor-sideslip {
    .sideslip-nav {
        display: flex;
        width: 100%;
        justify-content: space-between;
        height: 28px;
        line-height: 28px;
    }
}
</style>
