import request from '@/utils/request'
import rsaUtil from '@/utils/RSAJSEncrypt.js'
import { Decrypt } from '@/utils/AESCryptoJS.js'
import config from '@/config.js';
const rsePrivateKey = `${config[config.env].rsePrivateKey}`
import { Toast } from "vant";
/**
 * POST 方法 与 GET方法  区别
 *
 * post==> data: obj
 * get==>params: obj
 *
 */
// 文件上传不需要中台拦截所以需要传中台需要的参数
export function uploadFile(obj) {
    return request({
        url: '/api/credit/audit/project/flowFile/upload',
        method: 'post',
        data: obj,
        headers: {
            'Content-Type': "multipart/form-data;",
        }
    })
}

export function axoisPost(url, obj, header) {
    return new Promise((resolve, reject) => {
        request({
            url: url,
            method: 'post',
            data: obj,
            headers: header
        }).then((res) => {
            var result = res.data.responseData
            var aesKey = rsaUtil.Decrypt(res.data.encodeKey, rsePrivateKey)
            // console.log("aesKey =" + aesKey);
            result = Decrypt(res.data.responseData, aesKey)
            console.log("post-success-result = " + JSON.stringify(result));
            if (result.status == '0') {
                resolve(result.data)
            } else if (result.status == '1') {
                //此处后台token失效重新调取登录接口
                Toast(result.message)
            } else {
                Toast("其他错误信息 " + result.message)
            }
        }).catch((err) => {
            // console.log("post-errresult = " + JSON.stringify(err));
            setTimeout(() => {
                reject(err)
            }, 1000);
        })
    })
}
export function axoisPostNormal(url, obj, header) {
    return new Promise((resolve, reject) => {
        request({
            url: url,
            method: 'post',
            data: obj,
            headers: header
        }).then(result => {
            console.log("不加密数据返回：" + JSON.stringify(result));
            resolve(result.data.responseData)
        }).catch((err) => {
            // console.log("不加密-post-errresult = " + JSON.stringify(err));
            setTimeout(() => {
                reject(err)
            }, 1000);
        })
    })
}
export function axoisGet(url, obj, header) {
    return new Promise((resolve, reject) => {
        request({
            url: url,
            method: 'get',
            params: obj,
            headers: header
        }).then(res => {
            resolve({
                data: res.data
            })
        }).catch((err) => {
            // console.log(JSON.stringify(err));
        })
    })
}
