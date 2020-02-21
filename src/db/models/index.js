/**
 * @description数据模型入口文件
 * @author rumengbaobao
 */

const User = require('./User')
const Blog = require ('./Blog')

Blog.belongsTo(User,{
  foreignKey:'userId'
})
module.exports = {
  User,
  Blog
}