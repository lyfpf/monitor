const axios = require('axios')
const mysql = require('../mysql')
const nodemailer = require("nodemailer")
const ChatBot = require('dingtalk-robot-sender')

const http = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'text/html'
  }
})

const robot = new ChatBot({
  webhook: 'https://oapi.dingtalk.com/robot/send?access_token=378ad1ae8ce44250a5d69a9c2d038defff973e8233a3bd92e1ccaec27bdba648'
})

function sendDingtalk({ url, title }, message) {
  const content = `
    页面标题：${title}\n
    地址：${url}\n
    错误信息：${message}
  `
  let textContent = {
    "msgtype": "text", 
    "text": {
      content
    }, 
    "at": {
      "atMobiles": [
        "15016584603"
      ], 
      "isAtAll": false
    }
  }
  robot.send(textContent).then(() => {
    console.log("钉钉提醒发送成功：")
  })
}

async function sendEmail({ url, title, email }){

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
  setInterval(async () => {
    const data = await mysql('monitor').where('status', 1).select()
    for (let i = 0; i < data.length; i++) {
      http.get(data[i].url).then(() => {
      }).catch(async err => {
        const { url, title, id, email  } = data[i]
        const nowTime = new Date().getTime() * 1000

        sendEmail({ ...data[i] }).catch(console.error)
        sendDingtalk({ ...data[i] }, err.message)
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
  }, 60000)

}

module.exports = monitor
