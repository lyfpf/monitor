const mysql = require('../../mysql')
const Tips = require('../../utils/tip')
const fs = require('fs')

module.exports = async (ctx) => {
  const { id } = ctx.request.body
  
  const info = await mysql('user').where({id}).select('avatar', 'userName')

  // 禁用删除管理用户
  if (info[0].userName === 'admin') {
    ctx.body = Tips[1024]
    return
  }

  // 删除头像图片
  if (info[0].avatar != '/static/default.jpg') {
    deleteFile('./static', info[0].avatar.split('/')[2])
  }

  await mysql('user').where({id}).del()

  ctx.body = Tips[0]
}

function deleteFile(path, fileName) {
  let files = []
	if(fs.existsSync(path)) {
    files = fs.readdirSync(path)
		files.forEach((file) => {
      if (fileName === file) {
        fs.unlinkSync(`${path}/${fileName}`)
      }
		})
	}
}

/**
   *
   * @api {post} /user/delete_user  删除用户
   * @apiName deleteUser
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
   *    msg:'success'
   *   }
   **/