const axios = require('axios')
const mysql = require('../mysql')
const nodemailer = require("nodemailer")

const http = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'text/html'
  }
})

async function main({ url, title, email }){

  let transporter = nodemailer.createTransport({
    service: 'smtp.163.com',
    host: "smtp.163.com",
    secureConnection: false,
    port:465,
    auth: {
      user: '15016584603@163.com',
      pass: 'lyf2016+'
    }
  })

  let info = await transporter.sendMail({
    from: '<15016584603@163.com>',
    to: email,
    subject: "页面异常提示", 
    text: "页面异常提示",
    html: `
            <h2>页面标题：${title}</h2>
            <h3>地址：<a href="${url}">${url}</a>页面发生异常</h3>
          `
  })

  console.log("邮件发送成功：", info.messageId);

}

async function monitor() {
//   setInterval(() => {
    const data = await mysql('monitor').where('status', 1).select()
    for (let i = 0; i < data.length; i++) {
      http.get(data[i].url).then(res => {
        console.log('页面正常')
      }).catch(async err => {
        const { url, title, id, email  } = data[i]
        const nowTime = new Date().getTime()

        main({ ...data[i] }).catch(console.error)
        await mysql('errorInfo').insert({
          mid: id,
          url,
          info: err.message,
          email,
          title,
          time: nowTime
        })
        await mysql('monitor').where({id}).update({status: 2})
      })
    }
//   }, 10000)

}

module.exports = monitor
