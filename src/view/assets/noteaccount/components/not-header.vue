<template>
<div class="not-content" v-if="data">

    
    <div class="not-content-left">
        <p class="content-lfet-title"><b>{{ data.account.total_count }}</b> 条</p>
        <p class="content-lfet-code">剩余短信</p>
        <p class="content-lfet-consumed">已消耗 : {{ data.account.surplus_count }}条</p>
        <div class="content-lfet-btn" style="display: flex;">自动充值
            <!-- <div @click="open"> -->
            <div @click="dialogVisible=true">
                <el-switch 
                    :active-value="1"
                    :inactive-value="0"
                    :value="data.cms_config.auto_full" 
                    style="margin-left: 10px;"
                ></el-switch>
            </div>
        </div>
    </div>


    <div class="not-content-right">
        <div class="right-item" v-for="(item, index) in data.list" :key="index">
            <p>{{ item.title }}</p>
            <p class="right-item-b">￥<b>{{ item.price }}</b></p>
            <p class="right-item-text">￥{{ item.sigal }}/条 <span v-if="item.desc > 0">省¥{{ item.desc }}</span></p>
            <el-button type="primary" size="mini" @click="jumpOrder(item)">立即充值</el-button>
        </div>
    </div>


    <el-dialog title="开通自动充值" :visible.sync="dialogVisible" :before-close="beforeClose" width="450px" center>
        <hr style="background-color: #ccc; border: none; height: 1px;"/>
        <div class="el-dialog-item">
            <label for="" class="dialog-item-label">充值条件：</label>当剩余条数少于  
            <el-select v-model="data.cms_config.selectLess" placeholder="请选择" size="mini" style="width: 100px">
                <el-option
                    v-for="item in data.cms_config.lessSelect"
                    :key="item"
                    :label="item"
                    :value="item">
                </el-option>
            </el-select>
            条时
        </div>
        <div class="el-dialog-item">
            <label for="" class="dialog-item-label">自动充值：</label>
            <el-select v-model="data.cms_config.selectCount" placeholder="请选择" size="mini" style="width: 100px">
                <el-option
                    v-for="item in data.cms_config.countSelect"
                    :key="item"
                    :label="item"
                    :value="item">
                </el-option>
            </el-select>
            <p class="el-dialog-hint">将默认以店铺可用余额支付短信费用</p>
        </div>
        <div class="el-dialog-item">
            <label for="" class="dialog-item-label">是否开启：</label>
            <el-radio v-model="data.cms_config.radio" :label="1">开启</el-radio>
            <el-radio v-model="data.cms_config.radio" :label="0">关闭</el-radio>
        </div>
        <div class="el-dialog-item">
            <label for="" class="dialog-item-label">管理员验证：</label>
            <div class="el-dialog-code">
                <div>
                    <el-input size="mini" v-model="code" placeholder="请输入验证码" maxlength="4" :onkeyup="code = code.replace(/[^\.\d]/g,'')"></el-input>
                    <el-button type="primary" size="mini" v-if="disabled" style="width: 100px;">{{ codeCountDown }}s</el-button>
                    <el-button type="primary" @click="clickCode" size="mini" v-else style="width: 100px;">获取验证码</el-button>
                </div>
            </div>
        </div>
        <div style="font-size: 12px; color: #ccc; text-align: left; margin-left: 105px; margin-top: 5px;">验证码将发送到{{ shopInfo.mobile }}</div>
        <div style="text-align: right; margin-top: 5px;">
            <el-button size="small" @click="beforeClose">取消</el-button>
            <el-button type="primary" size="small" @click="clickSubmit">确定</el-button>
        </div>
        <div class="el-dialog-item recharge-agreement">点击确定即代表你已阅读并同意
            <router-link style="color: #409EFF;" target="_blank" tag="a" to="protocol">《活动阁自动充值协议》</router-link>
        </div>
    </el-dialog>


</div>
</template>

<script>
import { setShopUpdateAuto, sendCms, verifyCms } from '@/api/api'
export default {
    props: ['data', 'shopInfo'],
    data() {
        return {
            dialogVisible: false, // 自动充值弹窗显示隐藏
            codeCountDown: 60,  // 倒计时时间
            code: '', // 验证码
            stateCode: true, // 短信验证状态
            disabled: false, // 禁用获取验证码
        }
    },
    methods: {
        // 跳转订单
        jumpOrder(item) {
            localStorage.setItem('model_id', item.id)
            localStorage.setItem('orderState', 2)
            this.$router.push({ path:"/orderpay" })
        },
        beforeClose() {
            let data = this.data.cms_config
            data.radio = data.auto_full
            data.selectLess = data.less
            data.selectCount = data.auto_count
            this.dialogVisible = false
        },
        // 开通自动充值
        async clickSubmit() {
            if (this.stateCode) {
                await this.clickVerify()
                if (this.stateCode) {
                    return
                }
            }
            let data = this.data.cms_config
            let params = {
                shop_id: localStorage.getItem('shop_id'),
                token: localStorage.getItem('token'),
                auto_full: data.radio,
                less: data.selectLess,
                auto_count: data.selectCount,
            }
            this.$http.post(setShopUpdateAuto, this.$qs.stringify(params)).then(res => {
                if (res.data.status === 0) {
                    data.auto_full = data.radio
                    data.less = data.selectLess
                    data.auto_count = data.selectCount
                    this.dialogVisible = false
                    this.codeCountDown = 60
                    this.code = ''
                    this.stateCode = true
                    this.disabled = false
                    this.$message({ message: '恭喜您, 修改成功', type: 'success' }) 
                }
            })
        },
        // 获取验证码
        clickCode() {
            let tel = this.shopInfo.mobile
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
            let tel = this.shopInfo.mobile
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
    },
}
</script>

<style lang="scss" scoped>
.not-content{
    min-height: 200px;
    display: flex;
    justify-content: space-between;
}
.not-content-left{
    width: 300px;
    padding-left: 100px;
    color: #999;
    margin-top: 30px;
    p{
        line-height: 150%;
    }
    .content-lfet-title{
        margin: 10px 0;
        b{
            font-size: 32px;
            font-weight: bold;
            color: #333;
        }
    }
    .content-lfet-consumed{
        color: #c8c8c8;
        font-size: 12px;
    }
    .content-lfet-btn{
        color: #333;
        margin-top: 15px;
        padding-left: 0px;
    }
}
.not-content-right{
    flex: 1;
    margin-left: 30px;
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    margin-top: 20px;
    .right-item{
        width: 132px;
        height: 146px;
        text-align: center;
        border: 1px dashed #ccc;
        border-radius: 5px;
        margin-right: 30px;
        margin-bottom: 30px;
        p{
            margin-top: 10px;
        }
        .right-item-b{
            font-size: 12px;
            color: #409Eff;
            b{
                font-size: 20px;
                font-weight: bold;
            }
        }
        .right-item-text{
            font-size: 12px;
            color: #AEAEAE;
            span{
                color: #F68080;
            }
        }
        .el-button{
            margin-top: 15px;
        }
    }
}
.el-dialog-hint{
    margin-left: 102px;
    font-size: 12px;
    color: #B0B0B0;
}
.el-dialog-item{
    margin-top: 20px;
    .dialog-item-label{
        display: inline-block;
        width: 100px;
    }
}
.recharge-agreement{
    color: #B0B0B0;
    font-size: 12px;
    text-align: right;
}
.el-dialog-pay{
    display: flex;
    justify-content: space-between;
    padding-bottom: 30px;
    >div{
        width: 50%;
        font-size: 18px;
        color: #333;
    }
    .el-dialog-pay-left{
        text-align: center;
        .el-button{
            margin-top: 30px;
        }
    }
    .el-dialog-pay-right{
        border-left: 1px dashed #ccc;
        text-align: center;
        .el-dialog-pay-hint{
            font-size: 14px;
            margin-top: 60px;
            span{
                display: inline-block;
                border: 1px solid rgba(242, 242, 242, 1);
                height: 38px;
                line-height: 38px;
                padding: 0 15px;
                padding-left: 5px;
                border-radius: 5px;
                font-weight: bold;
                color: rgb(64, 158, 255);
                b{
                    font-size: 22px;
                }
            }
        }
        .balance-pay{
            margin-top: 23px;
            width: 200px;
        }
    }
}

.el-dialog-code{
    display: flex;
    display: inline-block;
    >div{
        display: flex;
    }
    .el-input{
        width: 120px;
        border-radius: 1px !important;
    }
    .el-button{
        border-radius: 1px;
        width: 80px;
    }
}
</style>



