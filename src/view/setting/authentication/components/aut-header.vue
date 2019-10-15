<template>
<div class="aut-header">
    <div class="aut-header-body">
        <div class="header-left">
            <div class="logo"><img src="@/assets/logo.png" alt=""></div>
            <span class="title">店铺认证</span>
        </div>
        <div class="header-right">
            <span>+86</span>
            <span>{{ user.mobile }}</span>
            <a @click="jumpLast">返回店铺</a>
            <a @click="HandleLogout">退出</a>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: ['user'],
    methods: {
        // 返回店铺
        jumpLast(){
            this.$router.push({ path:"/setting" })
        },
        //退出登录
        HandleLogout() {
            this.$confirm("确认退出吗?", "提示", {})
                .then(() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("shop_id");
                    window.location.href = "/merchant/login/login_out";
                })
                .catch(() => {});
        },
    },
}
</script>

<style lang="scss">
.aut-header{
    height: 70px;
    background: #fff;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.08);
}
.aut-header-body{
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.logo{
    width: 139px;
    height: 50px;
    img{
        width: 100%;
        height: 100%;
        display: block;
    }
}
.header-left{
    display: flex;
    align-items: center;
    .title{
        color: #333;
        font-size: 16px;
        margin-left: 15px;
        padding-left: 30px;
        line-height: 27px;
        border-left: 1px solid #ccc;
    }
}
.header-right{
    span, a{
        margin-left: 10px;
    }
    a{
        color: #409EFF;
    }
}
</style>
