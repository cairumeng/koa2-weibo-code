/**
 * @description: user view router
 * @author: rumengbaobao
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')



/**
 * 获取登录信息
 * @param {object} ctx
 */
const getLoginInfo = (ctx) => {
  let data = {
    isLogin: false //默认未登录
  }
  const userInfo = ctx.session.userInfo

  if (userInfo) {
    data = {
      isLogin: true,
      userName: userInfo.userName
    }
  }

  console.log(data)
  return data
}
//登录路由
router.get('/login', async (ctx, next) => {
  await ctx.render('login', getLoginInfo(ctx))
})

//注册路由
router.get('/register', async (ctx, next) => {
  await ctx.render('register', getLoginInfo(ctx))
})

//用户信息设置路由
router.get('/setting', loginRedirect, async (ctx, next) => {
  await ctx.render('setting', ctx.session.userInfo)
})


module.exports = router