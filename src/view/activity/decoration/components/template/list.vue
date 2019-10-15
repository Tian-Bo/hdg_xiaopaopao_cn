<template>
    <div class="home-box">
        <!-- 页面 左边的拖拽-->
        <div class="box-left">

        </div>
        <!-- 操作 -->
        <div class="box-right">
            <span class="box-right-span" v-show="delivery == true">显示</span>
            <span class="box-right-span" v-show="delivery != true">不显示</span>
            <el-switch style="display: block" v-model="delivery"> </el-switch>
            <!-- 右边的绝对定位框 -->
            <div class="right-set-nav">

            </div>
        </div>
    </div>
</template>


<script>
export default {
    components: {},
    data() {
        return {
            delivery: true
        };
    },
    methods: {
        
    }
};
</script>

<style lang="scss" scoped>
.active {
    border-bottom: 2px #409eff solid;
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
</style>
