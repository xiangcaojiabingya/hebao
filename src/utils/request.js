import axios from 'axios'
import { Toast } from "vant";
import rsaUtil from '@/utils/RSAJSEncrypt.js'

import config from '@/config.js';

import { isjson } from '@/utils/index.js'
import { Decrypt } from '@/utils/AESCryptoJS.js'
import { ajaxGetToken } from "@/utils/mxapi.js"

//RSA加密私钥---解密使用
const rsePrivateKey = `${config[config.env].rsePrivateKey}`

const baseUrls = `${config[config.env].baseUrl}`
const grant_type = `${config[config.env].grant_type}`
const chnlCode = `${config[config.env].chnlCode}`
const client_secret = `${config[config.env].client_secret}`

const instance = axios.create({
    // baseURL: process.env.NODE_ENV === 'development' ? 'api' : baseUrls,
    baseURL: getBaseUrl(),
    timeout: 40000
});


instance.interceptors.response.use(
    async function (response) {
        // console.log("数据返回：" + JSON.stringify(response.data));
        var result = response.data.responseData
        if (isjson(result) && 'sysHead' in result) {//无加密
            //此处判断中台token失效后重新请求
            if (result.sysHead.retCode === 'G0403') {
                //token失效
                let res = await ajaxGetToken(baseUrls + "/auth/oauth/token", {
                    grant_type: grant_type,
                    client_id: chnlCode,
                    client_secret: client_secret,
                })
                // console.log("获取到中台的token:" + JSON.stringify(res));
                localStorage.setItem("token", res.data.access_token);
                // console.log("中台token失效" + JSON.stringify(res));
                let repostConfig = JSON.parse(response.config.data)
                repostConfig.access_token = localStorage.getItem('token')
                response.config.data = JSON.stringify(repostConfig)
                return instance(response.config)
            } else if (result.sysHead.retCode === 'G0000') {

            } else {
                Toast('网络请求发生错误')
            }
        } else {//加密
            var result = response.data.responseData
            if (result == undefined || isResult(result)) {
                return response

            } else {
                var aesKey = rsaUtil.Decrypt(response.data.encodeKey, rsePrivateKey)
                // console.log("aesKey =" + aesKey);
                result = Decrypt(response.data.responseData, aesKey)
                // console.log("result = " + JSON.stringify(result));
                if ("sysHead" in result) {
                    if (result.sysHead.retCode === 'G0403') {
                        //token失效
                        let res = await ajaxGetToken(baseUrls + "/auth/oauth/token", {
                            grant_type: grant_type,
                            client_id: chnlCode,
                            client_secret: client_secret,
                        })
                        // console.log("获取到中台的token:" + JSON.stringify(res));
                        localStorage.setItem("token", res.data.access_token);
                        // console.log("中台token失效" + JSON.stringify(res));
                        let repostConfig = JSON.parse(response.config.data)
                        repostConfig.access_token = localStorage.getItem('token')
                        response.config.data = JSON.stringify(repostConfig)
                        // Toast.clear()
                        return instance(response.config)
                    } else if (result.sysHead.retCode === 'G0000') {

                    } else {
                        Toast('网络请求发生错误')
                    }
                } else {
                    return response
                }
            }
        }
    },
    async function (error) {
        console.log('axois---error=' + JSON.stringify(error))
        // console.log('axois---error--response=' + JSON.stringify(error.response)) // for debug
        if (error.message.includes('timeout')) {   // 判断请求异常信息中是否含有超时timeout字符串
            Toast("请求超时")
            return Promise.reject(error);          // reject这个错误信息
        }
        if (error && error.response) {
            switch (error.response.status) {
                case 400: error.message = '请求错误'; break;
                case 401: error.message = '未授权，请重新登录'; break;
                case 403: error.message = '拒绝访问'; break;
                case 404: error.message = '请求出错'; break;
                case 408: error.message = '请求超时'; break;
                case 500: error.message = '服务器异常,请联系管理员'; break;
                case 501: error.message = '服务未实现'; break;
                case 502: error.message = '网络错误'; break;
                case 503: error.message = '服务不可用'; break;
                case 504: error.message = '网络超时'; break;
                case 505: error.message = 'HTTP版本不受支持'; break;
                default: error.message = `连接出错(${error.response.status})!`;
            }
        } else {
            error.message = '连接服务器失败!'
        }
        Toast(error.message)

        return Promise.reject(error)
    }
)


export default instance

//有用，勿删
function isResult(data) {
    let isTrue = false
    if (isjson(data)) {
        if ("sysHead" in data) {
            isTrue = false
        } else {
            isTrue = true
        }
    }

    return isTrue
}

//获取baseURL  判断是否使用mock数据  还有是否是dev
function getBaseUrl() {

    let url = "";
    if (process.env.VUE_APP_MOCK === "true") {
        url = ""
    } else {
        if (process.env.NODE_ENV === "dev") {
            url = "api"
        } else {
            url = baseUrls
        }
    }
    return url;
}
