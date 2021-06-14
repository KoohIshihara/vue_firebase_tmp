<template lang="pug">
  Auth(@loggedIn="onLoggedIn" @loginFailed="loginFailed")
    NowLoading(:show="showNowLoading")
    div.wrap-sign-ui.f.fh
      div.sign-ui
        div.wrap-title.f.fc.mb30
          span.welcome tmpへようこそ！
        div.wrap-sign-in-ui.mb24
          SignIn(@signInSuccess="onLoggedIn")
        div.wrap-select-sign-in-up.f.fc
          span(v-if="$route.name === 'sign-up'" @click="$router.push('/sign-in')").fz12 サインイン
          span(v-if="$route.name === 'sign-in'" @click="$router.push('/sign-up')").fz12 サインアップ
</template>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";

.wrap-sign-ui {
  width: 100%;
  height: 100vh;
  .sign-ui {
    width: $base_width_percent;
    max-width: $base_max_width_px;
    margin: 0 auto;
    .wrap-select-sign-in-up {
      color: $active_color;
    }
  }
}
</style>

<script>
import database from '@/database'
import { firebase } from '@/components/utils/firebase'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapStateAuth } = createNamespacedHelpers('auth')
import Auth from '@/components/shared/Auth'
import SignIn from '@/components/sign-in/firebase-sign-in-ui'
import NowLoading from '@/components/shared/NowLoading'

export default {
  components: {
    Auth,
    SignIn,
    NowLoading
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    resultRedirect: null,
    redirectUrl: null,
    showNowLoading: true
  }),
  computed: {
    ...mapStateAuth(['isLoggedIn', 'uid'])
  },
  mounted () {
    if (this.uid) this.$router.push('/tmp')
  },
  methods: {
    loginFailed () {
      this.showNowLoading = false
    },
    async onLoggedIn () {
      this.showNowLoading = false

      await this.sleepByPromise(0.8)
      let firebaseUser = await firebase.auth().currentUser
      console.log('firebaseUser:', firebaseUser)

      if (this.uid) {
        this.showNowLoading = true

        let user = await firebase.auth().currentUser
        let userDoc = await database.userCollection().findById(this.uid)
        
        if (!userDoc) {
          let userObj = {
            uid: user.uid,
            name: user.displayName,
            profile: 'No Profile',
            iconURL: user.photoURL,
            lastSignInTime: user.metadata.lastSignInTime,
            createdAt: user.metadata.creationTime
          }

          await database.userCollection().signUp(userObj)
        }

        this.showNowLoading = false

        const path = (this.$route.params.redirectPath) ? 
          decodeURIComponent(this.$route.params.redirectPath)
          : `/tmp`
        this.$router.push(path)
      }
    },
    signInSuccess (redirectUrl) {
      this.redirectUrl = redirectUrl
    },
    sleepByPromise (sec) {
      return new Promise(resolve => setTimeout(resolve, sec * 1000))
    }
  }
}
</script>
