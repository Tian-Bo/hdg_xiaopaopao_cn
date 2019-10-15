<template>
    <div class="aut-submission">


        <h3 class="submi-name">
            店铺名称 :
            <span>{{ resData.shop_name }}</span>
        </h3>
        <div class="submi-title">
            认证类型
            <span>请填写认证信息并上传认证材料后提交申请，1个工作日内完成审核。</span>
        </div>


        <div class="submi-screen">
            <div class="submi-screen-item">
                <el-button 
                    :type="data.auth_type == 2 ? 'primary' : ''" 
                    @click="data.auth_type = 2">
                    企业认证
                </el-button>
                <el-button 
                    :type="data.auth_type == 3 ? 'primary' : ''" 
                    @click="data.auth_type = 3">
                    其他机构认证
                </el-button>
            </div>
            <div class="submi-screen-item">
                <el-button plain disabled>行业类目</el-button>
                <el-select v-model="data.business" placeholder="请选择" name="business">
                    <el-option 
                        v-for="item in Industry" 
                        :key="item.name" 
                        :label="item.name" 
                        :value="item.name">
                    </el-option>
                </el-select>
            </div>
        </div>


        <div class="submi-title">主体信息</div>
        <div class="submi-tab">
            <i class="hint-submi">*</i>营业执照：
            <span>仅支持JPG、JPEG和PNG格式，大小不超过1M，文字清晰可辩。</span>
        </div>
        <div class="submi-license">
            <div class="submi-license-upload">
                <el-upload
                    name="other_img"
                    class="avatar-uploader"
                    action="/file/upload"
                    :before-upload="uploadOtherImg"
                    :show-file-list="false"
                >
                    <div class="avatar-uploader-hover">
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </div>
                    <img :src="data.other_img || otherImg" class="avatar" />
                    <i v-if="false" class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
            <div class="submi-license-preview">
                <img src="@/assets/14.png" />
            </div>
        </div>


        <div class="submi-tab">
            <i class="hint-submi">*</i>身份证正反面：<span>支持.jpg .jpeg .bmp .gif .png格式照片，大小不超过1M</span>
        </div>
        <div class="submi-id-card">
            <div class="submi-id-card-item">
                <el-upload
                    name="id_just_img"
                    class="avatar-uploader"
                    action="/file/upload"
                    :before-upload="uploadIdJustImg"
                    :show-file-list="false"
                >
                    <div class="avatar-uploader-hover">
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </div>
                    <img :src="data.id_just_img || idJustImg" class="avatar" />
                    <i v-if="false" class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
            <div class="submi-id-card-item">
                <el-upload
                    class="avatar-uploader"
                    action="/file/upload"
                    name="id_back_img"
                    :before-upload="uploadIdBackImg"
                    :show-file-list="false"
                >
                    <div class="avatar-uploader-hover">
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </div>
                    <img :src="data.id_back_img || idBackImg" class="avatar" />
                    <i v-if="false" class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
        </div>


        <div class="submi-tab" style="margin-top: 50px;">
            授权公函：
            <span>若无法提供法人身份证时，需上传授权公函加盖公章的原件照片或扫描件，支持.jpg .jpeg .bmp .gif .png格式照片，大小不超过5M。</span>
            <a :href="resData.official_letter">下载公函模版。</a>
        </div>
        <div class="submi-letter">
            <el-upload
                name="official_letter"
                class="avatar-uploader"
                action="/file/upload"
                :before-upload="uploadOfficialLetter"
                :show-file-list="false"
            >
                <div class="avatar-uploader-hover">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                </div>
                <img :src="data.official_letter || otherImg" class="avatar" />
                <i v-if="false" class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>


        <div class="submi-tab" style="margin-top: 50px;">
            行业资质：
            <span>{{ data.business }}需提供《{{ data.business }}机构执业许可证》、《{{ data.business }}广告审查证明》须为彩色图片且小于5M，文件格式为bmp、png、jpeg、jpg或gif。</span>
        </div>
        <div class="submi-qualifications">
            <div class="submi-quali-item">
                <el-upload
                    name="business_cert_licence"
                    class="avatar-uploader"
                    action="/file/upload"
                    :before-upload="uploadBusinessCertLicence"
                    :show-file-list="false"
                >
                    <div class="avatar-uploader-hover">
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </div>
                    <img :src="data.business_cert_licence || otherImg" class="avatar" />
                    <i v-if="false" class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
            <div class="submi-quali-item">
                <el-upload
                    class="avatar-uploader"
                    action="/file/upload"
                    name="business_cert_examine"
                    :before-upload="uploadBusinessCertExamine"
                    :show-file-list="false"
                >
                    <div class="avatar-uploader-hover">
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </div>
                    <img :src="data.business_cert_examine || otherImg" class="avatar" />
                    <i v-if="false" class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
        </div>


        <div class="submi-input">
            <div class="submi-input-item">
                <label for>主体名称：</label>
                <div>
                    <el-input placeholder="营业执照公司全称" name="enterprise_name" v-model="data.enterprise_name"></el-input>
                </div>
            </div>
            <div class="submi-input-item">
                <label>营业执照注册号：</label>
                <div>
                    <el-input placeholder="统一社会信用代码" name="credit_code" v-model="data.credit_code"></el-input>
                </div>
            </div>
            <div class="submi-input-item">
                <label>营业执照注册地址：</label>
                <div>
                    <el-input placeholder="和营业执照上一致" name="enterprise_addr" v-model="data.enterprise_addr"></el-input>
                </div>
            </div>
            <div class="submi-input-item">
                <label>法人姓名：</label>
                <div>
                    <el-input placeholder="请输入法人姓名" name="username" v-model="data.username"></el-input>
                </div>
            </div>
            <div class="submi-input-item">
                <label>法人身份证号：</label>
                <div>
                    <el-input placeholder="法人身份证号" name="id_number" v-model="data.id_number" maxlength='18'></el-input>
                </div>
            </div>
        </div>


        <div class="footer-btn">
            <el-button type="primary" plain @click="jumpLast">返回店铺</el-button>
            <el-button type="primary" @click="clickAuthInfo">提交认证信息</el-button>
        </div>

    </div>
</template>

<script>
import { PostImg, sendCms, verifyCms, shopAuthSave, ocrInfo } from "@/api/api";
export default {
    props: ['data', 'Industry', 'resData', 'user'],
    data() {
        return {
            letterName: '111',                         // 法人姓名
            name: '222',                              // 身份证姓名
            otherImg: require("@/assets/15.png"),  // 默认营业执照背景图
            idJustImg: require("@/assets/18.png"), // 默认身份证正面背景图
            idBackImg: require("@/assets/19.png"), // 默认身份证反面背景图
        }
    },
    created() {
        this.distinguish()
    },
    methods: {
        distinguish() {
            if (this.data.other_img == '' || this.data.id_just_img == '') {
                return
            }
            
            let Imgurl = { 
                url: 'https:' + this.data.other_img,
                type: 1
            }
            this.getOcrInfo(Imgurl, 1)
            let url = { 
                url: 'https:' + this.data.id_just_img,
                type: 2 
            }
            this.getOcrInfo(url, 2)
        },
        // 营业执照图像识别 
        getOcrInfo(url, type) {
            let params = url
            this.$http.get(ocrInfo, {params}).then(res => {
                if (type == 1) {
                    if (res.data.status === 0) {
                        res.data.data.data.items.forEach((item, index) => {
                            if (item.itemconf > 0.9) {
                                if (item.item == '注册号') {
                                    this.data.credit_code = item.itemstring
                                }
                                if (item.item == '法定代表人') {
                                    this.letterName = item.itemstring
                                    this.data.username = item.itemstring
                                }
                                if (item.item == '公司名称') {
                                    this.data.enterprise_name = item.itemstring
                                }
                                if (item.item == '地址') {
                                    this.data.enterprise_addr = item.itemstring
                                }
                            } 
                        })
                    }
                }
                if (type == 2) {
                    if (res.data.status === 0) {
                        this.data.id_number = res.data.data.result_list[0].data.id
                        this.name = res.data.data.result_list[0].data.name
                    }
                }

            })
        },

        // 上传图片
        uploadOtherImg(file) {
            let param = new FormData();
            param.append("file", file);
            let config = {
                headers: { "Content-Type": "multipart/form-data" }
            };
            
            this.$http.post(PostImg, param, config)
            .then(res => {
                this.data.other_img = res.data.data.url;
                let Imgurl = { 
                    url: 'https:' + res.data.data.url,
                    type: 1
                }
                this.getOcrInfo(Imgurl, 1)
            })
            .catch(err => {
                this.$message.error(err);
            });
        },
        // 上传图片
        uploadIdJustImg(file) {
            let param = new FormData();
            param.append("file", file);
            let config = {
                headers: { "Content-Type": "multipart/form-data" }
            };
            
            this.$http.post(PostImg, param, config)
            .then(res => {
                this.data.id_just_img = res.data.data.url;
                let url = { 
                    url: 'https:' + res.data.data.url,
                    type: 2 
                }
                this.getOcrInfo(url, 2)
            })
            .catch(err => {
                this.$message.error(err);
            });
        },
        // 上传图片
        uploadIdBackImg(file) {
            let param = new FormData();
            param.append("file", file);
            let config = {
                headers: { "Content-Type": "multipart/form-data" }
            };
            
            this.$http.post(PostImg, param, config)
            .then(res => {
                this.data.id_back_img = res.data.data.url;
            })
            .catch(err => {
                this.$message.error(err);
            });
        },
        // 上传图片
        uploadOfficialLetter(file) {
            let param = new FormData();
            param.append("file", file);
            let config = {
                headers: { "Content-Type": "multipart/form-data" }
            };
            
            this.$http.post(PostImg, param, config)
            .then(res => {
                this.data.official_letter = res.data.data.url;
            })
            .catch(err => {
                this.$message.error(err);
            });
        },
        // 上传图片
        uploadBusinessCertLicence(file) {
            let param = new FormData();
            param.append("file", file);
            let config = {
                headers: { "Content-Type": "multipart/form-data" }
            };
            
            this.$http.post(PostImg, param, config)
            .then(res => {
                this.data.business_cert_licence = res.data.data.url;
            })
            .catch(err => {
                this.$message.error(err);
            });
        },
        // 上传图片
        uploadBusinessCertExamine(file) {
            let param = new FormData();
            param.append("file", file);
            let config = {
                headers: { "Content-Type": "multipart/form-data" }
            };
            
            this.$http.post(PostImg, param, config)
            .then(res => {
                this.data.business_cert_examine = res.data.data.url;
            })
            .catch(err => {
                this.$message.error(err);
            });
        },


        // 提交认证信息
        async clickAuthInfo() {
            if (this.data.business == '') {
                this.$message({ message: '请选择行业类目', type: 'warning' })  
                return
            }
            if (this.data.other_img == '') {
                this.$message({ message: '请上传营业执照', type: 'warning' })  
                return
            }
            if (this.data.id_just_img == '' || this.data.id_back_img == '') {
                this.$message({ message: '请上传身份证', type: 'warning' })  
                return
            }
            if (this.name != this.letterName) {
                if (this.data.official_letter == '') {
                    this.$message({ message: '请上传授权公函', type: 'warning' })  
                    return
                }
            }
            if (this.data.business == '医疗整形' || this.data.business == '餐饮美食' || this.data.business == '休闲娱乐' || this.data.business == '教育培训') {
                if (this.data.business_cert_licence == '') {
                    this.$message({ message: '请上传行业资质许可证', type: 'warning' })  
                    return
                }
                if (this.data.business_cert_examine == '') {
                    this.$message({ message: '请上传广告审查证明', type: 'warning' })  
                    return
                }
            }

            if (this.data.enterprise_name == '') {
                this.$message({ message: '主体名称不能为空', type: 'warning' })  
                return
            }
            if (this.data.credit_code == '') {
                this.$message({ message: '营业执照注册号不能为空', type: 'warning' })  
                return
            }
            if (this.data.enterprise_addr == '') {
                this.$message({ message: '营业执照注册地址不能为空', type: 'warning' })  
                return
            }
            if (this.data.username == '') {
                this.$message({ message: '法人姓名不能为空', type: 'warning' })  
                return
            }
            if (this.data.id_number == '' || this.data.id_number.length != 18) {
                this.$message({ message: '请输入正确的身份证号', type: 'warning' })  
                return
            }


            let params = {  
                token: localStorage.getItem('token'),
                shop_id: localStorage.getItem('shop_id'),
                id: this.data.id,
                mobile: this.$route.query.mobile,
                auth_type: this.data.auth_type,
                business: this.data.business,
                other_img: this.data.other_img,
                id_just_img: this.data.id_just_img,
                id_back_img: this.data.id_back_img,
                official_letter: this.data.official_letter,
                business_cert_licence: this.data.business_cert_licence,
                business_cert_examine: this.data.business_cert_examine,
                enterprise_name: this.data.enterprise_name,
                credit_code: this.data.credit_code,
                enterprise_addr: this.data.enterprise_addr,
                username: this.data.username,
                id_number: this.data.id_number,
            }
            
            shopAuthSave( params ).then(res => {
                if (res.data.status === 0) {
                    this.$message({ message: res.data.message, type: 'success' })
                    this.$emit('getState', 2)
                    let mobile = this.$route.query.mobile
                    this.$router.push({ query: { state: 2, mobile: mobile } })
                    return   
                }
                this.$message({ message: res.data.message, type: 'warning' })
            })
        },
        // 返回店铺
        jumpLast(){
            this.$router.push({ path:"/setting" })
        },
    }
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
    .submi-license-upload:hover{
        border-color: #409eff;
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
        border: 1px solid #ddd;
        border-radius: 5px;
        overflow: hidden;
        img{
            width: 100%;
            height: 100%;
            display: block;
        }
    }
    img {
        width: $widthImg1;
        height: $heightImg1;
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
                line-height: $heightImg2;
                text-align: center;
            }
        }
    }
    .submi-id-card-item:hover{
        border-color: #409eff;
        .avatar-uploader-hover{
            opacity: 1;
            background-color: rgba(0, 0, 0, 0.5);
            transition: all 0.3s;
        }
    }
    img {
        width: $widthImg2;
        height: $heightImg2;
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
    border-radius: 6px;
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
        width: $widthImg3;
        height: $heightImg3;
    }
}
.submi-letter:hover{
    border-color: #409eff;
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
        border-radius: 6px;
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
            width: $widthImg3;
            height: $heightImg3;
        }
    }
    .submi-quali-item:hover{
        border-color: #409eff;
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
.hint-submi{
    color: #f20;
}
</style>
