const mysql = require('../../mysql')
const Tips = require('../../utils/tip')

module.exports = async (ctx) => {
  
  const { title, url, startTime, endTime, page, pageSize } = ctx.request.query

  const total = await mysql('errorInfo').select()

  const list = await mysql('errorInfo')
                      .where(function() {
                        this.where('title', 'like', `%${title}%`)
                      })
                      .limit(pageSize)
                      .offset(Number(page - 1) * pageSize)
                      .select()

  ctx.body = {
    ...Tips[0],
    data: list,
    total: total.length
  }
}