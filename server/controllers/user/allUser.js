const mysql = require('../../mysql')
const Tips = require('../../utils/tip')

module.exports = async (ctx) => {
  const { userName, name, page, pageSize } = ctx.request.body

  const total = await mysql('user').select()

  const userList = await mysql('user')
                          .where(function() {
                            this.where('userName', 'like', `%${userName}%`)
                            .where('name', 'like', `%${name}%`)
                          })
                          .limit(pageSize)
                          .offset(Number(page - 1) * pageSize)
                          .select('avatar', 'createTime', 'email', 'id', 'loginCount', 'name', 'sex', 'userName', 'mobile', 'status')
  ctx.body = {
    ...Tips[0],
    data: userList,
    total: total.length
  }
}

/**
   *
   * @api {post} /user/all_user  获取用户列表
   * @apiName allUser
   * @apiGroup user
   * @apiVersion 1.0.0
   * @apiDescription 接口详细描述
   * 
   * @apiHeader {String} Authorization token
   * 
   * @apiParam {String} userName 用户名
   * @apiParam {String} name 姓名
   * @apiParam {String} page 页码
   * @apiParam {Number} pageSize 页数量
   *
   * @apiSuccess {String} status 200
   * @apiSuccess {String} message success
   * @apiSuccessExample 成功-响应:
   *  HTTP/1.1 200 OK
   *  {
   *    code:0,
   *    msg:'success'
   *   }
   **/
