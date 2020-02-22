/**
 * @description 首页api路由
 * @author rumengbaobao
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { genValidator } = require('../../middlewares/validator')
const { create } = require('../../controller/blog-home')
const blogValidate = require ('../../validator.js/blog')

router.prefix ('/api/blog')

router.post('/create', loginCheck, genValidator(blogValidate), async (ctx, next) => {
  const { content, image } = ctx.request.body
  const { id: userId } = ctx.session.userInfo
  //controller
  ctx.body = await create({ userId, content, image })
})

module.exports = router