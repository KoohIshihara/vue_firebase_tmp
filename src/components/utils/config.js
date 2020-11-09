// let config = {
//   apiKey: process.env.VUE_APP_FIREBASE_APIKEY,
//   authDomain: process.env.VUE_APP_FIREBASE_AUTHDOMAIN,
//   databaseURL: process.env.VUE_APP_FIREBASE_DATABASEURL,
//   projectId: process.env.VUE_APP_FIREBASE_PROJECTID,
//   storageBucket: process.env.VUE_APP_FIREBASE_STORAGEBUCKET,
//   messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGINGSENDERID
// }

// よくアクセスするページたち
// - 起源元のFunctionsをallUsersに許可
//     - https://console.cloud.google.com/functions/list
// - Cloud Build API
//     - https://console.developers.google.com/apis/api/cloudbuild.googleapis.com/overview?project=setteicho-dev

// デプロイで忘れがちなもの
// - ProdのプロジェクトもAuth Method許可したか？
// - cloud functionsのconfigもprodにしたか？
// - mixpanelのenv切り替えたか？
// - セキュリティルールprodも書いたか？

const env = "dev"
let config, api

if (env === "dev") {
  config = {
    apiKey: "AIzaSyDaolU56reFaMu76xiIibVqpm2N0XxOqcY",
    authDomain: "spotwork-dev.firebaseapp.com",
    databaseURL: "https://spotwork-dev.firebaseio.com",
    projectId: "spotwork-dev",
    storageBucket: "spotwork-dev.appspot.com",
    messagingSenderId: "482877181686"
  }
  api = "https://us-central1-spotwork-dev.cloudfunctions.net"
  // api = "http://localhost:5000/spotwork-dev-dev/us-central1"
} else if (env === "stage") {
  config = {
    apiKey: "AIzaSyCbzQbG634jk3Z8MWoTQCUqCrLX7vlCv6A",
    authDomain: "spotwork-stage.firebaseapp.com",
    databaseURL: "https://spotwork-stage.firebaseio.com",
    projectId: "spotwork-stage",
    storageBucket: "spotwork-stage.appspot.com",
    messagingSenderId: "230309505883"
  }
  api = "https://us-central1-spotwork-dev.cloudfunctions.net"
} else if (env === "prod") {
  config = {
    apiKey: "AIzaSyAplTkyeJxf0FPOY12wobvTNZUFXhCWRUw",
    authDomain: "spotwork-prod.firebaseapp.com",
    databaseURL: "https://spotwork-prod.firebaseio.com",
    projectId: "spotwork-prod",
    storageBucket: "spotwork-prod.appspot.com",
    messagingSenderId: "998541019097"
  }
  api = "https://us-central1-spotwork-prod.cloudfunctions.net"
}

export { config, api }