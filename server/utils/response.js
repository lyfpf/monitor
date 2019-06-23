const Tips = require('./tip')
const { verifyToken } = require('./token')

module.exports = async (ctx, next) => {
  try {
    let {url = ''} = ctx
    if (url.indexOf('/verify/') > -1) { // 需要校验token的API
      let token = ctx.request.header['authorization']
      if (token) {
        let { id } = verifyToken(token)
        if(id || id === 0){
          ctx.body = Tips[0]
        }else{
          ctx.body = Tips[1011]
        }
      } else {
        return ctx.body = Tips[1011]
      }
      await next()
    }  else {
      await next()
    }
    ctx.body = ctx.body ? ctx.body : {
      code: ctx.state.code !== undefined ? ctx.state.code : 0,
      data: ctx.state.data !== undefined ? ctx.state.data : {}
    }
  } catch (e) {
    ctx.status = 500
    console.log('错误：' + e && e.message ? e.message : e.toString())
    ctx.body = {
      code: -1,
      error: e && e.message ? e.message : e.toString()
    }
  }
}