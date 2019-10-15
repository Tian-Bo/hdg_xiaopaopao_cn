<!--
 * @Author: zlz5v5
 * @LastEditors: zlz
 * @Date: 2019-08-19 14:03:49
 * @LastEditTime: 2019-09-30 10:11:53
 -->
<template>
    <!-- 顶部导航 -->
    <div>
        <div
            class="activity-top-nav"
            v-for="(item, index) in cluster_array"
            :key="index"
            v-if="item.type === 11"
        >
            <div class="top-nav-box">
                <el-button
                    class="nav-box-btn"
                    type="text"
                    @click="editBoxBtnIndex(1)"
                >
                    <span :class="{ 'active-class': boxBtnIndex === 1 }">
                        <i class="iconfont iconbeijing"></i> 背景主题
                    </span>
                    <div class="nav-box-btn-ab" v-show="boxBtnIndex === 1">
                        <div style="display: flex;">
                            <el-input
                                placeholder="请输入内容"
                                v-model="item.bg_color"
                                :disabled="true"
                                size="mini"
                                width="100px"
                            ></el-input>
                            <el-color-picker
                                v-model="item.bg_color"
                                size="mini"
                            ></el-color-picker>
                        </div>
                        <div class="nav-box-btn-bottom">
                            <el-button
                                size="mini"
                                @click.stop="editBoxBtnIndex(0)"
                            >
                                取消
                            </el-button>
                            <el-button
                                size="mini"
                                type="primary"
                                @click.stop="editBoxBtnIndex(0)"
                            >
                                确定
                            </el-button>
                        </div>
                    </div>
                </el-button>
                <el-button
                    class="nav-box-btn"
                    type="text"
                    @click="editBoxBtnIndex(2)"
                >
                    <span :class="{ 'active-class': boxBtnIndex === 2 }">
                        <i class="iconfont iconyinle"></i>场景音乐
                    </span>
                    <div class="nav-box-btn-ab" v-show="boxBtnIndex === 2">
                        <div style="display: flex;">
                            <el-input
                                placeholder="请输入音乐的url"
                                v-model="item.scene.music"
                                size="mini"
                                width="100px"
                            ></el-input>
                        </div>
                        <div class="nav-box-btn-bottom">
                            <el-button
                                size="mini"
                                @click.stop="editBoxBtnIndex(0)"
                            >
                                取消
                            </el-button>
                            <el-button
                                size="mini"
                                type="primary"
                                @click.stop="editBoxBtnIndex(0)"
                            >
                                确定
                            </el-button>
                        </div>
                    </div>
                </el-button>
                <el-button
                    class="nav-box-btn"
                    type="text"
                    @click="editBoxBtnIndex(3)"
                >
                    <span :class="{ 'active-class': boxBtnIndex === 3 }">
                        <i class="iconfont icontexiao"></i>页面特效
                    </span>
                    <div class="nav-box-btn-ab" v-show="boxBtnIndex === 3">
                        <div
                            style="display: flex;justify-content: space-around; "
                        >
                            <div style="padding-right: 20px;line-height: 19px;">
                                <!-- -->
                                弹幕开关
                            </div>
                            <el-switch
                                v-model="item.effects.barrage"
                            ></el-switch>
                        </div>
                        <div class="nav-box-btn-bottom">
                            <el-button
                                size="mini"
                                @click.stop="editBoxBtnIndex(0)"
                                >取消</el-button
                            >
                            <el-button
                                size="mini"
                                type="primary"
                                @click.stop="editBoxBtnIndex(0)"
                                >确定</el-button
                            >
                        </div>
                    </div>
                </el-button>
            </div>
            <div>
                <el-row>
                    <!-- <el-button class="click-btn" @click="savePageInfo(1)">
                        <i class="iconfont iconyulan"></i>预览
                    </el-button> -->
                    <el-button type="primary" @click="savePageInfo(2)">
                        <i class="iconfont iconbaocun"></i>保存页面样式
                    </el-button>
                    <el-button type="info" @click="signOutFunc">
                        <i class="iconfont iconcomiistuichu"></i>
                        退出编辑
                    </el-button>
                </el-row>
            </div>
            <el-dialog
                title="预览"
                :visible.sync="centerDialogVisible"
                :modal-append-to-body="false"
                @close="locationReload()"
            >
                <qrcode :cluster_id="cluster_id" />
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { uploadCluster } from "@/api/api";
import qrcode from "./components/qrcode";
import { signOutFunc } from "../signOut";
export default {
    props: ["cluster_array"],
    components: {
        qrcode
    },
    data() {
        return {
            token: localStorage.getItem("token"),
            // 拼团id
            cluster_id: localStorage.getItem("clusterId"),
            // 获取活动的所有信息
            color: "#409EFF",
            input: "",
            musicUrl: "",
            switchValue: 0,
            // 点击
            boxBtnIndex: 0,
            centerDialogVisible: false,
            signOutFunc
        };
    },
    methods: {
        // 顶部的弹窗
        editBoxBtnIndex(index) {
            let _that = this;
            _that.boxBtnIndex = index;
        },
        //上传页面数据
        // index:1-->预览  2--->保存数据到下一页
        savePageInfo(index) {
            let _that = this;
            _that.cluster_array.forEach((element, index) => {
                // 删除后端不要的数据
                if (element.type === 1) {
                    delete element["cluster_info"];
                }
                if (element.type === 3) {
                    delete element["auth_pictures_info"];
                }
                if (element.type === 4) {
                    delete element["diff"];
                }
                if (element.type === 6) {
                    delete element["team_info"];
                    delete element["participation"];
                }
                if (element.type === 8) {
                    delete element["store_info"];
                }
                if (element.type === 9) {
                    delete element["rank_info"];
                }
                if (element.type === 10) {
                    _that.cluster_array.splice(index, 1);
                }
            });
            let data = JSON.stringify(_that.cluster_array);
            let dataParams = {
                token: _that.token,
                cluster_id: localStorage.getItem("clusterId"),
                data
            };

            _that.$http
                .post(uploadCluster, _that.$qs.stringify(dataParams))
                .then(res => {
                    // 保存成功并弹出弹窗
                    if (index === 1) {
                        _that.centerDialogVisible = true;
                    }
                    // 保存成功并跳转页面
                    if (index === 2) {
                        _that.$router.push({
                            path: "/create_home",
                            query: { title: "create_rule" }
                        });
                    }
                    if (res.data.status === 0) {
                        this.$message({
                            message: "更新成功",
                            type: "success"
                        });
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        // 关闭弹窗刷新页面
        locationReload() {
            window.location.reload();
        }
    }
};
</script>

<style lang="scss" scoped>
.activity-top-nav {
    position: fixed;
    // position: absolute;
    height: 65px;
    background: #fff;
    left: 92px;
    right: 0;
    top: 0;
    z-index: 5;
    display: flex;
    justify-content: flex-end;
    padding: 0 20px;
    box-shadow: 1px 6px 5px #dcdcdc8a;
    padding-top: 14px;
    .top-nav-box {
        display: flex;
        height: 40px;
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
                content: "";
                top: -19px;
                left: 19px;
                width: 0;
                height: 0;
                border-width: 10px 10px 10px 10px;
                border-style: solid;
                border-color: transparent transparent #eee transparent;
                position: absolute;
                z-index: 3;
            }
            .nav-box-btn-ab:after {
                content: "";
                top: -17px;
                left: 19px;
                width: 0;
                height: 0;
                border-width: 10px 10px 10px 10px;
                border-style: solid;
                border-color: transparent transparent #fff transparent;
                position: absolute;
                z-index: 3;
            }
        }
    }
    .click-btn {
        border: 1px #409eff solid;
        color: #409eff;
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
</style>