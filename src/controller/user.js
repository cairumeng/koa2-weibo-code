/**
 * @description user controller
 * @author rumengbaobao
 */

const { getUserInfo } = require('../service/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExistInfo } = require('../model/ErroInfo')

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

module.exports = {
  isExist
}