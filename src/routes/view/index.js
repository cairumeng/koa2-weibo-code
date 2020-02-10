const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  throw Error
  await ctx.render('index', {
    title: 'kao2',
    userName:'Rumengbaobao'
  })
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/profile/:userName',async(ctx,next)=>{
  const {userName} = ctx.params
  await ctx.render('index', {
    title:'欢迎学习koa2！',
    isMe: true,
    userName,
    blogList:[
      {id:1, title:'aaa'},
      {id:2, title:'bbb'},
      {id:3, title:'ccc'},
      {id:4, title:'ddd'},
    ]
  })
})

router.get('/loadMore/:userName/:pageIndex', async(ctx,next)=>{
  const {userName,pageIndex} = ctx.params
  ctx.body= {
    title: 'this is loadMore page',
    userName,
    pageIndex
  }
})
module.exports = router