const router = require('koa-router')()

router.prefix('/users')

router.get('/', async(ctx, next)=>{
  ctx.body = 'this is a users response!'
})

router.get('/bar', async(ctx, next)=>{
  ctx.body = 'this is a users/bar response'
})

router.post('/login',async(ctx,next)=>{
  const{userName, password} = ctx.request.body
  ctx.body={
    tag: '100',
    userName,
    password
  }
})

module.exports = router
