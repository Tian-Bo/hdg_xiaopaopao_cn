<!--
 * @Author: zlz5v5
 * @LastEditors: zlz
 * @Date: 2019-08-06 14:39:48
 * @LastEditTime: 2019-08-29 17:57:44
 -->
<template>
    <div class="home-box">
        <!-- 页面 -->
        <div class="box-left">
            <div
                class="box-left-grid"
                style=" width: 70px; height: 70px;margin: 12px 22px;"
                v-for="(item, index) in decorGrid.items"
                :key="index"
                v-if="decorGrid.limit === 3"
            >
                <img :src="item.picture" />
                <div :style="{ color: item.color }" class="decor-text-title">
                    {{ item.content }}
                </div>
            </div>
            <!-- v-if="decorGrid.limit === 3" 这段会语法报错 原因是v-for和v-if不能公用同一个标签上  -->
            <div
                class="box-left-grid"
                style=" width: 45px; height: 45px;margin: 12px 20px;"
                v-for="(item, index) in decorGrid.items"
                :key="index"
                v-if="decorGrid.limit === 4"
            >
                <img :src="item.picture" />
                <div :style="{ color: item.color }" class="decor-text-title">
                    {{ item.content }}
                </div>
            </div>
            <div
                class="box-left-grid"
                style=" width: 35px; height: 35px "
                v-for="(item, index) in decorGrid.items"
                :key="index"
                v-if="decorGrid.limit === 5"
            >
                <img :src="item.picture" />
                <div :style="{ color: item.color }" class="decor-text-title">
                    {{ item.content }}
                </div>
            </div>
        </div>
        <!-- 操作 -->
        <div class="box-right">
            <span class="box-right-span" v-show="decorGrid.show == true">
                显示
            </span>
            <span class="box-right-span" v-show="decorGrid.show != true">
                不显示
            </span>
            <el-switch style="display: block" v-model="decorGrid.show">
            </el-switch>
            <div class="right-set-nav" v-show="operationStatus === 2">
                <div style=" display: flex;justify-content: space-between;">
                    <div class="right-set-choose">
                        每行数量:
                        <span
                            @click="setGrid(3)"
                            :class="{ 'choose-active': decorGrid.limit == 3 }"
                        >
                            <i class="el-icon-s-opportunity"></i>3个
                        </span>
                        <span
                            @click="setGrid(4)"
                            :class="{ 'choose-active': decorGrid.limit == 4 }"
                        >
                            <i class="el-icon-s-opportunity"></i>4个
                        </span>
                        <span
                            @click="setGrid(5)"
                            :class="{ 'choose-active': decorGrid.limit == 5 }"
                        >
                            <i class="el-icon-s-opportunity"></i>5个
                        </span>
                    </div>
                    <div>
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="编辑完成后请记得保存"
                            placement="top"
                        >
                            <el-button
                                size="mini"
                                type="primary"
                                @click="addDecorGrid()"
                            >
                                添加
                            </el-button>
                        </el-tooltip>
                    </div>
                </div>
                <!-- 图标设置/上传图片/标题&颜色/链接 -->
                <div
                    class="right-add-icon"
                    v-for="(item, index) in decorGrid.items"
                    :key="index"
                >
                    <div class="detele-btn" @click="deteleGrid(index)">x</div>
                    <!--  -->
                    <el-upload
                        action="/file/upload"
                        :before-upload="uploadInfoImg"
                        :show-file-list="false"
                    >
                        <div
                            class="right-upload-img"
                            @click="setItemsIndex(index)"
                        >
                            <img
                                :src="item.picture"
                                class="right-upload-img-o"
                                alt="图片加载失败"
                            />
                        </div>
                    </el-upload>
                    <div class="right-upload-body">
                        <div class="right-body-text">
                            <div>
                                <input
                                    type="text"
                                    placeholder="请输入标题"
                                    v-model="item.content"
                                    style="height: 30px;border-radius: 5px;"
                                />
                            </div>
                            <div>
                                <el-color-picker
                                    v-model="item.color"
                                    size="mini"
                                ></el-color-picker>
                            </div>
                            <div @click="setdefaultColor(index)">
                                <span class="defaule-color">
                                    默认颜色
                                </span>
                            </div>
                        </div>
                        <div class="right-body-text">
                            <div>
                                <input
                                    class="right-big-input"
                                    type="text"
                                    placeholder="请输入链接地址"
                                    v-model="item.url"
                                />
                            </div>
                            <div>
                                <el-popover
                                    placement="right"
                                    width="400"
                                    trigger="click"
                                >
                                    <el-table :data="getClassIfyInfo">
                                        <el-table-column
                                            property="name"
                                            label="分类名字"
                                        ></el-table-column>
                                        <el-table-column label="操作">
                                            <template slot-scope="scope">
                                                <el-button
                                                    size="mini"
                                                    type="primary"
                                                    @click="
                                                        clickClassIds(
                                                            scope.row,
                                                            index
                                                        )
                                                    "
                                                >
                                                    选择
                                                </el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <el-button
                                        size="mini"
                                        type="primary"
                                        slot="reference"
                                    >
                                        选择链接
                                    </el-button>
                                </el-popover>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right-add-btn" @click="uplaodTheme()">
                    保存
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { PostImg, getGrouping, globalUrlBase, httpString } from "@/api/api";
export default {
    props: {
        decorGrid: {
            type: Object,
            default() {
                return {};
            }
        },
        // 操作的状态
        operationStatus: {
            type: Number,
            default() {
                return {};
            }
        },
        // 从父组件传过来的上传门店装修函数
        uplaodTheme: {
            type: Function,
            default: null
        }
    },
    components: {},
    data() {
        return {
            // 默认图片
            defaultImg: "../../../../static/image/bgUser.jpg",
            color: "#4D4D4D",
            // 列表的索引
            itemsIndex: 0,
            getClassIfyInfo: [],
            shop_id: localStorage.getItem("shop_id"),
            httpString
        };
    },
    created() {
        this.getClassIfy();
    },
    methods: {
        // 添加活动标题
        addDecorGrid() {
            let _that = this;
            _that.decorGrid.items.push({
                picture: _that.defaultImg,
                content: "名字",
                url: "",
                color: "#505050"
            });
        },
        // 删除宫格
        deteleGrid(index) {
            let _that = this;
            this.decorGrid.items.splice(index, 1);
        },
        /* 更换宫格
         * @index:几宫格  (3,4,5)
         */
        setGrid(index) {
            let _that = this;
            let arrayTable = [3, 4, 5];
            for (let arr of arrayTable) {
                if (arr == index) {
                    _that.decorGrid.limit = index;
                }
            }
        },
        // 更改itemsIndex的索引
        setItemsIndex(index) {
            this.itemsIndex = index;
        },
        // 上传图片
        uploadInfoImg(file) {
            let _that = this;
            let param = new FormData();
            param.append("file", file);

            let config = {
                headers: { "Content-Type": "multipart/form-data" }
            };
            _that.$http
                .post(PostImg, param, config)
                .then(res => {
                    _that.decorGrid.items[_that.itemsIndex].picture =
                        res.data.data.url;
                })
                .catch(err => {
                    _that.$message.error(err);
                });
        },
        // 设置默认颜色
        setdefaultColor(index) {
            let _that = this;
            _that.decorGrid.items[index].color = "#505050";
        },
        // 请求查看分类连接
        getClassIfy() {
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
                        _that.getClassIfyInfo = res.data.data;
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        // 选择链接
        clickClassIds(row, index) {
            let UrlBase = ".s." + globalUrlBase + "/#/pages/merchant/classlist";
            let randomNum = Math.floor(Math.random() * 899) + 100;
            let qrCodeIds = row.ids.join(",");
            let url =
                httpString +
                "hdg" +
                randomNum +
                this.shop_id +
                UrlBase +
                "?ids=" +
                qrCodeIds;
            this.decorGrid.items[index].url = url;
        }
    }
};
</script>

<style lang="scss" scoped>
.active {
    border-bottom: 2px #409eff solid;
}
.decor-text-title {
    color: rgb(80, 80, 80);
    white-space: nowrap;
    overflow: hidden;
}
.home-box {
    display: flex;
    .box-left {
        display: flex;
        flex-wrap: wrap;
        width: 375px;
        margin-right: 20px;
        border: 1px #e6e6e6 solid;
        text-align: center;
        padding: 10px;
        .box-left-grid {
            text-align: center;
            margin: 5px 17px 20px;
            img {
                width: 100%;
                height: 100%;
                border-radius: 5px;
            }
        }
    }
    .box-right {
        display: flex;
        margin-top: 25px;
        .box-right-span {
            margin-right: 20px;
        }
    }
    .right-set-nav {
        margin-left: 145px;
        position: absolute;
        width: 475px;
        border: 1px #ccc solid;
        border-radius: 5px;
        padding: 30px;
        box-shadow: 4px 3px 5px 0px #e2e2e2;
        .right-set-choose {
            margin-bottom: 15px;
            .choose-active {
                color: #ff2e50;
            }
            span {
                cursor: pointer;
                margin: 0 20px;
            }
        }
        .right-add-icon {
            display: flex;
            border: 1px #ccc solid;
            padding: 10px;
            margin-bottom: 10px;
            position: relative;
            .detele-btn {
                position: absolute;
                width: 20px;
                height: 20px;
                background: #ccc;
                border-radius: 50%;
                top: -9px;
                right: -7px;
                text-align: center;
                color: #fff;
                line-height: 18px;
                cursor: pointer;
            }
            .right-upload-img {
                width: 80px;
                height: 80px;
                background: #ccc;
                .right-upload-img-o {
                    width: 80px;
                    height: 80px;
                }
            }
            .right-upload-body {
                display: flex;
                flex-flow: column;
                justify-content: space-between;
                margin-left: 15px;
                .right-body-text {
                    .defaule-color {
                        background: #409eff;
                        margin-left: 9px;
                        padding: 7px 15px;
                        border-radius: 2px;
                    }
                    display: flex;
                    padding: 5px 10px;
                    height: 40px;
                    line-height: 28px;
                    input {
                        border: 1px #ccc solid;
                        margin-right: 5px;
                        width: 163px;
                        padding: 0 8px;
                        height: 26px;
                        border-radius: 5px;
                    }
                    .right-big-input {
                        width: 195px;
                        height: 29px;
                        margin-top: 1px;
                    }
                    span {
                        // background: #409eff;
                        color: #fff;
                        cursor: pointer;
                        margin-left: 4px;
                        padding: 5px 0;
                        font-size: 12px;
                    }
                }
            }
        }
        .right-add-btn {
            text-align: center;
            padding: 4px 0;
            margin-top: 10px;
            cursor: pointer;
            background: #409eff;
            color: #fff;
        }
    }
}
</style>
