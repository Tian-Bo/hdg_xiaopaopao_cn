<!--
 * @Author: zlz5v5
 * @LastEditors: zlz
 * @Date: 2019-08-14 10:20:56
 * @LastEditTime: 2019-08-17 15:46:05
 -->
<template>
<div class="app-content" v-loading="loading">
    <ord-header :state="orderPayData.orderState" />
    <ord-selection-service 
        :orderPayData="orderPayData" 
        v-if="orderPayData.orderState==1" 
    />
    <ord-confirm-order 
        :orderPayData="orderPayData" 
        v-if="orderPayData.orderState==2" 
        @getOrderState="getOrderState" 
    />
    <ord-selection-pay 
        :orderPayData="orderPayData" 
        v-if="orderPayData.orderState==3 && orderPayData.orderPayState==1" 
        @getOrderPayState="getOrderPayState"
        @getOrderState="getOrderState"  
    />
    <ord-bank-transfer 
        :orderPayData="orderPayData" 
        v-if="orderPayData.orderState==3 && orderPayData.orderPayState==2" 
        @getOrderPayState="getOrderPayState" 
    />
    <ord-pay-complete v-if="orderPayData.orderState==4" />
</div>
</template>

<script>
import ordHeader from './components/ord-header'
import ordSelectionService from './components/ord-selection-service'
import ordConfirmOrder from './components/ord-confirm-order'
import ordSelectionPay from './components/ord-selection-pay'
import ordBankTransfer from './components/ord-bank-transfer'
import ordPayComplete from './components/ord-pay-complete'

import { shopInfo, getShopModelInfo } from '@/api/api'

export default {
    components: {
        ordHeader,
        ordSelectionService,
        ordConfirmOrder,
        ordSelectionPay,
        ordBankTransfer,
        ordPayComplete
    },
    data() {
        return {
            loading: true,                     // loading
            orderPayData: {
                shopModelInfo: '',              // 商铺模型详情
                shopInfo: '',                   // 店铺所有数据
                model_id: '',                   // model_id
                orderState: 2,                  // 进度条
                orderPayState: 1,               // 银行转账状态展示
                model_num: 1,                   // 订单数量
            },
        }
    },
    created() {
        this.getLocalStorage()
        this.getShopInfo()
        this.getShopModel()
    },
    methods: {
        // 获取上个页面通过 localStorage 存储的数据
        getLocalStorage() {
            let orderState = localStorage.getItem('orderState')
            let orderPayState = localStorage.getItem('orderPayState')

            if (orderState == 2) {
                localStorage.setItem('orderPayState', 1)
            }

            if (orderState) {
                this.orderPayData.orderState = localStorage.getItem('orderState')
            }
            if (orderPayState) {
                this.orderPayData.orderPayState = localStorage.getItem('orderPayState')
            }
        },
        // 获取商铺模型详情
        getShopModel() {
            let params = {
                token: localStorage.getItem('token'),
                model_id: localStorage.getItem('model_id'),
            }
            this.$http.get(getShopModelInfo, { params }).then(res => {
                if (res.data.status === 0) {
                    this.orderPayData.shopModelInfo = res.data.data
                    this.loading = false
                }
            })
        },
        // 获取店铺所有信息
        getShopInfo() {
            let params = {
                shop_id: localStorage.getItem('shop_id'),
                token: localStorage.getItem('token')
            }
            shopInfo({ params }).then(res => {
                if (res.data.status === 0) {
                    this.orderPayData.shopInfo = res.data.data
                }
            })
        },
        // 切换步骤条
        getOrderState(data) {
            this.orderPayData.orderState = data
        },
        // 切换银行转账方式
        getOrderPayState(data) {
            this.orderPayData.orderPayState = data
        }
    },
    // 清除当前页面设置的所有 localStorage 缓存
    beforeDestroy: function () {
        localStorage.removeItem('model_id')
        localStorage.removeItem('orderState')
        localStorage.removeItem('orderPayState')
        localStorage.removeItem('orderId')
        localStorage.removeItem('orderUrl')
    },
}
</script>

<style lang="scss" scoped>
    
</style>