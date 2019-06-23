const mysql = require('../../mysql')
const Tips = require('../../utils/tip')

module.exports = async (ctx) => {
  
  const { id } = ctx.request.query

  const data = await mysql('monitor')
                      .where({id})
                      .select()

  ctx.body = {
    ...Tips[0],
    data: data[0]
  }
}