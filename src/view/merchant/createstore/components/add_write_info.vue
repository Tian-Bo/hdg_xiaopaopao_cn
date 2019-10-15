<!--
 * @Author: zlz5v5
 * @LastEditors: zlz
 * @Date: 2019-07-10 18:32:23
 * @LastEditTime: 2019-09-27 18:24:54
 -->
<template>
    <div class="geographical">
        <div class="return-btn" @click="jumpOldPage()"><i class="iconfont iconjiantou-left"></i> 返回</div>
        <div class="horizontal">
            <div class="horizontalLi">
                <el-form label-width="120px">
                    <el-form-item label="核销员列表 :">
                        <!-- -->
                        <div class="writer-info-title">
                            <el-button
                                size="mini"
                                @click="qrcodeVisible = true"
                            >
                                添加核销员 <i class="iconfont icontianjia"></i>
                            </el-button>

                            <!-- <div> -->
                            <el-button
                                size="mini"
                                type="text"
                                @click="getWriterInfo()"
                            >
                                刷新<i class="iconfont iconshuaxin "></i>
                            </el-button>
                            <!-- </div> -->
                        </div>
                        <div
                            class="writer-info-box"
                            v-loading="writerInfoLoading"
                        >
                            <div
                                class="writer-info-list"
                                v-for="(item, index) in writerInfo"
                                :key="index"
                            >
                                <div class="info-list-img">
                                    <img :src="item.head_img" alt="" />
                                </div>
                                <div class="info-list-text">
                                    <div>姓名:{{ item.alias_name }}</div>
                                    <div>手机号:{{ item.mobile }}</div>
                                </div>
                                <div
                                    class="info-list-close"
                                    @click="
                                        openDeteleAlert(index, item.user_id)
                                    "
                                >
                                    x
                                </div>
                            </div>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <!-- 添加核销员二维码 -->
        <el-dialog :visible.sync="qrcodeVisible" width="360px" :center="true">
            <div style="margin-bottom: 15px; text-align: center;">
                微信扫码添加核销人
            </div>
            <vue-qr
                :text="qrcode"
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
                    v-clipboard:copy="qrcode"
                    >点击复制</el-button
                >
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {
    getHandleList,
    globalUrlBase,
    httpString,
    deleteHandleList
} from "@/api/api";
import { UrlSearch } from "@/assets/js/Urlsearch";
// 旧项目获取store_id
const urlValue = new UrlSearch();
let store_id = urlValue.store_id;
// 生成二维码
import vueQr from "vue-qr";
export default {
    data() {
        return {
            store_id,
            token: localStorage.getItem("token"),
            shop_id: localStorage.getItem("shop_id"),
            // 核销员列表
            writerInfo: [],
            // 核销员列表的loading
            writerInfoLoading: false,
            // 二维码状态
            qrcodeVisible: false
        };
    },
    components: {
        vueQr
    },
    computed: {
        qrcode() {
            let qrcodeUrl = `${httpString}www.${globalUrlBase}/app-h5/index.html#/pages/writerInformation/index?store_id=${this.store_id}&shop_id=${this.shop_id}`;
            return qrcodeUrl;
        }
    },
    created() {
        this.getWriterInfo();
    },
    methods: {
        // 获取核销员列表
        getWriterInfo() {
            let _that = this;
            // _that.writerInfoLoading = !_that.writerInfoLoading;
            _that.writerInfoLoading = true;
            let params = {
                store_id: _that.store_id,
                token: _that.token,
                shop_id: _that.shop_id
            };
            _that.$http
                .get(getHandleList, {
                    params
                })
                .then(res => {
                    _that.writerInfoLoading = false;
                    if (res.data.status == 0) {
                        _that.writerInfo = res.data.data;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 删除的弹窗
        openDeteleAlert(index, userid) {
            let _that = this;
            _that.$alert("此操作将永久删除该核销员, 是否确定?", "温馨提示", {
                confirmButtonText: "确定",
                callback: action => {
                    _that.deteleWriterInfo(index, userid);
                    
                }
            });
        },
        // 删除核销员
        deteleWriterInfo(index, userid) {
            let _that = this;
            let dataParams = {
                token: _that.token,
                shop_id: _that.shop_id,
                store_id: _that.store_id,
                user_id: userid
            };
            _that.$http
                .post(deleteHandleList, _that.$qs.stringify(dataParams))
                .then(res => {
                    if (res.data.status === 0) {
                        _that.writerInfo.splice(index, 1);
                        _that.$message.success("删除成功");
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
        },
        //跳回老项目
        jumpOldPage(){
            window.location.href = '/merchant/manage_shop/shop'
        }
    }
};
</script>

<style lang="scss" scoped>
.geographical {
    width: 100%;
    height: 100%;
    .return-btn{
        padding: 20px;
        cursor: pointer;
        
    }
    .horizontal {
        width: 100%;
        height: 100%;
        padding: 30px 40px 0 40px;
        .horizontalLi {
            margin: 10px 0;
            float: left;
            width: 100%;
            .writer-info-title {
                display: flex;
                margin-top: 50px;
                justify-content: space-between;
                padding-right: 9%;
            }
            .writer-info-box {
                display: flex;
                flex-wrap: wrap;
            }
            .writer-info-list {
                display: flex;
                // border: 1px #ccc solid;
                width: 255px;
                padding: 10px 20px;
                border-radius: 5px;
                box-shadow: 4px 1px 5px #e1d8d8;
                margin-top: 20px;
                margin-right: 20px;
                position: relative;
                .info-list-img {
                    width: 50px;
                    height: 50px;
                    img {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                }
                .info-list-text {
                    line-height: 28px;
                    padding-left: 20px;
                }
                .info-list-close {
                    position: absolute;
                    right: 11px;
                    top: -8px;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
