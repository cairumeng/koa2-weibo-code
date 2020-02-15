/**
 * @description 加密方法
 * @author rumengbaobao
 */

const crypto = require('crypto')
const { CRYPTO_SECRET_KEY } = require('../conf/secretKeys')

/**
 * md5 加密
 * @param {string} content 铭文
 */

const md5 = (content) => {
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

/**
 * 加密方法
 * @param {string} content 铭文
 */

const doCrypto = (content) => {
  const str = `password = ${content} & key = ${CRYPTO_SECRET_KEY}`//明文加上秘钥然后加密
  return md5(str)
}
module.exports = doCrypto
