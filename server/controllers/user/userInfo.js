const mysql = require('../../mysql')
const { verifyToken } = require('../../utils/token')
const Tips = require('../../utils/tip')

module.exports = async (ctx) => {
  const token = ctx.request.header['authorization']

  let { id } = verifyToken(token)

  const info = await mysql('user')
                      .where({id})
                      .select('avatar', 'createTime', 'email', 'id', 'loginCount', 'name', 'sex', 'userName', 'status')

  ctx.body = {
    ...Tips[0],
    data: info[0]
  }
}