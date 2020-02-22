/**
 * @description 微博service
 * @author rumengbaobao
 */

const { Blog, User } = require('../db/models/index')
const { formatUser } = require('./_format')

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

/**
 * 根据用户获取博客列表
 * @param {string} userName 
 * @param {integer} pageIndex 
 * @param {intger} pageSize 
 */
const getBlogListByUser = async ({userName, pageIndex = 0, pageSize = 10}) => {
  //拼接查询条件
  const userWhereOpts = {}
  if (userName) {
    userWhereOpts.userName = userName
  }

  //执行查询
  const result = await Blog.findAndCountAll({
    limit: pageSize, //每页多少条
    offset: pageSize * pageIndex, //跳过多少条
    order: [
      ['id', 'desc']
    ],
    include: [{
      model: User,
      attributes: ['userName', 'nickName', 'picture'],
      where: userWhereOpts
    }]
  })
  //result.count 总数，跟分页无关
  //result.rows 查询结果，数组
  let blogList = result.rows.map(row => row.dataValues)
  blogList = blogList.map(blogItem => {
    blogItem.user = formatUser(blogItem.user.dataValues)
    blogItem.contentFormat = blogItem.content
    blogItem.createdAtFormat = blogItem.createdAt
    return blogItem
  })

  return {
    count: result.count,
    blogList
  }
}

module.exports = {
  createBlog,
  getBlogListByUser
}