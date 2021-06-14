import firestore, { FieldValue } from '../components/utils/firebase'

class BaseCollection {
  /**
   * @returns {firestore.CollectionReference}
   */
  get collection() {
    return firestore.collection('__NONE__')
  }

  /**
   * @param {FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>} doc
   * @returns {TModel}
   */
  getDataFromDocumentData(doc) {
    if (doc.exists) {
      return {
        ...doc.data(),
        id: doc.id,
        objectId: doc.id
      }
    } else {
      return null
    }
  }

  /**
   * @returns {Promise<TModel[]>}
   */
  all() {
    return this.collection
      .get()
      .then(q => q.docs.map(this.getDataFromDocumentData))
  }

  /**
   * @returns {Promise<string[]>}
   */
  allIds() {
    return this.collection.get().then(q => q.docs.map(item => item.id))
  }

  /**
   * @param {string} id
   * @returns {Promise<TModel>}
   */
  findById(id) {
    return this.collection
      .doc(id)
      .get()
      .then(this.getDataFromDocumentData)
  }

  findByIdWithSnapshot(id, listener) {
    return this.collection
      .doc(id)
      .onSnapshot(listener)
  }

  /**
   * @param {TModel} obj
   * @returns {Promise<void>}
   */
  add(obj) {
    return this.collection.add(obj).then(this.getDataFromDocumentData)
  }

  /**
   * @param {string} id
   * @param {TModel} obj
   * @returns {Promise<void>}
   */
  set(id, obj) {
    return this.collection.doc(id).set(obj)
  }

  /**
   * @param {string} id
   * @param {TModel} obj
   * @returns {Promise<void>}
   */
  update(id, obj) {
    return this.collection.doc(id).update(obj, { merge: true })
  }

  /**
   * @param {string} id
   * @returns {Promise<void>}
   */
  delete(id) {
    return this.collection.doc(id).delete()
  }
}

/**
 * @extends {BaseCollection<IUserModel>}
 */
class UserCollection extends BaseCollection {
  /**
   * @returns {firestore.CollectionReference}
   */
  get collection() {
    return firestore.collection('USER')
  }

  /**
   * @param {FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>} doc
   * @returns {IUserModel}
   */
  getDataFromDocumentData(doc) {
    if (doc.exists) {
      return {
        ...doc.data(),
        uid: doc.id,
        id: doc.id
      }
    } else {
      return null
    }
  }

  /**
   * @returns {Promise<string[]>}
   */
  getUserByUid(uid) {
    return this.collection
      .where('uid', '==', uid)
      .get()
      // .then(q => q.docs.map(item => item.data())[0])
      .then(q => {
        return q.docs.map(item => {
          return {
            id: item.id,
            ...item.data()
          }
        })[0]
      })
  }

  getUserByUidWithSnapshot(uid, listener) {
    return this.collection
      .where('uid', '==', uid)
      .onSnapshot(listener)
  }

  signUp(user, token) {
    if (!user.iconPhotoURL) {
      const defaultIconPhotoURL = 'https://firebasestorage.googleapis.com/v0/b/fir-tmp-project.appspot.com/o/public%2Faccount.png?alt=media&token=4ad2981f-61ac-42d9-a5ed-45eda74077d0'
      user.iconPhotoURL = defaultIconPhotoURL
    }
    // if (!user.coverPhotoURL) {
    //   const defaultCoverPhotoURL = 'https://firebasestorage.googleapis.com/v0/b/fir-tmp-project.appspot.com/o/public%2Faccount.png?alt=media&token=4ad2981f-61ac-42d9-a5ed-45eda74077d0'
    //   user.coverPhotoURL = defaultCoverPhotoURL
    // }
    if (token) {
      this.collection
        .doc(user.uid)
        .collection('SECRET')
        .doc(token.name)
        .set(token.value)
    }

    return this.collection
      .doc(user.uid)
      .set(user)
  }
}

/**
 * The whole database
 */
const database = {
  userCollection: () => new UserCollection()
}

export default database
