<!--
 * @Author: zlz5v5
 * @LastEditors: zlz
 * @Date: 2019-08-19 14:37:07
 * @LastEditTime: 2019-09-28 10:52:30
 -->
<template>
    <div class="active-list">
        <div
            class="active-list-box"
            v-for="(item, index) in activeList"
            :key="index"
        >
            <div class="active-box-title">{{ item.title }}</div>
            <div class="active-body-box">
                <div class="activeb-body" v-for="(i, o) in item.info" :key="o">
                    <i class="iconfont" :class="i.icon"></i>
                    <span class="iconfont-title">{{ i.title }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
let activeList = [
    {
        title: "活动组件页",
        info: [
            { icon: "iconzhuangxiuxuqiu", title: "活动主图" },
            { icon: "iconbaozhang1", title: "保障标签" },
            { icon: "iconiconfonttime", title: "倒计时" },
            { icon: "icontuan", title: "凑团" },
            { icon: "iconzhinenghaibao", title: "活动详情" },
            { icon: "iconStoreInfo", title: "商家信息" },
            { icon: "iconhongbao1", title: "红包排行" }
        ]
    },
    {
        title: "基础组件页",
        info: [
            { icon: "icontupian", title: "图片" },
            { icon: "icon_GJWkongbaidanyuange", title: "空白字符" }
        ]
    }
];
export default {
    data() {
        return { activeList };
    }
};
</script>

<style lang="scss" scoped>
.active-list {
    position: fixed;
    width: 200px;
    background: #fff;
    padding: 20px 10px;
    min-height: 100%;
    .active-list-box {
        .active-box-title {
            font-weight: bold;
        }
        .active-body-box {
            display: flex;
            flex-wrap: wrap;
            margin: 20px 0;
            .activeb-body {
                border: 1px #e5e5e5 solid;
                margin: 0 10px 10px;
                width: calc(50% - 20px);
                height: 65px;
                line-height: 20px;
                text-align: center;
                padding-top: 10px;
                color: #7d7c7c;
                font-size: 14px;
                cursor: pointer;
                .iconfont {
                    font-size: 22px !important;
                }
                .iconfont-title{
                    display:block;
                    padding-top: 4px;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>