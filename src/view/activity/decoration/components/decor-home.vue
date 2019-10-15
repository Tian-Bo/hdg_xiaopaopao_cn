<!--
 * @Author: zlz5v5
 * @LastEditors: zlz
 * @Date: 2019-08-17 15:45:33
 * @LastEditTime: 2019-09-03 11:05:08
 -->
<template>
    <div class="decor-home" v-loading="loading">
        <div class="clickMobile" @click="qrcodeVisible = true">
            手机查看
        </div>
        <!-- 弹窗 -->
        <el-dialog :visible.sync="qrcodeVisible" width="360px" :center="true">
            <div style="margin-bottom: 15px; text-align: center;">
                打开微信扫码查看
            </div>
            <vue-qr
                :text="httpString + 'hdg' + randomNum + shop_id + UrlBase"
                :margin="0"
                :size="150"
                :auto-color="true"
                :dot-scale="1"
                style="display: block; margin: 0 auto;"
            ></vue-qr>
            <span slot="footer" class="dialog-footer">
                <el-button
                    type="primary"
                    v-clipboard:success="copy"
                    v-clipboard:copy="
                        httpString + 'hdg' + randomNum + shop_id + UrlBase
                    "
                >
                    点击复制
                </el-button>
            </span>
        </el-dialog>
        <div class="decor-home-nav">
            <!-- left -->
            <div>
                <span><i class=" iconfont iconxinhao"></i></span>
                <span>中国联通</span>
                <span>4G</span>
            </div>
            <!-- center -->
            <div>08:00</div>
            <!-- right -->
            <div>
                <span><i class="iconfont icondingweiweizhi"></i></span>
                <span>85%</span>
                <span><i class="iconfont iconiconset0251"></i></span>
            </div>
        </div>
        <!-- 拖拽组件 -->
        <VueNestable
            v-model="decorationTheme"
            class="vue-nestable"
            :maxDepth="hierarchyNum"
            keyProp="type"
        >
            <VueNestableHandle
                class="vue-tableHandle"
                slot-scope="{ item }"
                :item="item"
            >
                <!-- 每个模块:导航模块/ -->
                <div
                    v-if="item.type === 1"
                    @click="SetOperation(1)"
                    @mousemove="setImgStatus(1)"
                    @mouseout="setImgStatus(0)"
                >
                    <decorNav
                        :decorNav="item"
                        :operationStatus="operationStatus"
                        :uplaodTheme="uplaodTheme"
                    />
                    <img
                        class="der-nestable-img"
                        :src="bgImg"
                        v-show="showImgStatus === 1 || item.show === false"
                    />
                    <div
                        class="der-nestable-text"
                        v-show="showImgStatus === 1 && item.show === true"
                    >
                        <span
                            ><i class="iconfont icondaipingjia"></i> 编辑</span
                        >
                    </div>
                    <div class="der-nestable-text" v-show="item.show === false">
                        <span>该页面已隐藏</span>
                    </div>
                </div>
                <div
                    class="der-nestable-div"
                    v-if="item.type === 2"
                    @click="SetOperation(2)"
                    @mousemove="setImgStatus(2)"
                    @mouseout="setImgStatus(0)"
                >
                    <decorGrid
                        :operationStatus="operationStatus"
                        :decorGrid="item"
                        :uplaodTheme="uplaodTheme"
                    />
                    <img
                        class="der-nestable-img"
                        :src="bgImg"
                        v-show="showImgStatus === 2 || item.show === false"
                    />
                    <div
                        class="der-nestable-text"
                        v-show="showImgStatus === 2 && item.show === true"
                    >
                        <span
                            ><i class="iconfont icondaipingjia"></i> 编辑</span
                        >
                    </div>
                    <div class="der-nestable-text" v-show="item.show === false">
                        <span>该页面已隐藏</span>
                    </div>
                </div>
                <div
                    v-if="item.type === 3"
                    @click="SetOperation(3)"
                    @mousemove="setImgStatus(3)"
                    @mouseout="setImgStatus(0)"
                >
                    <decorSideslip
                        :decorSideslip="item"
                        :operationStatus="operationStatus"
                        :uplaodTheme="uplaodTheme"
                    />
                    <img
                        class="der-nestable-img"
                        :src="bgImg"
                        v-show="showImgStatus === 3 || item.show === false"
                    />
                    <div
                        class="der-nestable-text"
                        v-show="showImgStatus === 3 && item.show === true"
                    >
                        <span
                            ><i class="iconfont icondaipingjia"></i> 编辑</span
                        >
                    </div>
                    <div class="der-nestable-text" v-show="item.show === false">
                        <span>该页面已隐藏</span>
                    </div>
                </div>
                <div
                    v-if="item.type === 4"
                    @click="SetOperation(4)"
                    @mousemove="setImgStatus(4)"
                    @mouseout="setImgStatus(0)"
                >
                    <decorImgTitle
                        :decorImgTitle="item"
                        :operationStatus="operationStatus"
                        :uplaodTheme="uplaodTheme"
                    />
                    <img
                        class="der-nestable-img"
                        :src="bgImg"
                        v-show="showImgStatus === 4 || item.show === false"
                    />
                    <div
                        class="der-nestable-text"
                        v-show="showImgStatus === 4 && item.show === true"
                    >
                        <span
                            ><i class="iconfont icondaipingjia"></i> 编辑</span
                        >
                    </div>
                    <div class="der-nestable-text" v-show="item.show === false">
                        <span>该页面已隐藏</span>
                    </div>
                </div>
                <div
                    v-if="item.type === 5"
                    @click="SetOperation(5)"
                    @mousemove="setImgStatus(5)"
                    @mouseout="setImgStatus(0)"
                >
                    <decorSollList
                        :decorSollList="item"
                        :operationStatus="operationStatus"
                        :uplaodTheme="uplaodTheme"
                    />
                    <img
                        class="der-nestable-img"
                        :src="bgImg"
                        v-show="showImgStatus === 5 || item.show === false"
                    />
                    <div
                        class="der-nestable-text"
                        v-show="showImgStatus === 5 && item.show === true"
                    >
                        <span
                            ><i class="iconfont icondaipingjia"></i> 编辑</span
                        >
                    </div>
                    <div class="der-nestable-text" v-show="item.show === false">
                        <span>该页面已隐藏</span>
                    </div>
                </div>
            </VueNestableHandle>
        </VueNestable>
    </div>
</template>

<script>
import {
    getDecorationTheme,
    uoLoadTheme,
    globalUrlBase,
    httpString
} from "@/api/api";
//二维码组件
import vueQr from "vue-qr";
// 拖拽组件
import { VueNestable, VueNestableHandle } from "vue-nestable";
// 宫格组件
import decorGrid from "./shop-decoration/decor-grid";
// 店铺头部组件
import decorNav from "./shop-decoration/decor-nav";
// 活动列表侧滑组件
import decorSideslip from "./shop-decoration/decor-sideslip";
// 活动列表从上往下排组件
import decorSollList from "./shop-decoration/decor-soll-list";
// 活动列表(只含图片,时间,标题的组件)
import decorImgTitle from "./shop-decoration/decor-img-title";
export default {
    components: {
        // 组件
        decorNav,
        decorGrid,
        decorSideslip,
        decorSollList,
        decorImgTitle,
        vueQr,
        // 拖拽
        VueNestable,
        VueNestableHandle
    },
    data() {
        return {
            // 生成二维码的参数
            qrcodeVisible: false,
            UrlBase: ".s." + globalUrlBase + "/#/pages/merchant/home",
            randomNum: Math.floor(Math.random() * 899) + 100,
            // 获取从ajax得到的所有商铺的信息
            decorationTheme: [],
            // 嵌套层级
            hierarchyNum: 1,
            // 子组件操作的状态
            operationStatus: 0,
            // 透明图片的状态
            showImgStatus: 0,
            // 背景图片,
            bgImg: require("@/assets/bgImg.png"),
            // 加载中
            loading: true,
            //体验版的状态
            isExperience:false,

            httpString,
            shop_id: localStorage.getItem("shop_id"),
            token: localStorage.getItem("token")
        };
    },
    created() {
        this.getShopTheme();
    },
    methods: {
        // 获取店铺信息
        getShopTheme() {
            let _that = this;
            _that.$http
                .get(getDecorationTheme, {
                    params: {
                        shop_id: localStorage.getItem("shop_id"),
                        token: localStorage.getItem("token")
                    }
                })
                .then(res => {
                    if (res.data.status !== 0) {
                        _that.$message.error(res.data.message);
                    } else {
                        // 请求成功
                        _that.loading = false;
                        _that.decorationTheme = res.data.data;
                        // 循环 _that.decorationTheme 找到type === 6
                        for (
                            let index = 0;
                            index < _that.decorationTheme.length;
                            index++
                        ) {
                            // 当type === 6 判断experience是不是体验版,是体验版(true)则跳转页面并提示
                            if (_that.decorationTheme[index].type === 6) {
                                if (_that.decorationTheme[index].experience) {
                                    //打开弹窗
                                    _that.jumpPage();
                                }
                            }
                        }
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        // 当此账号是体验版本的弹窗
        jumpPage() {
            let _that = this;
            let host = window.location.host;
            _that
                .$confirm("你当前的店铺版本不支持店铺主页功能，标准版以上版本可拥有该功能", "温馨提示", {
                    confirmButtonText: "去升级开通",
                    type: "warning",
                    center: true,
                    showClose: false
                })
                .then(() => {
                    // window.location.href = `https://${host}/merchant/home/pay`;
                    this.$router.push({ path: "/provisioning" });
                })
                .catch(() => {
                  _that.isExperience = true;
                });
        },
        // 更改操作面板的index
        SetOperation(index) {
            this.operationStatus = index;
        },
        // 编辑透明图片的状态
        setImgStatus(index) {
            let _that = this;
            _that.showImgStatus = index;
        },
        // 提交店铺信息
        uplaodTheme() {
            let _that = this;
            let newDecorationTheme = [];
            // 当账号是体验版 弹出体验版本的弹窗
            if(_that.isExperience){
               return  _that.jumpPage()
            }
            // 将数组对象转换为字符串 才能传值给fromData
            for (let index = 0; index < _that.decorationTheme.length; index++) {
                let objectTheme = _that.decorationTheme[index];
                // 由于接口问题 删除每个数组元素的index字段
                delete objectTheme["index"];
                let stringTheme = JSON.stringify(objectTheme);
                // 由于接口问题 不能添加(push)type===6的数组元素 type === 6这个数组元素时判断是不是体验版
                if(objectTheme.type !== 6){
                 newDecorationTheme.push(stringTheme);
                }
            }
            //  data: `[${newDecorationTheme}]` 将所有的参数拼接为字符串 通过_that.$qs.stringify()转换传递
            let dataParams = {
                shop_id: localStorage.getItem("shop_id"),
                token: localStorage.getItem("token"),
                data: `[${newDecorationTheme}]`
            };
            // 提交数据
            _that.$http
                .post(uoLoadTheme, _that.$qs.stringify(dataParams))
                .then(res => {
                    if (res.data.status !== 0) {
                        _that.$message.error(res.data.message);
                    } else {
                        this.$message({
                            message: "成功装修店铺",
                            type: "success"
                        });
                        window.location.reload();
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        // 复制
        copy() {
            let _that = this;
            _that.$message({
                message: "复制成功",
                type: "success"
            });
        }
    }
};
</script>

<style lang="scss">
.decor-home {
    padding: 2%;
    margin: 10px 0;
    width: 600px;
    text-align: center;
    margin-bottom: 250px;
    .decor-home-nav {
        width: 375px;
        font-size: 10px;
        border: 1px #e6e6e6 solid;
        display: flex;
        justify-content: space-between;
        padding: 5px;
    }
}

.der-nestable-text {
    position: absolute;
    top: 50%;
    left: 0;
    height: 100%;
    width: 374px;
    z-index: 0;
    span {
        color: #fff;
        background: rgba(0, 0, 0, 0.37);
        font-size: 16px;
    }
}

.der-nestable-img {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 374px;
    z-index: 1;
}

/*
* Content and components
*/

.content {
    color: #444;
    margin: auto;
    margin-top: 3em;
    margin-bottom: 3em;
    max-width: 800px;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.content h1 {
    margin: 32px 0 0;
}

.content p {
    padding: 0 3em;
    margin-bottom: 0;
    text-align: center;
}

.component-example {
    position: relative;
    border-radius: 4px;
    box-shadow: 0 2px 3px 0 rgba(16, 17, 23, 0.1),
        0 0 1px 0 rgba(16, 17, 23, 0.1);
    background-color: white;
    color: #49494d;
    padding: 1em;
    flex: 1;
    margin: 1em;
    overflow: hidden;
}
.side-by-side {
    display: flex;
}

.side-by-side .side {
    flex: 1;
    padding-left: 1em;
    padding-right: 1em;
}

.side-by-side .side + .side {
    padding-left: 3em;
    padding-right: 0;
    border-left: 1px solid #ddd;
}

.source-code-link {
    position: absolute;
    top: 0;
    right: 0;
    width: 1.3em;
    height: 1.3em;

    padding: 0.3em;
    background-color: #5b6fd61e;
    border-left: 1px solid #5b6fd657;
    border-bottom: 1px solid #5b6fd657;
    color: #5b6fd6a1;
    border-bottom-left-radius: 4px;

    opacity: 0;
    transition: opacity 0.1s ease-in-out;
}

.component-example:hover .source-code-link {
    opacity: 1;
}

.nestable-list-empty {
    text-align: center;
}
/*
* Style for nestable
*/
.nestable {
    position: relative;
}
.nestable .nestable-list {
    margin: 0;
    padding: 0 0 0 40px;
    list-style-type: none;
}
.nestable > .nestable-list {
    padding: 0;
}
.nestable-item,
.nestable-item-copy {
    margin: 0;
}
.nestable-item:first-child,
.nestable-item-copy:first-child {
    margin-top: 0;
}
.nestable-item .nestable-list,
.nestable-item-copy .nestable-list {
    margin-top: 10px;
}
.nestable-item {
    position: relative;
}
.nestable-item.is-dragging .nestable-list {
    pointer-events: none;
}
.nestable-item.is-dragging * {
    opacity: 0;
    filter: alpha(opacity=0);
}
.nestable-item.is-dragging:before {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(106, 127, 233, 0.274);
    border: 1px dashed rgb(73, 100, 241);
    -webkit-border-radius: 5px;
    border-radius: 5px;
}
.nestable-drag-layer {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    pointer-events: none;
}
.nestable-drag-layer > .nestable-list {
    position: absolute;
    top: 0;
    left: 0;
    padding: 0;
    background-color: rgba(106, 127, 233, 0.274);
}
.nestable [draggable="true"] {
    cursor: move;
}
.nestable-handle {
    display: inline;
}
.clickMobile {
    width: 100px;
    background: #409eff;
    margin-bottom: 20px;
    padding: 10px 0;
    border-radius: 6px;
    color: #fff;
    cursor: pointer;
}
</style>
