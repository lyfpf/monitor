const mysql = require('../../mysql')
const Tips = require('../../utils/tip')

module.exports = async (ctx) => {
  
  const { title, page, pageSize } = ctx.request.query

  const total = await mysql('monitor').select()

  const list = await mysql('monitor')
                      .where('title', 'like', `%${title}%`)
                      .limit(pageSize)
                      .offset(Number(page - 1) * pageSize)
                      .select()

  ctx.body = {
    ...Tips[0],
    data: list,
    total: total.length
  }
}