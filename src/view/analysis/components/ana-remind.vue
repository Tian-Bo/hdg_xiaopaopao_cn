<!--
 * @Author: tianbo
 * @LastEditors: tianbo
 * @Date: 2019-09-25 19:03:00
 * @LastEditTime: 2019-10-11 16:47:36
 -->
<template>
    <div class="app-content">
        <header>
            我的提醒
            <div>0</div>
        </header>
        <main>
            <div class="main-head">
                <div>
                    红包未发放成功
                    <span class="color-409eff font-bold">5</span>
                </div>
                <div>
                    短信发送失败
                    <span class="color-333333 font-bold">5</span>
                </div>
                <div>
                    项目将售馨
                    <span class="color-f62222 font-bold">5</span>
                </div>
            </div>
            <div class="main-title">
                用户投诉
                <span class="color-f62222 font-bold">5</span>
            </div>
            <div class="main-body" v-for="(item, index) in 2" :key="index">
                <div class="main-body-header">
                    <div class="main-body-info">头像/姓名/电话</div>
                    <div class="main-body-order">订单号</div>
                    <div class="main-body-project">项目</div>
                    <div class="main-body-price">金额</div>
                </div>
                <div class="main-body-center">
                    <div class="main-body-info">
                        <div class="main-body-info-img">
                            <img src="../../../assets/bgUser.jpg" alt />
                        </div>
                        <div class="main-body-info-name ellipsis">魏孝/18580557309魏孝/</div>
                    </div>
                    <div class="main-body-order ellipsis">HDG1569154954HDG156915495HDG156</div>
                    <div class="main-body-project ellipsis">五周年感恩聚惠五周年感恩HDG69</div>
                    <div class="main-body-price">￥92.7</div>
                </div>
                <div class="main-body-footer">
                    <div class="complaint-title">投诉内容：</div>
                    <div class="complaint-cont color-f62222 text-truncation">活动上并没有说要提前预定啊，当天去不准使用是什么意思，欺骗消费者？活动上并没有说要提前预定啊，当天去不准使用是什么意思，欺骗消费者？活动上并没有说要提前预定啊，当天去不准使用是什么意思，欺骗消费者？活动上并没有说要提前预定啊，当天去不准使用是什么意思，欺骗消费者？</div>
                    <div class="complaint-btn">
                        <el-button type="primary" plain size="mini">退款处理</el-button>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.app-content {
}
header {
    height: 56px;
    border-bottom: 1px solid #eeeeee;
    padding-left: 20px;
    display: flex;
    align-items: center;
    div {
        color: #fff;
        background-color: #ff6666;
        font-size: 12px;
        padding: 2px 3px;
        height: 16px;
        border-radius: 8px;
        margin-left: 5px;
    }
}
main {
    padding: 20px;
    font-size: 13px;
    .main-head {
        margin: 15px 0;
        display: flex;
        flex: 1;
        justify-content: space-between;
    }
    .main-title {
        margin-top: 35px;
    }
    .main-body {
        border: 1px solid rgba(230, 230, 230, 1);
        border-radius: 4px;
        margin-top: 15px;
        .main-body-header {
            display: flex;
            height: 36px;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #eee;
            color: rgba(153, 153, 153, 1);
            padding: 0 10px;
        }
        .main-body-center {
            padding: 0 5px;
            height: 50px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #eee;
            .main-body-info {
                display: flex;
                align-items: center;
                overflow: hidden;
                .main-body-info-img {
                    width: 30px;
                    height: 30px;
                    overflow: hidden;
                    border-radius: 50%;
                    margin-right: 5px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .main-body-info-name{
                    flex: 1;
                }
            }
        }
        .main-body-info {
            flex: 3;
            max-width: 320px;
        }
        .main-body-order {
            flex: 3;
            max-width: 350px;
        }
        .main-body-project {
            flex: 2;
            max-width: 220px;
            text-align: center;
        }
        .main-body-price {
            flex: 1;
            text-align: center;
        }
        .main-body-footer {
            padding: 0 5px;
            display: flex;
            justify-content: space-between;
            height: 56px;
            align-items: center;
        }
        .complaint-title {
            // width: 110px;
            flex: 1;
        }
        .complaint-cont {
            // width: 260px;
            flex: 3;
            line-height: 160%;
        }
        .complaint-btn {
            flex: 1;
            text-align: right;
        }
    }
}

// common
.color-409eff {
    color: #409eff;
}
.color-333333 {
    color: #333333;
}
.color-f62222 {
    color: #f62222;
}
.font-bold {
    font-weight: bold;
}
</style>
