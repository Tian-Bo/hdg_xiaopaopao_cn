<template>
<div class="set-follow">
    <div class="set-follow-item">
        <span>引导关注公众号</span>
        <div class="follow-item-img">
            <el-upload
                class="avatar-uploader"
                action="/file/upload"
                :before-upload="uploadLoad"
                name="load"
                :show-file-list="false">
                <div class="avatar-uploader-hover">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                </div>
                <img :src="data.load || defaultImg" class="avatar" />
                <i v-if="false" class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>
        <el-upload
            class="avatar-uploader"
            action="/file/upload"
            :before-upload="uploadLoad"
            :show-file-list="false">
            <a>修改</a>
        </el-upload>
    </div>
    <div class="set-follow-item">
        <span>支付后引导关注</span>
        <div class="follow-item-img">
            <el-upload
                class="avatar-uploader"
                action="/file/upload"
                :before-upload="uploadPay"
                name="pay"
                :show-file-list="false">
                <div class="avatar-uploader-hover">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                </div>
                <img :src="data.pay || defaultImg" class="avatar" />
                <i v-if="false" class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>
        <el-upload
            class="avatar-uploader"
            action="/file/upload"
            :before-upload="uploadPay"
            :show-file-list="false">
            <a>修改</a>
        </el-upload>
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
            defaultImg: require('@/assets/bgUser.jpg'),
        }
    },
    methods: {
        // 上传图片-引导关注公众号
        uploadLoad(file) {
            let param = new FormData();
            param.append("file", file);
            let config = {
                headers: { "Content-Type": "multipart/form-data" }
            };
            
            this.$http.post(PostImg, param, config)
            .then(res => {
                this.data.load = res.data.data.url;
                this.params = {
                    shop_id: localStorage.getItem('shop_id'),
                    token: localStorage.getItem('token'),
                    load: this.data.load
                }
                this.editShopMsg()
            })
            .catch(err => {
                this.$message.error(err);
            });
        },

        // 上传图片-支付后引导关注
        uploadPay(file) {
            let param = new FormData();
            param.append("file", file);
            let config = {
                headers: { "Content-Type": "multipart/form-data" }
            };
            
            this.$http.post(PostImg, param, config)
            .then(res => {
                this.data.pay = res.data.data.url;
                this.params = {
                    shop_id: localStorage.getItem('shop_id'),
                    token: localStorage.getItem('token'),
                    pay: this.data.pay
                }
                this.editShopMsg()
            })
            .catch(err => {
                this.$message.error(err);
            });
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
$widthHead: 60px;

.set-follow{
    padding: 0px 20px;
}
.set-follow-item{
    display: flex;
    align-items: center;
    padding: 15px 0px;
    .follow-item-img{
        width: $widthHead;
        height: $widthHead;
        background-color: #eee;
        margin: 0 20px;
        border-radius: 2px;
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
                line-height: $widthHead;
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
            width: 100%;
            height: 100%;
            display: block;
        }
    }
    a{
        color: #409eff;
    }
}
.set-preservation{
    margin-top: 30px;
}

// 内置样式
// .avatar-uploader .el-upload {
//     border: 0px;
// }
</style>