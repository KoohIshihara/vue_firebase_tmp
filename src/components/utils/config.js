console.log('env:', process.env)

const config = {
  apiKey: process.env.VUE_APP_FIREBASE_APIKEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASEURL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGINGSENDERID
}
// const api = process.env.VUE_APP_API_LOCAL_ORIGIN
const api = process.env.VUE_APP_API_ORIGIN
const domain = process.env.VUE_APP_DOMAIN

// export default config
export { config, api, domain }
