<template>
<div class="app-content" v-loading="loading">


    <div class="header">
        <div class="header-img"><img :src="shopInfo.shop_cover || logoImg" alt=""></div>
        <div class="header-msg">
            <p>{{ shopInfo.shop_name }}</p>
            <p>到期时间：{{ shopInfo.end_time }}</p>
        </div>
        <div class="header-voucher">
            <span>店铺兑换：</span>
            <el-input class="voucher-input" size="medium" minlength="4" maxlength="4" v-model="voucher1" ></el-input>
            <span>—</span>
            <el-input class="voucher-input" size="medium" minlength="4" maxlength="4" v-model="voucher2" ></el-input>
            <span>—</span>
            <el-input class="voucher-input" size="medium" minlength="4" maxlength="4" v-model="voucher3" ></el-input>
            <span>—</span>
            <el-input class="voucher-input" size="medium" minlength="4" maxlength="4" v-model="voucher4" ></el-input>
            <el-button size="small" type="primary" @click="voucherGet">确认兑换</el-button>
        </div>
    </div>


    <div class="body">
        <pro-edition
            v-for="(item, index) in shopModel"
            :key="index"
            :provisioningValue="item"
            :shopInfo="shopInfo"
            v-if="index<3" />
    </div>


    <div class="footer" v-if="shopModel.length>3">
        <p class="footer-title"><span @click="show=!show">更多版本</span>></p>
    </div>


    <div class="body" v-if="show">
        <pro-edition
            v-for="(item, index) in shopModel"
            :key="index" :provisioningValue="item"
            :shopInfo="shopInfo"
            v-if="index>2" />
    </div>


</div>
</template>

<script>
import proEdition from './components/pro-edition'

import { getShopModel, shopInfo, exchangeVoucher } from '@/api/api'

export default {
    components: {
        proEdition
    },
    data() {
        return {
            logoImg: require('../../../assets/bgUser.jpg'),  // 默认店铺图
            loading: true,  // loading
            shopInfo: '',   // 店铺所有信息
            shopModel: '',  // 所有版本数据
            show: false,    // 更多版本显示隐藏
            voucher1:'',
            voucher2:'',
            voucher3:'',
            voucher4:''
        }
    },
    created() {
        this.getShopData()
        this.getShopMsg()
    },
    methods: {
        // 获取所有版本信息
        getShopData() {
            let params = {
                shop_id: localStorage.getItem('shop_id'),
                token: localStorage.getItem('token')
            }
            this.$http.get(getShopModel, { params }).then(res => {
                if (res.data.status === 0) {
                    this.shopModel = res.data.data
                    this.loading = false
                }
            })
        },
        // 获取店铺所有信息
        getShopMsg() {
            let params = {
                shop_id: localStorage.getItem('shop_id'),
                token: localStorage.getItem('token')
            }
            shopInfo({ params }).then(res => {
                if (res.data.status === 0) {
                    this.shopInfo = res.data.data
                }
            })
        },
        //兑换
        voucherGet(index){
          let code = this.voucher1+this.voucher2+this.voucher3+this.voucher4
          if(code.length != 16){
            this.$message({
                      message: '请输入完整的兑换码',
                      type: 'warning'
                    });
                    return;
          }
          let params = {
              token: localStorage.getItem('token'),
              voucher_code:code,
              shop_id: localStorage.getItem('shop_id')
          }
          this.$confirm('此操作可能会影响你已开通的店铺, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.get(exchangeVoucher, {params} ).then(res => {
              if(res.data.status === 1){
                this.$alert(res.data.message, '提示')
                return;
              }
              this.$alert('兑换成功', '提示')
            })
          }).catch(() => {

          });

        }
    }
}
</script>

<style lang="scss" scoped>
.app-content{
    padding: 30px 70px;
    padding-bottom: 70px;

}
.header{
    display: flex;
    align-items: center;
    .header-img{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .header-msg{
        margin-left: 15px;
        p{
            line-height: 150%;
        }
    }
    .header-voucher{
      margin-left:80px;
      .voucher-input{
        display:inline-block;
        width:70px;

      }
    }
}
.body{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
}

.footer{
    margin: 70px 0;
    .footer-title{
        text-align: right;
        border-bottom: 1px solid #ccc;
        padding-right: 10px;
        padding-bottom: 5px;
        span{
            cursor: pointer;
        }
    }
}
</style>
