var mysql = require('knex')({
  client: 'mysql',
  connection: {
    host : '47.106.197.91', // IP地址
    user : 'root', // 数据库用户名
    password : '123456', // 数据库密码
    database : 'permission' // 连接到的数据库的名字
  }
})

module.exports = mysql