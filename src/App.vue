<!--
 * @Author: tianbo
 * @LastEditors: tianbo
 * @Date: 2019-10-15 13:42:11
 * @LastEditTime: 2019-10-15 13:42:11
 -->
<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>

</script>

<style lang="scss">
@import "./style/main.scss";
@import "~@/assets/iconfont/iconfont.css";
#app {
    font-size: $font-size-base;
    color: $color-common;
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "SF UI Text",
        "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
}
</style>
