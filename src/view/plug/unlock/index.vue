<!--
 * @Author: tianbo
 * @LastEditors: tianbo
 * @Date: 2019-07-19 14:34:46
 * @LastEditTime: 2019-10-10 10:44:46
 -->
<template>
    <div class="app-content" v-loading="loading">
        <div class="action-details">
            <div class="commodity-img">
                <img :src="data.cover_img || imgUrl" alt />
            </div>
            <div class="commodity-msg">
                <h3 class="commodity-title">{{ data.title }}</h3>
                <p class="commodity-hint">{{ data.desc }}</p>
                <div class="commodity-price">
                    <span>价格:</span>
                    <b>￥{{ data.price }}</b>
                </div>
                <div class="commodity-edition">
                    <span>版本:</span>
                    <a>{{ data.cycle }}</a>
                </div>
                <div class="commodity-btn">
                    <a class="open" @click="getQrcodeUrl">立即开通</a>
                    <router-link class="open-use" tag="a" to="/provisioning">开通旗舰版 免费使用</router-link>
                </div>
            </div>
        </div>
        <p class="func-details-title">功能详情</p>
        <div class="func-details-content" v-html="data.desc"></div>

        <el-dialog :visible.sync="qrcodeVisible" width="300px" :center="true">
            <div style="margin-bottom: 15px; text-align: center;">微信扫码支付</div>
            <vue-qr
                :text="qrcode.url"
                :margin="0"
                :size="150"
                :auto-color="true"
                :dot-scale="1"
                style="display: block; margin: 0 auto;"
            ></vue-qr>
        </el-dialog>
    </div>
</template>
<script>
import { getPluginInfo, getChannelPayOrder, getVerifyOrder } from "@/api/api";
// 生成二维码
import vueQr from "vue-qr";
export default {
    components: { vueQr },
    data() {
        return {
            loading: true,
            data: [], // 详情数据
            imgUrl: require("@/assets/u1089.svg"),
            plugin_id: this.$route.query.plugin_id || "", // 插件id
            qrcodeVisible: false, // 二维码弹窗
            qrcode: {}, // 二维码弹窗
            timer: null // 定时器
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取插件详情
        getData() {
            let params = {
                token: localStorage.getItem("token"),
                plugin_id: this.plugin_id
            };
            this.$http.get(getPluginInfo, { params }).then(res => {
                this.loading = false;
                if (res.data.status == 0) {
                    this.data = res.data.data;
                } else {
                    this.$message({
                        message: res.data.message,
                        type: "warning"
                    });
                }
            });
        },
        // 获取支付二维码
        getQrcodeUrl() {
            this.loading = true;
            let params = {
                shop_id: localStorage.getItem("shop_id"),
                token: localStorage.getItem("token"),
                plugin_id: this.plugin_id
            };
            this.$http.get(getChannelPayOrder, { params }).then(res => {
                this.loading = false;
                if (res.data.status == 0) {
                    this.qrcodeVisible = true;
                    this.qrcode = res.data.data;
                    this.monitorPay();
                } else {
                    this.$message({
                        message: res.data.message,
                        type: "warning"
                    });
                }
            });
        },
        // 微信支付-监听是否微信扫码支付
        monitorPay() {
            window.clearInterval(this.timer);
            let params = {
                shop_id: localStorage.getItem("shop_id"),
                token: localStorage.getItem("token"),
                order_id: this.qrcode.order_id
            };
            this.timer = setInterval(res => {
                this.$http.get(getVerifyOrder, { params }).then(res => {
                    if (res.data.status === 0) {
                        if (res.data.data.status == 1) {
                            this.$router.push({ path: this.data.path });
                        }
                    }
                });
            }, 1000);
        }
    },
    beforeDestroy: function() {
        window.clearInterval(this.timer);
    }
};
</script>

<style lang="scss" scoped>
.app-content {
    padding: 30px;
    min-width: 1200px;
    padding-bottom: 70px;
}
.action-details {
    display: flex;
}
.commodity-img {
    width: 300px;
    height: 300px;
    overflow: hidden;
    margin-right: 50px;
}
.commodity-img img {
    width: 100%;
    height: 100%;
}
.commodity-msg {
    height: 100%;
}
.commodity-title,
.commodity-hint,
.commodity-price,
.commodity-edition {
    margin-top: 20px;
}

.commodity-msg .commodity-title {
    font-size: 24px;
}
.commodity-msg .commodity-hint {
    color: #999;
}
.commodity-price span {
    color: #999;
}
.commodity-price b {
    color: #ff4b33;
    font-size: 20px;
    font-weight: 400;
    margin-left: 15px;
}
.commodity-edition span {
    color: #999;
}
.commodity-edition a {
    display: inline-block;
    width: 120px;
    color: #33a5fe;
    border: 1px solid #33a5fe;
    text-align: center;
    line-height: 34px;
    border-radius: 2px;
    margin-left: 15px;
}
.commodity-btn {
    margin-top: 30px;
}
.commodity-btn .open,
.commodity-btn .open-use {
    display: inline-block;
    line-height: 34px;
    text-align: center;
    border-radius: 2px;
}
.commodity-btn .open {
    width: 120px;
    color: #fff;
    background-color: #33a5fe;
    margin-left: 50px;
}
.commodity-btn .open:hover {
    background-color: #6fbcfa;
}
.commodity-btn .open-use {
    width: 160px;
    color: #999;
    border: 1px solid #999;
    margin-left: 30px;
}
.commodity-btn .open-use:hover {
    color: #33a5fe;
}
.func-details-title {
    border-bottom: 1px solid #eee;
    color: #666;
    line-height: 200%;
    margin-top: 70px;
}
.func-details-content {
    margin-top: 30px;
    min-height: 300px;
    img {
        max-width: 100%;
    }
    video {
        max-width: 100%;
    }
}
</style>