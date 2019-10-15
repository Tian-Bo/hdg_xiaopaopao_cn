<template>
<div class="aut-examine">
    <h3 name="shop_name">店铺名称 : {{ resData.shop_name }}</h3>
    <p>预计审核时间：1-3个工作日，请耐心等待，可扫码联系工作人员加速审核。</p>
    <div class="aut-examine-qrcode" name="weixin"><img :src="resData.weixin" alt=""></div>
    <div class="footer-btn">
        <el-button type="primary" plain @click="againAuthInfo">重新提交信息</el-button>
    </div>
</div>
</template>

<script>
export default {
    props: ['resData'],
    methods: {
        // 重新认证
        againAuthInfo() {
            this.$emit('getState', 0)
            let mobile = this.$route.query.mobile
            this.$router.push({ query: { state: 0, mobile: mobile } })
        }
    },
}
</script>

<style lang="scss">
.aut-examine{
    text-align: center;
    padding-bottom: 70px;
    h3{
        font-weight: bold;
        color: #333;
        font-size: 18px;
        margin-top: 100px;
    }
    p{
        font-size: 14px;
        color: #AEAEAE;
        margin: 30px 0;
    }
    .aut-examine-qrcode{
        width: 200px;
        height: 200px;
        margin: 0 auto;
        margin-bottom: 70px;
        img{
            width: 100%;
            height: 100%;
            display: block;
        }
    }
}

</style>
