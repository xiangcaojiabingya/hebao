import CryptoJS from 'crypto-js'
//  AES算法(对称加密)
/**
 * 加密方法
 * @param plaintext  加密文本
 * @param publicKey  公钥
 * @returns {CipherParams|PromiseLike<ArrayBuffer>}
 * @constructor
 */
export function Encrypt(plaintext, key) {
  if (plaintext instanceof Object) {
    // JSON.stringify
    plaintext = JSON.stringify(plaintext)
  }
  let encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(plaintext), CryptoJS.enc.Utf8.parse(key), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}

/**
 * 解密方法
 * @param ciphertext 解密文本
 * @param privateKey 私钥
 * @returns {WordArray|PromiseLike<ArrayBuffer>}
 * @constructor
 */
export function Decrypt(ciphertext, key) {
  let decrypt = CryptoJS.AES.decrypt(ciphertext, CryptoJS.enc.Utf8.parse(key), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  let decString = CryptoJS.enc.Utf8.stringify(decrypt).toString()
  if (decString.charAt(0) === '{' || decString.charAt(0) === '[') {
    // JSON.parse
    decString = JSON.parse(decString)
  }
  return decString
}

/**
 * 生成16位秘钥
 * @returns {string}
 * @constructor
 */
export function GetKey() {
  /**
   * @return {string}
   */
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (S4() + S4() + S4() + S4())
}
