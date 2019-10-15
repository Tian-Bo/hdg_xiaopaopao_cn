<!--
 * @Author: zlz5v5
 * @LastEditors: zlz
 * @Date: 2019-08-19 14:03:49
 * @LastEditTime: 2019-09-29 16:28:38
 -->
<template>
    <!-- 顶部导航 -->
    <div class="activity-top-nav">
        <div>
            <el-row>
                <el-button class="click-btn" @click="jumpHomePage()">
                    上一步
                </el-button>
                <el-button type="primary" @click="jumpPosterPage()">
                    <i class="iconfont iconbaocun"></i>保存活动规则
                </el-button>
                <!-- {{ voucher_config[0].voucher_ids }} -->
                <el-button type="info" @click="signOutFunc">
                    <i class="iconfont iconcomiistuichu"></i>退出编辑
                </el-button>
            </el-row>
        </div>
    </div>
</template>

<script>
import qrcode from "../../create_activity/components/qrcode";
import { signOutFunc } from "../../signOut";
export default {
    props: ["voucher_config", "role_config"],
    data() {
        return {
            centerDialogVisible: false,
            signOutFunc
        };
    },
    components: {
        qrcode
    },
    methods: {
        // 跳转页面
        jumpHomePage() {
            let _that = this;
            _that.$router.push({
                path: "/create_home",
                query: { title: "create_activity" }
            });
        },
        // 跳转海报页
        jumpPosterPage() {
            let _that = this;

            if (_that.voucher_config.length === 0) {
                // 提示信息
                let tipInfo = `没有设置套餐,这样会导致该活动发布失败,请在--->项目（套餐）价格设置!!`;
                _that.$alert(tipInfo, "温馨提示", {
                    confirmButtonText: "确定",
                    type: "warning"
                });
                return;
            }
            if (_that.role_config.length === 0) {
                // 提示信息
                let tipInfo = `没有拼团规则,这样会导致该活动发布失败,请在--->组队拼团规则设置!!`;
                _that.$alert(tipInfo, "温馨提示", {
                    confirmButtonText: "确定",
                    type: "warning"
                });
                return;
            }

            // 判断每一个套餐有没有核销券
            let dialoStatus = false;
            _that.voucher_config.forEach((element, index) => {
                if (element.voucher_ids.length === 0) {
                    // 提示信息
                    let tipInfo = `${element.ticket_name}没有绑定核销券,这样会导致该活动发布失败,请绑定核销券!!`;
                    _that.$alert(tipInfo, "温馨提示", {
                        confirmButtonText: "确定",
                        type: "warning"
                    });
                    dialoStatus = true;
                }
            });
            if (dialoStatus) return;

            // 成功跳转
            _that.$router.push({
                path: "/create_home",
                query: { title: "createp_poster" }
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