<template>
<div class="set-brand-iamge">


    <div class="brand-iamge-item">
        <label>主页分享语</label>
        <el-input v-model="data.share_title" class="active store-item-input" :disabled="state" name="share_title"></el-input>
        <a @click="clickEdit">{{ state ? '修改' : '保存'}}</a>
    </div>


    <div class="brand-iamge-item">
        <label>页脚LOGO</label>
        <div class="brand-iamge-logo-img">
            <el-upload
                class="avatar-uploader"
                action="/file/upload"
                name="footer_logo"
                :before-upload="uploadImg"
                :show-file-list="false">
                <div class="avatar-uploader-hover">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                </div>
                <img :src="data.footer_logo || defaultImg" class="avatar" />
                <i v-if="false" class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>
        <span>付费版支持修改页脚LOGO</span>
        <el-upload
            class="avatar-uploader"
            action="/file/upload"
            :before-upload="uploadImg"
            :show-file-list="false">
            <a>修改</a>
        </el-upload>
        <!-- <a href="/merchant/home/pay">去付费</a> -->
        <router-link tag="a" to="provisioning">去付费</router-link>
    </div>


    <div class="brand-iamge-item">
        <label>隐藏技术支持</label>
        <div>
            <el-switch
                v-model="data.is_hidden_logo"
                active-color="#ccc"
                :active-value="0"
                :inactive-value="1"
                name="is_hidden_logo"
                @change="changeIsHidden"
                inactive-color="#409EFF">
            </el-switch>
            <span>高级版、旗舰版支持隐藏页脚LOGO</span>
            <!-- <a href="/merchant/home/pay">升级版本</a> -->
            <router-link tag="a" to="provisioning">升级版本</router-link>
        </div>
    </div>

</div>
</template>
<script>
// api接口
import { PostImg, shopSave } from "@/api/api"

export default {
    props: ['data'],
    data() {
        return {
            value: 1,                                       // 隐藏按钮的默认状态
            defaultImg: require('@/assets/logo.png'),       // 默认图片
            state: true,                                    // 主页分享语, 修改按钮的状态
            params: ''                                      // 一键保存
        }
    },
    methods: {
        // 修改主页分享语
        clickEdit() {
            if (!this.state) {
                this.params = {
                    shop_id: localStorage.getItem('shop_id'),
                    token: localStorage.getItem('token'),
                    share_title: this.data.share_title
                }
                this.editShopMsg()
            }
            this.state = !this.state
        },
        // 上传图片
        uploadImg(file) {
            let param = new FormData();
            param.append("file", file);
            let config = {
                headers: { "Content-Type": "multipart/form-data" }
            };
            this.$http.post(PostImg, param, config)
            .then(res => {
                this.data.footer_logo = res.data.data.url;
                this.params = {
                    shop_id: localStorage.getItem('shop_id'),
                    token: localStorage.getItem('token'),
                    footer_logo: this.data.footer_logo
                }
                this.editShopMsg()
            })
            .catch(err => {
                this.$message.error(err);
            });
        },


        // 底部logo显示隐藏
        changeIsHidden(index) {
            this.params = {
                shop_id: localStorage.getItem('shop_id'),
                token: localStorage.getItem('token'),
                is_hidden_logo: this.data.is_hidden_logo
            }
            this.editShopMsg()
        },


        // post发送ajax修改店铺信息
        editShopMsg() {
            let params = this.params
            shopSave(params).then(res => {
                if (res.data.status === 0) {
                    this.$message({ message: '保存成功', type: 'success' }) 
                }
            })
        }
    },
}
</script>
<style scoped lang="scss">
$width: 60px;
$height: 30px;
// common
.store-item-input{
    width: 360px;
}

// content
.set-brand-iamge{
    padding: 0px 20px;
}
.brand-iamge-item{
    display: flex;
    align-items: center;
    padding: 15px 0;
    label{
        width: 120px;
    }
    a{
        color: #409eff;
        margin-left: 15px;
    }
    .brand-iamge-logo-img{
        width: $width;
        height: $height;
        border-radius: 2px;
        background-color: #eee;
        margin-right: 15px;
        position: relative;
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
                font-size: 22px;
                line-height: $height;
                text-align: center;
            }
        }
        .avatar-uploader:hover{
            .avatar-uploader-hover{
                opacity: 1;
                background-color: rgba(0, 0, 0, 0.5);
                transition: all 0.3s;
            }
        }
        img{
            width: $width;
            height: $height;
        }
    }
}
.set-preservatio{
    margin-top: 30px;
}
</style>