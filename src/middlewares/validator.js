/**
 * @description json schema 验证中间件
 * @author rumengbaobao
 */

const { ErrorModel } = require('../model/ResModel')
const { jsonSchemaFileInfo } = require('../model/ErrorInfo')

const genValidator = (validateFn) => {
  return async (ctx, next) => {
    const data = ctx.request.body
    const error = validateFn(data)
    if (error) {
      //验证失败
      ctx.body = new ErrorModel(jsonSchemaFileInfo)
      console.error(error)
      return
    }
    //验证成功，继续
    await next()
  }

}

module.exports = {
  genValidator
}