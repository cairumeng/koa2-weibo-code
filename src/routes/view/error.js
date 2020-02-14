/**
 * description: error route and 404 route
 * author: rumengbaobao
 */
const router = require('koa-router')()

//error route
router.get('/error', async (ctx, next) => {
  await ctx.render('error')
})

//404 route
router.get('*', async (ctx, next) => {
  await ctx.render('404')
})
module.exports = router
