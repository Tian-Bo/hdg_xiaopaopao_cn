<!--
 * @Author: tianbo
 * @LastEditors: tianbo
 * @Date: 2019-09-25 19:03:00
 * @LastEditTime: 2019-10-08 17:07:35
 -->
<template>
    <div class="app-content" v-loading="loading">
        <div class="body-item" v-for="(val, i) in pulgListValue" :key="i">
            <h3 class="body-item-header">
                {{ val.title }}
                <span>{{ val.desc }}</span>
            </h3>
            <ul class="body-item-ul">
                <li
                    class="body-item-li"
                    v-for="(item, index) in val.item"
                    :key="index"
                    @click="jumpRouter(item)"
                >
                    <div class="body-item-img">
                        <img :src="item.plugin_img" alt />
                    </div>
                    <div class="body-item-msg">
                        <p class="body-item-msg-t">{{ item.plugin_name }}</p>
                        <p class="body-item-msg-b">{{ item.plugin_desc }}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { getPluginList } from "@/api/api";
export default {
    data() {
        return {
            loading: true,
            pulgListValue: [] // 功能插件列表
        };
    },
    methods: {
        // 跳转路由
        jumpRouter(item) {
            // 判断该功能是否上线
            if (item.path == null) {
                return this.$confirm("正在开发中, 尽请期待...").catch(_ => {});
            }

            // 判断该功能是否解锁 (_switch:  true已解锁, false未解锁)
            if (!item.switch) {
                return this.$router.push({
                    path: "/unlock",
                    query: {
                        plugin_id: item.plugin_id
                    }
                });
            }

            // 跳转老项目
            if (item.path == "/merchant/plug/wechat" || item.path == "/merchant/plug/deblock") {
                return (window.location.href = item.path);
            }
            // 跳转新项目
            this.$router.push({ path: item.path });
        },
        // 获取功能插件列表
        getPlug() {
            let params = {
                shop_id: localStorage.getItem("shop_id"),
                token: localStorage.getItem("token")
            };
            this.$http.get(getPluginList, { params }).then(res => {
                this.loading = false;
                if (res.data.status == 0) {
                    this.pulgListValue = res.data.data;
                }
            });
        }
    },
    created() {
        this.getPlug();
    }
};
</script>

<style lang="scss" scoped>
.app-content {
    padding: 60px;
}
.body-item {
    margin-bottom: 70px;
    .body-item-header {
        color: #333;
        margin-right: 15px;
        margin-bottom: 15px;
        span {
            color: #999999;
            font-size: 14px;
        }
    }
    .body-item-ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        .body-item-li {
            position: relative;
            display: flex;
            align-items: center;
            cursor: pointer;
            margin-right: 30px;
            margin-bottom: 30px;
            width: 230px;
            height: 75px;
            background-color: #f1f1f1;
            // .body-item-icon{
            //     opacity: 0;
            //     position: absolute;
            //     z-index: 6;
            //     background-color: rgba(0, 0, 0, 0.5);
            //     top: 0;
            //     left: 0;
            //     width: 100%;
            //     height: 100%;
            //     display: flex;
            //     justify-content: center;
            //     align-items: center;
            //     font-size: 14px;
            //     color: #eee;
            //     .iconfont{
            //         font-size: 16px !important;
            //         margin-right: 5px;
            //         color: #eee;
            //     }
            // }
            .body-item-img {
                width: 40px;
                height: 40px;
                margin: 0 15px;
                overflow: hidden;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .body-item-msg-t {
            }
            .body-item-msg-b {
                color: #a6a6a6;
                font-size: 12px;
            }
        }
        .body-item-li:hover {
            box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
            // .body-item-icon{
            //     opacity: 1;
            // }
        }
    }
}
</style>
