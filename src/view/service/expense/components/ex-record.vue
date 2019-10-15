<template>
  <div class="expense">
    <div class="list">
      <div class="price">
        <span class="scope">支付金额</span>
        <span class="priceIoc">￥</span>
        <input placeholder="" v-model="fristPrice">
        <span class="boundary">-</span>
        <span class="priceIoc">￥</span>
        <input placeholder="" v-model="lastPrice">
      </div>
      <div class="payment">
        <span class="time">付款时间</span>
        <div class="selectTime">
          <template>
            <el-date-picker
              class="onebox-change-data"
              v-model="time"
              type="datetimerange"
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00', '08:00:00']"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </template>
        </div>
      </div>
      <div class="screen" @click="HandleFiltrate(1)">筛选</div>
    </div>
    <el-table
      :data="dataList"
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%; border: none">
      <el-table-column
        prop="id"
        header-align="center"
        align="center"
        label="Id">
      </el-table-column>
      <el-table-column
        prop="created_at"
        header-align="center"
        align="center"
        label="申请时间">
      </el-table-column>
      <el-table-column
        prop="title"
        header-align="center"
        align="center"
        label="发票公司">
      </el-table-column>
      <el-table-column
        prop="price"
        header-align="center"
        align="center"
        label="发票总额">
        <template slot-scope="scope">
          <el-button type="text" size="small" class="grossPrice" > <div class="gross">￥</div> {{ scope.row.price }}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="pay"
        header-align="center"
        align="center"
        label="发票状态">
        <template slot-scope="scope">
          <el-button type="success" size="small" v-if="scope.row.status == '已开票'" >已开票

          </el-button>
          <el-button  plain disabled size="small" v-else-if="scope.row.status == '审批中'" >审批中

          </el-button>
          <el-button  type="primary" size="small" v-else-if="scope.row.status == '已邮寄'" >已邮寄

          </el-button>
          <div v-else="scope.row.status == '已驳回'">
            <el-tooltip  placement="bottom" effect="light">
              <div slot="content">驳回理由:{{ scope.row.refuse_content }}</div>
              <el-button type="danger" size="small">已驳回</el-button>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        header-align="center"
        align="center"
        label="发票性质">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="220"
        label="操作">
        <template slot-scope="scope">
          <div v-if="scope.row.status == '审批中'">

          </div>
          <div v-else-if="scope.row.status == '已开票'">
            <div class="sendeBox">
              <span @click="HandPdf(scope.row.pdf)">下载PDF</span>
              <el-tooltip placement="bottom"  effect="light">
                <div slot="content" class="contentHover">
                  <div class="contentLi" @click="HandleSende(scope.row.id)"> <img src="../../../../assets/Email.png"> <div class="contentDefault">发送至默认邮箱</div></div>
                  <div class="contentLi">
                        <input placeholder="请输入邮箱" v-model="email">
                        <div class="sendeEmailLi" @click="HandleSende(scope.row.id)">发送</div>
                  </div>
                </div>
                <span>发送到邮箱</span>
              </el-tooltip>
            </div>
          </div>
          <div v-else-if="scope.row.status == '已邮寄'">
            <el-button type="text" size="primary">发送中</el-button>
          </div>
          <div v-else>
            <el-button type="text" size="small" @click="HandleApply(scope.row.id,scope.row.price)">重新申请</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="next">
      <div class="nextLeft">
        <el-pagination
          @size-change="sizeChangeHandle"
          @current-change="currentChangeHandle"
          :current-page="pageIndex"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          :total="totalPage"
          layout="total, prev, pager, next, jumper">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import { getInvoice, postState, sendState } from "@/api/api";
  import  { isEmail } from '../../../../assets/js/validate'
  export default {
    data() {
      return {
        token: '',                // 用户token
        shop_id: '',              // 用户ID
        dataList: [],             // 数据列表
        dataListSelections: [],   // 多选
        dataListLoading: false,
        countValue: 0,
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        fristPrice: '',           // 前置价格
        lastPrice: '',            // 后置价格
        time: [],                 //报名时间
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        email: ''                 // 邮箱,
      }
    },
    created(){
        let _that = this;
        _that.token = localStorage.getItem('token');
        _that.shop_id = localStorage.getItem('shop_id');
        this.HandleFiltrate();
    },
    methods: {
      // 多选
      selectionChangeHandle(val) {
          let _that = this;
          _that.countValue = val.length;
          _that.dataListSelections = val;
      },
      // 每页数
      sizeChangeHandle(val) {
          let _that = this;
          _that.pageSize = val;
          _that.pageIndex = 1;
          _that.HandleFiltrate()
      },
      // 当前页
      currentChangeHandle(val) {
          let _that = this;
          _that.pageIndex = val;
          _that.HandleFiltrate()
      },
      // 获取 筛选
      HandleFiltrate(e) {
          let _that = this;
          if (e == 1) {
              _that.pageIndex = 1
          }
          // 价格处理
          let priceArray = [];
          if (_that.fristPrice == '' && _that.lastPrice == '') {

          } else if(_that.fristPrice !== '' &&  _that.lastPrice == '' || _that.fristPrice == '' &&  _that.lastPrice !== '' ) {
              this.$message.error('请检查支付范围');
              return
          } else {
              priceArray = `[${_that.fristPrice},${_that.lastPrice}]`
          }
          // 时间处理
          let timeArray = [];
          if (_that.time === null) {
              _that.time = [];
          } else {
              for (let index = 0; index < _that.time.length; index++) {
                  let time = Math.ceil(_that.time[index].getTime() / 1000);
                  timeArray.push(time);
              }
          }
          let strTimeArray = `[${timeArray}]`;
          let allObject = {
                shop_id: localStorage.getItem('shop_id'),
                token: localStorage.getItem('token'),
                price: priceArray, // 价钱
                time: strTimeArray,
                page: _that.pageIndex,
          };
        // 可选参数
        let new_getObject = {};
        for (const iterator in allObject) {
          if (allObject[iterator] != "" ||allObject[iterator].length != 0) {
              if (allObject[iterator] != "[]") {
                  new_getObject[iterator] = allObject[iterator];
              }
          }
        }
        _that.$http.get(getInvoice, {
              params: new_getObject
          })
          .then((res) => {
              _that.dataList = res.data.data.items;
              _that.totalPage = res.data.data.total;

          })
          .catch(err => {
              _that.$message.error(err);
          });
      },
      HandPdf(pdf) {
          let link = document.createElement('a');
          link.style.display = 'none';
          link.href = pdf;
          link.setAttribute('download', 'excel.xlsx');
          document.body.appendChild(link);
          link.click()
      },
      // 重新申请
      HandleApply(id,price) {
         let _that = this;
        _that.$router.push({ path: '/inspection/?applyid=' + id  + '&total_price=' + price   });
      },
      HandleSende(id) {
        let _that = this;
        let dataForm = {};
        if ( _that.email == '') {
          dataForm = {
              token: _that.token,
              id: id,
              shop_id: _that.shop_id,
          };
        } else {
          if (!isEmail(_that.email)) {
              _that.$message.error('邮箱不正确');
              return
          }
          dataForm = {
              token: _that.token,
              id: id,
              shop_id: _that.shop_id,
              email: _that.email
          };
        }
        _that.$http.post(sendState,
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
            _that.email = ''
          }
        })
          .catch(err => {
              _that.$message.error(err);
          });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .expense{
    width: 100%;
    height: 100%;
    position: relative;
  }
  .list{
    width: 100%;
    height: 70px;
    background-color: rgba(246, 250, 255, 1);
    padding-top: 10px;
    overflow: hidden;
    .price{
      float: left;
      margin-left: 10px;
      .scope{
        float: left;
        font-size: 14px;
        color: #666;
        height: 36px;
        line-height: 50px;
        margin: 0 10px;
      }
      input{
        float: left;
        width: 80px;
        height: 38px;
        margin-top: 4px;
        border: 1px solid #ccc;
        border-radius: 3px;
      }
      .priceIoc{
        width: 13px;
        height: 37px;
        line-height: 36px;
        float: left;
        font-size: 12px;
        margin-top: 4px;
        background-color: rgba(242, 242, 242, 1)
      }
      .boundary{
        float: left;
        height: 24px;
        margin: 12px 4px;
      }
    }
    .payment{
      float: left;
      line-height: 50px;
      .time{
        float: left;
        margin: 0 20px;
      }
      .selectTime{
        float: left;
      }
    }
    .screen{
      float: left;
      width: 60px;
      height: 26px;
      line-height: 26px;
      background-color: rgba(64, 158, 255, 1);
      text-align: center;
      color: #fff;
      margin: 12px 20px;
      border-radius: 2px;
      font-size: 14px;
      cursor: pointer;
    }
  }
  .grossPrice{
    color: #FF8291;
    font-size: 16px;
  }
  .gross{
    color: #333;
    float: left;
    font-size: 12px;
    line-height: 19px;
  }
  .next{
    height: 56px;
    background: #fff;
    position: relative;
    width: 100%;
    .nextLeft{
      text-align: center;
      width: 100%;
      background: #fff;
      padding: 20px 0;
    }
  }
  .sendeBox{
    cursor: pointer;
    span{
      color: #2a82e4;
    }
    .sendeShow{
      position: relative;
      width: 200px;
      height: 80px;
      border: 1px solid #e5e5e5;
      border-radius: 2px;
      top: -3px;
    }

  }
  .contentHover{
    width: 200px;
    height: 80px;
    .contentLi{
      width: 100%;
      height: 40px;
      cursor: pointer;
      img{
        width: 20px;
        height: 17px;
        margin: 10px 20px 0 15px;
        float: left;
      }
      .contentDefault{
        float: left;
        font-size: 12px;
        line-height: 40px;
        color: #2a82e4;
      }
      input{
        float: left;
        width: 135px;
        height: 30px;
        margin: 5px;
      }
      .sendeEmailLi{
        float: left;
        line-height: 30px;
        width: 40px;
        height: 30px;
        margin: 5px 0 0 5px;
        text-align: center;
      }
    }
    .contentLi:hover{
      background: #2a82e4;
      .contentDefault{
        color: #fff;
      }
      .sendeEmailLi{
        background: #fff;
        color: #2a82e4;
        border-radius: 3px;
      }
    }
  }
</style>
