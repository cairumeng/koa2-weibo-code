/**
 * @description json schema 检验
 * @author rumengbaobao
 */

const Ajv = require('ajv')
const ajv = new Ajv({
  //  allErrors:true // 输出所有的错误（比较慢）
})


/**
  * 
  * @param {object} schema json schema规则
  * @param {object} data  待校验的数据
  */
const validate = (schema, data = {}) => {
  const valid = ajv.validate(schema, data)
  if (!valid) {
    return ajv.errors[0]//输出第一个错误
  }

}
module.exports = validate
