const mysql = require('../../mysql')
const { generateToken } = require('../../utils/token')
const Tips = require('../../utils/tip')
const { calcuMD5 } = require('../../utils/index')

async function login(ctx) {
  let {userName, password, captcha} = ctx.request.body

  const { sessionCaptcha, expire } = ctx.session

  const now = Date.parse(new Date())

  const isExpire = now < expire ? true : false

  if (captcha && isExpire && captcha.toLowerCase() === sessionCaptcha) { // 验证客户端是否发送验证码，验证码是否过期，验证是否匹配
    const res = await mysql('user').where({
      userName,
      password: calcuMD5(password)
    }).select('id')
    if (res && res.length > 0) { // 验证用户名和密码
      if (res[0].status == '0') { // 判断用户状态是否为禁用
        ctx.body = Tips[1026]
      } else {
        let id = res[0]['id']
        let token = generateToken({id})
        ctx.body = {
            ...Tips[0], data: {token}
        }
      }
    } else {
        ctx.body = Tips[1006]
    }
  } else {
    ctx.body = Tips[1012]
  }
}

module.exports = login

/**
   *
   * @api {post} /user/login  登录
   * @apiName login
   * @apiGroup user
   * @apiVersion 1.0.0
   * @apiDescription 接口详细描述
   * 
   * @apiParam {String} userName 用户名
   * @apiParam {String} password 密码
   * @apiParam {String} captcha 验证码
   *
   * @apiSuccess {String} status 200
   * @apiSuccess {String} message success
   * @apiSuccessExample 成功-响应:
   *  HTTP/1.1 200 OK
   *  {
   *    code:0,
   *    msg:'success',
   *    data: token
   *   }
   *  @apiErrorExample {json} 错误-响应:
   *  HTTP/1.1 200
   *  {
   *     code:1006,
   *     msg:'账号或密码错误！',
   *   }
   *   @apiPermission token
   **/
