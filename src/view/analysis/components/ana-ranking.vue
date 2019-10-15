<!--
 * @Author: tianbo
 * @LastEditors: tianbo
 * @Date: 2019-09-25 19:03:00
 * @LastEditTime: 2019-10-11 17:38:28
 -->
<template>
    <div class="app-content">
        <header>项目销量排行</header>
        <main>
            <div class="main-item title">
                <div>排名</div>
                <div>名称</div>
                <div>价格</div>
                <div>销量</div>
            </div>
            <div class="main-item body" v-for="(item, index) in 10" :key="index">
                <div>
                    <svg class="menuIcon alSvgIcon" aria-hidden="true" v-if="index==0">
                        <use xlink:href="#iconpaihang" />
                    </svg>
                    <svg class="menuIcon alSvgIcon" aria-hidden="true" v-else-if="index==1">
                        <use xlink:href="#iconpaihang1" />
                    </svg>
                    <svg class="menuIcon alSvgIcon" aria-hidden="true" v-else-if="index==2">
                        <use xlink:href="#iconpaihang2" />
                    </svg>
                    <span v-else>{{ index + 1 }}</span>
                </div>
                <div><div class="main-item-name ellipsis">破尿酸破尿酸破尿酸破尿酸</div></div>
                <div>¥280</div>
                <div>254个</div>
            </div>
        </main>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.app-content {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
header {
    height: 56px;
    line-height: 56px;
    border-bottom: 1px solid #eeeeee;
    padding-left: 20px;
}
main {
    .main-item {
        display: flex;
        > div {
            height: 38px;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        > div:nth-of-type(1) {
            flex: 1;
        }
        > div:nth-of-type(2) {
            flex: 1.5;
            justify-content: flex-start;
        }
        > div:nth-of-type(3) {
            flex: 1;
        }
        > div:nth-of-type(4) {
            flex: 1;
        }
    }
    .title {
        margin-bottom: 5px;
        > div:nth-of-type(2) {
            padding-left: 10px;
        }
    }
    .body {
        > div {
            color: rgba(153, 153, 153, 1);
        }
        > div:nth-of-type(1) {
            font-size: 14px;
        }
        .menuIcon {
            font-size: 24px;
            width: 24px;
        }
        .main-item-name{
            max-width: 100px;
        }
    }
}

.width60 {
    width: 60px;
}
</style>
