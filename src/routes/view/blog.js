/**
 * @description 微博view路由
 * @author rumengbaobao
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const {getSquareBlogList} = require ('../../controller/blog-square')

//首页
router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {
  })
})

//个人主页
router.get('/profile', loginRedirect, async (ctx, next) => {
  const { userName } = ctx.session.userInfo
  ctx.redirect(`/profile/${userName}`)
})

router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
  const { userName: curUserName } = ctx.params

  //controller获取微博第一页数据
  const result = await getProfileBlogList(curUserName)
  const { isEmpty, blogList,pageSize, pageIndex, count } = result.data
  await ctx.render('profile', {
    blogData: {
      isEmpty,
      blogList,
      pageIndex,
      pageSize,
      count
    },
    userData: {
      userInfo: ctx.session.userInfo
    }
  })
})

//微博广场
router.get('/square', async(ctx,next)=>{
  const result = await getSquareBlogList()
  const { isEmpty, blogList,pageSize, pageIndex, count } = result.data
  await ctx.render('square',{
    blogData: {
      isEmpty,
      blogList,
      pageIndex,
      pageSize,
      count
    }
  })
})

module.exports = router