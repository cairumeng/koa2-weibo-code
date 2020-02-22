/**
 * @description 微博缓存
 * @author rumengbaobao
 */
const { get, set } = require('./_redis')
const { getBlogList } = require('../service/blog')
const KEY_PREFIX = 'weibo:square:'

const getSquareCacheList = async ({pageIndex, pageSize}) => {
  const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`

  //尝试获取缓存
  const cacheResult = await get(key)
  if (cacheResult) {
    return cacheResult
  }

  //没有缓存或者缓存过期
  const result = await getBlogList({ pageIndex, pageSize })

  //设置缓存
  set(key, result, 60)

  return result
}
module.exports = {
  getSquareCacheList
}