<!--
 * @Author: zlz5v5
 * @LastEditors: tianbo
 * @Date: 2019-09-09 15:53:00
 * @LastEditTime: 2019-10-11 14:42:15
 * @顶部的按钮弹窗的预览
 -->

<template >
    <div>
        <!-- 设置页面分享样式 -->
        <div class="seting-share" v-if="show">
            <div class="seting-share-left">
                <img :src="cover_img || bgImage" alt style="width:100%;height:100%" />
            </div>
            <div class="seting-share-right">
                <div class="share-right-box">
                    <!-- {{qrcodelUrl}} -->
                    <vue-qr
                        :text="qrcodelUrl"
                        :margin="0"
                        :size="250"
                        :auto-color="true"
                        :dot-scale="1"
                        :callback="test"
                    ></vue-qr>
                    <div class="qr-btn">
                        <el-button type="text" disabled>微信扫一扫</el-button>
                        <el-button type="text" @click="downloadBase64()">下载二维码</el-button>
                    </div>
                    <el-input placeholder="请输入内容" v-model="qrcodelUrl" :disabled="true">
                        <template slot="append">
                            <el-button
                                type="primary"
                                v-clipboard:success="copy"
                                v-clipboard:copy="qrcodelUrl"
                            >复制连接</el-button>
                        </template>
                    </el-input>
                </div>
                <div class="share-right-hint">
                    <p>您可以将活动链接复制到您的公众号菜单</p>
                    <p>或自定义回复中</p>
                </div>
                <el-button class="share-right-btn" type="primary" @click="initialQuery">获取渠道推广专属链接</el-button>
            </div>
        </div>

        <div class="channel-list" v-else v-loading="loading">
            <div class="channel-list-header">
                <el-select v-model="select" placeholder="请选择">
                    <el-option
                        v-for="item in selectList"
                        :key="item.value"
                        :label="item.text"
                        :value="item.value"
                    ></el-option>
                </el-select>
                <el-input v-model="message" placeholder="请输入渠道名称"></el-input>
                <el-button type="primary" @click="query">搜索</el-button>
            </div>
            <div class="channel-list-table">
                <el-table :data="tableData.items" :show-header="false" style="width: 100%">
                    <el-table-column width="70">
                        <template slot-scope="scope">
                            <div class="table-img">
                                <img :src="scope.row.channel_logo" />
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column width="200">
                        <template slot-scope="scope">
                            <div class="table-name">
                                <span class="ellipsis">{{ scope.row.channel_name }}</span>
                                <span v-if="scope.row.channel_type == 0">商家门店</span>
                                <span v-if="scope.row.channel_type == 1">团队</span>
                                <span v-if="scope.row.channel_type == 2">平台</span>
                                <span v-if="scope.row.channel_type == 3">其他</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column width="300">
                        <template slot-scope="scope">
                            <div class="table-link">
                                <div
                                    class="ellipsis"
                                    style="color: #ccc;"
                                >{{ qrcodelUrl + http + 'channel_id=' + scope.row.channel_id }}</div>
                                <div
                                    type="primary"
                                    v-clipboard:success="copy"
                                    v-clipboard:copy="qrcodelUrl + http + 'channel_id=' + scope.row.channel_id"
                                >复制连接</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">
                            <div class="table-qrcode">
                                <div class="table-qrcode-img">
                                    <img src="../../../assets/qrcode.png" />
                                    <div class="table-qrcode-hover">
                                        <div style="text-align: center; margin-bottom: 15px;">微信扫码</div>
                                        <div style="margin-left: 20px;">
                                            <vue-qr
                                                :text="qrcodelUrl + http + 'channel_id=' + scope.row.channel_id"
                                                :margin="0"
                                                :size="120"
                                                :auto-color="true"
                                                :dot-scale="1"
                                                :callback="assignment"
                                            ></vue-qr>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="channel-list-hint">
                未找到合适的,点击
                <router-link tag="a" to="/createChannel">【创建新的渠道】</router-link>
            </div>
            <!-- 分页-begin -->
            <div class="footer">
                <el-pagination
                    @current-change="currentChange"
                    background
                    :total="tableData.total"
                    layout="total, prev, pager, next, jumper"
                    :current-page="page"
                    :page-size="5"
                    :show-summary="false"
                ></el-pagination>
            </div>
            <!-- 分页-end -->
        </div>
    </div>
</template>

<script>
import { globalUrlBase, httpString, getShopAllChannel } from "@/api/api";
import VueQr from "vue-qr";

export default {
    props: ["cluster_id", "cover_img", "model_id", "show", "channel_status"],
    data() {
        return {
            loading: false,
            newDate: "",
            bgImage: require("@/assets/pageCreation.png"),
            isShow: 0,
            dataUrl: "",
            page: 1, // 分页
            message: "", // 搜索信息
            select: "", // 下拉选择
            sub_message: "",
            sub_select: "",
            channelQrcodelUrl: "", // 渠道二维码链接
            httpString: httpString,
            globalUrlBase: globalUrlBase,
            http: this.model_id == 2 ? "?" : "&",
            selectList: [
                // 下拉列表
                {
                    value: "",
                    text: "全部渠道"
                },
                {
                    value: 0,
                    text: "商家门店"
                },
                {
                    value: 1,
                    text: "团队"
                },
                {
                    value: 2,
                    text: "平台"
                },
                {
                    value: 3,
                    text: "其他"
                }
            ],
            tableData: [] // 列表数据
        };
    },
    components: {
        VueQr
    },
    computed: {
        // 计算当前时间
        cpmputNewTime: function() {
            let that = this;
            return setInterval(function() {
                let date1 = new Date();
                that.newDate = date1.toTimeString().substr(0, 8);
            }, 1000);
        },
        //计算路由的链接
        qrcodelUrl: function(params) {
            if (this.model_id == 4) {
                return (
                    httpString +
                    "www." +
                    globalUrlBase +
                    "/wap/active/assemble?cid=" +
                    this.cluster_id
                );
            }
            if (this.model_id == 2) {
                return (
                    httpString +
                    "www." +
                    globalUrlBase +
                    "/wap/active/index/" +
                    this.cluster_id
                );
            }
        }
    },
    methods: {
        // 首次查询
        initialQuery() {
            if (!this.channel_status) {
                return this.$router.push({
                    path: "/unlock",
                    query: {
                        plugin_id: 19
                    }
                });
            }
            this.page = 1;
            this.select = "";
            this.message = "";
            this.sub_select = "";
            this.sub_message = "";
            this.editCenterDialogText();
        },
        // 分页
        currentChange(val) {
            this.page = val;
            this.editCenterDialogText();
        },
        // 搜索
        query() {
            this.page = 1;
            this.sub_select = this.select;
            this.sub_message = this.message;
            this.editCenterDialogText();
        },
        // 执行父级方法
        editCenterDialogText() {
            this.loading = true;
            let params = {
                shop_id: localStorage.getItem("shop_id"),
                token: localStorage.getItem("token"),
                page: this.page,
                message: this.sub_message,
                type: this.sub_select
            };
            this.$http.get(getShopAllChannel, { params }).then(res => {
                this.loading = false;
                if (res.data.status == 0) {
                    this.tableData = res.data.data;
                } else {
                    this.$message.error(res.data.message);
                }
            });
            this.$emit("editTitle");
        },
        // 渠道链接赋值
        assignment(dataUrl) {},
        // 将生成的base64图片地址赋值
        test(dataUrl) {
            let _that = this;
            _that.dataUrl = dataUrl;
        },
        // 使用base64 下载 图片
        // 这段代码是粘贴百度的
        downloadBase64() {
            let _that = this;
            let dataUrl = _that.dataUrl;
            if (window.navigator.msSaveOrOpenBlob) {
                let bstr = atob(dataUrl.split(",")[1]);
                let n = bstr.length;
                let u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                let blob = new Blob([u8arr]);
                window.navigator.msSaveOrOpenBlob(
                    blob,
                    "chart-download" + "." + "png"
                );
            } else {
                // 这里就按照chrome等新版浏览器来处理
                let a = document.createElement("a");
                a.href = dataUrl;
                a.setAttribute("download", "chart-download");
                a.click();
            }
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
<style lang="scss" scoped>
.seting-share {
    display: flex;
    height: 665px;
    .seting-share-left {
        width: 334px;
        border: 1px #ccc solid;
        position: relative;
        background: #ededed;
    }
    .seting-share-right {
        width: calc(100% - 354px);
        margin-left: 20px;
        padding: 50px 20px;
        position: relative;
        text-align: center;
        .share-right-box {
            border: 1px #ccc solid;
            display: inline-block;
            padding: 30px;
        }
        .share-right-hint {
            color: rgba(74, 73, 73, 0.35);
            line-height: 200%;
            margin-top: 30px;
        }
        .share-right-btn {
            margin-top: 50px;
        }
        .qr-btn {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
        }
        .seting-share-bottom {
            position: absolute;
            bottom: 25px;
            left: 0;
            right: 0;
            text-align: center;
            .share-bottom-btn {
                padding: 10px 80px;
            }
        }
    }
}
.channel-list {
    .channel-list-header {
        display: flex;
    }
    .channel-list-table {
        margin: 30px 0;
    }
    .channel-list-hint {
        text-align: center;
        font-size: 13px;
        color: #a1a1a1;
        margin: 30px 0;
        a {
            color: #409eff;
        }
    }
    .table-img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .table-name {
        display: flex;
        justify-content: space-between;
        align-items: center;
        span:first-of-type {
            display: inline-block;
            max-width: 120px;
            font-size: 16px;
            color: #333;
            font-weight: 700;
        }
        span:last-of-type {
            display: inline-block;
            font-size: 12px;
            border: 1px solid #4fa5ff;
            color: #4fa5ff;
            padding: 0px 10px;
            height: 18px;
            line-height: 18px;
            border-radius: 3px;
        }
    }
    .table-link {
        padding-left: 70px;
        display: flex;
        align-items: center;
        div:first-of-type {
            line-height: 28px;
            width: 155px;
            border: 1px solid #dcdcdc;
            border-top-left-radius: 2px;
            border-bottom-left-radius: 2px;
        }
        div:last-of-type {
            color: #409eff;
            background-color: rgba(236, 245, 255, 1);
            border: 1px solid #409eff;
            line-height: 28px;
            text-align: center;
            width: 85px;
            border-bottom-right-radius: 2px;
            border-top-right-radius: 2px;
            cursor: pointer;
        }
    }
    .table-qrcode {
        display: flex;
        justify-content: center;
        .table-qrcode-img {
            // position: relative;
            width: 36px;
            height: 36px;
            border: 1px solid rgba(230, 230, 230, 1);
            border-radius: 4px;
            padding: 5px;
            cursor: pointer;
            > img {
                width: 100%;
                height: 100%;
            }
            .table-qrcode-hover {
                opacity: 0;
                padding: 30px;
                width: 220px;
                height: 220px;
                background-color: #fff;
                border-radius: 2px;
                transition: all 0.5s;
                display: none;
                opacity: 0;
                position: fixed;
                z-index: 999999;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
        }
        .table-qrcode-img:hover {
            border: 1px solid #409eff;
            .table-qrcode-hover {
                transition: all 0.5s;
                display: block;
                opacity: 1;
            }
        }
    }
}

// footer 分页
.footer {
    padding: 30px 0;
    text-align: center;
}
</style>