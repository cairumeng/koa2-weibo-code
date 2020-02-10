const router = require('koa-router')()
const { SECRET } = require('../../conf/app')
const jwt = require('jsonwebtoken')
const util = require ('util')
const verify = util.promisify(jwt.verify)

router.prefix('/users')

router.get('/', async (ctx, next) => {
  ctx.body = 'this is a users response!'
})

router.get('/getUserInfo', async (ctx, next) => {
  const token = ctx.header.authorization
  try {
    const payload = await verify(token.split(' ')[1], SECRET)
    ctx.body = {
      data: payload
    }
  } catch (e) {
    console.log(e)
    ctx.body = {
      error: e
    }
  }
})

router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  ctx.body = {
    tag: '100',
    userName,
    password
  }
})


module.exports = router
