<!--
 * @Author: zlz5v5
 * @LastEditors: zlz
 * @Date: 2019-08-21 10:50:22
 * @LastEditTime: 2019-09-18 21:16:26
 -->
<template>
    <!-- 关注导航 -->
    <div class="home-follow-nav">
        <div class="follow-nav-left">
            <el-image
                :src="followNavInfo.cluster_info.shop_cover"
                class="follow-image"
            ></el-image>
            <span class="follow-title">
                &nbsp; {{ followNavInfo.cluster_info.shop_name }}
            </span>
            <i class="iconfont iconsecurityCode-b"></i>
        </div>
        <div>
            <el-button class="follow-btn" size="mini" round>关注</el-button>
        </div>
        <div
            class="set-interface"
            v-show="followNavInfo.cluster_info.is_share !== 0"
        >
            <el-link
                :underline="false"
                target="_blank"
                @click="$router.push({ path: '/setting' })"
            >
                还没有上传微信二维码图片哦,请在关注设置上传图片!!!
            </el-link>
        </div>
        <div class="bgimg-interface">
            <div class="edit-text">该组件不支持修改，删除</div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["followNavInfo"],
    data() {
        return {};
    },
    methods: {}
};
</script>

<style lang="scss" scoped>
.home-follow-nav {
    background: #fff;
    color: #333;
    display: flex;
    justify-content: space-between;
    padding: 0 14px;
    height: 35px;
    line-height: 35px;
    position: relative;
    .bgimg-interface {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 2;
        cursor: pointer;
        .bgimg-down {
            height: 35px;
            width: 100%;
            display: block;
        }
        .edit-text {
            position: absolute;
            top: 9%;
            left: 0;
            right: 0;
            color: #ccc;
            text-align: center;
            z-index: 2;
        }
    }
    .follow-nav-left {
        display: flex;
        line-height: 35px;
        .iconfont {
            font-size: 16px !important;
            color: #50da5b;
        }
        .follow-image {
            margin-top: 6px;
            height: 22px;
            width: 22px;
            border-radius: 50%;
        }
        .follow-title {
            overflow: hidden; /*超过部分不显示*/
            text-overflow: ellipsis; /*超过部分用点点表示*/
            white-space: nowrap; /*不换行*/
            max-width: 220px;
            font-size: 12px;
            color: 3333;
        }
    }
    .follow-btn {
        height: 22px;
        line-height: 9px;
    }
    .set-interface {
        position: absolute;
        top: -16%;
        right: -500px;
        z-index: 2;
        border: 1px #ccc solid;
        width: 434px;
        padding: 10px;
        border-radius: 4px;
        .set-interface-top {
            display: flex;
            .upload-box {
                display: flex;
                .upload-img-input {
                    height: 28px;
                    line-height: 28px;
                    width: 174px;
                    border: 1px #ccc solid;
                    padding: 0 10px;
                    margin-right: -2px;
                }
                .upload-img-btn-1 {
                    height: 28px;
                    line-height: 4px;
                    color: #66b1ff;
                    border: 1px #66b1ff solid;
                    background: #ecf5ff;
                    z-index: 3;
                }
            }
            .upload-img-btn-2 {
                height: 28px;
                line-height: 4px;
                color: #ffff;
                border: 1px #66b1ff solid;
                background: #66b1ff;
                margin-left: 12px;
            }
        }
        .upload-box-tips {
            color: #ccc;
            font-size: 10px;
            padding: 5px 0 20px;
        }
        .set-interface-bottom {
            display: flex;
            .upload-box {
                display: flex;
                .upload-img-input {
                    height: 28px;
                    line-height: 28px;
                    width: 223px;
                    border: 1px #ccc solid;
                    padding: 0 10px;
                    margin-right: -2px;
                }
                .upload-img-btn-1 {
                    height: 28px;
                    line-height: 4px;
                    color: #66b1ff;
                    border: 1px #66b1ff solid;
                    background: #ecf5ff;
                    z-index: 3;
                }
            }
        }
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