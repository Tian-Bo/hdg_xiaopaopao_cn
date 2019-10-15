<!--
 * @Author: zlz5v5
 * @LastEditors: zlz
 * @Date: 2019-08-08 18:43:56
 * @LastEditTime: 2019-09-29 16:22:16
 * @Github: https://github.com/Arc-zlz/
 -->
<template>
    <div class="create-rule" >
        <ruleTopNav  :voucher_config="voucher_config" :role_config="role_config" v-loading="loading"/>
        <setRulePrice
            :voucher_config="voucher_config"
            :role_config="role_config"
        />
        <setRule
            :role_config="role_config"
            :voucher_config="voucher_config"
        />
        <setRecurrence
            :condition_set="condition_set"
            :return_type="return_type"
            :marketing_set="marketing_set"
            :pattern="pattern"
        />
    </div>
</template>

<script>
import { getClusterRuleLis } from "@/api/api";
// 顶部导航
import ruleTopNav from "./components/rule_top_nav";
// 设置红包组件
import setRulePrice from "./components/set_rule_price";
// 设置规则组件
import setRule from "./components/set_rule";
// 设则返现组件
import setRecurrence from "./components/set_recurrence";
export default {
    data() {
        return {
            shop_id: localStorage.getItem("shop_id"),
            token: localStorage.getItem("token"),
            cluster_id: localStorage.getItem("clusterId"),
            loading: false,
            // 项目（套餐）价格设置
            voucher_config: [],
            // 组队拼团规则设置
            role_config: [],
            // 关系绑定
            marketing_set: {},
            // 返现方式
            condition_set: {},
            // 返现条件
            return_type: {},
            // 关系绑定的文案
            pattern: []
        };
    },
    components: {
        setRulePrice,
        setRule,
        setRecurrence,
        ruleTopNav
    },
    created() {
        this.getRuleList();
    },
    methods: {
        // 获取规则列表
        getRuleList() {
            let _that = this;
            // 这块功能需要得到 cluster_id ,但是这个值只有从/create_home能得到
            if (localStorage.getItem("clusterId") === null) {
                _that.$router.push({
                    path: "/create_home",
                    query: { title: "create_activity" }
                });
                return;
            }
            _that.loading = true;
            _that.$http
                .get(getClusterRuleLis, {
                    params: {
                        shop_id: _that.shop_id,
                        token: _that.token,
                        cluster_id: _that.cluster_id
                    }
                })
                .then(res => {
                    _that.loading = false;
                    if (res.data.status === 0) {
                        let ruleList = res.data.data;
                        _that.voucher_config = ruleList.voucher_config;
                        _that.role_config = ruleList.role_config;
                        _that.return_type = ruleList.return_type;
                        _that.marketing_set = ruleList.marketing_set;
                        _that.condition_set = ruleList.condition_set;
                        _that.pattern = ruleList.pattern;
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        }
    }
};
</script>
<style lang="scss" scoped>
// 表格
.create-rule {
    padding: 20px;
    // background: #ccc;
    margin-left: 45px;
}
</style>

