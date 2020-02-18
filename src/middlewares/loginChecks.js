/**
 * @description 登录验证的中间件
 * @ author rumengbaobao
 */

/**
 * 
 * @param {object} ctx 
 * @param {function} next 
 */

const {ErrorModel} = require('../model/ResModel')
const {loginCheckFailInfo} =  require ('../model/ErrorInfo')
const loginCheck = async (ctx, next) => {
  if (ctx.seesion && ctx.seesion.userInfo) {
    //已登录
    await next()
    return
  }
  ctx.body = new ErrorModel(loginCheckFailInfo)

}

/**
 * 
 * @param {object} ctx 
 * @param {function} next 
 */

const loginRedirect = async (ctx, next) => {
  if (ctx.session && ctx.session.userInfo) {
    await next()
    return
  }
  const curUrl = ctx.url
  ctx.redirect('/login?url=' + encodeURIComponent(curUrl))//以便登录后可以重新跳转到预先要去的页面
}

module.exports = {
  loginCheck,
  loginRedirect
}