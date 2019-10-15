<template>
    <div class="decoration">
        <div class="decoration-nav">
            <div class="decoration-nav-label decor-active">
                主页装修
            </div>
            <div
                class="decoration-nav-label"
                @click="$router.push({ path: '/decoration/classify' })"
            >
                活动分类
            </div>
        </div>
        <decorHome />
    </div>
</template>

<script>
import decorHome from "./components/decor-home";
export default {
    name: "decoration",
    components: { decorHome },
    data() {
        return {
            // 导航的index
            decorationNavIndex: 1
        };
    },
    methods: {
        changeDerIndex(index) {
            this.decorationNavIndex = index;
        }
    }
};
</script>
<style lang="scss" scoped>
.decoration {
    width: 100%;
    height: 100%;
    background: #f2f;
    .decor-active {
        border-bottom: 1px #33a5fe solid;
        color: #33a5fe;
    }
    background: #fff;
    .decoration-nav {
        display: flex;
        border-bottom: 1px #ccc solid;
        position: relative;
        .decoration-nav-label {
            padding: 20px;
            cursor: pointer;
        }
    }
}
</style>
