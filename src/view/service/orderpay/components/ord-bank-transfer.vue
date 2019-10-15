<template>
<div class="pro-content">
    <p class="pro-content-title">订单提交成功，请尽快付款！</p>
    <p class="pro-content-hint">请您在48小时内完成付，否则订单会被自动取消</p>


    <div class="body">
        <p class="body-title">您需要转账<span>{{ orderPayData.shopModelInfo.total_price }}</span>元至以下帐户，转账成功后填写相应信息并提交审核</p>
        <div class="body-main">
            <p>收款户名<span>贵州赛雷互动科技有限公司</span></p>
            <p>收款银行<span>中国建设银行股份有限公司贵阳火车站支行</span></p>
            <p>银行账号<span>{{ 52050141383600000064 | formatBank }}</span></p>
        </div>
        <div class="body-footer">
            <el-button type="primary" plain @click="clickClose">＜选择其他付款方式</el-button>
            <el-button type="primary" @click="qrcodeVisible=true">已转账汇款, 填写付款信息</el-button>
        </div>
    </div>


    <el-dialog :visible.sync="qrcodeVisible" width="500px" title="付款方信息" class="pay-msg">
        <div v-if="show">
            <div class="pay-msg-item">
                <label for="">户名</label>
                <el-input name="user_name" v-model="user_name" placeholder="请输入户名"></el-input>
            </div>
            <div class="pay-msg-item">
                <label for="">账号</label>
                <el-input name="account" v-model="account" placeholder="请输入账号"></el-input>
            </div>
            <div class="pay-msg-item">
                <label for="">开户行</label>
                <el-input name="open_bank" v-model="open_bank" placeholder="请输入开户行"></el-input>
            </div>
            <div class="pay-msg-item">
                <label for="">金额</label>
                <div>￥{{ orderPayData.shopModelInfo.total_price }}</div>
            </div>
            <div class="pay-msg-item">
                <label for="">付款时间</label>
                <el-date-picker
                    name="time"
                    v-model="time"
                    type="datetime"
                    placeholder="选择日期时间">
                </el-date-picker>
            </div>
            <div class="pay-msg-submit"><el-button type="primary" @click="clickSubmit">确认提交</el-button></div>
        </div>
        <div v-else class="pay-msg-complete">
            <i class="iconfont iconchenggong"></i>
            <p>已提交，1个工作日内审核生效</p>
            <span>快速审核请联系：0851-88508746</span>
            <el-button type="primary" @click="clickBack">返回</el-button>
        </div>
    </el-dialog>


</div>
</template>

<script>
import { getShopTransferRecor } from '@/api/api'
import { timeStamp } from '@/assets/js/unlis.js'

export default {
    props: ['orderPayData'],
    data() {
        return {
            user_name: '',              // 户名
            account: '',                // 账号
            open_bank: '',              // 开户行
            time: '',                   // 付款时间
            show: true,                 // 弹窗内容状态切换
            qrcodeVisible: false,       // 弹窗显示隐藏
        }
    },
    methods: {
        // 返回选择支付方式
        clickClose() {
            localStorage.setItem('orderPayState', 1)
            this.$emit('getOrderPayState', 1)
        },
        // 点击提交
        clickSubmit() {
            let hint = [
                {
                    name: this.user_name,
                    text: '请输入户名, 账户不能为空'
                },
                {
                    name: this.account,
                    text: '请输入账户, 账号不能为空'
                },
                {
                    name: this.open_bank,
                    text: '请输入开户行, 账户不能为空'
                },
                {
                    name: this.time,
                    text: '请输入付款时间, 账户不能为空'
                }
            ]
            for(let i=0; i<hint.length; i++) {
                if (hint[i].name == '') {
                    this.$message({ message: hint[i].text, type: 'warning' }) 
                    return
                }
            }

            let time = ''
            if (this.time != '') {
                time = timeStamp(this.time) / 1000
            }

            let params = {
                shop_id: localStorage.getItem('shop_id'),
                token: localStorage.getItem('token'),
                order_num: localStorage.getItem('orderId'),
                user_name: this.user_name,
                account: this.account,
                open_bank: this.open_bank,
                money: this.orderPayData.shopModelInfo.total_price,
                time: time,
            }
            this.$http.post(getShopTransferRecor, this.$qs.stringify(params)).then(res => {
                if (res.data.status === 0) {
                    this.show = false
                }
            })
        },
        // 点击返回
        clickBack() {
            this.$router.go(-1)
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
    background-color: rgba(251, 251, 251, 1);
    padding: 30px 0;
    color: #333;
    padding-left: 35%;
    .body-title{
        span{
            color: #ff3f53;
            font-size: 16px;
            font-weight: bold;
        }
    }
    .body-main{
        margin: 50px 0;
        font-size: 16px;
        p{
            line-height: 200%;
        }
        span{
            font-weight: bold;
            margin-left: 15px;
        }
    }
    .body-footer{
        .el-button{
            margin-right: 30px;
        }
    }
}
.pay-msg{
    .pay-msg-item{
        display: flex;
        margin: 15px 0;
        align-items: center;
        padding: 0 30px;
        label{
            width: 100px;
        }
        .el-input{
            width: 300px;
        }
    }
    .pay-msg-submit{
        text-align: center;
        margin-top: 70px;
        .el-button{
            width: 200px;
        }
    }
}
.pay-msg-complete{
    text-align: center;
    padding-top: 30px;
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
    span{
        color: #AEAEAE;
        display: block;
        margin-top: 15px;
    }
    .el-button{
        width: 200px;
        margin-top: 50px;
    }
}
</style>