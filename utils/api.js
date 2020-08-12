import {
	postRequest,
	getRequest
} from 'config'
var requestApi = {}

//登录
requestApi.login = (params) => {
	return postRequest('/index/login', params)
}
// 微信登录
requestApi.wxlogin = (params) => {
	return postRequest('/index/wxlogin', params)
}
//鉴定物展示积分接口
requestApi.unlock = (params) =>{
  return postRequest('/packageuser/unlock')
}
//评价列表接口
requestApi.onlinedesc = (params) => {
  return postRequest('/appraisal/onlinedesc')
}
//鉴定物积分支付接口
requestApi.unlockscore = (params) =>{
  return postRequest('/packageuser/unlockscore')
}
//获取购买渠道
requestApi.channel = (params) => {
  return postRequest('/appraisal/channel')
}
//采集购买渠道信息
requestApi.savechannelinfo = (params) => {
  return postRequest('/appraisal/savechannelinfo')
}
// 微信支付
requestApi.wxpay = (params) => {
	return postRequest('/wechat/wxpay', params)
}
// 创建订单
requestApi.beforeorder = (params) => {
	return postRequest('/appraisal/beforeorder', params)
}
// 注册
requestApi.register = (params) => {
	return postRequest('/index/register', params)
}
// 微信注册
requestApi.wxregister = (params) => {
	return postRequest('/index/wxregister', params)
}
// 验证码
requestApi.sendsms = (params) => {
	return postRequest('/pusersms/sendsms', params)
}
// 验证验证码
requestApi.forgetpwd = (params) => {
	return postRequest('/index/forgetpwd', params)
}
// 忘记密码
requestApi.doforget = (params) => {
	return postRequest('/index/doforget', params)
}
// 修改密码
requestApi.changepwd = (params) => {
	return postRequest('/index/changepwd', params)
}
// 修改资料
requestApi.profile = (params) => {
	return postRequest('/index/profile', params)
}
// 首页接口
requestApi.getHomeData = () => {
	return postRequest('/appraisal/index')
}
// 鉴定师列表
requestApi.getGemmologist = (params) => {
	return postRequest('/appraisal/assayerlist', params)
}
// 鉴定师详情
requestApi.getGemmologistDetail = (params) => {
	return postRequest('/appraisal/assayerinfo', params)
}
// 鉴定物品展示列表
requestApi.getArticles = (params) => {
	return postRequest('/appraisal/showgoods', params)
}
// 品类列表
requestApi.getClassList = () => {
	return postRequest('/appraisal/genrelist')
}
// 品牌类别列表
requestApi.getProductList = (params) => {
	return postRequest('/appraisal/brandlist', params)
}
// 鉴定方法
requestApi.getAppraisalMode = () => {
	return postRequest('/appraisal/authlevel')
}
// 提交鉴定
requestApi.submitAppraisal = (params) => {
	return postRequest('/appraisal/sendonlineorder', params)
}
// 用户实物提交鉴定
requestApi.sendgoodsorder = (params) => {
	return postRequest('/appraisal/sendgoodsorder', params)
}
// 支付接口
requestApi.payCode = (params) => {
	return postRequest('/payCode', params)
}
// 用户在线鉴定列表
requestApi.getOnlineAppraisalList = () => {
	return postRequest('/onlineList')
}
// 鉴定池列表
requestApi.getAppraisalList = (params) => {
	return postRequest('/appraisal/getauthpool', params)
}
// 鉴定师——鉴定列表
requestApi.getOrderAppraisal = (params) => {
	return postRequest('/orderAppraisal', params)
}
// 金额明细
requestApi.getTouchBalance = () => {
	return postRequest('/packageuser/moneyinfo')
}
//我的积分
// type 1 修改列表 不传获取列表
requestApi.getMyPoints = (params) => {
	return postRequest('/packageuser/getscore', params)
}
// 积分明细
requestApi.getIntegralDetails = (params) => {
	return postRequest('/packageuser/scoreinfo', params)
}
// 修改用户信息
requestApi.postUserInfo = (params) => {
	return postRequest('/userInfo', params)
}
// 获取token
requestApi.getToken = (params) => {
	return postRequest('/token', params)
}
// 获取小程序码
requestApi.getQrcode = (params) => {
	return postRequest(params)
}
//在线鉴定列表
requestApi.getOnlineGoodsList = (params) => {
	return postRequest('/order/onlineorderlist', params)
}
//在线鉴定详情 待鉴定/鉴定中
requestApi.getOnlineWait = (params) => {
	return postRequest('/order/onlinewait', params)
}
// 开始在线鉴定
requestApi.startonlineauth = (params) => {
	return postRequest('/order/startonlineauth', params)
}
// 提交在线鉴定
requestApi.onlinePost = (params) => {
	return postRequest('/order/onlinepost', params)
}
// 在线鉴定已完成
requestApi.onlineOver = (params) => {
	return postRequest('/order/onlineover', params)
}
// 实物鉴定列表
requestApi.getGoodsorderList = (params) => {
	return postRequest('/order/goodsorderlist', params)
}
// 实物鉴定详情 待鉴定/鉴定中
requestApi.getGoodWait = (params) => {
	return postRequest('/order/goodswait', params)
}
// 开始实物鉴定
requestApi.getStartGoodsAuth = (params) => {
	return postRequest('/order/startgoodsauth', params)
}
// 实物鉴定依据
requestApi.getBasisList = (params) => {
	return postRequest('/appraisal/basislist', params)
}
// 实物鉴定提交
requestApi.goodsPost = (params) => {
	return postRequest('/order/goodspost', params)
}
// 实物鉴定已完成
requestApi.goodsOver = (params) => {
	return postRequest('/order/goodsover', params)
}
//鉴定室 信息
requestApi.getBeIdentifiedList = (params) => {
	return postRequest('/appraisal/authroom', params)
},
//评价信息
requestApi.postevaluate = (params) => {
	return postRequest('/packageuser/ordereval', params)
},

// 提现金额
requestApi.postWithdraw = (params) => {
  return postRequest('/packageuser/withdraw',params)
}

// 箱包款式列表
requestApi.getBagstyleList = (params) => {
  return postRequest('/appraisal/bagstylelist',params)
}
// 品类统计
requestApi.genretotal = (params) => {
  return postRequest('/index/genretotal',params)
}
// 鉴定方式统计
requestApi.modetotal = (params) => {
  return postRequest('/index/modetotal',params)
}
// 鉴定结果统计
requestApi.resulttotal = (params) => {
  return postRequest('/index/resulttotal',params)
}
// 地址列表
requestApi.addresslist = (params) => {
  return postRequest('/index/addresslist',params)
}
// 地址操作
requestApi.addressop = (params) => {
  return postRequest('/index/addressop',params)
}
// 地址详情
requestApi.getaddressinfo = (params) => {
  return postRequest('/index/getaddressinfo',params)
}
// 我的在线鉴定
requestApi.onlinelist = (params) => {
  return postRequest('/packageuser/onlinelist',params)
}
// 我的实物鉴定
requestApi.goodslist = (params) => {
  return postRequest('/packageuser/goodslist',params)
}
// 我的金额接口
requestApi.getmoney = (params) => {
  return postRequest('/packageuser/getmoney',params)
}
// 积分支付
requestApi.scorepay = (params) => {
  return postRequest('/packageuser/scorepay',params)
}
// 发布在线鉴定详情
requestApi.authdetails = (params) => {
  return postRequest('/appraisal/authdetails',params)
}
// 鉴定物品展示 详情
requestApi.goodsinfo = (params) => {
  return postRequest('/appraisal/goodsinfo',params)
}
// 鉴定池详情
requestApi.authpoolinfo = (params) => {
  return postRequest('/appraisal/authpoolinfo',params)
}
// 鉴定池详情-抢单
requestApi.grab = (params) => {
  return postRequest('/appraisal/grab',params)
}
// 选择需补拍的图片
requestApi.chooseimg = (params) => {
  return postRequest('/appraisal/chooseimg',params)
}
// 发送补拍信息
requestApi.roomtalk = (params) => {
  return postRequest('/appraisal/roomtalk',params)
}
// 用户订单评价
requestApi.ordereval = (params) => {
  return postRequest('/packageuser/ordereval',params)
}
// 用户在线鉴定报告列表
requestApi.onlinereportlist = (params) => {
  return postRequest('/packageuser/onlinereportlist',params)
}
// 用户实物鉴定报告列表
requestApi.goodsreportlist = (params) => {
  return postRequest('/packageuser/goodsreportlist',params)
}
// 鉴定师主页 鉴定中订单数量
requestApi.count = (params) => {
  return postRequest('/order/count',params)
}
// 鉴定师获取评价列表
requestApi.evallist = (params) => {
  return postRequest('/packageuser/evallist',params)
}
// 我的实物鉴定 鉴定中详情
requestApi.mygoodsinfo = (params) => {
  return postRequest('/packageuser/goodsinfo',params)
}
// 获取协议
requestApi.getagreement = (params) => {
  return getRequest('/index/getagreement',params)
}
// 用户是否保存过openid
requestApi.getopenid = () => {
  return getRequest('/packageuser/getOpenid')
}
// 我的实物鉴定 鉴定中详情
requestApi.saveopenid = (params) => {
  return postRequest('/packageuser/saveopenid',params)
}
export default requestApi
