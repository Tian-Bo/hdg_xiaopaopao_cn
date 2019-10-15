<template>
    <div class="app-content" v-loading="loading">
        <not-header :data="data" :shopInfo="shopInfo" @getData="getData"/>
        
        <div class="app-content-body">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="充值记录" name="1"></el-tab-pane>
                <!-- <el-tab-pane label="发送记录" name="2"></el-tab-pane> -->
            </el-tabs>
            <div class="app-body-right">
                <el-date-picker
                    size="mini"
                    v-model="value"
                    type="datetimerange"
                    :picker-options="pickerOptions"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right"
                ></el-date-picker>
                <el-button type="primary" size="mini" @click="clickScreen">筛选</el-button>
            </div>
        </div>

        <not-recharge-list v-if="activeName==1"  :data="data"/>
        <not-send-list v-if="activeName==2" />

        <div class="app-content-Footer">
            <el-pagination
                @current-change="currentChange"
                background
                :total="total"
                layout="total, prev, pager, next, jumper"
                :current-page="currentPaging"
                :show-summary="false"
            ></el-pagination>
        </div>

    </div>
</template>

<script>
import notHeader from "./components/not-header";
import notRechargeList from "./components/not-recharge-list";
import notSendList from "./components/not-send-list";

import { timeStamp } from '@/assets/js/unlis.js'
import { getShopCmsDetail, shopInfo } from '@/api/api'

export default {
    components: {
        notHeader,
        notRechargeList,
        notSendList
    },
    data() {
        return {
            shopInfo: '',       // 店铺数据
            data: '',           // 总数据
            loading: true,      // loading
            // 分页
            total: 0,           // 分页总数
            activeName: '1',    // tab
            currentPaging: 1,   // 重定向分页记录
            // 时间
            pickerOptions: {
                shortcuts: [
                    {
                        text: "最近一周",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 7
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "最近一个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 30
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "最近三个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 90
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    }
                ]
            },
            value: [
                '',
                ''
            ],
            // ajax
            ajax: {
                page: 1,            // 分页
                create_time: '',    // 开始时间
                end_time: '',       // 结束时间
                tab_index: '',      // 标签页    
            }
        }
    },
    created() {
        this.getData()
        this.getShopInfo()
    },
    methods: {
        // 获取标签页
        handleClick() {
            this.ajax.tab_index = this.activeName
        },
        // 获取分页数据
        currentChange(val) {
            this.loading = true
            this.ajax.page = val
            this.getData()
        },
        // 筛选
        clickScreen() {
            this.loading = true
            if (this.value == null) {
                this.ajax.create_time = ''
                this.ajax.end_time = ''
            } 
            else if (this.value[0] == '' || this.value[1] == '') {
                this.ajax.create_time = ''
                this.ajax.end_time = ''
            }
            else {
                this.ajax.create_time = timeStamp(this.value[0]) / 1000
                this.ajax.end_time = timeStamp(this.value[1]) / 1000
            }
            this.ajax.page = 1
            this.getData()
        },
        // 获取数据
        getData() {
            let params = {
                shop_id: localStorage.getItem('shop_id'),
                token: localStorage.getItem('token'),
                page: this.ajax.page,
                time: `[${this.ajax.create_time},${this.ajax.end_time}]`
            }
            this.$http.get(getShopCmsDetail, { params }).then(res => {
                if (res.data.status === 0) {
                    let data = res.data.data
                    
                    data.cms_config.radio = data.cms_config.auto_full
                    data.cms_config.selectLess = data.cms_config.less
                    data.cms_config.selectCount = data.cms_config.auto_count

                    this.data = data
                    this.total = data.recharge_record.total
                }
                this.loading = false
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
                    this.shopInfo = res.data.data
                }
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.app-content {
    padding: 10px;
}
.app-content-body {
    margin-top: 30px;
    align-items: center;
    display: flex;
    justify-content: space-between;  
    .app-body-right{
        display: flex;
        align-items: center;
        .el-button{
            margin-left: 15px;
        }
    }
}
.app-content-Footer{
    text-align: center;
    padding: 30px 0;
}
</style>

