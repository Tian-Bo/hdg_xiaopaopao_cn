<template>
    <div class="createChannel-form around-center">
        <div class="text-left">
            <div class="left-center form-item">
                <label class="form-ladel">
                    <i class="color-DD122A-right5">*</i>渠道名称
                </label>
                <el-input
                    v-model="name"
                    placeholder="请输入渠道名称"
                    class="active store-item-input"
                    name="shop_name"
                ></el-input>
            </div>
            <div class="left-center form-item">
                <label class="form-ladel">
                    <i class="color-DD122A-right5">*</i>渠道类型
                </label>
                <el-radio-group v-model="type">
                    <el-radio :label="0">商家门店</el-radio>
                    <el-radio :label="1">团队</el-radio>
                    <el-radio :label="2">平台</el-radio>
                    <el-radio :label="3">其他</el-radio>
                </el-radio-group>
            </div>
            <div class="left-center form-item">
                <label class="form-ladel">
                    <i class="color-DD122A-right5">*</i>LOGO
                </label>
                <div class="store-item-logo">
                    <el-upload
                        name="shop_cover"
                        class="avatar-uploader"
                        action="/file/upload"
                        :before-upload="uploadImg"
                        :show-file-list="false"
                    >
                        <div class="avatar-uploader-hover">
                            <i class="el-icon-plus avatar-uploader-icon"></i>
                        </div>
                        <img :src="logo || img" class="avatar" />
                    </el-upload>
                </div>
                <el-upload
                    class="avatar-uploader"
                    action="/file/upload"
                    :before-upload="uploadImg"
                    :show-file-list="false"
                >
                    <a title="建议图片尺寸为80*80" style="margin-left: 30px; color: #409eff;">修改</a>
                </el-upload>
            </div>
            <div class="left-center form-item">
                <label class="form-ladel">
                    <i class="color-DD122A-right5"></i>负责人
                </label>
                <div class="form-person">
                    <div class="form-person-l">
                        <div class="form-person-img">
                            <img :src="userInfo.head_img || img" />
                        </div>
                        <span
                            class="form-person-name ellipsis"
                        >{{ userInfo.nickname == '' ? '未绑定' : userInfo.nickname }}</span>
                    </div>
                    <span class="form-person-btn" @click="leaderBinding">绑定</span>
                </div>
            </div>
            <div class="left-center form-item">
                <label class="form-ladel">
                    <i class="color-DD122A-right5"></i>渠道分红
                </label>
                <el-input
                    placeholder="请输入"
                    v-model="dividend"
                    style="width: 340px;"
                    :disabled="true"
                >
                    <template slot="append">%</template>
                </el-input>
            </div>
            <div class="left-center form-item footer-btn">
                <el-button type="primary" @click="onSubmit">&nbsp;&nbsp;&nbsp; 保存 &nbsp;&nbsp;&nbsp;</el-button>
                <el-button @click="$router.go(-1)">返回列表</el-button>
            </div>
        </div>

        <el-dialog :visible.sync="qrcodeVisible" width="300px" :center="true">
            <div style="margin-bottom: 15px; text-align: center;">
                <p>微信扫码绑定</p>
                <p>
                    <span style="color: #ccc; font-size: 12px;">{{ countDown }}s 后自动关闭</span>
                </p>
            </div>
            <vue-qr
                :text="httpString + 'www.' + globalUrlBase + '/app-h5/index.html#/pages/channelAuth/home?shop_id=' + shop_id"
                :margin="0"
                :size="150"
                :auto-color="true"
                :dot-scale="1"
                style="display: block; margin: 0 auto;"
            ></vue-qr>
        </el-dialog>
    </div>
</template>
<script>
// api接口
import {
    PostImg,
    getMakeShopChannel,
    getShopPrincipal,
    globalUrlBase,
    httpString
} from "@/api/api";
// 生成二维码
import vueQr from "vue-qr";
export default {
    components: { vueQr },
    data() {
        return {
            img: require("@/assets/bgUser.jpg"),
            globalUrlBase: globalUrlBase,
            httpString: httpString,
            logo: "", // 上传logo
            name: "", // 渠道名称
            type: 0, // 渠道类型
            dividend: 0, // 分红比列
            countDown: 60, // 倒计时
            userInfo: {
                nickname: "",
                head_img: ""
            }, // 用头像昵称
            qrcodeVisible: false, // 弹窗显示隐藏
            qrcode: "", // 二维码
            shop_id: localStorage.getItem("shop_id"), // 店铺id
            timer: null, // 定时器
            channeList: [], // 渠道列表
        };
    },
    created() {
    },
    methods: {
        // 上传图片
        uploadImg(file) {
            let param = new FormData();
            param.append("file", file);
            let config = {
                headers: { "Content-Type": "multipart/form-data" }
            };
            this.$http.post(PostImg, param, config).then(res => {
                if (res.data.status === 0) {
                    this.logo = res.data.data.url;
                }
            });
        },
        // 负责人绑定
        leaderBinding() {
            this.qrcodeVisible = true;
            this.queryLeader();
        },
        // 查询负责人
        queryLeader() {
            window.clearInterval(this.timer);
            this.timer = setInterval(() => {
                this.countDown--;
                if (this.countDown < 1) {
                    this.countDown = 60;
                    this.qrcodeVisible = false;
                    // window.clearInterval(this.timer);
                    return;
                }
                let params = {
                    token: localStorage.getItem("token"),
                    shop_id: localStorage.getItem("shop_id")
                };
                this.$http.get(getShopPrincipal, { params }).then(res => {
                    if (res.data.status == 0) {
                        // 关闭二维码弹窗 写入数据
                        this.userInfo = res.data.data;
                        // this.qrcodeVisible = false;
                        // window.clearInterval(this.timer);
                    }
                });
            }, 1000);
        },
        // 提交
        onSubmit() {
            if (this.name == "") {
                return this.$message({
                    message: "渠道名称不能为空",
                    type: "warning"
                });
            }
            if (this.logo == "") {
                return this.$message({
                    message: "请上传logo",
                    type: "warning"
                });
            }
            if (this.userInfo.nickname == "") {
                return this.$message({
                    message: "请绑定负责人",
                    type: "warning"
                });
            }
            if (this.dividend < 0 || this.dividend > 100) {
                return this.$message({
                    message: "请设置正确的渠道分红",
                    type: "warning"
                });
            }
            let params = {
                token: localStorage.getItem("token"),
                shop_id: localStorage.getItem("shop_id"),
                name: this.name,
                type: this.type,
                logo: this.logo,
                principal: this.userInfo.user_id,
                dividend: this.dividend,
                headers: { "content-type": "application/x-www-form-urlencoded" }
            };

            this.$http
                .post(getMakeShopChannel, this.$qs.stringify(params))
                .then(res => {
                    if (res.data.status == 0) {
                        // this.$router.push({ path: '/teamPromote' })
                        this.$router.go(-1);
                    } else {
                        this.$message.error(res.data.message);
                    }
                });
        }
    },
    beforeDestroy: function() {
        window.clearInterval(this.timer);
    }
};
</script>
<style lang="scss" scoped>
.store-item-logo {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    position: relative;
    overflow: hidden;
    background-color: #f5f5f5;
    .avatar-uploader-hover {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0);
        opacity: 0;
        i {
            color: #fff;
            font-size: 22px;
            line-height: 60px;
            text-align: center;
        }
    }
    .avatar-uploader:hover {
        .avatar-uploader-hover {
            opacity: 1;
            background-color: rgba(0, 0, 0, 0.5);
            transition: all 0.3s;
        }
    }
    img {
        width: 100%;
        height: 100%;
    }
}

.form-person {
    width: 260px;
    height: 45px;
    background-color: #f2f2f2;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    font-size: 12px;
    .form-person-l {
        display: flex;
        align-items: center;
    }
    .form-person-img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .form-person-name {
        margin: 0 10px;
        max-width: 160px;
    }
    .form-person-btn {
        color: #409eff;
        cursor: pointer;
    }
}
.footer-btn {
    display: flex;
    justify-content: center;
}

.createChannel-form {
    margin-top: 150px;
    .form-ladel {
        width: 100px;
        text-align: left;
        font-size: 16px;
    }
    .store-item-input {
        width: 340px !important;
    }
    .form-item {
        margin-bottom: 40px;
    }
}

//  flex布局
.color-DD122A-right5 {
    color: #dd122a;
    margin-right: 5px;
}
.column-between {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -webkit-flex-direction: column;
    justify-content: space-between;
    -webkit-justify-content: space-between;
}
.column-around {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -webkit-flex-direction: column;
    justify-content: space-around;
    -webkit-justify-content: space-around;
}
.between {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    -webkit-justify-content: space-between;
}
.column-center-b {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -webkit-flex-direction: column;
    justify-content: space-between;
    -webkit-justify-content: space-between;
    align-items: center;
    -webkit-align-items: center;
}
.column-center-c {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -webkit-flex-direction: column;
    justify-content: space-around;
    -webkit-justify-content: space-around;
    align-items: center;
    -webkit-align-items: center;
}
.around-center {
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    align-items: center;
    -webkit-justify-content: space-around;
    -webkit-align-items: center;
}
.left-center {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
}
.between-center {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    align-items: center;
    -webkit-justify-content: space-between;
    -webkit-align-items: center;
}
.center {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
}
.center-end {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    justify-content: flex-end;
    -webkit-justify-content: flex-end;
}
.flex_1 {
    flex: 1;
    -webkit-flex: 1;
    display: block;
    min-width: 0;
}
.only_line {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
</style>