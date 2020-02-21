/**
 * 
 * @description 微博数据模型
 * @author rumengbaobao
 */

const {INTEGER, STRING, TEXT} = require ('../types')
const seq = require('../seq')

const Blog = seq.define('blog', {
  userId:{
    type:INTEGER,
    allowNull:false,
  },
  content: {
    type: TEXT,
    allowNull: false
  },
  image: {
    type:STRING,
  }
})

module.exports = Blog
