<!--
 * @Author: zlz5v5
 * @LastEditors: zlz
 * @Date: 2019-08-19 14:03:49
 * @LastEditTime: 2019-09-28 11:51:24
 -->
<template>
    <!-- 顶部导航 -->
    <div class="activity-top-nav">
        <div>
            <el-row>
                <el-button class="click-btn" @click="jumpTopPage()">
                    上一步
                </el-button>
                <el-button
                    type="primary"
                    @click="savePoter(posterInfo, VueDragResize)"
                >
                    <i class="iconfont iconyulan"></i> 浏览并发布
                </el-button>
                <el-button type="info" @click="signOutFunc">
                    <i class="iconfont iconcomiistuichu"></i>退出编辑
                </el-button>
            </el-row>
        </div>
        <el-dialog
            title="预览"
            :visible.sync="centerDialogVisible"
            :modal-append-to-body="false"
        >
            <topNavDialog
                @openDalog="openDalog"
                :share_config="posterInfo.share_config"
            />
        </el-dialog>
    </div>
</template>

<script>
import { activePoster } from "@/api/api";
import topNavDialog from "./top_nav_dialog";
import { signOutFunc } from "../../signOut";

export default {
    props: ["posterInfo", "VueDragResize"],
    data() {
        return {
            token: localStorage.getItem("token"),
            shop_id: localStorage.getItem("shop_id"),
            // 弹窗状态
            centerDialogVisible: false,
            signOutFunc
        };
    },
    components: {
        topNavDialog
    },
    methods: {
        // 上传海报数据
        savePoter(posterInfo, VueDragResize) {
            let _that = this;
            // 删除头像的w,h,left,top
            delete posterInfo["head_img_width"];
            delete posterInfo["head_img_height"];
            delete posterInfo["head_img_position_left"];
            delete posterInfo["head_img_position_top"];
            // 删除昵称的w,h,left,top
            delete posterInfo["nickname_height"];
            delete posterInfo["nickname_width"];
            delete posterInfo["nickname_position_left"];
            delete posterInfo["nickname_position_top"];
            // 删除二维码的w,h,left,top
            delete posterInfo["qrcode_position_left"];
            delete posterInfo["qrcode_position_top"];
            delete posterInfo["qrcode_wh_height"];
            delete posterInfo["qrcode_wh_width"];
            // 增加头像的w,h,left,top
            posterInfo.head_img_wh = `${VueDragResize.head_img_width},${VueDragResize.head_img_height}`;
            posterInfo.head_img_position = `${VueDragResize.head_img_top},${VueDragResize.head_img_left}`;
            // 增加呢称的w,h,left,top
            posterInfo.nickname_wh = `${VueDragResize.nickname_width},${VueDragResize.nickname_height}`;
            posterInfo.nickname_position = `${VueDragResize.nickname_top},${VueDragResize.nickname_left}`;
            // 增加二维码的w,h,left,top
            posterInfo.qrcode_wh = `${VueDragResize.qrcode_width},${VueDragResize.qrcode_height}`;
            posterInfo.qrcode_position = `${VueDragResize.qrcode_top},${VueDragResize.qrcode_left}`;
            // 组装数据
            let dataParams = {
                token: _that.token,
                active_id: posterInfo.active_id,
                model_id: posterInfo.model_id,
                head_img_position: posterInfo.head_img_position,
                head_img_type: posterInfo.head_img_type,
                head_img_wh: posterInfo.head_img_wh,
                is_show_head_img: posterInfo.is_show_head_img,
                is_show_nickname: posterInfo.is_show_nickname,
                nickname_font_color: posterInfo.nickname_font_color,
                nickname_font_size: posterInfo.nickname_font_size,
                nickname_position: posterInfo.nickname_position,
                nickname_wh: posterInfo.nickname_wh,
                poster_img_position: posterInfo.poster_img_position,
                poster_img_url: posterInfo.poster_img_url,
                poster_quality: posterInfo.poster_quality,
                qrcode_position: posterInfo.qrcode_position,
                qrcode_wh: posterInfo.qrcode_wh,
                shop_id: _that.shop_id
            };

            _that.$http
                .post(activePoster, _that.$qs.stringify(dataParams))
                .then(res => {
                    if (res.data.status === 0) {
                        this.$message({
                            message: "更新样式成功",
                            type: "success"
                        });
                    }
                    _that.centerDialogVisible = true;
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        // 关闭弹窗
        openDalog() {
            let _that = this;
            _that.centerDialogVisible = false;
        },
        jumpTopPage() {
            let _that = this;
            _that.$router.push({
                path: "/create_home",
                query: { title: "create_rule" }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.activity-top-nav {
    position: fixed;
    height: 65px;
    background: #fbfbfb;
    left: 92px;
    right: 0;
    top: 0;
    z-index: 10;
    display: flex;
    justify-content: flex-end;
    padding: 0 20px;
    box-shadow: 1px 6px 5px #dcdcdc8a;
    padding-top: 14px;
    .click-btn {
        border: 1px #409eff solid;
        color: #409eff;
    }
    .top-nav-box {
        display: flex;
        line-height: 65px;
        padding-right: 24%;
        justify-content: space-between;
        .nav-box-btn {
            padding: 0 30px;
            color: #a8a8a8;
            .active-class {
                color: #409eff;
            }
            .nav-box-btn-ab {
                position: absolute;
                top: 68px;
                width: 236px;
                height: 100px;
                z-index: 5;
                text-align: center;
                background: #fff;
                box-shadow: 0px 3px 4px #c7c7c7;
                border-radius: 8px;
                padding: 20px 40px;
                .nav-box-btn-bottom {
                    display: flex;
                    margin-top: 10px;
                    justify-content: space-around;
                }
            }
            .nav-box-btn-ab:before {
                position: absolute;
                content: "";
                border-top: 10px transparent dashed;
                border-left: 10px transparent dashed;
                border-right: 10px #fff solid;
                border-bottom: 10px #e4e4e4 solid;
                top: -20px;
                left: 17px;
            }
        }
    }
}
</style>