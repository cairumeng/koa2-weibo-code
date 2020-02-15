/**
 * @description user API路由 : routes里只要写输入什么，输出什么，函数具体内容在controller里写
 * @author rumengbaobao
 */
const router = require('koa-router')()
const { isExist,  register  } = require('../../controller/user')

router.prefix('/api/user')

// 注册路由
router.post('/register', async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body
  // 调用controller，返回
  ctx.body = await register({
    userName,
    password,
    gender
  })
})

//用户是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

module.exports = router
