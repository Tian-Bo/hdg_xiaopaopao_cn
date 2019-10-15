<template>
    <div class="inspection">
      <div class="title">
        <span>发票信息管理</span>
      </div>
      <div class="procedure">
        <div class="step">
            <img class="stepUrl" src="../../../../assets/bgUser.jpg">
            <div class="stepName">核对信息</div>
        </div>
        <div class="step">
          <div class="stepIoc iconfont icon-jiantou-right"></div>
        </div>
        <div class="step">
          <img class="stepUrl" src="../../../../assets/bgUser.jpg">
          <div class="stepName">核对信息</div>
        </div>
      </div>
      <div class="info">
        <div>
          <p>您选取了</p> <p class="sign">{{ totalPage }}</p>
          <p>条单据开具发票（若选中多条订单，订单金额将合并开具在一张票据中）
            ，开票金额：</p><p class="sign">¥{{ total_price }}元</p></div>
        <div><p class="sign">注意：</p> <p>请核实发票信息是否正确，如果不正确请前往</p> <p class="message" @click="HandlerInvoice">我的发票信息</p> <p>修改。（自2017.07.01起，申请普通发票需填写税号信息，否则将无法应税使用，请及时维护您的税号信息）</p></div>
      </div>

      <div class="list">
        <div class="listLi"><span>发票抬头:</span><div class="name">{{ DataForm.enterprise_name }}</div></div>
        <div class="listLi"><span>开具类型 :</span> <div class="name">企业</div></div>
        <div class="listLi"><span>发票类型 :</span> <div class="name">增值税普通发票</div></div>
        <div class="listLi"><span>税务登记证号 :</span> <div class="name"> {{ DataForm.credit_code }}</div></div>
        <div class="listLi"><span>发票性质:</span>
          <div class="name">
            <el-radio-group v-model="radio" :label="1" @change="HandleSelect(radio)">
              <el-radio :label="1">电子 <div class="el-radio__label"><img src="../../../../assets/recommend.png"></div></el-radio>
              <el-radio :label="2">纸质 <div class="el-radio__label">电子发票与纸质发票同等效用</div></el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>

      <div class="reference">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="textarea">
        </el-input>
        <div class="hint">建议不要超过40-50(数字+汉字) ，否则盖章的时候有可能压倒</div>
      </div>
      <div v-show="forData">
        <el-table
          :data="dataList"
          v-loading="dataListLoading"
          @selection-change="selectionChangeHandle"
          style="width: 100%; border: none">
          <el-table-column
            type="selection"
            header-align="center"
            align="center">
          </el-table-column>
          <el-table-column
            prop="delivery_name"
            header-align="left"
            align="left"
            label="收件人姓名">
          </el-table-column>
          <el-table-column
            prop="delivery_tel"
            header-align="center"
            align="center"
            label="电话号码">
          </el-table-column>
          <el-table-column
            prop="delivery_address"
            header-align="center"
            align="center"
            label="地址">
          </el-table-column>
          <el-table-column
            fixed="right"
            header-align="center"
            align="center"
            label="操作">
            <template slot-scope="scope">
              <el-button  type="text" size="small" @click="addOrUpdateHandle(DataForm)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="footer">
        <div class="footerRight">
          <div class="lastStep" @click="back">上一步</div>
          <div class="submit" @click="submit">确认开票</div>
        </div>
      </div>
      <!-- 弹窗, 新增 / 修改 -->
      <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getList"></add-or-update>
    </div>
</template>

<script>
    import { getCorporate, postApply, postState, postJump } from "@/api/api";
    import { UrlSearch } from '../../../../assets/js/Urlsearch'
    import AddOrUpdate from './update'
    export default {
        data() {
          return{
            token: '',
            shop_id: '',
            radio: 1,
            textarea: '',
            dataList: [],
            dataListLoading: false,
            addOrUpdateVisible: false,
            forData: false,
            DataForm:{
                shop_id: localStorage.getItem('shop_id'),
                token: localStorage.getItem('token'),
                credit_code: "",
                delivery_address: "",
                delivery_email: "",
                delivery_name: "",
                delivery_tel: "",
                enterprise_name: "",
                req_address: "",
                req_bank: "",
                req_number: "",
                req_tel: "",
                city: "",
                region: "",
                province: ""
            },
            ids: '',
            totalPage: '',
            total_price: '',
            isShow: false,
            applyId: '',
          }
        },
        created(){
            let _that = this;
            _that.token = localStorage.getItem('token');
            _that.shop_id = localStorage.getItem('shop_id');
            _that.getList();
            let Request = new UrlSearch();
            _that.totalPage = Request.totalPage;
            _that.total_price = Request.total_price;
            if (!Request.total_price) {
                _that.total_price = 0
            }
            _that.ids = `[${Request.ids}]`;
            _that.isShow = Request.allID;
            _that.applyId = Request.applyid

        },
        components:{
            AddOrUpdate
        },
        activated () {
            this.getList()
        },
        methods: {
          // 我的开票信息
          HandlerInvoice() {
              let _that = this;
              _that.$router.push({ path: '/management' });
          },
          // 获取企业信息
          getList(){
              let _that = this;
              _that.$http
                .get(getCorporate, {
                    params: {
                        shop_id: _that.shop_id,
                        token: _that.token,
                    }
                })
                .then((res) => {
                    let Data = res.data.data;
                    let arrList = [];
                    arrList.push(Data);
                    _that.DataForm.enterprise_name = Data.enterprise_name
                    _that.DataForm.credit_code = Data.credit_code;
                    _that.DataForm.delivery_address = Data.delivery_address;
                    _that.DataForm.delivery_email = Data.delivery_email;
                    _that.DataForm.delivery_name = Data.delivery_name;
                    _that.DataForm.delivery_tel = Data.delivery_tel;
                    _that.DataForm.req_address = Data.req_address;
                    _that.DataForm.req_bank = Data.req_bank;
                    _that.DataForm.req_number = Data.req_number;
                    _that.DataForm.req_tel = Data.req_tel;
                    _that.dataList = arrList;
                    _that.DataForm.city = Data.city;
                    _that.DataForm.region = Data.region;
                    _that.DataForm.province = Data.province;

                })
                .catch(err => {
                    _that.$message.error(err);
                });
          },
          HandleSelect(radio) {
              let _that = this;
              if ( radio == 2) {
                  _that.forData = true;
              } else {
                  _that.forData = false;
              }
          },
          // 多选
          selectionChangeHandle(val) {
          },
          // 修改
          addOrUpdateHandle (DataForm) {
              let _that = this;
              _that.addOrUpdateVisible = true;
              _that.$nextTick(() => {
                  _that.$refs.addOrUpdate.init(DataForm)
              })
          },
          back(){
              let _that = this;
              window.history.back(-1);
            // _that.$router.go(-1);//返回上一层
          },
          // 开票
          submit() {
              let _that = this;
              let dataForm = {};
              if (_that.isShow){
                  let alldataForm = {};
                  if (_that.ids.length == 2) {
                      alldataForm = {
                          shop_id: _that.shop_id,
                          token: _that.token,
                          type: _that.radio,
                          content: _that.textarea,
                      };
                  } else {
                      alldataForm = {
                          shop_id: _that.shop_id,
                          token: _that.token,
                          except : _that.ids,
                          type: _that.radio,
                          content: _that.textarea,
                      };
                  }
                  dataForm = alldataForm
              } else {
                let radiodataForm = {};
                if (_that.applyId){
                    radiodataForm = {
                        token: _that.token,
                        id: _that.applyId,
                        type: _that.radio
                    };
                } else {
                    radiodataForm = {
                        shop_id: _that.shop_id,
                        token: _that.token,
                        ids: _that.ids,
                        content: _that.textarea,
                        type: _that.radio
                    };
                }
                dataForm = radiodataForm
              }

              let swop_post = "";
              if (_that.applyId){
                  swop_post = postState
              } else {
                  swop_post = postApply
              }

              _that.$http.post(swop_post,
                  _that.$qs.stringify(
                      dataForm
                  )).then((res) => {
                  let status = res.data.status;
                  if ( status == 0) {
                      _that.affirm();
                  }
                })
                .catch(err => {
                    _that.$message.error(err);
                });
          },
          affirm() {
            let _that = this;
            let dataForm = {
                token: _that.token,
                id: _that.applyId,
            };

            _that.$http.post(postJump,
              _that.$qs.stringify(
                  dataForm
              )).then((res) => {
              let status = res.data.status;
              if ( status == 0) {
                  _that.$message({
                      message: '操作成功',
                      type: 'success',
                      duration: 1500,
                  });
                _that.$router.push({ path: '/record' });

              }
            })
            .catch(err => {
              _that.$message.error(err);
            });
          }
        },
        mounted() {

        }
    }
</script>

<style lang="scss" scoped>
  .inspection{
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
    .procedure{
      width: 100%;
      height: 85px;
      background-color: rgba(245, 247, 250, 1);
      .step{
        float: left;
        width: 33%;
        text-align: center;
        margin-top: 10px;
        .stepUrl{
          width: 35px;
          height: 35px;
          border-radius: 50%;
        }
        .stepName{
          padding-top: 10px;
          font-size: 16px;
          color: #409EFF;
        }
        .stepIoc{
          padding-top: 20px;
          font-size: 28px!important;
          color: #666;
        }
      }
    }
    .info{
      width: 100%;
      height: 170px;
      padding: 22px 40px;
      div{
        width: 100%;
        height: 30px;
        line-height: 30px;
        p{
          float: left;
          color: #626262;
        }
        .sign{
          color: #FF0000;
        }
        .message{
          color: #409EFF;
          cursor: pointer;
        }
      }
    }
    .list{
      width: 100%;
      text-align: center;
      height: 160px;
      .listLi{
        width: 530px;
        height: 30px;
        line-height: 30px;
        margin: auto;
      }
      span{
        float: left;
        width: 120px;
        text-align: left;
        color: #626262;
        font-size: 16px;
      }
      .name{
        float: left;
        color: #333333;
        font-size: 16px;
        p{
          float: left;
        }
      }
    }
    .reference{
      margin: auto;
      width: 860px;
      height: 86px;
      .hint{
        color: #FF0000;
        padding-top: 5px;
        font-size: 12px;
      }
    }
  }

  .footer{
    width: 100%;
    height: 86px;
    background-color: rgba(246, 250, 255, 1);
    .footerRight{
      width: 380px;
      float: right;
      height: 36px;
      margin-top: 25px;
      margin-right: 120px;
      .lastStep{
        float: left;
        width: 136px;
        height: 35px;
        color: #409EFF;
        text-align: center;
        line-height: 35px;
        border: 1px solid #409EFF;
        border-radius: 3px;
        margin-right: 40px;
        cursor: pointer;
      }
      .submit{
        float: left;
        width: 136px;
        height: 35px;
        border: 1px solid #ccc;
        background-color: rgba(64, 158, 255, 1);
        color: #fff;
        text-align: center;
        line-height: 35px;
        border-radius: 3px;
        cursor: pointer;
      }
    }
  }
  .el-radio__label{
    float: right;
    position: relative;
    color: #2a82e4;
    img{
      width: 50px;
      height: 24px;
      float: left;
      margin-top: -5px;
    }
  }
</style>
