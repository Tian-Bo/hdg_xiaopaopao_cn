<!--
 * @Author: tianbo
 * @LastEditors: tianbo
 * @Date: 2019-09-25 19:03:00
 * @LastEditTime: 2019-10-09 17:21:36
 -->
<template>
    <div class="app-content">
        <header>帮助和服务</header>
        <main>
            <div class="main-tel">0851-88508746</div>
            <div class="main-qrcode"><img src="../../../assets/zixun.png" alt=""></div>
            <a class="main-link">在线联系</a>
        </main>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.app-content{
    header{
        height: 56px;
        line-height: 56px;
        border-bottom: 1px solid #EEEEEE;
        padding-left: 20px;
    }
    main{
        padding: 20px;
        .main-tel{
            font-size: 24px;
            text-align: center;
            font-weight: bold;
            margin: 30px 0;
        }
        .main-qrcode{
            width: 200px;
            height: 200px;
            margin: 0 auto;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .main-link{
            display: block;
            margin: 0 auto;
            margin-top: 40px;
            color: #409eff;
            border-radius: 15px;
            height: 30px;
            width: 175px;
            text-align: center;
            line-height: 30px;
            border: 1px solid #409eff;
        }
        .main-link:hover{
            background-color: #409eff;
            color: #fff;
        }
    }
}
</style>
