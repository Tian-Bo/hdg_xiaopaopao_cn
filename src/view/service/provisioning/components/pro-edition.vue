<!--
 * @Author: zlz5v5
 * @LastEditors: zlz
 * @Date: 2019-08-13 17:38:36
 * @LastEditTime: 2019-08-13 18:37:56
 -->
<template>
    <div class="pro-content">
        <div class="pro-marker" v-if="provisioningValue.is_hot==1">
            <i class="iconfont iconbiaoqian1"></i><span>最受欢迎</span>
        </div>
        <div class="pro-header">
            <h1 class="pro-title">{{ provisioningValue.title }}</h1>
            <p v-html="provisioningValue.desc"></p>
            <div class="pro-price">
                <span>￥{{ provisioningValue.price }}/年</span>
                <p>均{{ provisioningValue.daily }}/天</p>
            </div>

            <p class="pro-title-hint">{{ provisioningValue.intro }}</p>
            <h3 class="pro-submenu">包含功能</h3>
        </div>
        <div class="pro-body">
            <div
                class="pro-body-item"
                v-for="(item, index) in provisioningValue.contains_info"
                :key="index"
            >
                <i
                    class="iconfont iconfuxuankuanggou pro-icon-aff"
                    v-if="item.switch === 1"
                ></i>
                <i class="iconfont iconchacha pro-icon-no" v-else></i>
                <p>
                    {{ item.func_name }}
                    <span class="pro-body-hint" v-if="item.is_online === 0">
                        (即将上线)
                    </span>
                </p>
            </div>
        </div>
        <div class="pro-footer">
            <h3 class="pro-submenu">服务及费率</h3>
            <p>{{ provisioningValue.footer.desc_one }}</p>
            <p>
                {{ provisioningValue.footer.desc_two }}<span>{{ provisioningValue.footer.rate }}%</span>
            </p>
        </div>
        <div class="pro-submit" v-if="shopInfo.model_id == provisioningValue.model_id">
            已开通
        </div>
        <div class="pro-submit" @click="jumpOrder()" v-else>确认开通</div>
    </div>
</template>

<script>
export default {
    props: ["provisioningValue", "shopInfo"],
    data() {
        return {};
    },
    methods: {
        // 跳转订单
        jumpOrder() {
            localStorage.setItem("model_id", this.provisioningValue.model_id);
            localStorage.setItem('orderState', 2)
            this.$router.push({ path: "/orderpay" });
        }
    }
};
</script>

<style lang="scss" scoped>
.pro-content {
    width: 27%;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    margin: 30px 3%;
    position: relative;
    padding-bottom: 60px;
}
.pro-content:hover {
    box-shadow: 0px 0px 10px rgba(64, 158, 255, 1);
}

.pro-marker {
    position: absolute;
    top: -2px;
    right: 0px;
    i {
        font-size: 70px !important;
        color: #ff1a04;
    }
    span {
        position: absolute;
        top: 18%;
        left: 33%;
        color: #fff;
        font-size: 12px;
        width: 30px;
    }
}
.pro-header {
    padding: 0 30px;
    text-align: center;
    color: #333;
    p {
        line-height: 200%;
    }
    .pro-title {
        margin-top: 50px;
        font-size: 30px;
        font-weight: bold;
    }
    .pro-price {
        position: relative;
        color: #ff8291;
        font-size: 18px;
        margin-top: 10px;
        margin-bottom: 30px;
        p {
            position: absolute;
            top: 18px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 12px;
        }
    }
    .pro-title-hint {
        font-size: 12px;
    }
    .pro-submenu {
        margin-top: 10px;
        padding-top: 30px;
        padding-bottom: 15px;
        border-top: 1px solid #eee;
        font-size: 16px;
        font-weight: bold;
    }
}
.pro-body {
    padding: 0 30px;
    .pro-body-item {
        display: flex;
        color: #333;
        line-height: 200%;
        .pro-icon-aff {
            color: #409eff;
            font-size: 22px !important;
            padding: 0 5px;
        }
        .pro-icon-no {
            color: #d9001b;
            padding: 0 10px;
        }
        .pro-body-hint {
            color: #d7d7d7;
            margin-left: 5px;
        }
    }
}
.pro-footer {
    text-align: center;
    .pro-submenu {
        font-size: 16px;
        font-weight: bold;
        margin-top: 20px;
    }
    p {
        margin-top: 15px;
        span {
            color: #ff8291;
        }
    }
}
.pro-submit {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    text-align: center;
    height: 42px;
    line-height: 42px;
    background-color: rgba(212, 232, 255, 1);
    color: #409eff;
    cursor: pointer;
}
.pro-submit:hover {
    background-color: #409eff;
    color: #fff;
}
</style>