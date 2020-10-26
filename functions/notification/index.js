const format = require('date-fns/format')
const ja = require('date-fns/locale/ja')
const nodemailer = require("nodemailer")

const db = require("../firebase.js")

const gmailEmail = "appsocially.common@gmail.com"
const gmailPassword = "chatcenter"

// 送信に使用するメールサーバーの設定
const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
})

var sendNotification = async (email) => {
  // var user = await db.collection("USERS")
  //   .doc(uid)
  //   .get()
  //   .then(q => {
  //     return q.docs.map(d => {
  //       return d.data()
  //     })
  //   })

  var text = `
本文
  `
  console.log(`send ${text} \n`)
  // メール設定
  let adminMail = {
    from: gmailEmail,
    to: email,
    subject: "タイトル",
    text: text
  }

  // 管理者へのメール送信
  mailTransport.sendMail(adminMail, (err, info) => {
    if (err) {
      return console.error(`send failed. ${err}`)
    }
    return console.log("send success.")
  })
}

module.exports.sendDailyNotification = sendNotification