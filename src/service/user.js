/**
 * @description user service
 * @author rumengbaobao
 */

const { User } = require('../db/models/index')
const { formatUser } = require('../service/_format')


/**
 * 
 * @param {string} userName 
 * @param {string} password 
 */
const getUserInfo = async (userName, password) => {
  //查询条件，如果只有username就只查询username，如果有password就把它也加到查询条件中
  const whereOpt = {
    userName
  }

  if (password) {
    Object.assign(whereOpt, { password })
  }

  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereOpt
  })
  if (result === null) {
    //没找到，或者错误
    return null
  }

  //格式化处理，比如头像图片没有的话，就给他一个默认
  return formatUser(result.dataValues)
}

/**
 * 创建用户
 * @param{string} userName
 * @param{string} password
 * @param{number} gender
 * @param{string} nickName
 */

const createUser = async ({ userName, password, gender = 3, nickName }) => {
  const result = await User.create({
    userName,
    password,
    nickName: nickName ? nickName : userName,
    gender
  })
  return result
}

/**
 * 删除用户
 * @param {string} userName
 * 
 */
const deleteUser = async (userName) => {
  const result = await User.destroy({
    where: {
      userName
    }
  })
  return result > 0
}


const updateUser = async (
  { newPassword, newNickName, newPicture, newCity },
  { userName, password }) => {
  //拼接修改内容
  const updateData = {}
  if (newPassword) {
    updateData.password = newPassword
  }
  if (newNickName) {
    updateData.nickName = newNickName

  }
  if (newPicture) {
    updateData.picture = newPicture
  }
  if (newCity) {
    updateData.city = newCity
  }

  //拼接查询条件

  const whereData = {
    userName
  }

  if (password) {
    whereData.password = password
  }

  //执行修改

  const result = await User.update(updateData, {
    where: whereData
  })
  return result[0] > 0// 修改行数

}

module.exports = {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser
}