/**
 * @description user API路由
 * @author rumengbaobao
 */
const router = require('koa-router')()
const { isExist, /* register */ } = require('../../controller/user')

router.prefix('/api/user')

// 注册路由
router.post('/register', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  // ctx.body = await register(userName, password)
})

//用户是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

module.exports = router
