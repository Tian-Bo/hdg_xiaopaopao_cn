<!--
 * @Author: tianbo
 * @LastEditors: tianbo
 * @Date: 2019-10-15 17:27:19
 * @LastEditTime: 2019-10-17 17:19:30
 -->
<template>
    <div calss="topbar">
        <div class="header-left">
            <span @click="clickTopBar(false)" v-show="isCollapse">
                <i class="el-icon-s-fold"></i>
            </span>
            <span @click="clickTopBar(true)" v-show="!isCollapse">
                <i class="el-icon-s-unfold"></i>
            </span>
            <span>{{ menuText }}</span>
        </div>
        <div class="header-right">
            <el-dropdown placement="bottom">
                <i class="el-icon-setting"></i>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                        v-for="(item, index) in list"
                        :key="index"
                        @click.native="clickEvent(item)"
                    >{{ item.text }}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <span>{{ username }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        // 显示状态
        menuText: {
            type: String,
            default: ""
        },
        // 用户名
        username: {
            type: String,
            default: ""
        },
        // 标题
        list: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            isCollapse: false
        };
    },
    methods: {
        // 箭头切换
        clickTopBar(bol) {
            this.isCollapse = bol;
            this.$emit("clickTopBar", bol);
        },
        // 个人中心点击
        clickEvent(item) {
            this.$emit("clickEvent", item);
        }
    }
};
</script>

<style lang="scss" scoped>
.topbar {
    // width: 100%;
    display: flex;
    // height: 50px !important;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    color: #97a8be;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.1);
    .header-left {
        display: flex;
        align-items: center;
        i {
            margin-right: 10px;
            font-size: 24px;
            cursor: pointer;
        }
    }
    .header-right {
        display: flex;
        align-items: center;
        i {
            cursor: pointer;
            color: #97a8be;
            font-size: 18px;
            margin-right: 10px;
        }
    }
}
</style>