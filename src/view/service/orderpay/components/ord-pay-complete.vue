<template>
<div class="pro-content">
    <i class="iconfont iconchenggong"></i>
    <p>支付成功！</p>
    <el-button type="primary" @click="clickBack">返回</el-button>
</div>
</template>

<script>
export default {
    methods: {
        // 点击返回
        clickBack() {
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="scss" scoped>
.pro-content{
    text-align: center;
    padding-top: 130px;
    i{
        color: #09BE05;
        font-size: 100px !important;
    }
    p{
        font-size: 18px;
        color: #333;
        font-weight: bold;
        margin-top: 30px;
    }
    .el-button{
        width: 200px;
        margin-top: 100px;
    }
}
</style>