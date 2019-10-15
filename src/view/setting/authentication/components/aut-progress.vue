// 根据在 progress-body-item 上添加 active 类名控制进度状态
<template>
    <div class="aut-progress">
        <div class="progress-title">活动阁店铺认证</div>
        <div class="progress-body">
            <div class="progress-body-item" :class="{ 'active': state == 0 || state == 3}">
                <div>
                    <i class="iconfont iconzhengque-yuan"></i>
                    <div class="progress-number">1</div>
                </div>
                <span>提交信息</span>
            </div>
            <div class="progress-body-item" :class="{ 'active': state == 2 }">
                <div>
                    <i class="iconfont iconzhengque-yuan" style="padding-left: 7px;"></i>
                    <div class="progress-number" style="margin-left: 7px;">2</div>
                </div>
                <span>审核中</span>
            </div>
            <div class="progress-body-item" :class="{ 'active': state == 1 }">
                <div>
                    <i class="iconfont iconzhengque-yuan"></i>
                    <div class="progress-number">3</div>
                </div>
                <span>完成认证</span>
            </div>
            <div class="progress-arrow">
                <div class="progress-arrow-left"><i class="iconfont iconjiantou-right"></i></div>
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

<style lang="scss">
.progress-title{
    height: 60px;
    font-size: 24px;
    color: #fff;
    text-align: center;
    line-height: 60px;
    background-color: rgba(64, 158, 255, 1);
}
.progress-body{
    position: relative;
    height: 86px;
    background: #eee;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 200px;
    .progress-body-item{
        span{
            color: #bcbcbc;
            font-size: 16px;
        }
        div{
            margin-bottom: 5px;
            i{
                font-size: 30px !important;
                color: #ccc;
                padding-left: 15px;
                display: none;
            }
            .progress-number{
                width: 30px;
                height: 30px;
                border-radius: 50%;
                border: 2px solid #ccc;
                line-height: 28px;
                text-align: center;
                margin-left: 12px;
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
        margin-left: 400px;
        i{
            font-size: 26px !important;
            color: #ccc;
        }
    }
    .progress-arrow-right{
        margin-left: 340px;
    }
}
</style>
