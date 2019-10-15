<!--
 * @Author: zlz5v5
 * @LastEditors: zlz
 * @Date: 2019-08-21 11:24:18
 * @LastEditTime: 2019-09-30 10:23:24
 -->
<template>
    <div class="cover-image">
        <div class="count-down">
            <div class="count-down-ka">
                <div class="count-down-box information">
                    <div class="information-title">商家信息 <span class="information-title-tip" v-show="informationInfo.store_info.length === 0">(暂无数据)</span></div>
                    <!-- 商家联盟 -->
                    <div
                        class="merchant-alliance"
                        v-show="informationInfo.choose === 1"
                    >
                        <div
                            class="merchant-alliance-div"
                            v-for="(item, index) in informationInfo.store_info"
                            :key="index">
                            <el-image
                                style="width: 40px; height: 40px"
                                :src="item.shop_cover"
                                fit="fill"
                            ></el-image>
                            <div class="alliance-div-text">
                                {{ item.store_name }}
                            </div>
                        </div>
                       
                    </div>
                    <!-- 主办方信息 -->
                    <div
                        v-for="(item, index) in informationInfo.store_info"
                        :key="index"
                        style="margin-bottom:25px;"
                        v-show="informationInfo.choose === 0"
                    >
                        <div class="informaion-content">
                            <div class="informaion-content-left">
                                <el-image
                                    :src="item.shop_cover"
                                    class="informaion-content-img"
                                ></el-image>
                            </div>

                            <div class="informaion-content-right">
                                <div class="informaion-right-text">
                                    名称:<span> {{ item.store_name }} </span>
                                </div>
                                <div class="informaion-right-text">
                                    电话:<span> {{ item.mobile }} </span>
                                </div>
                                <div class="informaion-right-text">
                                    地址:<span> {{ item.address }} </span>
                                </div>
                            </div>
                        </div>
                        <div class="informaion-btn">
                            一键导航
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 操作界面 -->
        <div
            class="set-interface"
            v-show="settingIndex == informationInfo.type"
        >
            <el-radio v-model="informationInfo.choose" :label="0" size="mini">
                活动主办方
            </el-radio>
            <el-radio v-model="informationInfo.choose" :label="1" size="mini">
                商家联盟
            </el-radio>

            <el-button type="primary" size="mini" @click="dialogVisible = true">
                添加
            </el-button>
            <div
                class="information_info"
                v-for="(item, index) in informationInfo.store_info"
                :key="index"
            >
                <div class="information_info_left">
                    <el-image
                        class="info_left_img"
                        :src="item.shop_cover"
                        fit="fill"
                    >
                    </el-image>
                </div>
                <div class="information_info_right">
                    {{ item.store_name }}
                </div>
                <div class="close-btn" @click="deleteStoreList(index, item.id)">
                    x
                </div>
            </div>
        </div>
        <!-- 添加弹窗 -->
        <el-dialog title="添加门店" :visible.sync="dialogVisible">
            <dislogAddInfo
                :infoList="storeList"
                :informationInfo="informationInfo"
            />
        </el-dialog>
    </div>
</template>


<script>
import dislogAddInfo from "./dislog_add_info";
import { getStoreList } from "@/api/api";
export default {
    props: ["informationInfo", "settingIndex"],
    components: {
        dislogAddInfo
    },
    data() {
        return {
            dialogVisible: false,
            shop_id: localStorage.getItem("shop_id"),
            token: localStorage.getItem("token"),
            storeList: []
        };
    },
    created() {
        this.getStoreListFunc();
    },
    methods: {
        // 获取门店信息
        getStoreListFunc() {
            let _that = this;
            _that.$http
                .get(getStoreList, {
                    params: {
                        shop_id: _that.shop_id,
                        token: _that.token
                    }
                })
                .then(res => {
                    _that.loading = false;
                    if (res.data.status === 0) {
                        _that.storeList = res.data.data;
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        // 删除门店信息
        deleteStoreList(index, itemId) {
            let _that = this;
            _that.informationInfo.store_ids.splice(
                _that.informationInfo.store_ids.findIndex(
                    item => item.id === itemId
                ),
                1
            );
            _that.informationInfo.store_info.splice(index, 1);
        }
    }
};
</script>

<style lang="scss" scoped>
.cover-image {
    position: relative;
    .count-down {
        width: 100%;
        line-height: 20px;
        display: block;
        padding: 25px 10px;
        .count-down-ka {
            box-shadow: rgba(66, 133, 232, 0.54) 0px -15px 1px;
            border-radius: 10px;
        }
        .count-down-box {
            background: #fff;
            padding: 10px 0;
            border-radius: 10px;
            box-shadow: 0px -8px 1px #c8dcf8;
            position: relative;
            .merchant-alliance {
                display: flex;
                flex-wrap: wrap;
                max-height: 200px;
                overflow: hidden; /*超过部分不显示*/
                text-overflow: ellipsis; /*超过部分用点点表示*/
                white-space: nowrap; /*不换行*/
                .merchant-alliance-div {
                    text-align: center;
                    width: calc(25% - 10px);
                    border: 1px #ccc solid;
                    margin: 10px 5px;
                    height: 80px;
                    padding: 5px 3px;
                    .alliance-div-text {
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
            }
        }
        .information {
            padding: 10px 20px;
            .information-title {
                padding-bottom: 1px;
                border-bottom: 1px #eee solid;
                .information-title-tip{
                    color: #ccc;
                }
            }
            .informaion-content {
                display: flex;
                padding: 10px 0;
                .informaion-content-left {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    .informaion-content-img {
                        border-radius: 50%;
                        width: 100%;
                        height: 100%;
                    }
                }
                .informaion-content-right {
                    margin-left: 15px;
                    .informaion-right-text > {
                        overflow: hidden; /*超过部分不显示*/
                        text-overflow: ellipsis; /*超过部分用点点表示*/
                        white-space: nowrap; /*不换行*/
                        span {
                            margin-left: 10px;
                        }
                    }
                }
            }
            .informaion-btn {
                height: 30px;
                line-height: 30px;
                text-align: center;
                background: #005be0;
                color: #fff;
                border-radius: 25px;
                margin-top: 10px;
                cursor: pointer;
            }
        }
    }
    .bgimg-interface {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 2;
        cursor: pointer;
        .bgimg-down {
            height: 220px;
            width: 100%;
            display: block;
        }
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
    .information_info {
        display: flex;
        margin: 10px 0;
        background: #f1f1f1;
        position: relative;
        padding: 5px;
        .information_info_right {
            margin-left: 20px;
            line-height: 40px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .info_left_img {
            width: 40px;
            height: 40px;
            border-radius: 4px;
        }
        .close-btn {
            position: absolute;
            top: -4px;
            right: 0;
            width: 12px;
            height: 12px;
            background: #bdbdbd;
            line-height: 10px;
            text-align: center;
            border-radius: 50%;
            font-size: 10px;
            // padding-left: 1px;
            color: #fff;
            cursor: pointer;
        }
    }
    .set-interface {
        position: absolute;
        top: 20%;
        right: -500px;
        z-index: 2;
        border: 1px #ccc solid;
        width: 434px;
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