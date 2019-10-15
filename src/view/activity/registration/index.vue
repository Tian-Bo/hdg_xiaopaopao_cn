<!--
 * @Author: tianbo
 * @LastEditors: tianbo
 * @Date: 2019-07-11 11:11:18
 * @LastEditTime: 2019-07-11 11:11:18
 -->
<template>
      <div class="registration">
        <!-- 头部 -->
        <div class="reg-header">
          <div class="reg-header-left">
        <span class="reg-header-btn" @click="$router.go(-1)">
          <i class="el-icon-arrow-left"></i>
          &nbsp;&nbsp; 返回活动列表
        </span>
          </div>
        </div>
        <div style="background:#fff;">
          <!-- 导航 -->
          <div class="reg-nav">
            <div
              class="reg-nav-text"
              :class="{ 'reg-nav-active': navActive === 0 }"
              @click="onNavActive(0)"
            >
              报名数据({{sreanTotal}})
            </div>
            <!-- <div
              class="reg-nav-text"
              :class="{ 'reg-nav-active': navActive === 1 }"
              @click="onNavActive(1)"
            >
              核销数据(350)
            </div> -->
          </div>
          <!-- 列表 -->
          <div class="reg-list">
            <regValue v-show="navActive === 0" @passFaValue="showPassFaValue"/>
            <regWrite v-show="navActive === 1" />
          </div>
        </div>
      </div>

</template>

<script>
// 报名数据
import regValue from "./compoents/reg-value";
// 核销数据
import regWrite from "./compoents/reg-write";
export default {
  name: "registration",
  data() {
    return {
      navActive: 0,
      // 总数
      sreanTotal:0
    };
  },
  created(){
  },
  components: {
    regValue,
    regWrite
  },
  methods: {
      onNavActive(id) {
          var _that = this;
          _that.navActive = id;
      },
      showPassFaValue(data){
          this.sreanTotal = data;
      },
  },

};
</script>

<style lang="scss" scoped >
// 头部
.registration {
  background: #f9f9f9;
  .reg-header {
    display: flex;
    justify-content: space-between;
    height: 60px;
    line-height: 60px;
    font-size: 14px;
    padding: 0 2%;
    .reg-header-btn {
      height: 30px;
      line-height: 15px;
      background: #409eff;
      color: #fff;
      padding: 8px 18px 8px 12px;
      border-radius: 2px;
      cursor: pointer;
    }
    .reg-header-right {
      input {
        height: 28px;
        padding: 0 10px;
        line-height: 15px;
        font-size: 16px;
        margin-right: -5px;
      }
    }
  }
  // 导航:
  .reg-nav {
    display: flex;
    font-size: 12px;
    margin: 0px 2%;
    height:55px;
    border-bottom: 1px #ccc solid;
    .reg-nav-text {
      margin-right: 30px;
      cursor: pointer;
      padding: 20px 4px;
      text-align: center;
    }
    .reg-nav-active {
      border-bottom: 2px #409eff solid;
    }
  }
  //
  .reg-list {
    margin: 0 2%;
  }
}

</style>
