const mysql = require('../../mysql')
const Tips = require('../../utils/tip')

module.exports = async (ctx) => {
  
  const {id, url, comment, status, email, title} = ctx.request.body
  
  try{
    await mysql('monitor').where({id}).update({url, comment, status, email, title})
    ctx.body = Tips[0]
  } catch (e){
    ctx.body = Tips['-1']
    console.log(e)
  }
}