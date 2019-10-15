<template>
    <el-header>
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
                    <el-dropdown-item v-for="(item, index) in list" :key="index" @click.native="clickEvent(item)">
                        {{ item.name }}
                    </el-dropdown-item>
                    <!-- <el-dropdown-item>切换用户</el-dropdown-item>
                    <el-dropdown-item >退出登陆</el-dropdown-item> -->
                </el-dropdown-menu>
            </el-dropdown>
            <span>{{ username }}</span>
        </div>
    </el-header>
</template>

<script>
export default {
    props: {
        // 显示状态
        menuText: {
            type: String,
            default: ''
        },
        // 用户名
        username: {
            type: String,
            default: ''
        },
        // 标题
        list: {
            type: Array,
            default: []
        },
    },
    methods: {
        // 箭头切换
        clickTopBar(item) {
            this.$emit('clickTopBar', item)
        },
        // 个人中心点击
        clickEvent(item) {
            this.$emit('clickEvent', item)
        }
    },
}
</script>

<style lang="scss" scoped>
.el-header {
    display: flex;
    height: 50px !important;
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