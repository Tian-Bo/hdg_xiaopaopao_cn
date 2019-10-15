<template>
    <div class="aut-submission">


        <h3 class="submi-name">
            店铺名称 :<span name="shop_name">{{ resData.shop_name }}</span>
        </h3>
        <div class="submi-title">
            认证类型<span>请填写认证信息并上传认证材料后提交申请，1个工作日内完成审核。</span>
        </div>


        <div class="submi-screen">
            <div class="submi-screen-item">
                <el-button v-if="data.auth_type == 2" type="primary" :disabled="true">企业认证</el-button>
                <el-button v-if="data.auth_type == 3" type="primary" :disabled="true">其他机构认证</el-button>
            </div>
            <div class="submi-screen-item">
                <el-button plain disabled>行业类目</el-button>
                <el-select :value="data.business" :disabled="true" name="business"></el-select>
            </div>
        </div>


        <div class="submi-title">主体信息</div>
        <div class="submi-tab">
            营业执照：<span>仅支持JPG、JPEG和PNG格式，大小不超过1M，文字清晰可辩。</span>
        </div>
        <div class="submi-license">
            <div class="submi-license-upload" @click="clickPreview(data.other_img)">
                <div class="avatar-uploader-hover">
                    <i class="el-icon-zoom-in"></i>
                </div>
                <img :src="data.other_img" class="avatar" name="other_img" />
            </div>
            <div class="submi-license-preview">
                <img src="@/assets/14.png" />
            </div>
        </div>


        <div class="submi-tab">
            身份证正反面：<span>支持.jpg .jpeg .bmp .gif .png格式照片，大小不超过1M</span>
        </div>
        <div class="submi-id-card">
            <div class="submi-id-card-item" @click="clickPreview(data.id_just_img)">
                <div class="avatar-uploader-hover">
                    <i class="el-icon-zoom-in"></i>
                </div>
                <img :src="data.id_just_img" name="id_just_img" class="avatar" />
            </div>
            <div class="submi-id-card-item" @click="clickPreview(data.id_back_img)">
                <div class="avatar-uploader-hover">
                    <i class="el-icon-zoom-in"></i>
                </div>
                <img :src="data.id_back_img" name="id_back_img" class="avatar" />
            </div>
        </div>


        <div class="submi-tab" style="margin-top: 50px;">
            授权公函：<span>若无法提供法人身份证时，需上传授权公函加盖公章的原件照片或扫描件，支持.jpg .jpeg .bmp .gif .png格式照片，大小不超过5M。</span>
            <a :href="resData.official_letter">下载公函模版。</a>
        </div>
        <div class="submi-letter" @click="clickPreview(data.official_letter)">
            <div class="avatar-uploader-hover">
                <i class="el-icon-zoom-in"></i>
            </div>
            <img :src="data.official_letter" name="official_letter" class="avatar" />
        </div>


        <div class="submi-tab" style="margin-top: 50px;">
            行业资质：<span>医疗整形需提供《医疗机构执业许可证》、《医疗广告审查证明》须为彩色图片且小于5M，文件格式为bmp、png、jpeg、jpg或gif。</span>
        </div>
        <div class="submi-qualifications">
            <div class="submi-quali-item" @click="clickPreview(data.business_cert_licence)">
                <div class="avatar-uploader-hover">
                    <i class="el-icon-zoom-in"></i>
                </div>
                <img :src="data.business_cert_licence" name="business_cert_licence" class="avatar" />
            </div>
            <div class="submi-quali-item" @click="clickPreview(data.business_cert_examine)">
                <div class="avatar-uploader-hover">
                    <i class="el-icon-zoom-in"></i>
                </div>
                <img :src="data.business_cert_examine" name="business_cert_examine" class="avatar" />
            </div>
        </div>


        <div class="submi-input">
            <div class="submi-input-item">
                <label>主体名称：</label>
                <div>
                    <el-input :value="data.enterprise_name" name="enterprise_name" :disabled="true"></el-input>
                </div>
            </div>
            <div class="submi-input-item">
                <label>营业执照注册号：</label>
                <div>
                    <el-input :value="data.credit_code" name="credit_code" :disabled="true"></el-input>
                </div>
            </div>
            <div class="submi-input-item">
                <label>营业执照注册地址：</label>
                <div>
                    <el-input :value="data.enterprise_addr" name="enterprise_addr" :disabled="true"></el-input>
                </div>
            </div>
            <div class="submi-input-item">
                <label>法人姓名：</label>
                <div>
                    <el-input :value="data.username" name="username" :disabled="true"></el-input>
                </div>
            </div>
            <div class="submi-input-item">
                <label>法人身份证号：</label>
                <div>
                    <el-input :value="data.id_number" name="id_number" :disabled="true"></el-input>
                </div>
            </div>
        </div>
        

        <div class="footer-btn">
            <el-button type="primary" plain @click="jumpLast">返回店铺</el-button>
            <el-button type="primary" @click="againAuthInfo">重新认证</el-button>
        </div>


        <!-- 预览 -->
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>

    </div>
</template>

<script>
export default {
    props: ['data', 'resData'],
    data() {
        return {
            dialogImageUrl: '',     // 预览图片
            dialogVisible: false    // 预览弹窗
        }
    },
    methods: {
        // 预览
        clickPreview(file) {
            this.dialogImageUrl = file
            this.dialogVisible = true
        },
        // 返回店铺
        jumpLast(){
            this.$router.push({ path:"/setting" })
        },
        // 重新认证
        againAuthInfo() {
            this.$emit('getState', 0)
            let mobile = this.$route.query.mobile
            this.$router.push({ query: { state: 0, mobile: mobile } })
        }
    },
};
</script>

<style lang="scss" scoped>
$widthImg1: 370px;
$heightImg1: 200px;
$widthImg2: 278px;
$heightImg2: 150px;
$widthImg3: 135px;
$heightImg3: 170px;
$fontSize: 36px;

.aut-submission {
    background-color: #fff;
    padding: 70px;
}
.submi-name {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-bottom: 36px;
}
.submi-screen {
    margin-top: 30px;
    margin-bottom: 100px;
    display: flex;
    .submi-screen-item {
        margin-right: 60px;
        .el-button {
            float: left;
        }
    }
}
.submi-title {
    border-left: 5px solid #409eff;
    padding-left: 3px;
    font-size: 16px;
    color: #333;
    span {
        font-size: 14px;
        color: #9f9f9f;
        margin-left: 15px;
    }
}
.submi-tab {
    color: #333;
    margin-top: 30px;
    span {
        color: #9f9f9f;
        margin-left: 20px;
    }
    a {
        color: #409eff;
    }
}

// 营业执照
.submi-license {
    margin-top: 15px;
    margin-bottom: 100px;
    padding-left: 90px;
    display: flex;
    .submi-license-upload {
        width: $widthImg1;
        height: $heightImg1;
        position: relative;
        border-radius: 6px;
        overflow: hidden;
        text-align: center;
        cursor: pointer;
        border: 1px dashed #d9d9d9;
        .avatar-uploader-hover{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0);
            opacity: 0;
            i{
                color: #fff;
                font-size: $fontSize;
                line-height: $heightImg1;
                text-align: center;
            }
        }
    }
    .submi-license-upload:hover {
        .avatar-uploader-hover{
            opacity: 1;
            background-color: rgba(0, 0, 0, 0.5);
            transition: all 0.3s;
        }
    }
    .submi-license-preview {
        margin-left: 50px;
        width: 184px;
        height: 100px;
        border: 1px solid #eee;
        border-radius: 5px;
    }
    img {
        width: 100%;
        height: 100%;
    }
}

// 身份证
.submi-id-card {
    display: flex;
    margin-top: 30px;
    margin-bottom: 100px;
    padding-left: 90px;
    .submi-id-card-item {
        margin-right: 20px;
        width: $widthImg2;
        height: $heightImg2;
        position: relative;
        border-radius: 6px;
        text-align: center;
        overflow: hidden;
        cursor: pointer;
        border: 1px dashed #d9d9d9;
        .avatar-uploader-hover{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0);
            opacity: 0;
            i{
                color: #fff;
                font-size: $fontSize;
                line-height: $heightImg2;
                text-align: center;
            }
        }
    }
    .submi-id-card-item:hover{
        .avatar-uploader-hover{
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

// 授权公函
.submi-letter {
    margin-top: 15px;
    margin-left: 90px;
    margin-bottom: 100px;
    width: $widthImg3;
    height: $heightImg3;
    position: relative;
    text-align: center;
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
    border: 1px dashed #d9d9d9;
    .avatar-uploader-hover{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0);
        opacity: 0;
        i{
            color: #fff;
            font-size: $fontSize;
            line-height: $heightImg3;
            text-align: center;
        }
    }
    img{
        width: 100%;
        height: 100%;
    }
}
.submi-letter:hover{
    .avatar-uploader-hover{
        opacity: 1;
        background-color: rgba(0, 0, 0, 0.5);
        transition: all 0.3s;
    }
}

// 行业资质
.submi-qualifications {
    margin-top: 15px;
    padding-left: 90px;
    margin-bottom: 100px;
    display: flex;
    .submi-quali-item {
        margin-right: 30px;
        width: $widthImg3;
        height: $heightImg3;
        position: relative;
        text-align: center;
        border-radius: 6px;
        cursor: pointer;
        overflow: hidden;
        border: 1px dashed #d9d9d9;
        .avatar-uploader-hover{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0);
            opacity: 0;
            i{
                color: #fff;
                font-size: $fontSize;
                line-height: $heightImg3;
                text-align: center;
            }
        }
        img{
            width: 100%;
            height: 100%;
        }
    }
    .submi-quali-item:hover {
        .avatar-uploader-hover{
            opacity: 1;
            background-color: rgba(0, 0, 0, 0.5);
            transition: all 0.3s;
        }
    }
}

// input 框
.submi-input {
    margin-top: 50px;
    margin-bottom: 100px;
    .submi-input-item {
        margin-top: 15px;
        display: flex;
        align-items: center;
        label {
            width: 150px;
        }
        div {
            width: 420px;
        }
    }
}

// 验证管理员身份
.submi-verification-hint {
    margin: 30px 0;
}
.submi-get-Code {
    display: flex;
    align-items: center;
    label {
        width: 150px;
    }
    .el-input {
        width: 420px;
    }
}

// 底部按钮
.footer-btn {
    margin-top: 70px;
    text-align: center;
    .el-button {
        width: 150px;
        margin: 0 15px;
    }
}
</style>
