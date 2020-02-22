/**
 * @description 微博个人主页
 * @author rumengbaobao
 */
const { getBlogList } = require('../service/blog')
const { PAGE_SIZE } = require('../conf/constant')
const { SuccessModel } = require('../model/ResModel')
const {getSquareCacheList} = require ('../cache/blog')

const getSquareBlogList = async(pageIndex=0)=>{
  const result = await getSquareCacheList({
    pageIndex,
    pageSize:PAGE_SIZE
  })

  const blogList = result.blogList
   
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize:PAGE_SIZE,
    pageIndex,
    count:result.count
  })
}

module.exports ={
  getSquareBlogList
}