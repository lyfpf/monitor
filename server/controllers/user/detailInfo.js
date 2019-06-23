const mysql = require('../../mysql')
const Tips = require('../../utils/tip')

module.exports = async (ctx) => {
  const { id } = ctx.request.body

  const data = await mysql('user').where({id})
                                  .select('id','userName','name','email','mobile','sex','status','avatar','createTime','loginCount')

  ctx.body={
    ...Tips[0],
    data: data[0]
  }
}

/**
   *
   * @api {post} /user/detail_info  获取用户详情信息
   * @apiName detailInfo
   * @apiGroup user
   * @apiVersion 1.0.0
   * @apiDescription 接口详细描述
   * 
   * @apiHeader {String} Authorization token
   * 
   * @apiParam {String} id 用户id
   *
   * @apiSuccess {String} status 200
   * @apiSuccess {String} message success
   * @apiSuccessExample 成功-响应:
   *  HTTP/1.1 200 OK
   *  {
   *    code:0,
   *    msg:'success',
   *    data: data
   *   }
   **/