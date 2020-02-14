const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'kao2',
    isMe: true,
    userName:'Rumengbaobao',
    blogList:[
      {id:1, title:'aaa'},
      {id:2, title:'bbb'},
      {id:3, title:'ccc'},
      {id:4, title:'ddd'},
    ],
    viewNum: 0
  })
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/profile/:userName',async(ctx,next)=>{
  const session = ctx.session
  if (session.viewNum == null){
    session.viewNum = 0
  }else{
    session.viewNum ++
  }
 
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
    ],
    viewNum:session.viewNum
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
