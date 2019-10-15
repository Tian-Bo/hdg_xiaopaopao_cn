<template>
    <div class="not-content" v-if="data">
        <el-table :data="data.recharge_record.items" :header-cell-style="{ background:'rgba(242, 242, 242, 1)', color:'#333', fontWeight: '400' }">
            <el-table-column label="充值时间" align="center">
                <template slot-scope="scope">
                    <div>{{ scope.row.create_time }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="cms_count" label="充值条数" align="center"></el-table-column>
            <el-table-column label="充值金额(元)" align="center">
                <template slot-scope="scope">
                    <div style="color: #f68080;">¥{{ scope.row.price }}</div>
                </template>
            </el-table-column>
            <el-table-column label="支付方式" align="center">
                <template slot-scope="scope">
                    <div class="table-scope">
                        <svg class="menuIcon alSvgIcon" v-if="scope.row.pay_channel==1" style="font-size: 22px;">
                            <use xlink:href="#iconweixinzhifu"></use>
                        </svg>
                        <span v-if="scope.row.pay_channel==1">微信支付</span>
                        <svg class="menuIcon alSvgIcon" v-if="scope.row.pay_channel==2">
                            <use xlink:href="#iconyue"></use>
                        </svg>
                        <span v-if="scope.row.pay_channel==2">店铺余额</span>
                        <span v-if="scope.row.pay_channel==3">银行转账</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="recharge_type" label="充值方式" align="center"></el-table-column>
            <el-table-column label="状态" align="center">
                <template slot-scope="scope">
                    <div class="table-scope">
                        <svg class="menuIcon alSvgIcon" v-if="scope.row.status==0" style="font-size: 22px;">
                            <use xlink:href="#iconshibai"></use>
                        </svg>
                        <svg class="menuIcon alSvgIcon" v-if="scope.row.status==1" style="font-size: 22px;">
                            <use xlink:href="#iconchenggong"></use>
                        </svg>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    props: ['data'],
};
</script>

<style lang="scss" scoped>
.table-scope{
    display: flex;
    align-items: center;
    justify-content: center;
    span{
        margin-left: 5px;
    }
}
</style>