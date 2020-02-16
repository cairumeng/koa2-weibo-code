/**
 * @description user API路由 : routes里只要写输入什么，输出什么，函数具体内容在controller里写
 * @author rumengbaobao
 */
const router = require('koa-router')()
const { isExist, register, login } = require('../../controller/user')
const userValidate = require('../../validator.js/user')
const { genValidator } = require('../../middlewares/validator')

router.prefix('/api/user')

// 注册路由 genValidator(userValidate)的返回值是一个middleware，路由里面可以加任意个middleware,它必须是个函数，而且有两个参数分别是ctx，next

router.post('/register', genValidator(userValidate), async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body
  // 调用controller，返回
  ctx.body = await register({
    userName,
    password,
    gender
  }) 
})
//登录
router.post('/login', async (ctx, nex) => {
  const { userName, password } = ctx.request.body
  //controller
  ctx.body = await login(ctx, userName, password)
})

//用户是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

module.exports = router
