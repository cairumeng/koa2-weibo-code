/**
 * @description:redis的连接方法，set get
 * @author：rumeng
 *
 */

const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')


//创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
  console.error('redis error', err)
})

/**
 * redis set
 * @param {string} key 
 * @param {string|object} val 
 * @param {number} timeout 
 */
const set = (key, val, timeout = 60 * 60) => {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val)
  redisClient.expire(key, timeout)
}

/**
 * redis get
 * @param {string} key 
 */
const get = (key) => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
      } else if (val === null) {
        resolve(null)
      } else {
        try {
          resolve(JSON.parse(val))
        } catch (ex) {
          resolve(val)
        }
      }
    })
  })
}

module.exports = {
  get,
  set
}