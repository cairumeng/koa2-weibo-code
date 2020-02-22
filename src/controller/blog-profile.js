/**
 * @description 微博个人主页
 * @author rumengbaobao
 */
const { getBlogListByUser } = require('../service/blog')
const { PAGE_SIZE } = require('../conf/constant')
const { SuccessModel } = require('../model/ResModel')

/**
 * 
 * @param {string} userName 
 * @param {integer} pageIndex 
 */
const getProfileBlogList = async (userName, pageIndex = 0) => {
  // service
  const result = await getBlogListByUser({
    userName,
    pageIndex,
    pageSize: PAGE_SIZE
  })
  const blogList = result.blogList
  //拼接返回数据
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize:PAGE_SIZE,
    pageIndex,
    count:result.count
  })
}

module.exports = {
  getProfileBlogList
}