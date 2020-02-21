/**
 * @description 微博service
 * @author rumengbaobao
 */

const { Blog } = require('../db/models/index')

/**
 * 
 * @param {object} param0 创建微博数据
 */
const createBlog = async ({ userId, content, image }) => {
  const result = await Blog.create({
    userId,
    content,
    image
  })
  return result.dataValues
}

module.exports = {
  createBlog
}