/**
 * @description 失败信息合集，包括errno 和message
 * @author rumeng
 */
module.exports = {
  //用户名已存在
  registerUserNameExistInfo: {
    errno: 10001,
    message: '用户名已存在'
  },

  //注册失败
  registerFailInfo: {
    errno: 10002,
    message: '注册失败'
  },

  //用户名未存在
  registerUserNameNotExistInfo: {
    errno: 10003,
    message: '用户名未存在'
  },

  //登录失败
  registerUserNameExistInfo: {
    errno: 10004,
    message: '登录失败'
  },

  // 未登录
  registerUserNameExistInfo: {
    errno: 10005,
    message: '您尚未登录'
  },
  //修改密码失败
  registerUserNameExistInfo: {
    errno: 10006,
    message: '修改密码失败，请重试'
  },

  // 上传文件过大
  registerUserNameExistInfo: {
    errno: 10007,
    message: '上传文件尺寸过大'
  },

  // 修改基本信息失败
  registerUserNameExistInfo: {
    errno: 10008,
    message: '修改基本信息失败'
  },

  // json schema 校验失败
  registerUserNameExistInfo: {
    errno: 10009,
    message: '数据格式校验错误'
  },

  // 删除用户失败
  registerUserNameExistInfo: {
    errno: 10010,
    message: '删除用户失败'
  },

  //添加关注失败
  registerUserNameExistInfo: {
    errno: 10011,
    message: '添加关注失败'
  },

  //取消关注失败
  registerUserNameExistInfo: {
    errno: 10012,
    message: '取消关注失败'
  },

  //创建微博失败
  registerUserNameExistInfo: {
    errno: 11001,
    message: '用户名已存在'
  },

  // 删除微博失败
  registerUserNameExistInfo: {
    errno: 11002,
    message: '删除微博失败，请重试'
  }
}
