<template>
  <div class="expense">
    <div class="expenseLeft">
      <exInfo></exInfo>
      <div class="tabName">
        <div @click="HandleTab(item,index)" class="tabLi"
             :class="{ active:index == num }"
             v-for="(item,index) in tab" :key="index">
          {{ item.name }}
        </div>
      </div>
      <div class="list">
        <div v-if="num == 0">
          <exExpense></exExpense>
        </div>
        <div v-else>
          <exRecord></exRecord>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import exInfo from './components/ex-info'
  import exExpense from './components/ex-expense'
  import exRecord from './components/ex-record'
  import Help from '../../../components/Help'
  import { UrlSearch } from '../../../assets/js/Urlsearch'
    export default {
      data() {
        return {
          tab:[
            { name: '费用&开票' },
            { name: '开票记录' }
          ],
          num: 0,
        }
      },
      created() {
          let _that = this;
          let Request = new UrlSearch();
      },
      methods: {
          HandleTab(item,index) {
              let _that = this;
              if (index == 1) {
                _that.$router.push({ path: '/record'});
              }
              _that.num = index;
          }
      },
      components: {
        exInfo,
        exExpense,
        exRecord,
        Help
      },
      mounted() {

      }
    }
</script>

<style lang="scss" scoped>
  .expense{
    width: 100%;
    background: #fff;
    height: 100%;
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
  .list{
    width: 100%;
    position: relative;
  }
  .active{
    border-bottom: 1px solid #2a82e4;
    color: #2a82e4;
  }
</style>
