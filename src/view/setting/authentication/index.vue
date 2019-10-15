<template>
<div class="shop-authentication" v-loading="loading">
    <aut-header :user="user"/>
    <div class="shop-authentication-body">
        <aut-progress :state="state" v-if="state != 1"/>
        <aut-submission 
            :data="data" 
            :Industry="Industry" 
            :resData="resData" 
            :user="user"
            @getState="getState" 
            v-if="state == 0 || state == 3"
        />
        <aut-examine 
            :resData="resData"
            @getState="getState" 
            v-if="state==2" 
        />
        <aut-see 
            :data="data" 
            :resData="resData"
            @getState="getState" 
            v-if="state==1" 
        />
    </div>
</div>
</template>

<script>
import autHeader from './components/aut-header'
import autProgress from './components/aut-progress'
import autSubmission from './components/aut-submission'
import autExamine from './components/aut-examine'
import autSee from './components/aut-see'

import { getBusinessPicture, shopAuthInfo, getUser } from '@/api/api'

export default {
    components: {
        autHeader,
        autProgress,
        autSubmission,
        autExamine,
        autSee
    },
    data() {
        return {
            loading: true,      // loading
            resData: [],        // 总数居
            data: {
                "id": 0,
                "shop_id": '',
                "business": '',
                "merchant_id": '',
                "auth_type": 2, // 2企业  // 3其他
                "username": '',     // 法人姓名
                "id_number": '',   // 身份证
                "enterprise_addr": '',      // 企业地址/注册地址
                "enterprise_name": '',  // 主体名称/ 公司名
                "id_just_img": '',
                "id_back_img": '',
                "other_img": '',
                "business_cert_licence": '',        // 许可证
                "business_cert_examine": '',        // 广告审查证明
                "credit_code": '',          // 注册号
                "official_letter": '',      // 公函
                "business_cert": '',        // 行业资质
                "status": '',                // status 0 正确  1  店铺不存在  2 信息不全
                "reject": '',
                "create_time": '',
                "update_time": '',
                "mobile": ''
            },           // 数据
            state: 0,           // 状态
            Industry: [],       // 行业类目
            user: ''            // 用户信息
        }
    },
    created() {
        this.state = this.$route.query.state
        this.getIndustry()
        this.getShopAuthInfo()
        this.getUsers()
    },
    methods: {
        // 获取行业类目
        getIndustry() {
            getBusinessPicture().then(res => {
                this.Industry = res.data.data
            })
        },
        // 获取认证信息
        getShopAuthInfo() {
            let params = {
                shop_id: localStorage.getItem('shop_id'),
                token: localStorage.getItem('token')
            }
            shopAuthInfo({ params }).then(res => {
                if (res.data.status === 0) {
                    if (typeof(res.data.data.shop_auth_info.shop_id) != 'undefined') {
                        this.data = res.data.data.shop_auth_info
                    }
                    this.loading = false
                    this.resData = res.data.data
                }
            })
        },
        // 获取用户信息
        getUsers() {
            let param = { params: { token: localStorage.getItem('token') } }
            
            this.$http.get(getUser, param)
            .then(res => {
                this.user = res.data.data;
            })
            .catch(err => {
                this.$message.error(err);
            });
        },

        // 重新认证
        getState(data) {
            this.state = data
        }
    },

}
</script>

<style scoped lang="scss">
.shop-authentication{
    background: #f5f5f5;
    min-height: 100vh;
}
.shop-authentication-body{
    background-color: #fff;
    margin-top: 30px !important;
    width: 1200px;
    min-height: calc(100vh - 100px);
    margin: 0 auto;
}
</style>