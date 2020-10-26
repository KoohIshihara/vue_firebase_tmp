<template>
  <div>
    <div id="firebaseui-auth-container" />
    <!--v-progress-circular v-show="!isSignInUILoaded" :size="50" color="primary" indeterminate /-->
  </div>
</template>

<script>
import { firebase } from '@/components/utils/firebase'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
const ui = new firebaseui.auth.AuthUI(firebase.auth())

export default {
  data () {
    return {
      isSignInUILoaded: false,
      isSignUp: false
    }
  },
  watch: {
    $route (to, from) {
      this.isSignUp = (to.name === 'sign-up')
      if (this.isSignUp) {
        // setTimeout(this.replaceSignInText, 10)
      }
      if (!this.isSignUp) {
        // setTimeout(this.replaceSignUpText, 10)
      }
    }
  },
  created () {
    if (this.$route.name.indexOf('sign-up') !== -1) this.isSignUp = true
  },
  mounted () {
    this.$nextTick(() => {
      this.setupSignInUi()
    })

    if (!this.isSignUp) {
      // setTimeout(this.replaceSignUpText, 1000)
    } else {
      // setTimeout(this.replaceSignInText, 1000)
    }

    // if (!this.isSignUp) {
    //   setTimeout(function () {
    //     var titles = document.getElementsByClassName('firebaseui-title')
    //     for (var i = 0; i < titles.length; i++) {
    //       titles[i].innerText = titles[i].innerText.replace('Sign in with', '') + 'でサインイン'
    //     }

    //     var signInSpans = document.getElementsByClassName('firebaseui-idp-text')
    //     for (var i = 0; i < signInSpans.length; i++) {
    //       signInSpans[i].innerText = signInSpans[i].innerText.replace('Sign in with', '') + 'でサインイン'
    //     }
    //   }, 1000)
    // }
    // setTimeout(this.setupSignInUi, 800)
  },
  methods: {
    setupSignInUi () {
      const vInstance = this
      const uiConfig = {
        credentialHelper: firebaseui.auth.CredentialHelper.NONE,
        callbacks: {
          uiShown () {
            vInstance.isSignInUILoaded = true
          },
          signInSuccess: (authResult, redirectUrl) => {
            this.$emit('signInSuccess', redirectUrl)
            // console.log('authResult', authResult)
            return false
          }
        },
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: false
          },
          {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID
          }
          // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          // // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          // // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          // // firebase.auth.GithubAuthProvider.PROVIDER_ID,
          // firebase.auth.EmailAuthProvider.PROVIDER_ID,
          // // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          // // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
        ],
        // tosUrl and privacyPolicyUrl accept either url string or a callback
        // function.
        // Terms of service url/callback.
        tosUrl: 'https://minna.me/service_terms.html',
        // Privacy policy url/callback.
        privacyPolicyUrl: function () {
          // window.location.assign('<your-privacy-policy-url>')
          location.href = 'https://minna.me/privacy_policy.html'
        }
      }

      // Initialize the FirebaseUI Widget using Firebase.

      // The start method will wait until the DOM is loaded.

      // this.$nextTick(() => {
      //   ui.start('#firebaseui-auth-container', uiConfig)
      // })

      setTimeout(() => {
        ui.start('#firebaseui-auth-container', uiConfig)
        // if (this.isSignUp) setTimeout(this.replaceSignInText, 10)
      }, 800)
    },
    replaceSignInText () {
      var titles = document.getElementsByClassName('firebaseui-title')
      for (var i = 0; i < titles.length; i++) {
        // titles[i].innerText = titles[i].innerText.replace('Sign in', 'Sign up')
        // titles[i].innerText = titles[i].innerText.replace('Sign in with', '') + 'でミンナになる'
        if (titles[i].innerText.indexOf('email') > -1) titles[i].innerText = 'emailでミンナになる'
        if (titles[i].innerText.indexOf('twitter') > -1) titles[i].innerText = 'Twitterでミンナになる'
      }

      var signInSpans = document.getElementsByClassName('firebaseui-idp-text')
      for (var i = 0; i < signInSpans.length; i++) {
        // signInSpans[i].innerText = signInSpans[i].innerText.replace('Sign in', 'Sign up')
        // signInSpans[i].innerText = signInSpans[i].innerText.replace('Sign in with', '') + 'でミンナになる'
        if (signInSpans[i].innerText.indexOf('email') > -1) signInSpans[i].innerText = 'emailでミンナになる'
        if (signInSpans[i].innerText.indexOf('Twitter') > -1) signInSpans[i].innerText = 'Twitterでミンナになる'
      }
    },
    replaceSignUpText () {
      var titles = document.getElementsByClassName('firebaseui-title')
      for (var i = 0; i < titles.length; i++) {
        if (titles[i].innerText.indexOf('email') > -1) titles[i].innerText = 'emailでサインイン'
        if (titles[i].innerText.indexOf('Twitter') > -1) titles[i].innerText = 'Twitterでサインイン'
        // titles[i].innerText = titles[i].innerText.replace('Sign up', 'Sign in')
      }

      var signInSpans = document.getElementsByClassName('firebaseui-idp-text')
      for (var i = 0; i < signInSpans.length; i++) {
        if (signInSpans[i].innerText.indexOf('email') > -1) signInSpans[i].innerText = 'emailでサインイン'
        if (signInSpans[i].innerText.indexOf('Twitter') > -1) signInSpans[i].innerText = 'Twitterでサインイン'
        // signInSpans[i].innerText = signInSpans[i].innerText.replace('Sign up', 'Sign in')
      }
    }
  }
}
</script>

<style>
/* Collapse height of firebase ui loading spinner container */
.mdl-card .firebaseui-callback-indicator-container {
  height: 2px;
}

/* Collapse height of firebase ui loading spinner container */
.mdl-card.firebaseui-container {
  min-height: 2px;
}
</style>
