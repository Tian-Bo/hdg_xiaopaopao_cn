<template>
<div class="centent" v-loading="loading">
    <el-tabs v-model="activeName">
        <el-tab-pane label="店铺信息" name="1">
            <set-store-information :data="data" />
        </el-tab-pane>
        <el-tab-pane label="关注设置" name="2"><set-follow :data="follow_info" /></el-tab-pane>
        <el-tab-pane label="品牌形象" name="3"><set-brand-image :data="brand_image" /></el-tab-pane>
    </el-tabs>
</div>
</template>

<script>
import setBrandImage from './components/set-brand-image'
import setFollow from './components/set-follow'
import setStoreInformation from './components/set-store-information'

import { getBusinessPicture, shopInfo } from '@/api/api'

export default {
    components: {
        setBrandImage,
        setFollow,
        setStoreInformation
    },
    data() {
        return {
            loading: true,          // loading
            data: [],               // 店铺所有信息
            activeName: '1',        // 默认tab选项
            follow_info: [],        // 关注设置
            brand_image: [],        // 品牌形象
            province: [ 
                { item: "上海", value: '市' }, 
                { item: "北京", value: '市' }, 
                { item: "天津", value: '市' }, 
                { item: "重庆", value: '市' }, 
                { item: "广东", value: '省' }, 
                { item: "福建", value: '省' }, 
                { item: "湖北", value: '省' }, 
                { item: "湖南", value: '省' }, 
                { item: "河北", value: '省' }, 
                { item: "河南", value: '省' }, 
                { item: "陕西", value: '省' }, 
                { item: "江苏", value: '省' }, 
                { item: "浙江", value: '省' }, 
                { item: "安徽", value: '省' }, 
                { item: "江西", value: '省' }, 
                { item: "山东", value: '省' }, 
                { item: "辽宁", value: '省' }, 
                { item: "吉林", value: '省' }, 
                { item: "四川", value: '省' }, 
                { item: "贵州", value: '省' }, 
                { item: "云南", value: '省' }, 
                { item: "甘肃", value: '省' }, 
                { item: "青海", value: '省' }, 
                { item: "海南", value: '省' }, 
                { item: "台湾", value: '省' }, 
                { item: "黑龙江", value: '省' },
                { item: "西藏", value: '自治区' }, 
                { item: "内蒙古", value: '自治区' }, 
                { item: "宁夏", value: '回族自治区' }, 
                { item: "广西", value: '壮族自治区' }, 
                { item: "香港", value: '特别行政区' }, 
                { item: "澳门", value: '特别行政区' }, 
                { item: "新疆", value: '维吾尔自治区' }
            ]
        }
    },
    created() {
        this.getShopMsg()
    },
    methods: {
        // 获取店铺所有信息
        getShopMsg() {
            let params = {
                shop_id: localStorage.getItem('shop_id'),
                token: localStorage.getItem('token')
            }
            shopInfo({ params }).then(res => {
                if (res.data.status === 0) {
                    this.province.forEach((item, index) => {
                        if (res.data.data.province == item.item) {
                            res.data.data.province = item.item + item.value
                        }
                    })

                    let resData = res.data.data
                    this.data = resData
                    this.follow_info = resData.follow_info
                    this.brand_image = resData.brand_image
                    this.loading = false
                }
            })
        }
    },
}
</script>

<style scoped lang="scss">
.centent{
    padding: 0 10px;
    padding-bottom: 30px;
}
</style>
