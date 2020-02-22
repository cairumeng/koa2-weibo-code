/**
 * @description 微博数据格式校验
 * @author rumengbaobao
 */
const validate = require('./_validate')

const SCHEMA = {
  type: 'object',
  properties: {
    content:{
      type:'string'

    },
    image:{
      type:'string',
      maxLength:255
    }
  }
}

/**
  * 校验用户数据格式 
  * @param {Object} data 用户数据
  */
const blogValidate = (data = {}) => { //默认data 为空对象
  return validate(SCHEMA, data)
}

module.exports = blogValidate