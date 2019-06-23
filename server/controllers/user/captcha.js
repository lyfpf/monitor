const svgCaptcha = require('svg-captcha')

module.exports = async (ctx) => {
  const captcha = svgCaptcha.create({  
    // 翻转颜色
    inverse: false,
    // 字体大小
    fontSize: 36,
    // 噪声线条数
    noise: 2,
    // 宽度
    width: 160,
    // 高度
    height: 47,
  })
  ctx.session = {
    expire: Date.parse(new Date()) + (600 * 1000),
    sessionCaptcha: captcha.text.toLowerCase()
  }
  ctx.body = {
    code: 0,
    data: String(captcha.data)
  }
}

/**
   *
   * @api {get} /user/captcha  获取验证码
   * @apiName captcha
   * @apiGroup user
   * @apiVersion 1.0.0
   * @apiDescription 接口详细描述
   *
   * @apiSuccess {String} status 200
   * @apiSuccess {String} message success
   **/