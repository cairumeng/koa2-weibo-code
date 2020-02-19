/**
 * @description  user 数据格式
 * @author rumengbaobao
 */

const validate = require('./_validate')

const SCHEMA = {
  type: 'object',
  properties: {
    userName: {
      type: 'string',
      pattern: '^[a-zA-Z][a-zA-Z0-9_]+$',
      maxLength: 255,
      minLength: 2
    },
    password: {
      type: 'string',
      maxLength: 255,
      minLength: 3
    },
    newPassword: {
      type: 'string',
      maxLength: 255,
      minLength: 3
    },
    nickName: {
      type: 'string',
      maxLength: 255,
    },
    picture: {
      type: 'string',
      maxLength: 255,
    },
    city: {
      type: 'string',
      maxLength: 255,
      minLength: 2
    },
    gender: {
      type: 'number',
      minimun: 1,
      maximum: 3
    }
  }
}

/**
  * 校验用户数据格式
  * @param {Object} data 用户数据
  */
const userValidate = (data = {}) => { //默认data 为空对象
  return validate(SCHEMA, data)
}

module.exports = userValidate