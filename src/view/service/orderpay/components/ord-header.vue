<template>
<div class="pro-content">
    <div class="progress-body">
        <div class="progress-body-item" :class="{ 'active': state==1 }">
            <div>
                <i class="iconfont iconzhengque-yuan"></i>
                <div class="progress-number">1</div>
            </div>
            <span>选择服务</span>
        </div>
        <div class="progress-body-item" :class="{ 'active': state==2 }">
            <div>
                <i class="iconfont iconzhengque-yuan" style="padding-left: 7px;"></i>
                <div class="progress-number" style="margin-left: 7px;">2</div>
            </div>
            <span>确认订单信息</span>
        </div>
        <div class="progress-body-item" :class="{ 'active': state==3 }">
            <div>
                <i class="iconfont iconzhengque-yuan"></i>
                <div class="progress-number">3</div>
            </div>
            <span>选择支付方式</span>
        </div>
        <div class="progress-body-item" :class="{ 'active': state==4 }">
            <div>
                <i class="iconfont iconzhengque-yuan"></i>
                <div class="progress-number">4</div>
            </div>
            <span>支付完成</span>
        </div>
        <div class="progress-arrow">
            <div class="progress-arrow-left"><i class="iconfont iconjiantou-right"></i></div>
            <div class="progress-arrow-right"><i class="iconfont iconjiantou-right"></i></div>
            <div class="progress-arrow-right"><i class="iconfont iconjiantou-right"></i></div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: ['state']
}
</script>

<style lang="scss" scoped>
.progress-body{
    position: relative;
    padding: 0;
    height: 86px;
    background: #eee;
    display: flex;
    align-items: center;
    .progress-body-item{
        width: 25%;
        text-align: center;
        span{
            color: #bcbcbc;
            font-size: 16px;
        }
        div{
            margin-bottom: 5px;
            display: flex;
            justify-content: center;
            i{
                font-size: 30px !important;
                color: #ccc;
                display: none;
            }
            .progress-number{
                width: 30px;
                height: 30px;
                border-radius: 50%;
                border: 2px solid #ccc;
                line-height: 28px;
                color: #ccc;
                font-weight: bold;
            }
        }
    }
    .active{
        span{
            color: #409eff;
        }
        div{
            i{
                color: #409eff;
                display: block;
            }
            .progress-number{
                display: none;
            }
        }
    }
}
.progress-arrow{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    div{
        margin-left: calc(25% - 26px);
        i{
            font-size: 26px !important;
            color: #ccc;
        }
    }
}
</style>