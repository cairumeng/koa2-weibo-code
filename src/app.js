const path = require('path')
const Koa = require('koa')
//app 是koa的一个实例
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const koaStatic = require('koa-static')


const { REDIS_CONF } = require('../src/conf/db')
const { SESSION_SECRET_KEY } = require('../src/conf/secretKeys')

//引入路由

const users = require('./routes/api/user')
const squareAPIRouter = require('./routes/api/blog-square')
const profileAPIRouter = require ('./routes/api/blog-profile')
const homeAPIRouter = require('./routes/api/blog-home')
const blogViewRouter = require('./routes/view/blog')
const utilsAPIRouter = require ('./routes/api/utils')
const userViewRouter = require('./routes/view/user')
const userAPIRouter = require('./routes/api/user')
const errorViewRouter = require('./routes/view/error')


// error handler
const onerrorConf = { redirect: '/error' }
onerror(app, onerrorConf)

//middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())//以上两个针对post传上的数据变成json格式
app.use(logger())//日志功能
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))//ejs注册 


// // logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// }) 与上面logger重复，是上面封装logger一个展示 


// session 的配置
app.keys = [SESSION_SECRET_KEY]
app.use(session({
  key: 'weibo.sid', //cookie名字 默认是 'koa.sid'
  prefix: 'weibo:sess:',// redis key的前缀 默认是 'koa:sess:'
  cookie: {
    path: '/',
    httpOnly: true, //指cookie 名字只能在服务端修改，避免客户端恶意篡改
    maxAge: 24 * 60 * 60 * 1000 //ms 保存时间为一天
  },
  // ttl:24 * 60 * 60 *1000,  redis过期时间默认
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// routes 路由的注册  
app.use(users.routes(), users.allowedMethods())
app.use(squareAPIRouter.routes(),users.allowedMethods())
app.use(profileAPIRouter.routes(), profileAPIRouter.allowedMethods())
app.use(homeAPIRouter.routes(), homeAPIRouter.allowedMethods())
app.use(blogViewRouter.routes(),blogViewRouter.allowedMethods())
app.use(utilsAPIRouter.routes(),userAPIRouter.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())// 404的路由一定要写到最后，否则会拦截其他路由

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
