const admin = require('firebase-admin')

// Prod
admin.initializeApp({
  apiKey: 'AIzaSyAQRp7aGpHULGvhktoE9N0Lbva6JlVF5Ow',
  authDomain: 'daily-task-prod.firebaseapp.com',
  databaseURL: 'https://daily-task-prod.firebaseio.com',
  projectId: 'daily-task-prod',
  storageBucket: 'daily-task-prod.appspot.com',
  messagingSenderId: '377537491385'
})

// Dev
// admin.initializeApp({
//   apiKey: 'AIzaSyA3dd12xsYMJdVktvOv7eklOO53yUkdY9Y',
//   authDomain: 'daily-task-dev.firebaseapp.com',
//   databaseURL: 'https://daily-task-dev.firebaseio.com',
//   projectId: 'daily-task-dev',
//   storageBucket: 'daily-task-dev.appspot.com',
//   messagingSenderId: '636885484852'
// })

const db = admin.firestore()
db.settings({
  timestampsInSnapshots: true
})

module.exports = db