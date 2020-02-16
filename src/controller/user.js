/**
 * @description user controller
 * @author rumengbaobao
 */

const { getUserInfo, CreateUser } = require('../service/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  resgisterFailInfo,
  loginFailInfo
} = require('../model/ErroInfo')
const doCrypto = require('../utils/cryp')


const isExist = async (userName) => {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    return new SuccessModel(userInfo)
    // {errno:0, data :{}}
  } else {
    return new ErrorModel(registerUserNameNotExistInfo)
    //{errno:10003, message:'用户已存在'}
  }
}

/**
 * 
 * @param {string} userName
 * @param {string} password
 * @param {number} gender
 */
const register = async ({ userName, password, gender }) => {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    //用户已存在
    return ErrorModel(registerUserNameExistInfo)
  }
  //注册service
  try {
    await CreateUser({
      userName,
      password: doCrypto(password),
      gender
    })
    return new SuccessModel()

  } catch (ex) {
    return new ErrorModel(resgisterFailInfo)
  }
}

/**
 * 
 * @param {object} ctx 
 * @param {string} userName 
 * @param {string} password 
 */
const login = async (ctx, userName, password) => {
  const userInfo = await getUserInfo(userName, doCrypto(password))

  if (!userInfo) {
    //登录失败
    return new ErrorModel(loginFailInfo)
  }
  //登录成功
  ctx.session.userInfo = userInfo
  return new SuccessModel(userInfo)
}

module.exports = {
  isExist,
  register,
  login
}