import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
let base = `${process.env.BASE_URL}` // 动态获取二级目录

// // 登陆
// const Login = () => import('../views/home/login')
// // 注册
// const Register = () => import('../views/home/register')
// // 首页
// const Home = () => import('../views/home/index')


// // 账户主页
// const accountHome = () => import('../views/home/accountHome')
// // 账户设置
// const accountSetting = () => import('../views/home/accountSetting')
// // 账户密码修改
// const accountPassword = () => import('../views/home/accountPassword')


// // 概况
// const Index = () => import('../views/index')



// const General = () => import('../views/general/index')


// const router = new Router({
//     mode: 'history',
//     base: base,
//     routes: [
//         { path: '/', name: '首页',  meta: { needLogin: false }, component: Index, show: true },
//         { path: '/login', name: '登陆', meta: { needLogin: false }, component: Login, show: true },
//         { path: '/register', name: '注册',  meta: { needLogin: false }, component: Register, show: true  },
//         { path: '/account_home', name: '账户中心', meta: { needLogin: true }, component: accountHome, show: true  },
//         { path: '/account_setting', name: '账号设置', meta: { needLogin: true }, component: accountSetting, show: true  },
//         { path: '/account_password', name: '修改密码', meta: { needLogin: true }, component: accountPassword, show: true  },
//         {   
//             path: '/index',
//             name: '概况总览',
//             component: Index,
//             show: true,
//             children: [
//                 { path: '/', name: '概况总览', meta: { needLogin: true },  component: General, show: true },
//             ]
//         },
//         {
//             path: '/setting',
//             name: '创意管理',
//             component: Index,
//             show: true,
//             needLogin: true,
//             children: [
//                 { path: '/setting', name: '注册1', meta: { needLogin: true }, component: General, show: true },
//                 { path: '/sad', name: '注册2', meta: { needLogin: true }, component: General, show: true },
//                 { path: '/sczxad', name: '注册3', meta: { needLogin: true }, component: General, show: true },
//                 { path: '/ccccxzcc4', name: '注册4', meta: { needLogin: true }, component: General, show: true },
//             ]
//         },
//         {
//             path: '/xzcczxczx',
//             name: '活动管理',
//             component: Index,
//             show: true,
//             needLogin: true,
//             children: [
//                 { path: '/xzcczxczx', name: '注册1', meta: { needLogin: true }, component: General, show: true },
//                 { path: '/cccczxczxc21c2', name: '注册2', meta: { needLogin: true }, component: General, show: true },
//                 { path: '/scscxz', name: '注册3', meta: { needLogin: true }, component: General, show: true },
//                 { path: '/xzczxcz', name: '注册4', meta: { needLogin: true }, component: General, show: true },
//             ]
//         },
//         {
//             path: '/123sdad',
//             name: '店铺管理',
//             component: Index,
//             show: true,
//             needLogin: true,
//             children: [
//                 { path: '/123sdad', name: '注册1', meta: { needLogin: true }, component: General, show: true },
//                 { path: '/ccccc655462', name: '注册2', meta: { needLogin: true }, component: General, show: true },
//                 { path: '/ccczxc8', name: '注册3', meta: { needLogin: true }, component: General, show: true },
//                 { path: '/zxczxczxmn', name: '注册4', meta: { needLogin: true }, component: General, show: true },
//             ]
//         },
//         {
//             path: '/dsad12123213',
//             name: '用户管理',
//             component: Index,
//             show: true,
//             needLogin: true,
//             children: [
//                 { path: '/dsad12123213', name: '中国', meta: { needLogin: true }, component: General, show: true },
//                 { path: '/dsad121232131', name: '中国', meta: { needLogin: true }, component: General, show: true },
//                 { path: '/dsad1212321323', name: '注册3', meta: { needLogin: true }, component: General, show: true },
//                 { path: '/dsad1212321332432', name: '注册4', meta: { needLogin: true }, component: General, show: true },
//             ]
//         },
//         {
//             path: '/ds1sadsa',
//             name: '数据中心',
//             component: Index,
//             show: true,
//             needLogin: true,
//             children: [
//                 { path: '/ds1sadsa', name: '注册1', meta: { needLogin: true }, component: General, show: true },
//             ]
//         },
//         {
//             path: '/ds1sadsacxz',
//             name: '功能插件',
//             component: Index,
//             show: true,
//             needLogin: true,
//             children: [
//                 { path: '/ds1sadsacxz', name: '注册1', meta: { needLogin: true }, component: General, show: true },
//             ]
//         },
//         {
//             path: '/ds1sadsacxz2321',
//             name: '服务中心',
//             component: Index,
//             show: true,
//             needLogin: true,
//             children: [
//                 { path: '/ds1sadsacxz2321', name: '注册1', meta: { needLogin: true }, component: General, show: true },
//             ]
//         },
//         {
//             path: '/ds1sadsacxz232121321312',
//             name: '设置',
//             component: Index,
//             show: true,
//             needLogin: true,
//             children: [
//                 { path: '/ds1sadsacxz232121321312', name: '注册1', meta: { needLogin: true }, component: General, show: true },
//             ]
//         },
//         {
//             path: '*',
//             redirect: '/index',
//             show: true
//         }
//     ],
//     scrollBehavior(to, from, savedPosition) {
//         if (savedPosition) {
//             return savedPosition
//         } else {
//             return {
//                 x: 0,
//                 y: 0
//             }
//         }
//     }
// });

// router.beforeEach((to, from, next) => {
//     const isLogin = window.sessionStorage.getItem('token')
//     if (to.meta.needLogin) {  // 判断该路由是否需要登录权限
//         if (isLogin) { // 判断是否已经登录
//             next()
//         }
//         else {
//             next({
//                 path: '/login',
//                 query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
//             })
//         }
//     }
//     else {
//         next()
//     }
// });

// export default router;





// hdg begin


import Home from '../view/Home.vue'
import Index from '../view/index.vue'

import Analysis from '../view/analysis/index' // 概况
import Creation from '../view/creation/index' // 创建活动列表
import CreationMain from '../view/creation/main' // 创建活动详情总页面
import CreateActivity from "../view/creation/create_activity/index"; // 创建活动详情
import Activity from '../view/activity/index' // 活动管理

import teamUp from '../view/activity/teamUp/index' // 活动管理-拼团数据
import assembleInfo from '../view/activity/assembleInfo/index' // 活动管理-拼团数据
import recommendInfo from '../view/activity/recommendInfo/index' // 活动管理-拼团数据

import CardTicket from '../view/cardTicket/index' //项目卡券列表
import CardTicket_index from '../view/cardTicket/card_ticket' //添加卡券

import Registration from '../view/activity/registration/index' //报名管理
import Shop from '../view/shop/index' // 店铺管理
import Decoration from '../view/activity/decoration/index' //店铺装修主页
import Classify from '../view/activity/decoration/classify' //店铺活动分类

import Merchant from '../view/merchant/index' // 商家门店
import Createstore from '../view/merchant/createstore/index' //创建商家名店
import CreatestoreAddWriter from '../view/merchant/createstore/components/add_write_info.vue' //创建商家名店
import User from '../view/user/index' // 用户管理

// import ExService from '../view/service/expense/index' // 服务中心-费用&发票
// import Record from '../view/service/record/index' // 服务中心-开票记录
import OpenService from '../view/service/openservice/index' // 服务中心-开通服务
import Management from '../view/service/expense/management/index' // 服务中心-我的开票资料
import Inspection from '../view/service/expense/inspection/index' // 服务中心-开票核对
import Provisioning from '../view/service/provisioning/index' // 服务中心-开通服务
// import orderPay from '../view/service/orderPay/index' // 服务中心-开通服务

import Setting from '../view/setting/index' // 设置
import Authentication from '../view/setting/authentication/index' // 开票核对


import Plug from '../view/plug/index/index' // 功能插件
import Unlock from '../view/plug/unlock/index' // 功能插件-荐单解锁
import NewsNotice from '../view/plug/newsnotice/index' // 功能插件-荐单解锁
import TeamPromote from '../view/plug/teamPromote/index' // 功能插件-团队推广概况
import CreateChannel from '../view/plug/teamPromote/createChannel' // 功能插件-团队推广创建渠道页
import EditChannel from '../view/plug/teamPromote/editChannel' // 功能插件-团队推广创建渠道页
import ChanneLinner from '../view/plug/teamPromote/channeLinner' // 功能插件-团队推广渠道内页
import ChanneRelation from '../view/plug/teamPromote/channeRelation' // 功能插件-团队推广创建渠道页

import NoteAccount from '../view/assets/noteaccount/index' // 资产管理-短信账户
import Protocol from '../view/assets/protocol/index' // 资产管理-短信账户-充值协议

import Case from '../view/home/case' // 首页-案例场景

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: base,
    routes: [
    { 
      path: '/',
      name: '',
      component: Index,
      show: false,
      meta: {
        iconCls: 'iconfont icon-shuju',
        needLogin: false
      },
      children: []
    },
    {
      path: '/analysis',
      name: '概况',
      show: true,
      iconCls: 'iconfont icon-shuju',
      component: Index,
      needLogin: false,
      host: '/vuemerchant/#/analysis',
      meta: {
        needLogin: false
      },
      children: [
        { path: '/', name: '', component: Analysis, meta: { needLogin: true }, show: false },
      ]
    },
    {
      path: '/Creation',
      name: '创建活动',
      show: true,
      iconCls: 'iconfont icon-fabu',
      component: Index,
      host: '/merchant/active/add',
      meta: {
        needLogin: false,
      },
      children: [
        { path: '/', name: '', component: Analysis, meta: { needLogin: true }, show: false },
      ]
    },
    {
      path: '/activity',
      name: '活动管理',
      show: true,
      tabState: true,
      iconCls: 'iconfont icon-icon-',
      component: Index,
      hidden: false,
      needLogin: false,
      host: '/vuemerchant/#/activity',
      meta: {
        title: '活动管理'
      },
      children: [
        { path: '/', component: Activity, meta: { needLogin: true }, show: false, name: '' },
        { path: '/registration', component: Registration, meta: { needLogin: true }, show: false, name: '' },
        { path: '/team_up', component: teamUp, meta: { needLogin: true }, show: false, name: '' },
        { path: '/assemble_info', component: assembleInfo, meta: { needLogin: true }, show: false, name: '' },
        { path: '/recommend_info', component: recommendInfo, meta: { needLogin: true }, show: false, name: '' }
      ]
    },
    {
      path: '/card_ticket',
      name: '项目卡券',
      show: true,
      iconCls: 'iconfont iconduihuan',
      component: Index,
      needLogin: false,
      host: '/vuemerchant/#/card_ticket',
      meta: {
        title: '项目卡券'
      },
      children: [
        { path: '/', component: CardTicket, meta: { needLogin: true }, show: false, name: '' },
        { path: '/card_ticket/add', component: CardTicket_index, meta: { needLogin: true }, show: false, name: '' }
      ]
    },
    {
      path: '/decoration',
      name: '店铺管理',
      show: true,
      tabState: true,
      iconCls: 'iconfont icon-shouye',
      component: Index,
      hidden: false,
      needLogin: false,
      host: '/vuemerchant/#/decoration',
      meta: {
        title: '店铺管理'
      },
      children: [
        { path: '/', component: Decoration,  meta: { needLogin: true }, show: false, name: '' },
        { path: '/decoration/classify', component: Classify,  meta: { needLogin: true }, show: false, name: '' }
      ]
    },
    {
      path: '/createstore',
      name: '商家门店',
      show: true,
      tabState: true,
      iconCls: 'iconfont icondingweiweizhi',
      component: Index,
      hidden: false,
      needLogin: false,
      host: '/merchant/manage_shop/shop',
      meta: {
        title: '商家门店'
      },
      children: [
        { path: '/', component: Createstore,  meta: { needLogin: true }, show: false, name: '' },
        { path: '/createstore/add_writer', component: CreatestoreAddWriter,  meta: { needLogin: true }, show: false, name: '' }
      ]
    },
    {
      path: '/user',
      name: '用户管理',
      show: true,
      tabState: true,
      iconCls: 'iconfont icon-user',
      component: Index,
      hidden: false,
      needLogin: false,
      host: '/merchant/user/index',
      meta: {
        title: '用户管理'
      }
    },
    {
      path: '/merchant/assets/index',
      name: '资产管理',
      show: true,
      tabState: true,
      iconCls: 'iconfont icon-xiangji',
      component: Index,
      hidden: false,
      needLogin: false,
      host: '/merchant/assets/index',
      meta: {
        title: '资产管理'
      },
      children: [
        { path: '/', component: NoteAccount, meta: { needLogin: true }, show: false, name: '活动收支' },
        { path: '/noteaccount', component: NoteAccount, meta: { needLogin: true }, show: false, name: '短信账户' }
      ]
    },
    {
      path: '/data',
      name: '数据中心',
      show: true,
      tabState: true,
      iconCls: 'iconfont icon-shujubiao',
      component: Index,
      hidden: false,
      needLogin: false,
      host: '/merchant/plug/index',
      meta: {
        title: '资产管理'
      }
    },
    {
      path: '/plug',
      name: '功能插件',
      show: true,
      tabState: true,
      iconCls: 'iconfont icon-shujubiao',
      component: Index,
      hidden: false,
      needLogin: false,
      host: '/vuemerchant/#/plug',
      meta: {
        title: '功能插件'
      },
      children: [
        { path: '/', component: Plug,  meta: { needLogin: true }, show: false, name: '' },
        { path: '/unlock', component: Unlock,  meta: { needLogin: true }, show: false, name: '' },
        { path: '/newsnotice', component: NewsNotice,  meta: { needLogin: true }, show: false, name: '' },
        { path: '/teamPromote', component: TeamPromote,  meta: { needLogin: true }, show: false, name: '' },
        { path: '/createChannel', component: CreateChannel,  meta: { needLogin: true }, show: false, name: '' },
        { path: '/editChannel', component: EditChannel,  meta: { needLogin: true }, show: false, name: '' },
        { path: '/channeLinner', component: ChanneLinner,  meta: { needLogin: true }, show: false, name: '' },
        { path: '/channeRelation', component: ChanneRelation,  meta: { needLogin: true }, show: false, name: '' }
      ]
    },
    {
      path: '/setting',
      component: Index,
      name: '设置',
      show: true,
      tabState: true,
      iconCls: 'iconfont iconshezhi1',
      hidden: false,
      needLogin: false,
      host: '/vuemerchant/#/setting',
      children: [{ path: '/', component: Setting,  meta: { needLogin: true }, show: false, name: '' }]
    },
    {
      path: '/openservice',
      component: Index,
      name: '服务中心',
      show: true,
      tabState: true,
      iconCls: 'iconfont icondaibanrenwuicon',
      hidden: true,
      needLogin: false,
      host: '/vuemerchant/#/exservice',
      children: [
        // { path: '/provisioning', component: Provisioning,  meta: { needLogin: true }, show: false, name: '开通服务' },
        // { path: '/exservice', component: ExService,  meta: { needLogin: true }, show: false, name: '费用&发票' },
        // { path: '/openservice', component: OpenService,  meta: { needLogin: true }, show: false, name: '' },
        // { path: '/record', component: Record,  meta: { needLogin: true }, show: false, name: '' },
        // { path: '/management', component: Management,  meta: { needLogin: true }, show: false, name: '' },
        // { path: '/inspection', component: Inspection,  meta: { needLogin: true }, show: false, name: '' },
        // { path: '/orderpay', component: orderPay,  meta: { needLogin: true }, show: false, name: '' }
      ]
    },
    {
      path: '/authentication',
      component: Authentication,
      name: '',
      show: false,
      tabState: false,
      iconCls: 'iconfont icon-user',
      hidden: false,
      needLogin: false,
      host: '/vuemerchant/#/authentication'
    },
    {
      path: '/case',
      component: Case,
      name: '',
      show: false,
      tabState: false,
      iconCls: 'iconfont icon-user',
      hidden: false,
      needLogin: false,
      host: '/vuemerchant/#/case'
    },
    {
      path: '/create_home',
      component: CreationMain,
      name: '',
      show: false,
      tabState: false,
      iconCls: 'iconfont icon-user',
      hidden: false,
      needLogin: false,
      host: '/vuemerchant/#/create_home'
    },
    {
      path: '/protocol',
      component: Protocol,
      name: '',
      show: false,
      tabState: false,
      iconCls: 'iconfont icon-user',
      hidden: false,
      needLogin: false,
      host: '/vuemerchant/#/protocol'
    },
    {
      path: '/404',
      component: Protocol,
      name: '',
      show: false,
      tabState: false,
      iconCls: 'iconfont icon-xiangji',
      hidden: false,
      needLogin: false,
    }
  ]
})




// router.beforeEach((to, from, next) => {
//     const isLogin = window.sessionStorage.getItem('token')
//     if (to.meta.needLogin) {  // 判断该路由是否需要登录权限
//         if (isLogin) { // 判断是否已经登录
//             next()
//         }
//         else {
//             next({
//                 path: '/login',
//                 query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
//             })
//         }
//     }
//     else {
//         next()
//     }
// });

export default router;

// hdg end
