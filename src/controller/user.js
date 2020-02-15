/**
 * @description user controller
 * @author rumengbaobao
 */

const { getUserInfo, CreateUser } = require('../service/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  resgisterFailInfo
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
    console.error(ex.message, ex.stack)
    return new ErrorModel(resgisterFailInfo)
  }

}
module.exports = {
  isExist,
  register
}