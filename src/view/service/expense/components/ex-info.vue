<template>
  <div class="info">
    <div class="infoLeft">
      <div class="infoLi" v-for="(item,index) in list" :key="index">
        <span class="name">{{ item.name }} :&nbsp</span>
        <div class="message">{{ item.info }}</div>
      </div>
      <div class="infoLi">
        <div class="message">电子普通发票是税局认可的有效付款凭证，其法律效力、基本用途及使用规定同纸质发票。</div>
      </div>
    </div>
    <div class="infoRight">
      <div class="warehousing" @click="HandleData">我的开票资料</div>
    </div>
  </div>
</template>

<script>
  export default {
      data() {
        return {
          list: [
            { name: '电子发票', info: '在线申请后，我们会在3个工作日内完成开具，开具成功后可在开票记录里下载打印。' },
            { name: '纸质专票', info: '联系客服申请后，我们会在7个工作日内完成开具与邮寄，请耐心等待。' },
          ]
        }
      },
      methods: {
        HandleData(){
            let _that = this;
            _that.$router.push({ path: '/management'});
        }
      }
  }
</script>

<style lang="scss" scoped>
  .info {
    width: 100%;
    height: 252px;
    background: #fff;
    box-sizing: border-box;
    padding: 37px 20px;
    position: relative;
    .infoLeft {
      float: left;
      .infoLi {
        width: 100%;
        height: 30px;
        line-height: 30px;
        .name {
          float: left;
          color: #333;
          font-size: 14px;
          font-weight: bold;
        }
        .message {
          float: left;
        }
      }
    }
    .infoRight {
      float: right;
      .warehousing {
        width: 136px;
        height: 35px;
        background-color: rgba(64, 158, 255, 1);
        text-align: center;
        color: #fff;
        line-height: 35px;
        font-size: 14px;
        margin-right: 31px;
        border-radius: 2px;
        cursor: pointer;
      }
    }
  }

</style>
