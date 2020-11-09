import Vue from "vue"
import vuetify from "@/plugins/vuetify"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import Router from "vue-router"
import VueClipboard from "vue-clipboard2"
import * as VueGoogleMaps from "vue2-google-maps"
import "@mdi/font/css/materialdesignicons.css"
import "material-design-icons-iconfont/dist/material-design-icons.css"
// require("@/scss/_variables.scss")
// import "@/scss/_variables.scss"

Vue.use(VueClipboard)
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDaolU56reFaMu76xiIibVqpm2N0XxOqcY",
    libraries: "places",
    region: "JP",
    language: "ja"
  }
})

Vue.config.productionTip = false
const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app")
