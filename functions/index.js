const functions = require("firebase-functions")
const cors = require('cors')({ origin: true })

const notification = require('./notification')

exports.sendNotification = functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST')
  res.set('Access-Control-Allow-Headers', 'Content-Type')
  cors(req, res, async () => {
    notification.sendNotification()
    res.status(200).send({ result: "succeed" }).end()
  }) // cors
})
