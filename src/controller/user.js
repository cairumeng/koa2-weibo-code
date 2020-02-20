/**
 * @description user controller
 * @author rumengbaobao
 */

const {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser } = require('../service/user')
const {
  SuccessModel,
  ErrorModel } = require('../model/ResModel')

const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  resgisterFailInfo,
  loginFailInfo,
  deleteUserFailInfo,
  changeInfoFailInfo
} = require('../model/ErrorInfo')

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
    return new ErrorModel(registerUserNameExistInfo)
  }
  //注册service
  try {
    await createUser({
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
  return new SuccessModel()
}

const deleteCurUser = async (userName) => {
  //service
  const result = await deleteUser(userName)
  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(deleteUserFailInfo)

}
/**
 * 
 * @param {object} ctx 
 * @param {string} nickName 
 * @param {string} city
 * @param {string} picture
 * 
 */
const changeInfo = async (ctx, { nickName, city, picture }) => {
  const { userName } = ctx.session.userInfo
  if (!nickName) {
    nickName = userName
  }
  //service
  const result = await updateUser(
    {
      newNickName: nickName,
      newCity: city,
      newPicture: picture

    }, { userName })

  if (result) {
    Object.assign(ctx.session.userInfo, {
      nickName,
      city,
      picture
    })
    return new SuccessModel()
  }
  return new ErrorModel(changeInfoFailInfo)

}

module.exports = {
  isExist,
  register,
  login,
  deleteCurUser,
  changeInfo
}