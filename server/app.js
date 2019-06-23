const Koa = require('koa')
const bodyparser = require('koa-body')
const response = require('./utils/response')
const router = require('./routes')
const staticRouter = require('./routes/static')
const session = require('koa-session-minimal')
const monitor = require('./utils/monitor')
const app = new Koa()

app.use(staticRouter.routes())

// 使用响应处理中间件
app.use(response)

// 解析请求体
app.use(bodyparser({
  multipart: true,
  formidable: {
      maxFileSize: 200 * 1024 * 1024	// 设置上传文件大小最大限制，默认2M
  },
  strict: false
}))

// 使用session中间件
app.use(session())

app.use(router.routes())

monitor()

// 启动程序，监听端口
app.listen(8585, () => {
  console.log('服务器启动成功')
})

// apidoc -i ./server/controllers/ -o ./doc/apidoc/