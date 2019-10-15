<template>
    <div class="set-store-information">


        <div class="store-item">
            <label>Logo</label>
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
                    <img :src="data.shop_cover || defaultImg" class="avatar" />
                    <i v-if="false" class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
            <el-upload
                class="avatar-uploader"
                action="/file/upload"
                :before-upload="uploadImg"
                :show-file-list="false"
            >
                <a title="建议图片尺寸为80*80">修改</a>
            </el-upload>
        </div>


        <div class="store-item">
            <label>阁名称</label>
            <el-input
                placeholder="请输入内容"
                v-model="data.shop_name"
                class="active store-item-input"
                :disabled="adminState[1].state"
                name="shop_name"
            ></el-input>
            <a @click="clickState(1, 'shop_name')">{{ adminState[1].value }}</a>
        </div>


        <div class="store-item">
            <label>主体认证</label>
            <el-input
                class="active store-item-input"
                name="shop_auth_status"
                :value="
                  data.shop_auth_status == 0 ? '未认证'
                : data.shop_auth_status == 1 ? '通过'
                : data.shop_auth_status == 2 ? '审核中'
                : data.shop_auth_status == 3 ? '被驳回' : ''"
                :disabled="true"
            ></el-input>
            <a v-if="data.shop_auth_status != 0" @click="jumpQuery(data.shop_auth_status)">查看认证</a>
            <a @click="jumpEdit(data.shop_auth_status)">{{ data.shop_auth_status == 0 ? '去认证' : '变更主体'}}</a>
        </div>


        <div class="store-item">
            <label>经营类目</label>
            <el-input
                placeholder="请重新提交认证信息"
                name="business"
                v-model="data.business"
                class="active store-item-input"
                :disabled="true"
            ></el-input>
            <a @click="jumpEdit(0)" v-if="data.business==''">去认证</a>
        </div>


        <div class="store-item">
            <label>负责人信息</label>
            <div class="color-666">姓名：</div>
            <el-input :value="data.principal" style="width: 130px" :disabled="true" name="principal"></el-input>
            <div class="store-item-tel color-666">手机：</div>
            <el-input :value="data.mobile" style="width: 130px" :disabled="true" name="mobile"></el-input>
            <a @click="dialogVisible = true">变更负责人</a>
        </div>


        <div class="store-item">
            <label>所在地区</label>
            <v-distpicker
                :province="data.province"
                :city="data.city"
                name="province,city,area"
                :area="data.area"
                @selected="onSelected"
                :disabled="adminState[5].state"
                :class="{ 'urban-choice': adminState[5].state }"
            ></v-distpicker>
            <a @click="clickState(5, 'province')">{{ adminState[5].value }}</a>
        </div>


        <div class="store-item">
            <label>简介</label>
            <el-input
                class="store-item-input"
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="data.desc"
                :disabled="adminState[6].state"
                name="desc"
            ></el-input>
            <a @click="clickState(6, 'desc')">{{ adminState[6].value }}</a>
        </div>


        <div class="store-item">
            <label>创建时间</label>
            <el-input :value="data.create_time" class="active store-item-input" :disabled="true" name="create_time"></el-input>
        </div>
        <div class="store-item">
            <label>到期时间</label>
            <el-input :value="data.end_time" class="active store-item-input" :disabled="true" name="end_time"></el-input>
            <!-- <a href="/merchant/home/pay">续费</a> -->
            <router-link tag="a" to="provisioning">续费</router-link>
        </div>


        <el-button type="primary" class="set-preservatio" @click="oneClickSave">一键保存</el-button>


        <el-dialog title="变更负责人" :visible.sync="dialogVisible" width="500px" center>
            <div class="edit-person-charge">更换负责人后, 原负责人将无法管理店铺</div>
            <div class="edit-item">
                <label>短信验证:</label>
                <el-input placeholder="请输入验证码" class="edit-item-input" name="code" v-model="usedCode" maxlength="4" :onkeyup="usedCode = usedCode.replace(/[^\.\d]/g,'')"></el-input>
                <el-button type="primary" class="edit-item-button" @click="clickCode(data.mobile, 1)">获取验证码</el-button>
            </div>
            <div class="edit-item-hint">验证短信将发送至: {{ data.mobile }}, 请注意查收</div>
            <div class="edit-item">
                <label>新负责人:</label>
                <el-input placeholder="请输入新负责人姓名" class="edit-item-input-tel" v-model="principal"></el-input>
            </div>
            <div class="edit-item">
                <label>新手机号:</label>
                <el-input placeholder="请输入手机号" name="mobile" class="edit-item-input-tel" v-model="newTel"  maxlength="11" :onkeyup="newTel = newTel.replace(/[^\.\d]/g,'')"></el-input>
            </div>
            <div class="edit-item" v-show="newTel!=data.mobile">
                <label>短信验证:</label>
                <el-input placeholder="请输入验证码" name="code" class="edit-item-input" v-model="newCode" maxlength="4" :onkeyup="newCode = newCode.replace(/[^\.\d]/g,'')"></el-input>
                <el-button type="primary" class="edit-item-button" @click="clickCode(newTel, 2)">获取验证码</el-button>
            </div>
            <div v-show="newTel!=data.mobile" class="edit-item-hint">验证短信将发送至: {{ newTel }}, 请注意查收</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editPersonCharge">保存</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
// 城市选择
import VDistpicker from "v-distpicker";
// api接口
import { PostImg, shopSave, sendCms, verifyCms } from "@/api/api"
// 工具js
import { checkTel } from "@/assets/js/unlis"

export default {
    components: { VDistpicker },
    props: ["data"],
    data() {
        return {
            stateNumber: 9,                             // 状态管理的项数
            adminState: [],                             // 状态管理
            defaultImg: require("@/assets/bgUser.jpg"), // 默认背景图
            dialogVisible: false,                       // 变更负责人弹窗显示隐藏
            popupState: true,                           // 变更负责人input框状态
            usedCode: '',                               // 旧验证码
            newCode: '',                                // 新验证码
            usedTel: '',                                // 旧负责人手机号
            newTel: '',                                 // 新负责人手机号
            principal: '',                              // 新负责人
            params: '',                                 // 每次修改的新数据
            stateCode: true,                            // 旧
            stateconfig: true                           // 新
        };
    },
    created() {
        for(var i=0; i<this.stateNumber; i++) {
            this.adminState.push({ 'state': true, 'value': '修改' })
        }
    },
    methods: {
        // 上传图片
        uploadImg(file) {
            let param = new FormData();
            param.append("file", file);
            let config = {
                headers: { "Content-Type": "multipart/form-data" }
            };

            this.$http.post(PostImg, param, config)
            .then(res => {
                this.data.shop_cover = res.data.data.url;
                this.params = {
                    shop_id: localStorage.getItem('shop_id'),
                    token: localStorage.getItem('token'),
                    shop_cover: this.data.shop_cover
                }
                this.editShopMsg()
            })
            .catch(err => {
                this.$message.error(err);
            });
        },


        // 查看认证
        jumpQuery(state) {
            if (state == 1 || state == 2) {
                this.$router.push({
                    path:"/authentication",
                    query:{ state: state, mobile: this.data.mobile }
                })
                return
            }
            this.$message({ message: '您还未进行认证, 请点击变更主体', type: 'warning' })
        },
        // 变更认证
        jumpEdit(state) {
            this.$router.push({
                path:"/authentication",
                query:{ state: 0, mobile: this.data.mobile }
            })
        },


        // input状态控制
        clickState(index, key) {
            if (key == 'shop_name' && this.data.shop_name == '') {
                this.$message({ message: '阁名称不能为空', type: 'warning' })
                return
            }

            if (this.adminState[index].value == '保存') {
                this.params = {
                    shop_id: localStorage.getItem('shop_id'),
                    token: localStorage.getItem('token'),
                    [key]: this.data[key]
                }
                if (index == 5) {
                    this.params = {
                        shop_id: localStorage.getItem('shop_id'),
                        token: localStorage.getItem('token'),
                        province: this.data.province,
                        city: this.data.city,
                        area: this.data.area
                    }
                }

                this.editShopMsg()
            }

            this.adminState[index].value = '修改'
            if (this.adminState[index].state) {
                this.adminState[index].value = '保存'
            }
            this.adminState[index].state = !this.adminState[index].state
        },


        // 城市选择
        onSelected: function (data) {
            this.data.province = data.province.value
            this.data.city = data.city.value
            this.data.area = data.area.value
        },


        // 一键保存
        oneClickSave() {
            if (this.data.shop_name == '') {
                this.$message({ message: '阁名称不能为空', type: 'warning' })
                return
            }

            this.params = {
                shop_id: localStorage.getItem('shop_id'),
                token: localStorage.getItem('token'),
                shop_name: this.data.shop_name,
                business: this.data.business,
                province: this.data.province,
                city: this.data.city,
                area: this.data.area,
                desc: this.data.desc
            }
            this.editShopMsg()
            this.adminState.forEach((item, index) => {
                item.state = true
                item.value = '修改'
            })
        },


        // 获取验证码
        clickCode(tel, index) {
            if (!checkTel(tel)) {
                this.$message({ message: '请输入正确的手机号', type: 'warning' })
                return
            }

            let params = {
                number: tel,
                cms_type: 4
            }
            sendCms(params).then(res => {
                if (res.data.status === 0) {
                    this.$message({ message: '恭喜你, 验证码获取成功', type: 'success' })
                    if (index == 1) {
                        this.stateCode = true
                    }
                    if (index == 2) {
                        this.stateconfig = true
                    }

                    return
                }
                this.$message({ message: res.data.message, type: 'warning' })

            })

        },


        // 验证验证码
        async clickVerify(tel, code, index) {

            if (code.length !== 4) {
                this.$message({ message: '请输入正确的验证码', type: 'warning' })
                return
            }

            let params = {
                tel: tel,
                code: code
            }

            await verifyCms(params).then(res=> {
                if (res.data.status === 0) {
                    if (index == 1) {
                        this.stateCode = false
                    }
                    if (index == 2) {
                        this.stateconfig = false
                    }
                    return
                }
            })
        },


        // 变更负责人
        async editPersonCharge() {
            if (this.stateCode) {
                await this.clickVerify(this.data.mobile, this.usedCode, 1)
                if (this.stateCode) {
                    return
                }
            }

            if (this.principal == '') {
                this.$message({ message: '请输入正确的新负责人姓名', type: 'warning' })
                return
            }

            if (!checkTel(this.newTel)) {
                this.$message({ message: '请输入正确的手机号', type: 'warning' })
                return
            }

            if (this.stateconfig && this.newTel != this.data.mobile) {
                await this.clickVerify(this.newTel, this.newCode, 2)
                if (this.stateconfig) {
                    return
                }
            }

           this.params = {
                shop_id: localStorage.getItem('shop_id'),
                token: localStorage.getItem('token'),
                principal: this.principal,
                mobile: this.newTel
            }

            this.editShopMsg('charge')
        },


        // post发送ajax修改店铺信息
        editShopMsg(val) {
            let params = this.params
            shopSave(params).then(res => {
                if (res.data.status === 0) {
                    if (val == 'charge') {
                        this.data.principal = this.principal
                        this.data.mobile = this.newTel
                        this.dialogVisible = false

                        this.principal = ''
                        this.newTel = ''
                        this.usedCode = ''
                        this.newCode = ''
                    }
                    this.$message({ message: '保存成功', type: 'success' })
                }
            })
        }
    }
};
</script>
<style scoped lang="scss">
$widthHead: 60px;
// 弹窗变量
$widthPopupInput: 110px;

// common
.color-666 {
    color: #666;
}
.store-item-input {
    width: 360px;
}

// content
.set-store-information {
    padding: 0 20px;
    .store-item {
        padding: 15px 0;
        display: flex;
        align-items: center;
        label {
            width: 120px;
        }
        a {
            color: #409eff;
            margin-left: 20px;
        }
    }
}

// logo
.store-item-logo {
    width: $widthHead;
    height: $widthHead;
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
            line-height: $widthHead;
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
.store-item-tel {
    margin-left: 15px;
}
.set-preservatio {
    margin-top: 30px;
}

// 弹窗
.edit-person-charge {
    height: 42px;
    line-height: 42px;
    background-color: #fff7cc;
    text-align: center;
}
.edit-item {
    display: flex;
    align-items: center;
    margin-top: 30px;
    text-align: center;
    label {
        display: block;
        width: $widthPopupInput;
    }
    .edit-item-input {
        width: 200px;
    }
}
.edit-item-hint {
    margin-left: $widthPopupInput;
    color: #999;
    text-align: left;
    margin-top: 5px;
}
.edit-item-input-tel {
    width: 200px + $widthPopupInput;
}
</style>
