const mysql = require('../../mysql')
const Tips = require('../../utils/tip')

module.exports = async (ctx) => {
  
  const {url, comment, status, email, title} = ctx.request.body

  const nowTime = new Date().getTime() / 1000
  
  console.log(nowTime)

  try{
    await mysql('monitor').insert({
      url,
      comment,
      status,
      email,
      title,
      createTime: nowTime,
      updateTime: nowTime
    })
    ctx.body = Tips[0]
  } catch (e){
    ctx.body = Tips['-1']
    console.log(e)
  }
}