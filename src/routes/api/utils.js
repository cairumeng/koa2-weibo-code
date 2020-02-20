/**
 * @description utils api 路由 
 * @author rumengbaobao
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const koaFrom = require('formidable-upload-koa')
const { saveFile } = require('../../controller/utils')

router.prefix('/api/utils')

//上传图片
router.post('/upload', loginCheck, koaFrom(), async (ctx, next) => {
  const file = ctx.req.files['file']//获取文件，my-ajax.js文件中的 append 对应的名字一致
  if(!file){
    return
  }
  const { size, path, name, type } = file
  //controller
  ctx.body = await saveFile({
    name,
    type,
    size,
    filePath: path
  })


})

module.exports = router