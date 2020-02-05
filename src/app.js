const Koa = require('koa')
//app 是koa的一个实例
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
//引入路由
const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())//以上两个针对post传上的数据变成json格式

app.use(logger())//日志功能
app.use(require('koa-static')(__dirname + '/public'))//静态化public文件

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

// routes 路由的注册
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
