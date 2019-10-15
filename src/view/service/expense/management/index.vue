<template>
    <div class="management">

      <div class="title"><span>发票信息管理</span></div>
      <div class="info">
        <div class="infoLi" v-for="(item,index) in list" :key="index">{{ item.name }}</div>
      </div>
      <div class="information">
        <div class="contents">
          <div class="leftInfo">
            <div class="infoTitle">发票信息</div>
            <div class="infoForm">
              <el-form  :model="dataForm" :rules="dataRule" label-width="120px">
                <el-form-item label="发票抬头" prop="company" name="发票抬头">
                  <el-input v-model.trim="dataForm.company" :disabled="true" placeholder="发票抬头"  name="发票抬头"></el-input>
                </el-form-item>
                <el-form-item label="税号" prop="credit_code" name="税号">
                  <el-input v-model.trim="dataForm.credit_code" :disabled="true" placeholder="税号" name="税号" ></el-input>
                </el-form-item>
                <el-form-item label="企业注册地址" name="企业注册地址">
                  <el-input v-model.trim="dataForm.req_address" placeholder="企业注册地址" >  <i slot="suffix" class="el-icon-edit"></i></el-input>
                </el-form-item>
                <el-form-item label="企业注册电话" name="企业注册电话">
                  <el-input v-model.trim="dataForm.req_tel"  placeholder="企业注册电话" >  <i slot="suffix" class="el-icon-edit"></i></el-input>
                </el-form-item>
                <el-form-item label="企业开户银行" name="企业开户银行">
                  <el-input v-model.trim="dataForm.req_bank" placeholder="企业开户银行" >  <i slot="suffix" class="el-icon-edit"></i></el-input>
                </el-form-item>
                <el-form-item label="开户银行账号" name="开户银行账号">
                  <el-input v-model.trim="dataForm.req_number" maxlength="20"  placeholder="开户银行账号" >  <i slot="suffix" class="el-icon-edit"></i></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="leftInfo">
            <div class="infoTitle">收票信息</div>
            <div class="infoForm">
              <el-form  :model="dataForm" :rules="dataRule" label-width="120px">
                <el-form-item label="收票人姓名" name="收票人姓名" prop="delivery_name">
                  <el-input v-model.trim="dataForm.delivery_name"  placeholder="收票人姓名" >  <i slot="suffix" class="el-icon-edit"></i></el-input>
                </el-form-item>
                <el-form-item label="收票人电话" name="收票人电话" maxlength="11" prop="delivery_tel">
                  <el-input v-model.trim="dataForm.delivery_tel"  placeholder="收票人电话" >  <i slot="suffix" class="el-icon-edit"></i></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱" name="电子邮箱" maxlength="17" prop="delivery_email">
                  <el-input v-model.trim="dataForm.delivery_email" placeholder="电子邮箱" >  <i slot="suffix" class="el-icon-edit"></i></el-input>
                </el-form-item>
                <el-form-item label="收货地址" name="收货地址"  prop="delivery_prov">
                  <div class="adders">
                    <v-distpicker @selected="onSelected" :province="prov" :city="city" :area="district" ></v-distpicker>
                  </div>
                </el-form-item>
                <el-form-item label="详细地址" name="详细地址" prop="delivery_address">
                  <el-input v-model.trim="dataForm.delivery_address" placeholder="详细地址" >  <i slot="suffix" class="el-icon-edit"></i></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="submit"><span @click="submit">确认无误</span></div>
        </div>
      </div>
    </div>

</template>

<script>
  import VDistpicker from 'v-distpicker'
  import  { isEmail, isMobile, isChina, isBlak, isPhone } from '../../../../assets/js/validate'
  import { getCorporate, postCorporate } from "@/api/api";
    export default {
        data() {
          var validateEmail = (rule, value, callback) => {
            if (!isEmail(value)) {
              callback(new Error('邮箱格式错误'))
            } else {
              callback()
            }
          }
          var validateMobile = (rule, value, callback) => {
            if (!isMobile(value)) {
              callback(new Error('手机号格式错误'))
            } else {
              callback()
            }
          }
          return {
            token: '',
            shop_id: '',
            list: [
              { name: "1、请仔细确认以下发票信息，一经开票，拒不退换" },
              { name: "2、电子普通发票申请后，会在3个工作日内开具，您可点击“开票记录”查询和下载。" },
              { name: "3、开票金额总计须大于500元" },
              { name: "4、发票申请撤销后您可点击“待开票”页面重新申请。" },
            ],
            dataForm:{
              company: '',                // 公司
              credit_code: '',            // 税号
              req_address: '',            // 企业注册地址
              req_tel: '',                // 企业注册电话
              req_bank: '',               // 企业开户银行
              req_number: '',             // 开户银行账号
              delivery_tel: '',           //收票人电话
              delivery_email: '',         //收票人邮箱
              delivery_name: '请输入姓名', //收票人姓名
              delivery_address: ''        // 详细地址
            },
            shipping: '',                  //收票人地址
            prov: '',                      // 省
            city: '',                      // 市
            district: '',                  // 区
            cityArr: [],
            districtArr: [],
            dataRule: {
              company: [
                { required: true, message: '发票公司不能为空', trigger: 'blur' }
              ],
              credit_code: [
                { required: true, message: '税号不能为空', trigger: 'blur' }
              ],
              delivery_name: [
                { required: true, message: '收票人姓名不能为空', trigger: 'blur'}
              ],
              delivery_tel: [
                { required: true, message: '手机号不能为空', trigger: 'blur' },
                { validator: validateMobile, trigger: 'blur' }
              ],
              delivery_email: [
                { required: true, message: '邮箱不能为空', trigger: 'blur' },
              ],
              delivery_prov:[
                { required: true, message: '收货地址不能为空', trigger: 'blur' }
              ],
              delivery_address: [
                { required: true, message: '详细地址能为空', trigger: 'blur' }
              ],
            }
          }
        },
        components:{
          VDistpicker
        },
        created() {
            let _that = this;
            _that.token = localStorage.getItem('token');
            _that.shop_id = localStorage.getItem('shop_id');
            _that.getList()
        },
        methods: {
          // 选中地区
          onSelected(data) {
            let _that = this;
            _that.prov = data.province.value;
            _that.city = data.city.value;
            _that.district = data.area.value;
          },
          // 获取数据
          getList() {
              let _that = this;
              _that.$http.get(getCorporate, {
                  params: {
                     shop_id: localStorage.getItem('shop_id'),
                    token: localStorage.getItem('token'),
                  }
              })
              .then((res) => {
                  let Data = res.data.data;
                  _that.dataForm.company = Data.enterprise_name;          // 企业抬头
                  _that.dataForm.credit_code = Data.credit_code;          // 企业税号
                  _that.dataForm.req_address = Data.req_address;          // 企业地址
                  _that.dataForm.req_tel = Data.req_tel;                  //企业注册电话
                  _that.dataForm.req_bank = Data.req_bank;                // 企业开火银行
                  _that.dataForm.req_number = Data.req_number;            // 企业开火账号

                  _that.dataForm.delivery_name = Data.delivery_name;      // 收票人姓名
                  _that.dataForm.delivery_tel = Data.delivery_tel;        // 收票人电话
                  _that.dataForm.delivery_email = Data.delivery_email;    // 收票人邮箱
                  _that.dataForm.delivery_address = Data.delivery_address; // 收票人详细地址
                  if ( Data.province == null) {
                    _that.prov  = _that.prov
                    _that.city = _that.city;
                    _that.district = _that.district;
                    _that.dataForm.req_number = '';
                    _that.dataForm.req_tel = '';
                    _that.dataForm.req_bank = '';
                    _that.dataForm.dataForm.delivery_address = '';
                  } else {
                    _that.prov = Data.province;
                    _that.city = Data.city;
                    _that.district = Data.region;
                  }
                if ( Data.enterprise_name == "" || Data.credit_code == "") {
                    _that.$alert('当前店铺需认证', '提示', {
                      confirmButtonText: '去认证',
                      type: 'warning',
                      center: true
                    }).then(() => {
                      _that.$message({
                        type: 'success',
                        message: '跳转中!'
                      });
                      let host = '/merchant/setting';
                      window.location.href = host;
                    })
                }
              })
              .catch(err => {
                  _that.$message.error(err);
              });
          },
          // 提交 我的开票资料
          submit() {
              let _that = this;
              if (_that.dataForm.company == "" || _that.dataForm.credit_code  == "") {
                  _that.$alert('当前店铺需认证', '提示', {
                      confirmButtonText: '去认证',
                      type: 'warning',
                      center: true
                  }).then(() => {

                    _that.$message({
                      type: 'success',
                      message: '跳转中!'
                    });

                    let host = '/merchant/setting';
                    window.location.href = host;

                  });
                  return;
              }
              if ( _that.dataForm.req_tel !== '') {
                if (_that.dataForm.req_tel.length < 7 ) {
                  _that.$message.error('企业注册电话不能小于7位');
                  return
                }
              }

              if ( _that.dataForm.req_bank !== '') {
                  if (!isChina(_that.dataForm.req_bank)) {
                      _that.$message.error('请输入正确银行');
                      return
                  }
              }

              if (_that.dataForm.req_number !== '') {
                  if (_that.dataForm.req_number.length < 15) {
                      _that.$message.error('开户银行账号不正确');
                      return
                  }
                  if (!isBlak(_that.dataForm.req_number)) {
                      _that.$message.error('不能出现负数的特殊字符');
                      return
                  }
              }

              if (!_that.dataForm.delivery_name) {
                  _that.$message.error('收票人姓名不能为空');
                  return
              }

              if (_that.dataForm.delivery_tel == '') {
                  _that.$message.error('收票人电话不能为空');
                  return
              }

              if (!isMobile(_that.dataForm.delivery_tel)) {
                  _that.$message.error('收票人电话不正确');
                  return
              }

              if (!isEmail(_that.dataForm.delivery_email)) {
                  _that.$message.error('邮箱不能为空');
                  return
              }

              if (_that.prov == '省') {
                  _that.$message.error('请选择省市区');
                  return
              }

              if (_that.city == '' || _that.city == '市') {
                  _that.$message.error('请选择省市区');
                  return
              }

              if (_that.district == '' || _that.district == '区') {
                  _that.$message.error('请选择省市区');
                return
              }

              if (_that.dataForm.delivery_address == '') {
                  _that.$message.error('收票人详细地址不能为空');
                  return
              }

              let dataForm = {
                  shop_id: _that.shop_id,
                  token: _that.token,
                  enterprise_name: _that.dataForm.company,                    // 发票抬头
                  credit_code: _that.dataForm.credit_code,                    // 发票税号
                  req_address: _that.dataForm.req_address,                    //企业地址
                  req_bank: _that.dataForm.req_bank,                          //企业开户银行
                  req_number: _that.dataForm.req_number,                      // 企业电话
                  req_tel: _that.dataForm.req_tel,                            // 企业注册电话
                  delivery_name: _that.dataForm.delivery_name,                //收票人姓名
                  delivery_tel: _that.dataForm.delivery_tel,                  //收票人电话
                  delivery_email: _that.dataForm.delivery_email,              //收票人邮箱
                  delivery_address: _that.dataForm.delivery_address,          //详细地址
                  province: _that.prov,
                  city: _that.city,
                  region: _that.district,

              };
              _that.$http.post(postCorporate,
                _that.$qs.stringify(
                    dataForm
                )).then((res) => {
                    let code = res.data.status;
                    if (code == 0) {
                        _that.$message({
                            message: '操作成功',
                            type: 'success',
                            duration: 1000,
                            onClose: () => {
                              // _that.$router.go(-1);
                            }
                        })
                    } else {
                        _that.$message.error('操作失敗');
                    }
              })
          }
        },
        mounted() {

        }

    }
</script>

<style lang="scss" scoped>
  .management{
    width: 100%;
    height: 100%;
    background: #fff;
    .title{
      width: 100%;
      height: 34px;
      background: #fff;
      border-bottom: 1px solid #ccc;
      span{
        color: #2a82e4;
        cursor: pointer;
        float: left;
        width: 113px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        font-size: 12px;
        border-bottom: 1px solid #2a82e4;
      }
    }
    .info{
      width: 100%;
      height: auto;
      background: #fff;
      box-sizing: border-box;
      margin-top: 16px;
      padding: 0 20px;
      .infoLi{
        width: 100%;
        height: 30px;
        font-size: 13px;
        line-height: 30px;
        color: #333333;
      }
    }
    .information{
      width: 100%;
      height: auto;
      background: #fff;
      float: left;
      padding: 0 100px;
      margin-top: 100px;
      .contents{
        width: 100%;
        margin: auto;
      }
      .leftInfo{
        float: left;
        background: #fff;
        width: 50%;
        box-sizing: border-box;
        .infoTitle{
          width: 100%;
          height: 40px;
          font-size: 18px;
          color: #626262;
          font-weight: bold;
          box-sizing: border-box;
          padding-left: 80px;
          line-height: 40px;
        }
        .infoForm{
          width: 100%;
          box-sizing: border-box;
          padding-left: 50px;
          margin-top: 10px;
          cursor: pointer;
          height: 450px;
          .infoInput{
            margin-left: 20px;
            float: left;
            width: 280px;
            height: 40px;
            line-height: 40px;
          }
        }
      }
      .submit{
        float: left;
        width: 100%;
        cursor: pointer;
        span{
          display: block;
          margin: auto;
          color: #fff;
          width: 136px;
          height: 36px;
          background: #2a82e4;
          line-height: 36px;
          font-size: 16px;
          text-align: center;
        }
      }
    }
  }
  .adders{
    float: left;
  }
  select{
    height: 40px;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
  }
  input:hover{
    cursor:pointer
  }
</style>
