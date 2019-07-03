const mysql = require('../../mysql')
const Tips = require('../../utils/tip')
const formatDate = require('../../utils/formatDate')
const { mln, hanzi, e_mail, mobile_number } = require('../../utils/validate')
const { calcuMD5 } = require('../../utils/index')

module.exports = async (ctx) => {
  const { userName, password, name, email, mobile, sex, status } = ctx.request.body

  const createTime = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')

  // 判断用户名是否已存在
  const user = await mysql('user').where({userName})
  if (user.length > 0) {
    ctx.body = Tips[1019]
    return
  }

  // 校验数据格式
  if ( !userName  || !mln.test(userName) || userName.length < 3) {
    ctx.body = Tips[1013]
  } else if (password.length < 6) {
    ctx.body = Tips[1014]
  } else if (name.length > 6 || name.length < 2 || !hanzi.test(name)) {
    ctx.body = Tips[1015]
  } else if (!e_mail.test(email)) {
    ctx.body = Tips[1016]
  } else if (!mobile_number.test(mobile)) {
    ctx.body = Tips[1017]
  } else if (!sex || sex !== '女' && sex !== '男') {
    ctx.body = Tips[1018]
  } else if (status != '0' && status != '1') {
    ctx.body = Tips[1020]
  } else {
    await mysql('user').insert({
      userName,
      password: calcuMD5(password),
      name,
      email,
      mobile,
      sex,
      status,
      avatar: '/static/default.jpg',
      createTime,
      loginCount: 0
    })
    ctx.body = Tips[0]
  }
}

/**
   *
   * @api {post} /user/add_user  添加用户
   * @apiName addUser
   * @apiGroup user
   * @apiVersion 1.0.0
   * @apiDescription 接口详细描述
   * 
   * @apiHeader {String} Authorization token
   * 
   * @apiParam {String} userName 用户名： 只允许英文大小写和数字和长度不小于3位
   * @apiParam {String} password 密码： 不得少于6位
   * @apiParam {String} name 姓名： 只允许汉字且长度2-6之间
   * @apiParam {String} email 邮件地址： 只允许邮件地址格式
   * @apiParam {Number} mobile 手机号： 只允许1开头的11位数字
   * @apiParam {String} sex 性别： 只允许字符串 男/女
   * @apiParam {Number} status 状态： 只允许0/1 禁用为0/启用为1
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
   *    code:1013,
   *    msg:'用户名格式不正确！'
   *  }
   *  {
   *    code:1014,
   *    msg:'密码格式不正确！'
   *  }
   *  {
   *    code:1015,
   *    msg:'姓名格式不正确！'
   *  }
   *  {
   *    code:1016,
   *    msg:'邮件地址格式不正确！'
   *  }
   *  {
   *    code:1017,
   *    msg:'手机号格式不正确！'
   *  }
   *  {
   *    code:1018,
   *    msg:'性别格式不正确！'
   *  }
   *  {
   *    code:1019,
   *    msg:'用户名已存在！'
   *  }
   *  {
   *    code:1020,
   *    msg:'状态格式不正确！'
   *  }
   **/
