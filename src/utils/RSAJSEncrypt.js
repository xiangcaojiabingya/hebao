import {
  JSEncrypt
} from 'jsencrypt'
//  RSA算法(非对称加密)
const rsaUtil = {
  // RSA 位数，这里要跟后端对应
  bits: 64,
  // 当前JSEncrypted对象
  thisKeyPair: {},

  // 生成密钥对(公钥和私钥)
  genKeyPair: function (bits = rsaUtil.bits) {
    let genKeyPair = {}
    rsaUtil.thisKeyPair = new JSEncrypt({
      default_key_size: bits
    })

    // 获取私钥
    genKeyPair.privateKey = rsaUtil.thisKeyPair.getPrivateKey().replace(/\n/g, '').replace('-----BEGIN RSA PRIVATE KEY-----', '').replace('-----END RSA PRIVATE KEY-----', '')

    // 获取公钥
    genKeyPair.publicKey = rsaUtil.thisKeyPair.getPublicKey().replace(/\n/g, '').replace('-----BEGIN PUBLIC KEY-----', '').replace('-----END PUBLIC KEY-----', '')

    return genKeyPair
  },

  /**
   * 加密方法
   * @param plaintext  加密文本
   * @param publicKey  公钥
   * @returns {CipherParams|PromiseLike<ArrayBuffer>}
   * @constructor
   */
  Encrypt(plaintext, publicKey) {
    let encrypt = new JSEncrypt()
    encrypt.setPublicKey(publicKey)
    return encrypt.encrypt(plaintext)
  },

  /**
   * 解密方法
   * @param ciphertext 解密文本
   * @param privateKey 私钥
   * @returns {WordArray|PromiseLike<ArrayBuffer>}
   * @constructor
   */
  Decrypt(ciphertext, privateKey) {
    let decrypt = new JSEncrypt()
    decrypt.setPrivateKey(privateKey)
    return decrypt.decrypt(ciphertext)
  }
}
export default rsaUtil



// 生成密钥对(公钥和私钥)
export function genKeyPair(bits = rsaUtil.bits) {
  let genKeyPair = {}
  rsaUtil.thisKeyPair = new JSEncrypt({
    default_key_size: bits
  })

  // 获取私钥
  genKeyPair.privateKey = rsaUtil.thisKeyPair.getPrivateKey().replace(/\n/g, '').replace('-----BEGIN RSA PRIVATE KEY-----', '').replace('-----END RSA PRIVATE KEY-----', '')

  // 获取公钥
  genKeyPair.publicKey = rsaUtil.thisKeyPair.getPublicKey().replace(/\n/g, '').replace('-----BEGIN PUBLIC KEY-----', '').replace('-----END PUBLIC KEY-----', '')

  return genKeyPair
}

/**
 * 加密方法
 * @param plaintext  加密文本
 * @param publicKey  公钥
 * @returns {CipherParams|PromiseLike<ArrayBuffer>}
 * @constructor
 */
export function Encrypt(plaintext, publicKey) {
  let encrypt = new JSEncrypt()
  encrypt.setPublicKey(publicKey)
  return encrypt.encrypt(plaintext)
}

/**
 * 解密方法
 * @param ciphertext 解密文本
 * @param privateKey 私钥
 * @returns {WordArray|PromiseLike<ArrayBuffer>}
 * @constructor
 */
export function Decrypt(ciphertext, privateKey) {
  let decrypt = new JSEncrypt()
  decrypt.setPrivateKey(privateKey)
  return decrypt.decrypt(ciphertext)
}
