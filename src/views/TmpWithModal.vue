<template lang="pug">
  Auth(@loginFailed="onFailedAuthentication")
    Header(:content="header")
    ModalPage(
      v-if="uid"
      @closeModalPage="closeModalPage"
      :showModal="showModalPage")
      ModuleTmp(v-if="modalPageContent == 'tmp'")
    ModalWindow(
      @closeModal="closeModalWindow"
      modalContentId="tmp"
      :showModal="showModalWindow")
    div.wrap-home
      div.py50
        span(@click="$router.push('/home/testid')").block to modal page
        span(@click="logout").block Sign Out
</template>

<style lang="scss" scoped>
.wrap-home {
  width: 100%;
  min-height: 100vh;
}
</style>

<script>
import { createNamespacedHelpers } from "vuex"
import Auth from "@/components/auth"
const { mapState: mapStateAuth, mapActions: mapActionsAuth } = createNamespacedHelpers("auth")
import Header from "@/components/shared/Header"
import ModalWindow from "@/components/shared/ModalWindow"
import ModalPage from "@/components/shared/ModalPage"
import ModuleTmp from "@/components/module/ModuleTmp"

export default {
  components: {
    Auth,
    Header,
    ModalPage,
    ModalWindow,
    ModuleTmp
  },
  computed: {
    ...mapStateAuth(["uid"])
  },
  data () {
    return  {
      header: {},
      rootHeader: {
        title: "Tmp",
        left: {
          label: "Home",
          icon: "mdi-home",
          to: "/tmp"
        },
        right: {
          label: "Acount",
          icon: "mdi-account",
          to: "/tmp"
        }
      },
      showModalPage: false,
      showModalWindow: false,
      modalPageContent: ""
    }
  },
  watch: {
    "$route": function (to, from) {
      if (to.path !== from.path) {
        this.changeModalPageByRouteParams()
      }
    }
  },
  created () {
    this.changeModalPageByRouteParams()
  },
  methods: {
    ...mapActionsAuth(["signOut"]),
    changeModalPageByRouteParams () {
      // console.log(this.$route.name)
      switch (this.$route.name) {
        case "tmp":
          this.header = this.rootHeader
          this.modalPageContent = ""
          this.showModalPage = false
          break
        case "tmp_detail":
          this.header = {
            title: "Tmp Detail",
            left: {
              label: "Tmp",
              icon: "mdi-chevron-left",
              to: "/tmp"
            },
            right: {
              label: "Tmp",
              icon: "mdi-chevron-right",
              to: "/tmp"
            }
          }
          this.modalPageContent = "tmp"
          this.showModalPage = false
          break
      }
    },
    logout () {
      this.signOut()
      setTimeout(() => {
        this.$router.push("/sign-in")
      }, 400)
    },
    onFailedAuthentication () {
      this.$router.push("/sign-in")
    },
    closeModalPage () {
      this.showModalPage = false
    },
    closeModalWindow () {
      this.showModalWindow = false
    }
  }
}
</script>
