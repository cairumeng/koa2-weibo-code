/**
 * @description 首页controller
 * @author rumengbaobao
 */

const { createBlog } = require('../service/blog')
const { SuccessModel, ErrorModel } = require ('../model/ResModel')
const {createBlogFailInfo} = require ('../model/ErrorInfo')
/**
 * 
 * @param {intger} userId 
 * @param {text} content
 * @param {string} image 
 */
const create = async ({ userId, content, image }) => {
  //service

  try {
    const blog = await createBlog({
      userId,
      content,
      image
    })
    return new SuccessModel(blog)
  } catch (ex) {
    console.error(ex.message, ex.stack)
    return new ErrorModel(createBlogFailInfo)
  }

}

module.exports = {
  create
}