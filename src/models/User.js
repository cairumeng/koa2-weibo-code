const Sequelize = require('sequelize')
const seq = require('../db/seq')

const User = seq.define('user', {
  userName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nickName: {
    type: Sequelize.STRING,
    comment: '昵称'
  }
})

module.exports = User
