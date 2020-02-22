/**
 * @description 广场主页api路由
 * @author rumengbaobao
 */

const router = require('koa-router')()
const {getSquareBlogList} = require ('../../controller/blog-square')
const{getBlogListStr} = require ('../../utils/blog')

router.prefix('/api/square')

//加载更多
router.get('/loadMore/:pageIndex', async(ctx,next)=>{
  let {pageIndex} = ctx.params
  pageIndex = parseInt(pageIndex)
  const result = await getSquareBlogList(pageIndex)
  // //渲染为html字符串
  result.data.blogListTpl = getBlogListStr(result.data.blogList)
  ctx.body = result
})

module.exports= router
