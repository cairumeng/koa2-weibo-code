/**
 * @description 数据格式化
 * @author rumengbaobao
 */

const { DEFAULT_PICTURE } = require('../conf/constant')

//用户默认头像
const _formatUserPicture = (obj) => {
  if (obj.picture === null) {
    obj.picture = DEFAULT_PICTURE
  }
  return obj
}

/**
 * @param {Array|Object} list 用户列表或者单个用户对象
 */
const formatUser = (list) => {
  if (list === null) {
    return null
  }
  if (list instanceof Array) {// 判断是不是数组
    return list.map(_formatUserPicture)
  }

  // 单个对象
  return _formatUserPicture(list)
}

module.exports = {
  formatUser
}