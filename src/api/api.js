/*
 * @Author: tianbo
 * @LastEditors: tianbo
 * @Date: 2019-10-15 13:42:11
 * @LastEditTime: 2019-10-15 13:42:11
 */
/**
 * 请求统一管理
 */
// import Request from '../common/request'

// /* Common */
// export const rankGender = data => Request.get('/ranking/gender', data)

// // 用户-登陆
// export const postLogin = data => Request.post('/user/login', data)
// // 用户-注册
// export const postRegister = data => Request.post('/user/register', data)
// // 用户-获取用户信息
// export const getUserInfo = data => Request.get('/user/info', data)


// export const rankGender = data => Request.get('/ranking/gender', data)
// export const rankGender = data => Request.get('/ranking/gender', data)
// export const rankGender = data => Request.get('/ranking/gender', data)
// export const rankGender = data => Request.get('/ranking/gender', data)
// export const rankGender = data => Request.get('/ranking/gender', data)


// hdg begin
import { BaseUrl } from '../assets/js/BaseUrl'

let apiBase = ''
// 匹配手机端的域名是否是正式还是测试服
let urlBase = ''
// 是否是https
let isHttp = ''
let header = {
  headers: { 'content-type': 'application/x-www-form-urlencoded' }
}

if (BaseUrl() == 'https://www.yanzhaicun.cn') {
  apiBase = 'https://apis.yanzhaicun.cn'
  isHttp = 'http://'
  urlBase = 'yanzhaicun.cn'
} else {
  apiBase = 'https://apis.huodongge.cn'
  urlBase = 'huodongge.cn'
  isHttp = 'https://'
}
const base = apiBase

// 导出手机端的配置域名(由于要拼接手机端的域名生成二维码,域名可能会改变 ,全局定义一个可方便修改的域名段)
export const globalUrlBase = urlBase
// 导出https字符串
export const httpString = isHttp

export const requestLogin = params => {
  return axios.post(`${base}/login`, params)
}
export const getFindList = params => {
  return axios.get(`${base}/findList`)
}

// 用户信息
export const getUser = `${base}/merchant/head/image`

export const getTest = `${base}//apply/management/fitter`

// 报名管理-->获取筛选条件
export const getManageFitter = `${base}/apply/management/fitter`
// 报名管理-->获取筛选的值/下载表格/分页
export const getManagement = `${base}/apply/management`

// 打开创客贴
export const getCktSign = `${base}/get/ckt/sign`
// 服务管理
export const getList = `${base}/invoice/info`
// 开票记录
export const getInvoice = `${base}/invoice/list`
// 发票信息管理
export const getCorporate = `${base}/shop/business/info`
//修改发票信息
export const postCorporate = `${base}/invoice/info`
// 申请发票
export const postApply = `${base}/apply/invoice`
// 重新申请 跳转
export const postJump = `${base}/state/invoice`
// 重新申请
export const postState = `${base}/change/invoice`
// 发送邮件
export const sendState = `${base}/send/invoice`
// 门店管理
export const PostShop = `${base}/shore/save`
// 获取门店数据
export const GitShop = `${base}/store/info`
// 上传图片
export const PostImg = `${base}/file/upload`
// 创建们店
export const CreateStore = `${base}/shore/add`

// 活动管理
export const getManageInfo = params => {
  return axios.get(`${base}/apply/management/info`, params)
}
// 活动管理
export const getApplymanage = params => {
  return axios.get(`${base}/alter/apply/management`, params)
}
// 活动管理
export const getMerchHelper = params => {
  return axios.get(`${base}/merchant/helper`, params)
}

// 店铺装修-------->获取店铺信息
export const getDecorationTheme = `${base}/shop/theme`
// 店铺装修-------->添加分类
export const addGrouping = `${base}/make/classify`
// 店铺装修-------->获取分类
export const getGrouping = `${base}/shop/classify`
// 店铺装修-------->删除分类
export const deleteGrouping = `${base}/delete/shop/classify`
// 店铺装修-------->修改分类名称 或者 分类 //1 修改名称传 index change_name 当为2时 传index 和ids
export const editGroup = `${base}/change/classify`
// 店铺装修-------->获取未添加活动信息
export const getUnfinishedActive = `${base}/active/underway`
// 店铺装修-------->获取未添加活动标题
export const getActiveModel = `${base}/active/model`
// 店铺装修-------->获取未添加活动分类（在店铺装修页面）
export const getActiveModelBy = `${base}/shop/classify/by/type`
// 店铺装修-------->上传店铺信息
export const uoLoadTheme = `${base}/upload/shop/classify`

// 设置-获取行业类目
export const getBusinessPicture = params => {
  return axios.get(`${base}/user/register/business/picture`, params)
}
// 设置-获取店铺所有信息
export const shopInfo = params => {
  return axios.get(`${base}/shop/info`, params)
}
// 设置-修改店铺所有信息
export const shopSave = params => {
  return axios.post(`${base}/shop/save`, qs.stringify(params), header)
}
// 设置-获取验证码
export const sendCms = params => {
  return axios.post(`${base}/send/cms`, qs.stringify(params), header)
}
// 设置-验证验证码
export const verifyCms = params => {
  return axios.post(`${base}/verify/cms`, qs.stringify(params), header)
}
// 设置-获取认证所有信息
export const shopAuthInfo = params => {
  return axios.get(`${base}/shop/auth/info`, params)
}
// 设置-提交认证所有信息
export const shopAuthSave = params => {
  return axios.post(`${base}/shop/auth/save`, qs.stringify(params), header)
}
// 设置-上传营业执照获取对应数据
export const ocrInfo = `${base}/ocr/info`

// 功能插件
export const getPluginList = `${base}/get/plugin/list`
// 共鞥插件-详情
export const getPluginInfo = `${base}/get/plugin/info`
// 功能插件-详情-卡通支付
export const getChannelPayOrder = `${base}/channel/pay/order`


// 功能插件-消息通知-短信配置
export const getInformSign = `${base}/shop/sms/config`
// 功能插件-消息通知-更改通知签名
export const setInformSign = `${base}/shop/update/informSign`
// 功能插件-消息通知-短信通知配置
export const setInformConfig = `${base}/shop/update/informConfig`
// 功能插件-消息通知-更改通知签名
export const setSendRules = `${base}/shop/update/sendRules`

// 功能插件-获取渠道所有列表
export const  getChannelList = `${base}/shop/channel`
// 功能插件-获取单个活动渠道列表
export const  getShopAllChannel = `${base}/shop/all/channel`
// 功能插件-pc端获取店铺渠道管理者名字
export const  getShopPrincipal = `${base}/shop/principal`
// 功能插件-创建渠道
export const  getMakeShopChannel = `${base}/make/shop/channel`
// 功能插件-删除/还原渠道
export const  setDeleteChannel = `${base}/delete/channel`
// 功能插件-编辑渠道
export const  setEditChannel = `${base}/edit/channel`
// 功能插件-获取渠道内页详情
export const  getChannelOrder = `${base}/get/channel/order`
// 功能插件-获取渠道推荐数据
export const  getChannelRecommend = `${base}/get/channel/recommend`
// 功能插件-获取渠道推荐数据详情
export const  getChannelRecommendInfo = `${base}/channel/recommend/info`

// 资产管理-短信账户-获取短信详情
export const getShopCmsDetail = `${base}/shop/cms/detail`
// 资产管理-短信账户-修改自动充值
export const setShopUpdateAuto = `${base}/shop/update/autoRecharge`
// 资产管理-短信账户-扫码支付
export const getMakeCmsQrcode = `${base}/make/cms/QrCode`

// 服务中心-订单支付-获取商铺模型详情
export const getShopModelInfo = `${base}/shop/model/info`
// 服务中心-订单支付-查询订单是否支付
export const getVerifyOrder = `${base}/verify/order`
// 服务中心-订单支付-银行转账
export const getShopTransferRecor = `${base}/shop/transfer/record`
// 服务中心-开通服务-获取版本信息
export const getShopModel = `${base}/shop/shopModel`

// 项目卡券------->获取卡券列表
export const getActiveVoucher = `${base}/shop/active/voucher`
// 项目卡券------->获取商家门店列表
export const getStoreList = `${base}/get/store/list`
// 项目卡券------->添加核销券
export const addActiveVoucher = `${base}/add/active/voucher`
// 项目卡券------->编辑核销券
export const editActiveVoucher = `${base}/edit/active/voucher`
// 项目卡券------->删除核销券
export const deleteActiveVoucher = `${base}/delete/active/voucher`
// 项目卡券------->获取核销券
export const getActiveVoucherInfo = `${base}/active/voucher/info`

// 拼团------->获取拼团列表
export const getClusterRuleLis = `${base}/get/cluster/ruleList`
// 拼团------->添加拼团
export const addActiveTicket = `${base}/add/active/ticket`
// 拼团------->删除核销券
export const deteleActiveTicket = `${base}/delete/cluster/ticket`
// 拼团------->获取店铺是否有未完成的拼团设置
export const settingCluster = `${base}/setting/cluster`
// 拼团------->创建拼团
export const createCluster = `${base}/create/cluster`
// 拼团------->获取拼团设置;
export const getCluster = `${base}/merchant/cluster`
// 拼团------->拼团票券中添加核销券
export const addTicketVoucher = `${base}/add/ticket/voucher`
// 拼团------->编辑拼团拼团信息
export const editClusterRule = `${base}/edit/cluster/rule`
// 拼团------->创建拼团阶梯区间
export const addClusterRole = `${base}/add/cluster/role`
// 拼团------->获取海报信息
export const getPoster = `${base}/poster`
// 拼团------->获取创客贴的Key
export const getCKTKey = `${base}/get/ckt/sign`
// 拼团------->上传创客贴图片到oss
export const downloadFile = `${base}/merchant/downloadFile`
// 拼团------->更新海报
export const activePoster = `${base}/active/poster`
// 拼团------->更新拼团海报
export const uploadCluster = `${base}/upload/cluster`
// 拼团------->上传分享样式
export const uploadShareConfig = `${base}/upload/cluster/share/config`
// 拼团------->判断是否该提交数据(是否能发布)
export const checkClusterFinish = `${base}/check/cluster/finish`
// 拼团------->退出编辑的判断
export const checkClusterIssue = `${base}/check/cluster/issue`

// 核销员------->获取核销员的列表
export const getHandleList = `${base}/get/handle/list`
// 核销员------->删除核销员
export const deleteHandleList = `${base}/delete/handle/user`
// 首页-获取行业场景
export const getActiveAll = `${base}/active/all`

// 拼团-获取拼团列表
export const getCluesterDatalist = `${base}/get/cluster/dataList`
// 拼团-获取拼团推荐
export const getCluesterRecommendList = `${base}/get/cluster/recommendList`
// 拼团-获取平团推荐-获取推荐数据详情
export const getCluesterRecommendInfo = `${base}/get/cluster/recommendInfo`
// 拼团-获取拼团所有订单
export const getCluesterOrder = `${base}/get/Cluster/order`

//店铺兑换地址
export const exchangeVoucher = `${base}/shop/exchangeVoucher`

// 概况-获取节假日列表 
export const getShopHolidayDetail = `${base}/shop/holiday/detail`
// 概况-自定义假日
export const setUploadholidaydetail = `${base}/upload/holiday/detail`

// hdg end