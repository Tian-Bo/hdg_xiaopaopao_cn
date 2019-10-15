<template>
<div class="pro-content">
    <p class="pro-content-title">所属店铺： {{ orderPayData.shopInfo.shop_name }}</p>
    <el-table :data="[orderPayData.shopModelInfo]" :header-cell-style="{ background:'rgba(242, 242, 242, 1)', color:'#333', fontWeight: '400' }">
        <el-table-column
            fixed
            label="项目名称"
            width="420">
            <template slot-scope="scope">
                <div class="main-item">
                    <div class="activ-head">
                        <img :src="scope.row.cover_img">
                    </div>
                    <div class="activ-name">
                        <span class="activ-name-title ellipsis">{{ scope.row.title }}</span>
                        <span>{{ scope.row.cycle }}</span>
                    </div>
                </div>
            </template>
        </el-table-column>
        <el-table-column
            label="有效期"
            align="center">
            <template slot-scope="scope">
                <div>{{ scope.row.start_time }}</div>
                <div>{{ scope.row.end_time }}</div>
                <div v-if="scope.row.start_time=='' && scope.row.end_time==''">-</div>
            </template>
        </el-table-column>
        <el-table-column
            label="单价"
            align="center">
            <template slot-scope="scope">
                <div>￥{{ scope.row.price }}</div>
            </template>
        </el-table-column>
        <el-table-column
            prop="num"
            label="数量"
            align="center">
        </el-table-column>
        <el-table-column
            label="小计"
            align="center">
            <template slot-scope="scope">
                <div>￥{{ scope.row.total_price }}</div>
            </template>
        </el-table-column>
    </el-table>


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
            <el-button type="danger" @click="clickOrder">提交订单</el-button>
        </div>
    </div>


</div>
</template>

<script>
import { getMakeCmsQrcode } from '@/api/api'

export default {
    props: ['orderPayData'],
    methods: {
        // 点击提交订单
        clickOrder() {
            let appContent = document.querySelector('.app-content')
            const loading = this.$loading({ target: appContent })
            let params = {
                shop_id: localStorage.getItem('shop_id'),
                token: localStorage.getItem('token'),
                model_id: this.orderPayData.shopModelInfo.id,
                model_num: this.orderPayData.model_num
            }
            this.$http.get(getMakeCmsQrcode, { params }).then(res => {
                if (res.data.status === 0) {
                    localStorage.setItem('orderId', res.data.data.order_id)
                    localStorage.setItem('orderUrl', res.data.data.url)
                    localStorage.setItem('orderState', 3)
                    this.$emit('getOrderState', 3)
                }
                loading.close()
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.pro-content{
    padding: 0px 30px;
    padding-top: 70px;
}
.pro-content-title{
    margin-bottom: 15px;
    color: #8E8E8E;
}
.table-scope{
    display: flex;
    align-items: center;
    justify-content: center;
    span{
        margin-left: 5px;
    }
}

.main-item{
    display: flex;
    .activ-head {
        width: 86px;
        height: 86px;
        background-color: #eee;
        border-radius: 3px;
        overflow: hidden;
        margin-right: 15px;
        margin-left: 15px;
        img {
            width: 100%;
            height: 100%;
            display: block;
        }
    }
    .activ-name {
        width: calc(100% - 131px);
        span {
            color: #a1a1a1;
            display: block;
            font-size: 12px;
        }
        .activ-name-title {
            color: #333;
            min-width: calc(300px - 131px);
            margin: 5px 0;
            font-size: 14px;
        }
        p {
            color: #333;
        }
        div {
            margin-top: 15px;
            font-size: 12px;
            display: inline-block;
            border-radius: 5px;
            padding: 0 10px;
            color: #fff;
            background-color: #f68080;
        }
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
</style>