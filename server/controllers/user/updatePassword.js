const mysql = require('../../mysql')
const Tips = require('../../utils/tip')
const { calcuMD5 } = require('../../utils/index')

module.exports = async (ctx) => {
  const { id, newPassword } = ctx.request.body

  // 校验新密码
  if (newPassword.length < 6) {
    ctx.body = Tips[1014]
    return
  } else {
    await mysql('user').where({id}).update({password: calcuMD5(newPassword)})
    ctx.body = Tips[0]
  }

  // const password = await mysql('user').where({id}).select('password')

  // if (md5(old_password) === password[0].password) {
  //   await mysql('user').where({id}).update({password: md5(new_password)})
  //   ctx.body = Tips[0]
  // } else {
  //   ctx.body = Tips[1023]
  // }
}

/**
   *
   * @api {post} /user/update_password  修改密码
   * @apiName updatePassword
   * @apiGroup user
   * @apiVersion 1.0.0
   * @apiDescription 接口详细描述
   * 
   * @apiHeader {String} Authorization token
   * 
   * @apiParam {String} id 用户id
   * @apiParam {String} new_password 新密码：密码长度不得少于6位
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
   *     code:1023,
   *     msg:'旧密码错误，修改密码失败！',
   *   }
   **/