<!--
 * @Author: tianbo
 * @LastEditors: tianbo
 * @Date: 2019-10-15 13:42:11
 * @LastEditTime: 2019-10-17 14:23:36
 -->
<template>
    <div class="layout-container">
        <el-container class="content-body">
            <sidebar :isCollapse="isCollapse" :list="list" @clickMenu="clickMenu" />
            <el-container>
                <topbar :menuText="menuText" :username="username" :list="topList" @clickTopBar="clickTopBar" @clickEvent="clickEvent" />
                <el-main style="background: #e5e5e5;">
                    <slot></slot>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
// import { getUserInfo } from "@/api/common";

import sidebar from './sidebar/index.vue'
import topbar from './topbar/index.vue'

export default {
    components: {
        sidebar,
        topbar
    },
    data() {
        return {
            isCollapse: false, // 关闭显示导航
            list: this.$router.options.routes, // 列表
            topList: [
                { text: '个人中心', route: '' },
                { text: '切换用户', route: '' },
                { text: '退出登陆', route: '' },
            ],
            data: [], // 用户信息
            menuText: '概况', // 展示标题
        };
    },
    methods: {
        // TODO 获取用户信息
        getUserInfo() {
            getUserInfo().then(res => {
                if (res.status === 0) {
                    this.data = res.data;
                }
            });
        },
        // TODO 退出登陆
        withdrawLogin() {
            window.sessionStorage.removeItem('token');
            this.$router.push({ path: "/login" });
        },
        // sidebar
        clickMenu(data) {
            this.menuText = item.name
        },
        // topbar 状态切换
        clickTopBar(data) {
            this.isCollapse = data
        },
        // topbar 设置下拉框点击
        clickEvent(data) {

        }
    },  
    created() {
        // this.getUserInfo();
    }
};
</script>
<style lang="scss" scoped>
.layout-container {
    .content-body {
        position: fixed;
        height: 100%;
        width: 100%;
    }
}
</style>
