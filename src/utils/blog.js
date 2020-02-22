/**
 * @description 微博数据相关的数据方法
 * @author rumengbaobao
 */

const fs = require ('fs')
const path= require ('path')
const ejs = require ('ejs')

// 获取blog-list.ejs 的文件内容
const Blog_LIST_TPL = fs.readFileSync(
  path.join(__dirname,'..','views','widgets','blog-list.ejs')  
).toString()

/**
  * @param {Array} blogList 微博列表
  * @param {boolen} canReply 是否可以回复
  */
const getBlogListStr = (blogList=[], canReply=false)=>{
  return ejs.render(Blog_LIST_TPL,{
    blogList,
    canReply
  })
}

module.exports= {
  getBlogListStr
}

