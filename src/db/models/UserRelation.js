/**
 * @description 用户关注关系
 * @author rumengbaobao 
 */

const seq = require('../seq')
const {INTEGER} = require('../types')

const UserRelation = seq.define('userRelation',{
  userId:{
    type:INTEGER,
    allowNull:false
  },
  followerId:{
    type:INTEGER,
    allowNull:false
  }

})

module.exports =UserRelation