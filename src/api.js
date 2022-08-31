import {
  getFormatDate,
  getuuid
} from '@/utils/index.js'
import {
  ajaxGetToken
} from '@/utils/mxapi.js'
import {
  Encrypt
} from '@/utils/AESCryptoJS.js'
import rsaUtil from '@/utils/RSAJSEncrypt.js'
import config from '@/config.js';
import {
  axoisPost,
  axoisGet,
  axoisPostNormal
} from "@/utils/common.js"
import {
  Toast
} from "vant";
//RSA加密公钥---加密使用
const rsaPublicKey = `${config[config.env].rsaPublicKey}`

//应用常量
export const baseUrl = `${config[config.env].baseUrl}`

//接口管理平台的常量
const grant_type = `${config[config.env].grant_type}`
const txBrNo = `${config[config.env].txBrNo}`
const chnlCode = `${config[config.env].chnlCode}`
const client_secret = `${config[config.env].client_secret}`

//敏行平台应用id
export const app_id = `${config[config.env].app_id}`
//敏行平台管理常量
export const clientId = `${config[config.env].clientId}`
export const bearerToken = `${config[config.env].bearerToken}`


// 文件预览网址
const wpsBaseUrl = `${config[config.env].wpsBaseUrl}`


// POST加密
export const ajaxPost = (apiCode, query) => {
  console.log("提交数据：" + JSON.stringify(query));
  var url = apiCode.url;
  //将数据进行AES加密
  var requestDatas = Encrypt(JSON.stringify(query), localStorage.getItem('aesKey'))
  //将AES加密key进行RSA加密
  var encodeKeys = rsaUtil.Encrypt(localStorage.getItem('aesKey'), rsaPublicKey)
  let data = {
    timeStamp: getFormatDate(),
    requestId: getuuid(),
    txBrNo: txBrNo,
    chnlCode: chnlCode,
    serviceCode: apiCode.api,
    svcSubCode: "",
    access_token: localStorage.getItem('token'),
    sign: null,
    encryptAlgo: "AES",
    encodeKey: encodeKeys, //AES的加密key
    requestData: requestDatas, //AES加密后的数据
  }
  console.log('geturl =>' + url);
  var headers = {
    'Content-Type': 'application/json;charset=utf-8',
  }
  return axoisPost(url, data, headers)
}


//POST不加密
export const ajaxPostNormal = (apiCode, query) => {
  var url = apiCode.url;
  let data = {
    timeStamp: getFormatDate(),
    requestId: getuuid(),
    txBrNo: txBrNo,
    chnlCode: chnlCode,
    serviceCode: apiCode.api,
    svcSubCode: "",
    access_token: localStorage.getItem('token'),
    sign: null,
    encryptAlgo: null,
    encodeKey: null,
    requestData: query,
  }
  console.log('geturl =>' + url);
  return axoisPostNormal(url, data, {
    'Content-Type': 'application/json; charset=utf-8'
  })
}

//文件预览
export const filePreview = (reqData) => {
  Toast.loading({
    duration: 0, // 持续展示 toast
    forbidClick: true,
    message: "加载中...",
    loadingType: "spinner",
  });
  ajaxPostNormal(apiUrl.wpsFilePreview, reqData)
    .then((res) => {
      Toast.clear();
      if (res.status == 0) {
        let documentID = res.data;
        var readUrl = wpsBaseUrl + encodeURIComponent(documentID) +
          "&cdvinject=false&mxLayout=1";
        // console.log("预览文件地址----" + readUrl);
        MXCommon.openUrlPage(readUrl, function () { });
      } else {
        console.log("文件预览出错1" + JSON.stringify(res));
        Toast(res.data)
      }
    })
    .catch((err) => {
      Toast.clear();
      console.log("文件预览出错2" + JSON.stringify(err));
    });
}

export const ajaxGet = (url) => {
  url = baseUrl + url
  var query = {
    grant_type: grant_type,
    client_id: chnlCode,
    client_secret: client_secret,
  }
  return new Promise((resolve, reject) => {
    ajaxGetToken(url, query).then(res => {
      resolve(res)
    }).catch(error => {
      console.log("中台token错误返回：" + JSON.stringify(error));
      reject(error)
    })
  })
  // return axoisGet(url, query, {
  //   'Content-type': 'application/x-www-form-urlencoded'
  // })
}


// Url & Api Code
export const apiUrl = {
  ssoLogin: { //单点登录
    url: "/mx/ssoLoginWithInfos",
    api: "A0544",
    answer: ''
  },
  getToken: { //获取token
    url: "/auth/oauth/token",
    api: 'A0465',
    answer: ''
  },
  getMxId: { //获取敏行账户信息
    url: "/step-service/getAccount",
    api: "A0471",
    answer: ''
  },
  login: { //信贷-登录接口
    url: "/zhLogin",
    api: "",
    answer: ''
  },
  queryUser: { //分配岗核保任务查询
    url: "/sxhb/zhQueryfp",
    api: "A0807",
    answer: ''
  },
  returnTask: { //退回核保任务
    url: "/sxhb/zhReturnAction",
    api: "A0816",
    answer: ''
  },
  makeTask: { //完成核保任务
    url: "/sxhb/zhFinishTask",
    api: "A0814",
    answer: ''
  },
  rusUser: { //重新分配核保人员
    url: "/sxhb/zhTakeback",
    api: "A0815",
    answer: ''
  },
  efiQuery: { //查询影像资料参数
    url: "/sxhb/zhDistribute",
    api: "A0813",
    answer: ''
  },
  assignTask: { //分配核保任务
    url: "/sxhb/zhDistribute",
    api: "A0812",
    answer: ''
  },
  taskQuery: { //核保岗核保任务查询
    url: "/sxhb/zhQueryhb",
    api: "A0810",
    answer: ''
  },
  userQuery: { //用户信息查询
    url: "/sxhb/zhQueryUserId",
    api: "A0808",
    answer: ''
  },
  queryPerson: { //重新分配核保人员
    url: "/sxhb/zhQueryUserList",
    api: "A0811",
    answer: ''
  },
  queryLsImage: { //零售查询影像资料
    url: "/sxhb/lsQueryUploadParam",
    api: "A0828",
    answer: ''
  },
  queryLsReturnAction: { //零售核保岗退回
    url: "/sxhb/lsReturnAction",
    api: "A0827",
    answer: ''
  },
  queryLsTakeback: { //零售分配岗收回
    url: "/sxhb/lsTakeback",
    api: "A0826",
    answer: ''
  },
  queryLsFinishTask: { //零售完成核保任务
    url: "/sxhb/lsFinishTask",
    api: "A0825",
    answer: ''
  },
  queryLsDistribute: { //零售分配核保任务
    url: "/sxhb/lsDistribute",
    api: "A0824",
    answer: ''
  },
  queryLsUserList: { //零售查询核保人员
    url: "/sxhb/lsQueryUserList",
    api: "A0823",
    answer: ''
  },
  queryLsfp: { //零售分配岗核保任务查询
    url: "/sxhb/lsQueryfp",
    api: "A0821",
    answer: ''
  },
  queryLshb: { //零售核保岗核保任务查询
    url: "/sxhb/lsQueryhb",
    api: "A0822",
    answer: ''
  },
  queryLsUserId: { //零售用户账号信息查询
    url: "/sxhb/lsQueryUserId",
    api: "A0820",
    answer: ''
  },
  uploadSfz: { //上传身份证
    url: "/esb/ocrIdentify",
    api: "A0842",
    answer: ''
  },
  zhMenuList: { // 菜单权限
    url: "/sxhb/zhMenuList",
    api: "A0829",
    answer: ''
  },
  faceCardCompare: { //人脸
    url: "/esb/faceCardCompare",
    api: "A0843",
    answer: ''
  },
  querylsCustomerList: { //零售核保任务中借款人列表
    url: "/sxhb/lsCustomerList",
    api: "A0834",
    answer: ''
  },
  queryzhCustomerList: { //综合核保任务中借款人列表
    url: "/sxhb/zhCustomerList",
    api: "A0832",
    answer: ''
  },
  zhTaskList: { //综合借款人下核保任务
    url: "/sxhb/zhTaskList",
    api: "A0830",
  },
  zhCarryTaskList: { //综合核保待办信息查询
    url: "/sxhb/zhCarryTaskList",
    api: "A0837",
    answer: ''
  },
  lsTaskList: { //零售借款人下核保任务
    url: "/sxhb/lsTaskList",
    api: "A0835",
  },
  lsCarryTaskList: { //综合核保待办信息查询
    url: "/sxhb/lsCarryTaskList",
    api: "A0840",
    answer: ''
  },
  lsMenuList: { //零售菜单权限
    url: "/sxhb/lsMenuList",
    api: "A0833",
    answer: ''
  },
  zhTaskUserList: {//单一任务下核保人员列表
    url: "/sxhb/zhTaskUserList",
    api: "A0838",
    answer: ''
  },
  lsTaskUserList: {//零售单一任务下核保人员列表
    url: "/sxhb/lsTaskUserList",
    api: "A0841",
    answer: ''
  },
  zhUploadImg: {//综合图片上传
    url: "/sxhb/zhUploadImage",
    api: "A0850",
    answer: ''
  },
  zhQueryImg: {//综合图片查看
    url: "/sxhb/zhQueryImage",
    api: "A0851",
    answer: ''
  },
  zhTaskInfo: { // 综合-分配任务详情
    url: "/sxhb/zhTaskInfo",
    api: "A0836",
    answer: ''
  },
  lsTaskInfo: { // 零售-分配任务详情
    url: "/sxhb/lsTaskInfo",
    api: "A0839",
    answer: ''
  },
  lsUploadImg: {//零售图片上传
    url: "/sxhb/lsUploadImage",
    api: "A0852",
    answer: ''
  },
  lsQueryImg: {//零售图片查看
    url: "/sxhb/lsQueryImage",
    api: "A0853",
    answer: ''
  },
  zhUploadVideo: {//综合视频上传
    url: "/sxhb/zhUploadVideo",
    api: "A0854",
    answer: ''
  },
  lsUploadVideo: {//零售视频上传
    url: "/sxhb/lsUploadVideo",
    api: "A0855",
    answer: ''
  },
  wpsFilePreview: {//文档预览
    url: "/sxhb/wpsFilePreview",
    api: "A0861",
    answer: ''
  }
}