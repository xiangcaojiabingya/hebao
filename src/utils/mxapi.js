import {
    Toast
} from "vant";

import {
    getFormatDate
} from "@/utils/index"

function MXApi(callbacks) {
    var deviceReady = false;
    var taskQueue = [];
    document.addEventListener('deviceready', function deviceReadyHandler() {
        deviceReady = true;
        taskQueue.forEach(function (task) {
            applyApi(...task);
        })
        callbacks.ready && callbacks.ready();
        document.removeEventListener('deviceready', deviceReadyHandler, false);
    }, false)

    function applyApi(namespace, api, args) {
        if (window[namespace] && window[namespace][api]) {
            callbacks.beforeApply && callbacks.beforeApply(namespace, api, args);
            window[namespace][api](...args);
        } else if (!deviceReady) {
            taskQueue.push([namespace, api, args]);
        } else {
            callbacks.error && callbacks.error(['该终端没有', namespace, '.', api, '方法!'].join(''), namespace, api);
            throw new Error(['该终端没有', namespace, '.', api, '方法!'].join(''));
        }
    }
    return applyApi;
}

const applyApi = MXApi({
    ready: function () {
        // console.log('device ready!!');
    },
    error: function (err) {
        // console.log(err);
    },
    beforeApply: function (namespace, api, args) { }
});


const makeApi = namespace => (api, ...args) => applyApi(namespace, api, args);
const MXCommon = makeApi('MXCommon');
const MXWebui = makeApi('MXWebui');
const MXContacts = makeApi('MXContacts');
const MXShare = makeApi('MXShare');



export const showOptionMenu = () => {
    return MXWebui('showOptionMenu');
}
export const hideOptionMenu = () => {
    return MXWebui('hideOptionMenu');
}
export const setCustomHeaderMenu = (...args) => {
    return MXWebui('setCustomHeaderMenu', ...args);
}

export const hideWebViewTitle = () => {
    return MXWebui('hideWebViewTitle');
}

export const showWebViewTitle = () => {
    return MXWebui('showWebViewTitle');
}
export const setWebViewTitle = (name) => {
    return MXWebui('setWebViewTitle', name);
}
export const getCurrentUser = callback => {
    return new Promise((resolve, reject) => {
        MXCommon('getCurrentUser', resolve);
    })
}

export const getServerUrl = callback => {
    return new Promise((resolve, reject) => {
        MXCommon('getServerUrl', resolve);
    })
}

export const viewPersonInfo = login_name => {
    return new Promise((resolve, reject) => {
        MXCommon('viewPersonInfo', login_name, resolve);
    })
}

export const MXSelectUsers = userIds => {
    return new Promise((resolve, reject) => {
        MXContacts('selectUsers', function (result) {
            resolve(result);
        }, {
            customUserIDS: userIds,
            enableSelectDept: false,
            canSelectSelf: true
        })
    })
}


export const getSSOToken = (appid) => {
    return new Promise((resolve, reject) => {
        MXCommon('getSSOToken', appid, function (sso_token) {
            resolve(sso_token)
        });
    })
}

//关闭当前页面
export const closeApp = () => {
    return MXWebui('closeWindow');
}
//选择图片
export const chooseImg = (count) => {
    return new Promise((resolve, reject) => {
        MXCommon('chooseFile', count, ['album', 'camera'], function (result) {
            resolve(result);
        })
    })
}
// 分享朋友圈
export const shareToChat = (data) => {
    return new Promise((resolve, reject) => {
        MXShare('shareToCircle', data, function (result) {
            resolve(result);
        })
    })
}

// 分享base64图片到工作圈
/*'base64': String, // base64格式的数据，去掉base64相关前缀
  'onSuccess': Function, //成功的回调
  'onFail': Function //失败的回调
  */
export const base64SendToCircle = (data) => {
    return new Promise((resolve, reject) => {
        MXCommon('base64SendToCircle', {
            'base64': data,
            'onSuccess': function (res) {
                // console.log("chengg");
                resolve(res)
            }, //成功的回调
            'onFail': (err) => {
                reject(err);
                // console.log("shiabi ");
            } //失败的回调
        })
        // MXCommon('base64SendToCircle', data,
        //   function (res) { console.log("chengg"); resolve(res) }, //成功的回调
        //   (err) => { reject(err); console.log("shiabi ") } //失败的回调
        // )
    })
}

//分享图片到微信朋友圈
export const shareToWxCircle = (data) => {
    return new Promise((resolve, reject) => {
        MXShare('share', {
            'platform': '2',
            'type': '2',
            'image_url': data,
            'onSuccess': function (res) {
                // console.log("chengg");
                resolve(res)
            }, //成功的回调
            'onFail': (err) => {
                reject(err);
                // console.log("shiabi ");
            } //失败的回调
        })
        // MXCommon('base64SendToCircle', data,
        //   function (res) { console.log("chengg"); resolve(res) }, //成功的回调
        //   (err) => { reject(err); console.log("shiabi ") } //失败的回调
        // )
    })
}


export const ajax = (params, header) => {

    // Toast.loading({
    //   duration: 0, // 持续展示 toast
    //   forbidClick: true,
    //   message: '加载中...',
    //   loadingType: 'spinner',
    // });

    return new Promise((resolve, reject) => {
        params = Object.assign({}, params, {
            // headers: {
            //   'Content-Type': 'application/json'
            // }
            headers: header
        }, {
            async: true,
            success: function (data, status, xhr) {
                //Toast.clear();
                // console.log("-------" + params.url + "-------");
                // console.log("网络数据：" + data);
                resolve({
                    data: JSON.parse(data),
                    status
                });
            },
            error: function (data, status, xhr) {
                //Toast.clear();
                // Toast("网络错误，请检查网络设置");
                // console.log("网络错误返回：" + data + status + JSON.stringify(xhr));
                // console.log("-------" + params.url + "-------");
                reject({
                    data,
                    status
                });
            }
        })
        MXCommon('ajax', params);
    })
}

const queryString = function (query) {
    let str = [];
    for (let key in query) {
        str.push(key + '=' + query[key])
    }
    return str.join('&')
}

export const ajaxGetToken = (url, query) => {
    url = query ? `${url}?${queryString(query)}` : url;
    // console.log('geturl =>', url);
    const params = {
        type: 'GET',
        url,
    }
    return ajax(params);
}

export const ajaxPost = (url, data) => {
    return ajax({
        type: 'POST',
        url,
        data
    })
}

export const ajaxPut = (url, data) => {
    return ajax({
        type: 'PUT',
        url,
        data
    })
}

export const ajaxDelete = (url, id) => {
    return ajax({
        type: 'DELETE',
        url: `${url}/${id}`
    })
}
export const shareToWechat = (url) => {
    // console.log(JSON.stringify({
    //     type: 4,
    //     imageUrl: url,
    //     platform: 1,
    // }));
    return MXShare('share', {
        type: 4,
        imageUrl: url,
        platform: 1,
    })
}

/**
 * 拍照、压缩、并添加水印
 * @param {*} content 定位地址
 * @param {*} id 工号
 */
export const MXCamera = (content, maxSize, faceCode) => new Promise((resolve, reject) => {
    let imgSize = maxSize ? maxSize : "1048576"
    console.log("参数设置：" + imgSize);
    let date = getFormatDate("yyyy-MM-dd hh:mm:ss");
    if (faceCode == '1') {
        var watermark = `${localStorage.getItem("GUARANTORNAME")}\n${date}\n${content}\n${localStorage.getItem("name")}`
    } else {
        var watermark = `${date}\n${content}\n${localStorage.getItem("name")}`
    }
    // console.log(date);
    MXCommon('chooseFile', {
        types: [{
            type: "camera", //类型：camera代表拍照
            maxSize: imgSize,
            // maxSize: "1024000", //返回照片文件最大值，由于受压缩算法限制不能保证可返回固定大小，只能保证压缩后获取到小于此参数的值，单位byte,1048576=1M
            watermark: [{
                content: watermark,
                fontColor: "#ffffff", //水印文字颜色，不设置使用默认值#000000
                fontSize: 12, //水印字体大小，单位pixel，不设置使用默认值30
                borderColor: "#000000", //描边颜色,不设置使用默认值#000000
                row: 3, //水印对应图片九宫格行数，取值范围1-3，不设置使用默认值1
                col: 3, //水印对应图片九宫格列数，取值范围1-3，不设置使用默认值1
                alignMargin: 50, //边距，如果水印在第一列为左边距，如果水印在第三列为右边距
                textAlign: "right", //水印文字对齐方式（当水印文字有/n换行时文字左对齐或右对齐），取值：left或right
                width: 150, //水印宽度
                height: 100, //水印高度
                rotate: 0, //文字斜率，代表度数，取值范围为0-360的整数，不设置使用默认值0
                tile: "false" //水印文字是否平铺，不设置使用默认值false
            }],
        }]
    }, (err) => {
        console.log(`take photo err:${err}`)
        reject(err)
    }, (result) => {
        let res = JSON.parse(result)

        // console.log('拍照回显成功' + imageSize("data:image/png;base64," + res.base64));
        console.log("图片" + JSON.stringify(res));
        resolve(res.base64)
    })
})

function imageSize(base64Str) {
    const indexBase64 = base64Str.indexOf("base64,");
    if (indexBase64 < 0) return -1;
    const str = base64Str.substr(indexBase64 + 6);
    return (str.length * 0.75).toFixed(2);
}
// 录像
export const MXVideo = () => new Promise((resolve, reject) => {
    MXCommon('selectVideoFromCamera', {
        limitedTime: 15000,
        'onSuccess': function (result) {
            // console.log("chengg");
            // let res = JSON.parse(result)
            console.log('视频录制成功');
            resolve(result)
        }, //成功的回调
        'onFail': (err) => {
            console.log(`take photo err:${err}`)
            reject(err)
            // console.log("shiabi ");
        } //失败
    })
})

//上传图片
export const updateImg = (imgUrl) => {
    return new Promise((resolve, reject) => {
        MXCommon('uploadFile', imgUrl, true, function (result) {
            resolve(result);
        }, function (error) {
            reject(error);
            console.log("文件上传失败" + JSON.stringify(error));
        })
    })
}
// 播放视频
export const palyVideo = (url) => {
    // console.log(url);
    return MXCommon('openVideo', url)
}


// 定位请求逻辑（自定义）
// 优先使用wifi和基站定位，因为定位速度会快一点，5s内没成功，
// 就调取gps加以辅助定位，10s内没定位成功，则视为定位失败，就说去空旷位置重新打卡  309逻辑
export const getLocation = () => {
    return new Promise((resolve, reject) => {
        Toast.loading({
            message: "定位请求中",
            duration: 0,
            forbidClick: true,
        });
        getLocationAndSetTime(); //调取请求

        //封装调取请求的方法
        async function getLocationCore(flag) {
            return new Promise((resolve) => {
                MXLocation.getLocation(
                    (res) => {
                        // console.log(JSON.stringify(res));
                        resolve({
                            code: 0,
                            data: JSON.parse(res)
                        }); // 成功
                    },
                    (res) => {
                        resolve({
                            code: 10000,
                            data: res
                        }); // 失败
                    },
                    //是否启用gps
                    flag
                );
            });
        }
        //设置计时器，可设置时间
        async function setTimeOutFunc(time) {
            return new Promise((res) => {
                setTimeout(() => {
                    res({
                        code: 10001
                    });
                }, time * 1000);
            });
        }
        async function getLocationAndSetTime() {
            //请求，在用wifi,基站定位和5s的计时器时间内，如果请求没成功，就切换gps定位
            let {
                code,
                data
            } = await Promise.race([
                getLocationCore(false),
                setTimeOutFunc(20)
            ]);
            //code 10000 失败 code 10001 超时
            if (code === 10000 || code === 10001) {
                let {
                    code,
                    data
                } = await Promise.race([
                    getLocationCore(true),
                    setTimeOutFunc(30)
                ])
                if (code === 0) {
                    MXLocation.regeocode({
                        latitude: data.latitude,
                        longitude: data.longitude,
                        radius: 500,
                        onSuccess: function (res) {
                            let regeoCodeRes = JSON.parse(res)
                            resolve(regeoCodeRes.address);
                            setTimeout(() => {
                                Toast.clear()
                            }, 1000)
                        },
                        onFail: function (res) {
                            Toast.fail(res)
                            reject(res)
                            setTimeout(() => {
                                Toast.clear()
                            }, 1000)
                        }
                    });
                } else if (code === 10001) {
                    Toast("定位失败，请到空旷位置或信号好的位置重新打卡！");
                    setTimeout(() => {
                        Toast.clear()
                    }, 1000)
                } else {
                    Toast.fail(data)
                    setTimeout(() => {
                        Toast.clear()
                    }, 1000)
                }
            } else {
                //代表请求成功，开始编码
                MXLocation.regeocode({
                    latitude: data.latitude,
                    longitude: data.longitude,
                    radius: 100,
                    onSuccess: function (res) {
                        let regeoCodeRes = JSON.parse(res)
                        resolve(regeoCodeRes.address)
                        Toast.clear()
                    },
                    onFail: function (res) {
                        reject(res)
                        Toast.clear();
                    }
                });
            }
        }
    })
}

/**
 * 获取定位信息并反编码
 */
export const getLocationWifi = () => new Promise((resolve, reject) => {
    Toast.loading({
        message: '定位请求中',
        forbidClick: true
    })
    MXLocation.getLocation(res => {
        // console.log(" =定位信息=" + res);
        let location = JSON.parse(res)
        MXLocation.regeocode({
            latitude: location.latitude,
            longitude: location.longitude,
            radius: 100,
            onSuccess: function (res) {
                let regeoCodeRes = JSON.parse(res)
                resolve(regeoCodeRes.address)
            },
            onFail: function (res) {
                Toast.fail(res)
                Toast.clear()
                reject(res)
            }
        });

    }, res => {
        Toast.fail(res)
        Toast.clear()
    }, false)
})