<!--
 * @Author: zlz5v5
 * @LastEditors: zlz
 * @Date: 2019-08-21 11:24:18
 * @LastEditTime: 2019-09-30 10:49:47
 -->
<template>
    <div class="cover-image">
        <div class="count-down">
            <div class="count-down-ka">
                <div class="count-down-box">
                    <div
                        v-html="textEditorInfo.content"
                        class="v-html-box"
                        id="htmlInfo"
                    ></div>
                    <div
                        v-if="textEditorInfo.content === ''"
                        @click="headleClick()"
                        class="v-html-box-1"
                    >
                        请点击这里来使用富文本编辑器进行编写信息
                    </div>
                    <!-- 操作界面 -->
                    <div
                        class="set-interface"
                        v-show="settingIndex === textEditorInfo.type"
                    >
                        <vue-ueditor-wrap
                            v-model="textEditorInfo.content"
                            :config="myConfig"
                        ></vue-ueditor-wrap>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import VueUeditorWrap from "vue-ueditor-wrap";
let UEDITOR_HOME_URL;
if (location.host === "localhost:8000") {
    UEDITOR_HOME_URL = "/static/ueditor/";
} else {
    UEDITOR_HOME_URL = "/ueditor/";
}
export default {
    props: ["textEditorInfo", "settingIndex"],
    data() {
        return {
            store_info: "",
            myConfig: {
                // 编辑器不自动被内容撑高
                autoHeightEnabled: true,
                // 初始容器高度
                initialFrameHeight: 240,
                // 初始容器宽度
                initialFrameWidth: "100%",
                // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
                serverUrl: "/ueditor/php/controller.php",
                // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
                UEDITOR_HOME_URL
            }
        };
    },
    components: {
        VueUeditorWrap
    },
    created() {},
    updated() {
        this.headleClick();
    },
    methods: {
        // 操控#htmlInfo dom元素 将img 样式改为max-width=100%;
        headleClick() {
            let htmlInfo = document.querySelectorAll("#htmlInfo img");
            htmlInfo.forEach(element => {
                element.style.maxWidth = "100%";
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.active_img {
    color: #f20 !important;
}
.cover-image {
    position: relative;
    padding: 5px 0px;
    .count-down {
        width: 100%;
        line-height: 20px;
        display: block;
        padding: 15px 10px;
        .count-down-ka {
            box-shadow: rgba(66, 133, 232, 0.54) 0px -15px 1px;
            border-radius: 10px;
        }
        .count-down-box {
            background: #fff;
            border-radius: 10px;
            box-shadow: 0px -8px 1px #c8dcf8;
            position: relative;
        }
    }
    .v-html-box {
        width: 100%;
        height: 100%;
        overflow: hidden;
        padding: 8px;
        p {
            color: #f20 !important;
        }
        img {
            max-width: 100% !important;
        }
    }
    .v-html-box-1 {
        padding: 32px 10px;
    }
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
        right: -660px;
        z-index: 2;
        border: 1px #ccc solid;
        width: 600px;
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
