<template>
<div class="new-content">


    <div class="header">
        <span>当前短信签名为 : {{ data.sign }}</span>
        <el-popover
            placement="top-start"
            width="300"
            trigger="click"
            v-model="preview">
            <p style="color: #2F2F2F; font-size: 12px;">【{{ data.sign }}】您好{姓名}，恭喜你成功报名活动{活动名称}~    查看核销券:
                <a style="color: #409EFF;" class="el-popover-hover">http://1t.click/fBK</a>
            </p>
            <a slot="reference">预览</a>
        </el-popover>
        <el-popover
            placement="top-start"
            trigger="manual"
            v-model="signState">
            <div class="header-edit">
                <el-input v-model="sign" placeholder="2-8个字, 建议用店铺名或品牌名" size="mini" maxlength="8"></el-input>
                <el-button type="primary" plain size="mini" style="margin-left: 15px;" @click="closeEditSign">取消</el-button>
                <el-button type="primary" size="mini" @click="editSign">保存</el-button>
            </div>
            <a slot="reference" @click="signState=true">修改</a>
        </el-popover>
        <span class="header-code">剩余短信条数 {{ data.sms_count }}</span>
        <router-link tag="a" to="/noteaccount">立即充值</router-link>
    </div>


    <div class="body">
        <div class="body-item" v-for="(item, index) in data.list" :key="index" v-if="index==0 || index==2 || index==3">
            <div class="item-title">
                <a class="item-title-hint">


                    <!-- 发送规则状态1 -->
                    <el-popover
                        v-if="item.type == 1"
                        placement="top-start"
                        trigger="hover"
                        v-model="item.show"
                    >
                        <p style="font-size: 12px;">{{ item.send_rule }}</p>
                        <a slot="reference" style="color: #409EFF;" @click="item.show=true">发送规则</a>
                    </el-popover>

                    
                    <!-- 发送规则状态2 -->
                    <el-popover
                        v-if="item.type == 2"
                        placement="top-start"
                        trigger="manual"
                        v-model="item.show">
                        <div class="item-title-rule">
                            用户提交报名 
                            <el-select v-model="item.new_send_rule" placeholder="天" size="mini" style="width: 70px">
                                <el-option
                                v-for="item in data.minutes"
                                :key="item"
                                :label="item"
                                :value="item">
                                </el-option>
                            </el-select>
                            分钟未支付时
                            <el-button type="primary" plain size="mini" style="margin-left: 15px;" @click="closeEditSendRules(index)">取消</el-button>
                            <el-button type="primary" size="mini" @click="editSendRules(index)">保存</el-button>
                        </div>
                        <a slot="reference" style="color: #409EFF;" @click="item.show=true">发送规则</a>
                    </el-popover>

                    
                    <!-- 发送规则状态3 -->
                    <el-popover
                        v-if="item.type == 3"
                        placement="top-start"
                        trigger="manual"
                        v-model="item.show">
                        <div class="item-title-rule">
                            核销卷到期前 
                            <el-select v-model="item.day" placeholder="天" size="mini" style="width: 70px">
                                <el-option
                                v-for="(item, index) in 7"
                                :key="index"
                                :label="index"
                                :value="index">
                                </el-option>
                            </el-select>
                            天 
                            <el-select v-model="item.hour" placeholder="时" size="mini" style="width: 70px">
                                <el-option
                                v-for="(item, index) in 24"
                                :key="index"
                                :label="index"
                                :value="index">
                                </el-option>
                            </el-select>
                            时 
                            <el-select v-model="item.minute" placeholder="分" size="mini" style="width: 70px">
                                <el-option
                                v-for="(item, index) in 60"
                                :key="index"
                                :label="index"
                                :value="index">
                                </el-option>
                            </el-select>
                            分 
                            <el-button type="primary" plain size="mini" style="margin-left: 15px;" @click="closeEditSendRules(index)">取消</el-button>
                            <el-button type="primary" size="mini" @click="editSendRules(index)">保存</el-button>
                        </div>
                        <a slot="reference" style="color: #409EFF;" @click="item.show=true">发送规则</a>
                    </el-popover>


                </a>
                <div class="item-title-left"><img :src="item.sms_image" alt=""></div>
                <div class="item-title-right">
                    <h3>{{ item.title }}</h3>
                    <p class="text-truncation">{{ item.desc }}</p>
                </div>
            </div>


            <div class="item-footer">
                <div class="item-state bor-bottom-ccc">
                    <div class="item-state-left">
                        <span class="color-ff3655">免费</span>
                        <span>微信消息通知（{{ item.wx_inform.switch == 1 ? '已开启' : '未开启' }}）</span>
                        <el-popover
                            class="item-footer-preview"
                            placement="top-start"
                            v-model="item.preview1">
                            <div class="item-footer-gif"><img :src="item.wx_inform.preview" alt=""></div>
                            <a slot="reference">预览</a>
                        </el-popover>
                    </div>
                    <el-switch 
                        class="el-switch"
                        v-model="item.wx_inform.switch" 
                        :active-value="1" 
                        :inactive-value="0" 
                        @change="editInformConfig(item.index, 0, item.wx_inform.switch, index)"
                    ></el-switch>
                </div>


                <div class="item-state">
                    <div class="item-state-left">
                        <span class="color-409EFF">收费</span>
                        <span>短信通知（{{ item.sms_inform.switch == 1 ? '已开启' : '未开启' }}）</span>
                        <el-popover
                            placement="top-start"
                            v-model="item.preview2">
                            <div class="item-footer-gif"><img :src="item.sms_inform.preview" alt=""></div>
                            <a slot="reference">预览</a>
                        </el-popover>
                    </div>
                    <el-switch 
                        class="el-switch" 
                        v-model="item.sms_inform.switch" 
                        :active-value="1" 
                        :inactive-value="0"
                        @change="editInformConfig(item.index, 1, item.sms_inform.switch, index)"
                    ></el-switch>
                </div>
            </div>


        </div>
    </div>


</div>
</template>

<script>
import { setInformSign, setInformConfig, setSendRules } from '@/api/api'

export default {
    props: ['data'],
    data() {
        return {
            signState: false,          // 签名弹窗
            sign: '',                  // 签名
            preview: false,            // 签名预览
        }
    },
    methods: {
        // 取消修改签名
        closeEditSign() {
            this.sign = ''
            this.signState = false
        },
        // 修改签名
        editSign() {
            if (this.sign.length < 2 || this.sign.length > 8) {
                this.$message({ message: '请输入2-8位长度的签名', type: 'warning' });
                return
            }
            let params = {
                shop_id: localStorage.getItem('shop_id'),
                token: localStorage.getItem('token'),
                sign: this.sign
            }
            this.$http.post(setInformSign, this.$qs.stringify(params)).then(res => {
                if (res.data.status === 0) {
                    this.data.sign = this.sign
                    this.sign = ''
                    this.signState = false
                }
            })
        },
        // 修改-微信消息通知配置 或者 短信通知配置
        editInformConfig(index, type, type_value, i) {
            let params = {
                shop_id: localStorage.getItem('shop_id'),
                token: localStorage.getItem('token'),
                index: index,
                type: type,
                type_value: type_value,
            }
            this.$http.post(setInformConfig, this.$qs.stringify(params)).then(res => {
                if (res.data.status === 0) {}
            })
        },
        // 取消修改发送规则
        closeEditSendRules(i) {
            let data = this.data.list[i]
            let type = data.type

            if (type == 2) {
                data.new_send_rule = data.send_rule
            }
            else {
                data.day = data.send_rule.day
                data.hour = data.send_rule.hour
                data.minute = data.send_rule.minute
            }
            data.show = false
        },
        // 修改通知签名
        editSendRules(i) {
            let data = this.data.list[i]
            let type = data.type
            let index = data.index
            let day = ''
            let hour = ''
            let minute = ''

            if (type == 2) {
                minute = data.new_send_rule
            }
            else {
                day = data.day
                hour = data.hour
                minute = data.minute
            }

            let params = {
                shop_id: localStorage.getItem('shop_id'),
                token: localStorage.getItem('token'),
                index: index,
                day: day,
                hour: hour,
                minute: minute
            }
            this.$http.post(setSendRules, this.$qs.stringify(params)).then(res => {
                if (res.data.status === 0) {
                    if (type == 2) {
                        data.send_rule = data.new_send_rule
                    }
                    else {
                        data.send_rule.day = data.day
                        data.send_rule.hour = data.hour
                        data.send_rule.minute = data.minute
                    }
                    data.show = false
                }
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.header{
    height: 38px;
    border: 1px solid rgba(255, 238, 185, 1);
    background-color: rgba(253, 246, 236, 1);
    line-height: 38px;
    padding: 0 15px;
    span, a{
        font-size: 12px;
    }
    a{
        color: #409EFF;
        margin-left: 10px;
    }
    .header-code{
        margin-left: 30px;
    }

}
.header-edit{
    display: flex;
}


.body{
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    .body-item{
        margin-right: 60px;
        // width: 365px;
        width: 30%;
        border: 1px solid rgba(244, 244, 245, 1);
        border-radius: 5px;
        margin-bottom: 50px;
        margin-right: 5%;
        &:nth-of-type(3n){
            margin-right: 0;
        }
    }
    .item-title{
        height: 116px;
        background-color: rgba(236, 245, 255, 1);
        padding: 20px 15px;
        display: flex;
        position: relative;
        .item-title-hint{
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 12px;
        }
        .item-title-left{
            width: 80px;
            height: 80px;
            margin-right: 10px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .item-title-right{
            flex: 1;
            margin-top: 5px;
            h3{
                font-weight: bold;
                margin-bottom: 10px;
            }
            p{
                color: #909399;
            }
        }
    }
    .item-footer{
        padding: 0 15px;
    }
    .item-state{
        height: 45px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .item-state-left{
            .color-ff3655{
                color: #ff3655;
                border-radius: 5px;
                padding: 1px 5px;
                margin-right: 5px;
                font-size: 12px;
                border: 1px solid #ff3655;
            }
            .color-409EFF{
                color: #409EFF;
                border-radius: 5px;
                padding: 2px 5px;
                margin-right: 5px;
                padding: 1px 5px;
                font-size: 12px;
                border: 1px solid #409EFF;
            }
            a{
                color: #409EFF;
            }
        }
    }
    .bor-bottom-ccc{
        border-bottom: 1px dashed #ccc;      
    }
}
.item-title-rule{
    display: flex;
    align-items: center;
}
.item-footer-gif{
    width: 318px;
    height: 547px;
    img{
        display: block;
        margin: 0 auto;
        width: 318px;
        height: 547px;
    }
}
// 预览
.item-footer-preview{
    position: relative;
}
.preview-text{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: 12px;
    padding: 200px 90px;
}
</style>