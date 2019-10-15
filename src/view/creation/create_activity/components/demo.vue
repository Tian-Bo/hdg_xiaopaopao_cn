<!--
 * @Author: zlz5v5
 * @LastEditors: zlz
 * @Date: 2019-08-21 11:24:18
 * @LastEditTime: 2019-09-18 21:16:16
 * @page:这是是文件夹所有文件的样式
 -->

<template>
    <div class="cover-image">
        <el-image
            class="current-image"
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566963006&di=4f7098d0a0fd9e57e6202f3114bbd335&imgtype=jpg&er=1&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180116%2F1c4b7570173c4e029d9388d135fb333e.jpeg"
            lazy
        ></el-image>
        <!-- 操作界面 -->
        <div class="bgimg-interface">
            <el-image class="current-image" :src="bgImage" lazy></el-image>
            <div class="edit-text">编辑</div>
        </div>
        <div class="set-interface">12514515</div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            url: require("@/assets/bgUser.jpg"),
            bgImage: require("@/assets/bgImg.png")
        };
    }
};
</script>

<style lang="scss" scoped>
.cover-image {
    position: relative;
    .current-image {
        height: 509px;
        width: 100%;
        display: block;
    }
    .bgimg-interface {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 2;
        cursor: pointer;
        .edit-text {
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            color: #ccc;
            text-align: center;
            z-index: 2;
        }
    }
    .set-interface {
        position: absolute;
        top: 20%;
        right: -460px;
        z-index: 2;
        border: 1px #ccc solid;
        width: 400px;
        padding: 20px;
    }
    // 侧边三角形
    .set-interface::after {
        content: "";
        top: 10px;
        left: -17px;
        width: 0;
        height: 0;
        border-width: 18px 18px 18px 0;
        border-style: solid;
        border-color: transparent #fff transparent transparent;
        position: absolute;
        z-index: 3;
    }
    .set-interface::before {
        content: "";
        top: 10px;
        left: -18px;
        width: 0;
        height: 0;
        border-width: 18px 18px 18px 0;
        border-style: solid;
        border-color: transparent #ccc transparent transparent;
        position: absolute;
        z-index: 3;
    }
}
</style>