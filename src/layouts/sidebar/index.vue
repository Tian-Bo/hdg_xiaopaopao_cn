<template>
    <div class="navbar">
        <div style="overflow-y: auto; height: 100%;">
            <el-menu
                :collapse="isCollapse"
                class="navbar-el-menu"
                background-color="#304156"
                text-color="#BFCBD9"
                active-text-color="#409EFF"
            >
                <h1 class="navbar-logo">{{ isCollapse ? '活': '活动阁'}}</h1>
                <el-submenu
                    v-for="(item, index) in list"
                    :index="index.toString()"
                    :key="index"
                    v-if="item.show"
                >
                    <template slot="title">
                        <router-link tag="div" :to="item.path" @click.native="clickMenu(item)">
                            <i :class="item.iconCls" style="margin-right: 15px;"></i>
                            <span v-show="!isCollapse">{{ item.name }}</span>
                        </router-link>
                    </template>
                    <router-link
                        tag="el-menu-item"
                        :to="val.path"
                        v-for="(val, i) in item.children"
                        :index="i"
                        :key="i.toString()"
                        v-if="val.show"
                        @click.native="clickMenu(val)"
                    >{{ val.name }}</router-link>
                </el-submenu>
            </el-menu>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        // 显示状态
        isCollapse: {
            type: Boolean,
            default: false
        },
        // 标题
        list: {
            type: Array,
            default: []
        },
    },
    methods: {
        // 执行父组件方法
        clickMenu(item) {
            this.$emit('clickMenu', item)
        }
    },
}
</script>

<style lang="scss" scoped>
.navbar {
    height: 100%;
    background-color: #304156;
    .navbar-el-menu {
        overflow: hidden;
        min-height: 100%;
        .navbar-logo {
            height: 70px;
            line-height: 70px;
            text-align: center;
            color: #fff;
            font-size: 30px;
            background-color: #409eff;
        }
    }
}
.navbar-el-menu:not(.el-menu--collapse) {
    width: 180px;
}
</style>