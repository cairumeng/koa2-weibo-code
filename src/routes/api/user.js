/**
 * @description user API路由 : routes里只要写输入什么，输出什么，函数具体内容在controller里写
 * @author rumengbaobao
 */
const router = require('koa-router')()
const { 
  isExist, 
  register, 
  login, 
  deleteCurUser,
  changeInfo
} = require('../../controller/user')
const userValidate = require('../../validator.js/user')
const { genValidator } = require('../../middlewares/validator')
const { isTest } = require('../../utils/env')
const { loginCheck } = require('../../middlewares/loginChecks')

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

// 用户是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

// 登录
router.post('/login', async (ctx, nex) => {
  const { userName, password } = ctx.request.body
  //controller
  ctx.body = await login(ctx, userName, password)
})

// 删除
router.post('/delete', loginCheck, async (ctx, next) => {
  console.log(isTest)
  if (isTest) {
    // 测试环境下，测试账号登录后，可以删除自己
    const { userName } = ctx.session.userInfo
    console.log(userName)
    //调用controller
    ctx.body = await deleteCurUser(userName)
  }
})

//修改个人信息的路由
router.patch('/changeInfo', loginCheck, genValidator(userValidate), async (ctx, next) => {
  const { nickName, city, picture } = ctx.request.body
  //controller
  ctx.body = await changeInfo(ctx, { nickName, city, picture })

})
module.exports = router
