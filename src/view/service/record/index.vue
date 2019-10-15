<template>
  <div class="expenseBox">
    <div class="expenseLeft">
      <exInfo></exInfo>
      <div class="tabName">
        <div @click="HandleTab(item,index)" class="tabLi"
             :class="{ active:index == num }"
             v-for="(item,index) in tab" :key="index">
          {{ item.name }}
        </div>
      </div>
      <div>
        <exRecord></exRecord>
      </div>
    </div>
  </div>
</template>

<script>
  import exInfo from '../expense/components/ex-info'
  import exRecord from '../expense/components/ex-record'
  import Help from '../../../components/Help'
  import { UrlSearch } from '../../../assets/js/Urlsearch'
  export default {
    data() {
      return {
        tab:[
          { name: '费用&开票' },
          { name: '开票记录' }
        ],
        num: 1,
      }
    },
    created() {
      let _that = this;
      let Request = new UrlSearch();
    },
    methods: {
      HandleTab(item,index) {
        let _that = this;
        if (index == 0) {
            _that.$router.push({ path: '/exservice'});
        }
        _that.num = index;
      }
    },
    components: {
      exInfo,
      exRecord,
      Help
    },
    mounted() {}
  }
</script>

<style lang="scss" scoped>
  .expenseBox{
    width: 100%;
    background: #fff;
    .tabName{
      width: 100%;
      height: 41px;
      line-height: 40px;
      border-bottom: 1px solid #ccc;
      position: relative;
      background: #fff;
      .tabLi{
        float: left;
        width: 155px;
        height: 40px;
        text-align: center;
        cursor: pointer;
      }
      .tabLi:hover{
        color: #2a82e4;
      }
    }
  }
  .listbox{
    width: 100%;
  }
  .active{
    border-bottom: 1px solid #2a82e4;
    color: #2a82e4;
  }
</style>
