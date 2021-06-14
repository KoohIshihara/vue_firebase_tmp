import { config, api, domain } from './config'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'

const firebaseApp = firebase.initializeApp(config)

const firestore = firebaseApp.firestore()
const storage = firebaseApp.storage()
const auth = firebaseApp.auth()

export default firestore
export { firebase, auth, storage, api, domain }