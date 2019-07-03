const mysql = require('../../mysql')
const Tips = require('../../utils/tip')

module.exports = async (ctx) => {
  const { id } = ctx.request.body
  
  await mysql('monitor').where('id', id).del()

  ctx.body = Tips[0]
}