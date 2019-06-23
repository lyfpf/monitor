const fs = require('fs')
const mysql = require('../../mysql')
const { avatar } = require('../../utils/validate')
const Tips = require('../../utils/tip')

module.exports = async (ctx) => {
  const { userName } = ctx.request.body
  const file = ctx.request.files.file

  const reader = fs.createReadStream(file.path)
  const ext = file.name.split('.').pop()		// 获取上传文件扩展名
  const fileName = `${userName}.${ext}`

  if (!avatar.test(fileName)) {
    ctx.body = Tips[1021]
    return
  }

  const upStream = fs.createWriteStream(`static/${fileName}`)	// 创建可写流
  reader.pipe(upStream)	// 可读流通过管道写入可写流

  try {
    await mysql('user').where({userName}).update({"avatar": `/static/${fileName}`})
    ctx.body = Tips[0]
  } catch (e) {
    ctx.body = Tips[1022]
  }
}