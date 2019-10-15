<!--
 * @Author: tianbo
 * @LastEditors: tianbo
 * @Date: 2019-09-25 19:03:00
 * @LastEditTime: 2019-10-12 15:28:33
 -->
<template>
    <div class="app-content">
        <header>近期进行的活动</header>
        <main>
            <div class="main-item" v-for="(item, index) in 3" :key="index">
                <div class="main-item-img">
                    <img src="../../../assets/bgUser.jpg" />
                    <span v-if="true">组队拼团</span>
                    <span v-else>红包扩客</span>
                </div>
                <div class="main-item-pro">
                    <div class="pro-title ellipsis">嘉兴艺星品牌日 全民分红嘉兴艺星品牌日 全民分红嘉兴艺星品牌日 全民分红嘉兴艺星品牌日 全民分红 </div>
                    <div class="pro-progress">
                        <el-progress
                            :text-inside="true"
                            :stroke-width="16"
                            :percentage="50"
                            class="activ-progress"
                            :show-text="false"
                        ></el-progress>
                        <span>已参与56人</span>
                        <span>剩余名额56人</span>
                    </div>
                    <div class="pro-msg ellipsis">
                        <span>访客数：999999</span>
                        <span>报名率：150%</span>
                        <span>到店&到场率：180%</span>
                    </div>
                </div>
                <div class="main-item-time">
                    <p>2019-09-99 99:99:99</p>
                    <p>2019-10-31 00:00:00</p>
                </div>
                <div class="main-item-btn">
                    <a @click="preview">预览</a>
                    <a>报名数据</a>
                    <a>编辑</a>
                </div>
            </div>
        </main>

        <!-- 二维码弹窗-begin -->
        <el-dialog
            :title="centerDialogText"
            width="750px"
            :visible.sync="centerDialogVisible"
            :modal-append-to-body="false"
        >
            <qrcode
                :cluster_id="cluster_id"
                :cover_img="cover_img"
                :model_id="2"
                :channel_status="channel_status"
                :show="show"
                @editTitle="editTitle"
            />
        </el-dialog>
        <!-- 二维码弹窗-end -->
    </div>
</template>

<script>
import qrcode from "@/view/activity/components/qrcode";
export default {
    components: {
        qrcode
    },
    data() {
        return {
            data: "",
            cluster_id: 15,
            cover_img: "",
            channel_status: true,
            centerDialogVisible: false,
            centerDialogText: "预览",
            show: true
        };
    },
    methods: {
        // 修改标题
        editTitle() {
            this.centerDialogText = "渠道专属链接";
            this.show = false;
        },
        // 预览
        preview() {
            console.log('123456')
            // if (this.data.can_preview) {
            if (true) {
                // this.cluster_id = item.active_id;
                // this.cover_img = item.cover_img;
                // this.channel_status = item.channel_status;
                this.centerDialogVisible = true;
                this.show = true;
                // this.centerDialogText = "预览";
            } else {
                this.$confirm("请补全店铺信息,才能进行预览", "提示", {
                    confirmButtonText: "去补全",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        // 跳转到设置页面
                        this.$router.push({ path: "/setting" });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消补全"
                        });
                    });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
header {
    height: 56px;
    line-height: 56px;
    border-bottom: 1px solid #eeeeee;
    padding-left: 20px;
}
main {
    padding: 0 15px;
    padding-bottom: 15px;
    .main-item {
        margin-top: 36px;
        display: flex;
        align-items: center;
        .main-item-img {
            width: 75px;
            height: 100px;
            border-radius: 5px;
            overflow: hidden;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .main-item-pro {
            width: 360px;
            padding: 0 15px 0 30px;
            .pro-title {
            }
            .pro-progress {
                margin: 15px 0;
                position: relative;
                span {
                    position: absolute;
                    top: 0;
                    color: #fff;
                    font-size: 12px;
                }
                span:first-of-type {
                    left: 0;
                    margin-left: 5px;
                }
                span:last-of-type {
                    right: 0;
                    margin-right: 5px;
                }
            }
            .pro-msg {
                display: flex;
                justify-content: space-between;
                font-size: 13px;
            }
        }
        .main-item-time {
            width: 195px;
            padding: 0 30px;
            p {
                line-height: 200%;
                color: rgba(153, 153, 153, 1);
            }
        }
        .main-item-btn {
            flex: 1;
            display: flex;
            justify-content: center;
            a {
                margin: 0 5px;
                font-size: 12px;
                color: #409eff;
            }
        }
    }
}
</style>
