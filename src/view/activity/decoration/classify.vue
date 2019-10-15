<!--
 * @Author: zlz5v5
 * @LastEditors: zlz
 * @Date: 2019-08-14 10:17:13
 * @LastEditTime: 2019-08-26 16:15:27
 -->
<template>
    <div class="decoration">
        <div class="decoration-nav">
            <div
                class="decoration-nav-label"
                @click="$router.push({ path: '/decoration' })"
            >
                主页装修
            </div>
            <div class="decoration-nav-label decor-active">
                活动分类
            </div>
        </div>
        <decorClassify :groupingInfo="groupingInfo" v-loading="loading" />
    </div>
</template>

<script>
import decorClassify from "./components/decor-classify";
import { getGrouping } from "@/api/api";
// import homeIndex from './components/index'

export default {
    components: { decorClassify },
    data() {
        return {
            decorationNavIndex: 1,
            groupingInfo: [],
            loading: true
        };
    },
    created() {
        this.getGroupingInfo();
    },
    methods: {
        changeDerIndex(index) {
            this.decorationNavIndex = index;
        },
        // 获取分组信息
        getGroupingInfo() {
            let _that = this;
            _that.$http
                .get(getGrouping, {
                    params: {
                        shop_id: localStorage.getItem("shop_id"),
                        token: localStorage.getItem("token")
                    }
                })
                .then(res => {
                    if (res.data.status !== 0) {
                        _that.$message.error(res.data.message);
                    } else {
                        _that.groupingInfo = res.data.data;
                    }
                    _that.loading = false;
                })
                .catch(err => {
                    this.$message.error(err);
                });
        }
    }
};
</script>
<style lang="scss" scoped>
.decoration {
    width: 100%;
    height: 100%;
    background: #f2f;
    .decor-active {
        border-bottom: 1px #33a5fe solid;
        color: #33a5fe;
    }
    background: #fff;
    .decoration-nav {
        display: flex;
        border-bottom: 1px #ccc solid;
        position: relative;
        .decoration-nav-label {
            padding: 20px;
            cursor: pointer;
        }
    }
}
</style>
