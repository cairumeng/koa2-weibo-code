/**
 * 数据库连接的一些配置文件（如ip地址，端口，账号，密码等等信息）
 * 这个数据比较私密不能上github
 * 
 * redis和mysql一样是s/c（server/client）服务器客户端分离架构，
 * 但是如果是ip是本地地址的话，账号和密码则会在服务器端
 */

let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1'
}

let MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: '3306',
  database: 'kao2_weibo_code'
}

module.exports = {
  REDIS_CONF,
  MYSQL_CONF
}
