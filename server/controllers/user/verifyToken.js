const { verifyToken } = require('../../utils/token')
const Tips = require('../../utils/tip')

module.exports = async (ctx) => {
  const { token } = ctx.request.body
  if (token) {
    let result = verifyToken(token)
    let { id } = result
    if(id || id === 0){
      ctx.body = Tips[0]
    }else{
      ctx.body = Tips[1011]
    }
  } else {
    ctx.body = Tips[1011]
  }
}

/**
   *
   * @api {post} /user/verify_token  验证token
   * @apiName verifyToken
   * @apiGroup user
   * @apiVersion 1.0.0
   * @apiDescription 接口详细描述
   * 
   * @apiParam {String} token token
   *
   * @apiSuccess {String} status 200
   * @apiSuccess {String} message success
   * @apiSuccessExample 成功-响应:
   *  HTTP/1.1 200 OK
   *  {
   *    code:0,
   *    msg:'success'
   *   }
   *  @apiErrorExample {json} 错误-响应:
   *  HTTP/1.1 200
   *  {
   *     code:1011,
   *     msg:'身份验证失败！',
   *   }
   **/
