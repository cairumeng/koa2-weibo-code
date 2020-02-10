const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const User = require('../../models/User')
const { SECRET } = require('../../conf/app')

router.prefix('/auth')

router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  const user = await User.findOne({
    where: {
      userName
    }
  })
  if (user) {
    if (user.password === password) {
      ctx.body = {
        token: jwt.sign(user.dataValues, SECRET, { expiresIn: '1h' })
      }

    } else {
      ctx.body = {
        error: 'password is not correct'
      }
    }
  } else {
    ctx.body = {
      error: 'this user does not exist'
    }
  }
})
module.exports = router