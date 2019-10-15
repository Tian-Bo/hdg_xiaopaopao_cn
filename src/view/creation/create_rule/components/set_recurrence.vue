<!--
 * @Author: zlz5v5
 * @LastEditors: zlz
 * @Date: 2019-08-08 18:43:56
 * @LastEditTime: 2019-09-28 11:23:54
 -->
<template>
    <div class="create-rule">
        <div class="create-rule-title">
            <div>自定义返现设置<span>（不设置则默认）</span></div>
            <el-button
                type="text"
                @click="isShowCreateRule = !isShowCreateRule"
            >
                展开
                <i
                    class="iconfont iconjiantou-bottom"
                    v-show="isShowCreateRule"
                ></i>
                <i
                    class="iconfont icongengduo1"
                    v-show="isShowCreateRule === false"
                ></i>
            </el-button>
        </div>
        <transition name="draw">
            <div v-show="isShowCreateRule" style="margin:30px">
                <!-- 返现条件 -->
                <div class="create-rule-body">
                    <div class="rule-body-title">返现条件</div>
                    <div style="display:flex;">
                        <div
                            class="rule-body-info"
                            v-for="(item, index) in activeRuleData.conditions"
                            :key="index"
                            :class="{
                                'body-info-active':
                                    condition_set.pattern === item.pattern
                            }"
                            @click="editClusterRuleFunc(3, item.pattern)"
                        >
                            <div class="body-info-title">{{ item.title }}</div>
                            <div class="body-info-cont">{{ item.text }}</div>
                            <div
                                class="body-info-icon"
                                v-show="condition_set.pattern === item.pattern"
                            >
                                <i class="iconfont iconfuxuankuanggou"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 返现方式 -->
                <div class="create-rule-body">
                    <div class="rule-body-title">
                        返现到账方式{{ return_type.pattern }}
                    </div>
                    <div style="display:flex;">
                        <div
                            class="rule-body-info"
                            v-for="(item, index) in activeRuleData.pay_method"
                            :key="index"
                            @click="editClusterRuleFunc(4, item.pattern)"
                            :class="{
                                'body-info-active':
                                    return_type.pattern === item.pattern
                            }"
                        >
                            <div class="body-info-title">{{ item.title }}</div>
                            <div class="body-info-cont-text">
                                <div>{{ item.text }}</div>
                                <div class="iconfont-text">
                                    <i
                                        :class="item.icon"
                                        :style="{ color: item.color }"
                                    ></i>
                                </div>
                            </div>
                            <div
                                class="body-info-active-2"
                                :style="{ background: item.color }"
                            ></div>
                            <div
                                class="body-info-icon"
                                v-show="return_type.pattern === item.pattern"
                            >
                                <i class="iconfont iconfuxuankuanggou"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 绑定关系 -->
                <div class="create-rule-body">
                    <div class="rule-body-title">关系绑定</div>
                    <div style="display:flex;">
                        <div
                            class="rule-body-info"
                            v-for="(item, index) in pattern"
                            :key="index"
                            :class="{
                                'body-info-active':
                                    marketing_set.pattern === item.id
                            }"
                            @click="editClusterRuleFunc(5, item.id)"
                        >
                            <div class="body-info-title">{{ item.name }}</div>
                            <div class="body-info-cont">{{ item.desc }}</div>
                            <div
                                class="body-info-icon"
                                v-show="marketing_set.pattern === item.id"
                            >
                                <i class="iconfont iconfuxuankuanggou"></i>
                            </div>
                        </div>
                        <!-- 自定义 -->
                        <!-- <div
                            class="rule-body-info"
                            :class="{
                                'body-info-active': marketing_set.pattern === 4
                            }"
                        >
                            <div class="body-info-title">永久模式</div>
                            <div
                                class="body-info-cont"
                                style="text-align:center"
                            >
                                有效期15天
                                <div>
                                    <el-button
                                        type="text"
                                        style="margin-top:20px;text-align:center"
                                    >
                                        设置
                                    </el-button>
                                </div>
                            </div>
                            <div
                                class="body-info-icon"
                                v-show="marketing_set.pattern === 4"
                            >
                                <i class="iconfont iconfuxuankuanggou"></i>
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import activeRuleData from "./active_rule.json";
import { editClusterRule } from "@/api/api";
export default {
    props: ["return_type", "marketing_set", "condition_set", "pattern"],
    data() {
        return {
            // 从json拿到的数据
            activeRuleData,
            // 是否展开的状态
            isShowCreateRule: false,
            token: localStorage.getItem("token"),
            cluster_id: localStorage.getItem("clusterId")
        };
    },
    methods: {
        // 修改状态
        // type:接口的type
        // pattern:active_rule.json的pattern
        editClusterRuleFunc(type, pattern) {
            let _that = this;
            let dataParams = {
                token: _that.token,
                cluster_id: _that.cluster_id,
                type,
                pattern
            };
            _that.$http
                .post(editClusterRule, _that.$qs.stringify(dataParams))
                .then(res => {
                    if (type === 3) {
                        _that.condition_set.pattern = pattern;
                    }
                    if (type === 4) {
                        _that.return_type.pattern = pattern;
                    }
                    if (type === 5) {
                        _that.marketing_set.pattern = pattern;
                    }
                    if (res.data.status === 0) {
                        this.$message({
                            message: "更新成功",
                            type: "success"
                        });
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
.draw-enter-active,
.draw-leave-active {
    transition: opacity 0.5s;
}
.draw-enter,
.draw-leave-to {
    opacity: 0;
}
// 表格
.create-rule {
    background: #fff;
    margin: 60px 30px 20px 71px;
    .create-rule-title {
        margin: 10px 0;
        display: flex;
        font-weight: bold;
        justify-content: space-between;
        cursor: pointer;
        line-height: 40px;
        span {
            color: #ccc;
        }
        .iconfont {
            font-size: 16px !important;
        }
    }
    .body-info-active {
        border-color: #409eff !important;
    }
    .body-info-active-2 {
        position: absolute;
        bottom: 0px;
        height: 5px;
        left: 0;
        right: 0;
    }
    .create-rule-body {
        margin-bottom: 100px;
        .rule-body-title {
            font-weight: bold;
            padding-bottom: 20px;
        }

        .rule-body-info {
            cursor: pointer;
            width: 254px;
            height: 116px;
            border-radius: 4px;
            border: 1px #cacaca solid;
            padding: 12px;
            margin-right: 60px;
            margin-bottom: 40px;
            position: relative;
            .body-info-icon {
                position: absolute;
                width: 15px;
                height: 15px;
                text-align: center;
                line-height: 15px;
                border-radius: 50%;
                color: #fff;
                bottom: 0;
                background: #409eff;
                right: 0;
            }

            .body-info-title {
                text-align: center;
                padding-bottom: 5px;
                font-weight: bold;
            }
            .body-info-cont {
                color: #b7b7b7;
                font-size: 12px;
            }
            .body-info-cont-text {
                display: flex;
                color: #b7b7b7;
                font-size: 12px;
                .iconfont {
                    font-size: 40px !important;
                }
            }
        }
    }
}
</style>

