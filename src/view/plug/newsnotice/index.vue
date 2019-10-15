<template>
<div class="app-content" v-loading="loading">
    <el-tabs v-model="activeName">
        <el-tab-pane label="消息通知" name="1"><notice :data="data" /></el-tab-pane>
        <!-- <el-tab-pane label="消息群发" name="2"><cluster-hair :data="data" /></el-tab-pane>
        <el-tab-pane label="推送统计" name="3"><statistics :data="data" /></el-tab-pane> -->
    </el-tabs>
</div>
</template>

<script>
import notice from './components/notice'
import clusterHair from './components/cluster-hair'
import statistics from './components/statistics'

import { getInformSign } from '@/api/api'

export default {
    components: {
        notice,
        clusterHair,
        statistics
    },
    data() {
        return {
            loading: true,      // loading
            data: [],           // 总数据
            activeName: '1'     // tab页
        }
    },
    created() {
        this.getData()
    },
    methods: {
        // 消息通知
        getData() {
            let params = {
                shop_id: localStorage.getItem('shop_id'),
                token: localStorage.getItem('token')
            }
            this.$http.get(getInformSign, { params }).then(res => {
                if (res.data.status === 0) {
                    res.data.data.list.forEach((item, index) => {
                        item['show'] = false
                        item['preview1'] = false
                        item['preview2'] = false
                        if (item.type == 2) {
                            item['new_send_rule'] = item.send_rule
                        }
                        if (item.type == 3) {
                            item['day'] = item.send_rule.day
                            item['hour'] = item.send_rule.hour
                            item['minute'] = item.send_rule.minute
                        }
                    })
                    this.data = res.data.data
                    this.loading = false
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
   .app-content{
       padding: 30px;
   }
</style>