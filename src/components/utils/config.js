// var config = {
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

const env = "dev"
var config, api

if (env === "dev") {
  config = {
    apiKey: "AIzaSyCbzQbG634jk3Z8MWoTQCUqCrLX7vlCv6A",
    authDomain: "fir-tmp-project.firebaseapp.com",
    databaseURL: "https://fir-tmp-project.firebaseio.com",
    projectId: "fir-tmp-project",
    storageBucket: "fir-tmp-project.appspot.com",
    messagingSenderId: "230309505883"
  }
  api = "https://us-central1-fir-tmp-project.cloudfunctions.net"
  // api = "http://localhost:5000/fir-tmp-project-dev/us-central1"
} else if (env === "stage") {
  config = {
    apiKey: "AIzaSyCbzQbG634jk3Z8MWoTQCUqCrLX7vlCv6A",
    authDomain: "fir-tmp-project.firebaseapp.com",
    databaseURL: "https://fir-tmp-project.firebaseio.com",
    projectId: "fir-tmp-project",
    storageBucket: "fir-tmp-project.appspot.com",
    messagingSenderId: "230309505883"
  }
  api = "https://us-central1-fir-tmp-project.cloudfunctions.net"
} else if (env === "prod") {
  config = {
    apiKey: "AIzaSyCbzQbG634jk3Z8MWoTQCUqCrLX7vlCv6A",
    authDomain: "fir-tmp-project.firebaseapp.com",
    databaseURL: "https://fir-tmp-project.firebaseio.com",
    projectId: "fir-tmp-project",
    storageBucket: "fir-tmp-project.appspot.com",
    messagingSenderId: "230309505883"
  }
  api = "https://us-central1-fir-tmp-project.cloudfunctions.net"
}

export { config, api }