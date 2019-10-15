<template>
<div class="pro-content">
    <p class="pro-content-title">订单提交成功，请尽快付款！</p>
    <p class="pro-content-hint">请您在48小时内完成付，否则订单会被自动取消</p>


    <!-- 选择付款方式 -->
    <div class="body">
        <div 
            class="body-item" 
            :class="{ active: activeIndex==index }"
            v-for="(item, index) in list" 
            @click="activeIndex=index"
            :key="index">
            <svg class="menuIcon alSvgIcon">
                <use :xlink:href="'#'+item.icon"></use>
            </svg>
            <span>{{ item.text }}</span>
            <span class="body-item-hint" v-if="item.hint">（当前余额：¥ {{ orderPayData.shopInfo.can_income }}）</span>
            <div class="body-item-marker" v-if="activeIndex==index"><i class="iconfont iconfuxuankuanggou"></i></div>
        </div>
    </div>


    <!-- 底部确认付款菜单 -->
    <div class="app-content-Footer">
        <div class="footer-submit">
            <div>
                <span>合计：</span>
                <span>￥{{ orderPayData.shopModelInfo.total_price }}</span>
            </div>
            <div>
                <span>应付款：</span>
                <span style="color: #f20; font-size: 20px; letter-spacing: 0px;">￥{{ orderPayData.shopModelInfo.total_price }}</span>
            </div>
            <el-button type="danger" @click="clickPay">确认付款</el-button>
        </div>
    </div>


    <!-- 二维码弹窗 -->
    <el-dialog :visible.sync="qrcodeVisible" width="300px" :before-close="beforeClose">
        <div class="el-dialog-pay" style="padding-bottom: 15px;">
            <div class="el-dialog-pay-left">
                <div style="margin-bottom: 15px; text-align: center;">微信扫码支付</div>
                <vue-qr
                    :text="url"
                    :margin="0"
                    :size="150"
                    :auto-color="true"
                    :dot-scale="1"
                    style="display: block; margin: 0 auto;"
                ></vue-qr>
            </div>
        </div>
    </el-dialog>


    <!-- 店铺余额支付短信弹窗 -->
    <el-dialog :visible.sync="codeVisible" width="300px">
        <div style="margin-bottom: 15px; text-align: center;">店铺余额支付</div>
        <div class="el-dialog-balance">
            <div class="el-dialog-code">
                <el-input size="mini" v-model="code" placeholder="请输入验证码" maxlength="4" :onkeyup="code = code.replace(/[^\.\d]/g,'')"></el-input>
                <el-button type="primary" size="mini" v-if="disabled" style="width: 120px;">{{ codeCountDown }}s</el-button>
                <el-button type="primary" @click="clickCode" size="mini" v-else style="width: 120px;">获取验证码</el-button>
            </div>
            <div style="font-size: 12px; color: #ccc; text-align: left; margin-left: 32px; margin-top: 5px;">验证码将发送到{{ orderPayData.shopInfo.mobile }}</div>
            <el-button class="balance-pay" type="primary" @click="payIncome" size="mini">确认支付</el-button>
        </div>
    </el-dialog>


</div>
</template>

<script>
// 生成二维码
import vueQr from "vue-qr";

import { getMakeCmsQrcode, getVerifyOrder, sendCms, verifyCms } from '@/api/api'

// 工具js
import { checkTel } from "@/assets/js/unlis"

export default {
    props: ['orderPayData'],
    components: {
        vueQr
    },
    data() {
        return {
            codeCountDown: 60,  // 获取验证码文字
            disabled: false,        // 禁用获取验证码
            timer: null,            // 定时器
            order_id: '',           // 订单号
            url: '',                // 二维码类容
            qrcodeVisible: false,   // 二维码弹窗
            codeVisible: false,     // 验证码弹窗
            code: '',               // 验证码
            activeIndex: 0,         // 付款方式  0=微信, 1=余额, 2=转账
            stateCode: true,        // 短信验证状态
            list: [
                {
                    icon: 'iconweixinzhifu1',
                    text: '微信支付',
                    hint: false,
                }, 
                {
                    icon: 'iconyue1',
                    text: '店铺余额支付',
                    hint: true
                }
                // {
                //     icon: 'iconzhuanzhangyinhangxiaohu',
                //     text: '银行转账',
                //     hint: false
                // }
            ]
        }
    },
    methods: {
        // 余额支付-获取验证码
        clickCode() {
            let tel = this.orderPayData.shopInfo.mobile
            if (!checkTel(tel)) {
                this.$message({ message: '请输入正确的手机号', type: 'warning' })    
                return
            }
            let params = {
                number: tel,
                cms_type: 4
            }
            sendCms(params).then(res => {
                if (res.data.status === 0) {
                    this.$message({ message: '恭喜你, 验证码获取成功', type: 'success' })  
                    this.stateCode = true
                    this.disabled = true
                    this.codeCountDown = 60
                    let timer = setInterval(() => {
                        if (this.codeCountDown <=0) {
                            clearInterval(timer)
                            this.disabled = false
                            return
                        }
                        this.codeCountDown--
                    }, 1000)
                }
            })
        },
        // 余额支付-验证验证码
        async clickVerify() {
            let tel = this.orderPayData.shopInfo.mobile
            if (this.code.length !== 4) {
                this.$message({ message: '请输入正确的验证码', type: 'warning' })  
                return
            }
            let params = {
                tel: tel,
                code: this.code
            }
            await verifyCms(params).then(res=> {
                if (res.data.status === 0) {
                    this.stateCode = false
                }
            })
        },
        // 余额支付-确认付款
        async payIncome() {
            if (this.stateCode) {
                await this.clickVerify()
                if (this.stateCode) {
                    return
                }
            }
            let appContent = document.querySelector('.app-content')
            const loading = this.$loading({ target: appContent })
            let params = {
                shop_id: localStorage.getItem('shop_id'),
                token: localStorage.getItem('token'),
                model_id: this.orderPayData.shopModelInfo.id,
                order_num: localStorage.getItem('orderId'),
                model_num: this.orderPayData.model_num,
                type: 1
            }
            this.$http.get(getMakeCmsQrcode, { params }).then(res => {
                if (res.data.status === 0) {
                    localStorage.setItem('orderState', 4)
                    this.$emit('getOrderState', 4)
                }
                this.codeVisible = false
                loading.close()
            })
        },


        // 微信支付-关闭微信弹窗
        beforeClose() {
            this.$confirm('是否取消扫码支付', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(() => {
                window.clearInterval(this.timer)
                this.qrcodeVisible = false
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消关闭'
                });
            });
        },
        // 微信支付-监听是否微信扫码支付
        monitorPay() {
            window.clearInterval(this.timer)
            let params = {
                shop_id: localStorage.getItem('shop_id'),
                token: localStorage.getItem('token'),
                order_id: localStorage.getItem('orderId'),
            }
            this.timer = setInterval(res => {
                this.$http.get(getVerifyOrder, { params }).then(res => {
                    if (res.data.status === 0) {
                        if (res.data.data.status == 1) {
                            window.clearInterval(this.timer)
                            localStorage.setItem('orderState', 4)
                            this.$emit('getOrderState', 4)
                        }
                    }
                })
            }, 1000)
        },


        // 点击付款
        clickPay() {
            // 微信支付
            if (this.activeIndex == 0) {
                this.url = localStorage.getItem('orderUrl')
                this.qrcodeVisible = true
                this.monitorPay()
            }
            // 余额支付
            if (this.activeIndex == 1) {
                this.codeVisible = true
            }
            // 银行转账
            if (this.activeIndex == 2) {
                localStorage.setItem('orderPayState', 2)
                this.$emit('getOrderPayState', 2)
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.pro-content{
    padding: 0 30px;
    padding-top: 70px;
}
.pro-content-title,
.pro-content-hint{
    margin-bottom: 15px;
}
.pro-content-hint{
    color: #AEAEAE;
}
.body{
    .body-item{
        height: 69px;
        overflow: hidden;
        position: relative;
        cursor: pointer;
        background-color: rgba(245, 247, 250, 1);
        margin-bottom: 10px;
        padding-left: 30px;
        display: flex;
        align-items: center;
        .menuIcon{
            margin-right: 15px;
            width: 36px;
            height: 36px;
        }
        .body-item-hint{
            color: #AEAEAE;
            margin-left: 10px;
        }
        .body-item-marker{
            position: absolute;
            right: -35px;
            bottom: -35px;
            width: 70px;
            height: 70px;
            border-radius: 50%;
            background-color: rgba(64, 158, 255, 1);;
            i{
                position: absolute;
                top: 10px;
                left: 10px;
                color: #fff;
                font-size: 22px !important;
            }
        }
    }
    .active{
        border: 2px solid rgba(64, 158, 255, 1);
    }
}


.app-content-Footer{
    background-color: rgba(251, 251, 251, 1);
    padding: 30px 0;
    display: flex;
    justify-content: flex-end;
    .footer-submit{
        width: 250px;
        >div {
            margin-bottom: 15px;
            span{
                display: inline-block;
                width: 120px;
            }
        }
        .el-button{
            width: 200px;
        }
    }
}

// 余额支付弹窗
.el-dialog-balance{
    text-align: center;
    .el-dialog-code{
        margin-top: 25px;
        display: flex;
        padding: 0 30px;
        input{
            border-radius: 1px !important;
        }
        .el-button--mini{
            border-radius: 1px;
        }
    }
    .balance-pay{
        margin-top: 23px;
        width: 200px;
    }
}
</style>