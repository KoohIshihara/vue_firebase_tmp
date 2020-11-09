<template lang="pug">
  Auth(:redirectWithLoginFailed="true")
    ModalController(ref="modalController"
      rootHeaderTitle="近くのスポット"
      :opt="opt")
      div.wrap-spots
        ModuleSpots(:insufficientSpots="opt.insufficientSpots")
</template>

<style lang="scss" scoped>
.wrap-spots {
  width: 100%;
  min-height: 100vh;
  padding-top: 48px;
}
</style>

<script>
import { createNamespacedHelpers } from "vuex"
import Auth from "@/components/shared/Auth"
const { mapState: mapStateAuth, mapActions: mapActionsAuth } = createNamespacedHelpers("auth")
import Header from "@/components/shared/Header"
import ModalController from "@/components/shared/ModalController"
import ModuleSpots from "@/components/module/ModuleSpots"

export default {
  components: {
    Auth,
    Header,
    ModalController,
    ModuleSpots
  },
  computed: {
    ...mapStateAuth(["uid"])
  },
  data () {
    return {
      opt: {
        insufficientSpots: []
      }
    }
  },
  created () {
    this.getSpots()
  },
  methods: {
    ...mapActionsAuth(["signOut"]),
    logout () {
      this.signOut()
      setTimeout(() => {
        this.$router.push("/sign-in")
      }, 400)
    },
    async getSpots () {
      // this.markers = [
      //   {
      //     type: "shop",
      //     shopId: "1",
      //     position: { lat: 35.658033, lng: 139.701123 },
      //     icon: { url: iconSpot, scaledSize: { width: 28, height: 28 } }
      //   },
      //   {
      //     type: "shop",
      //     shopId: "2",
      //     position: { lat: 35.655033, lng: 139.701123 },
      //     icon: { url: iconSpot, scaledSize: { width: 28, height: 28 } }
      //   },
      //   {
      //     type: "shop",
      //     shopId: "3",
      //     position: { lat: 35.655033, lng: 139.704123 },
      //     icon: { url: iconSpot, scaledSize: { width: 28, height: 28 } }
      //   }
      // ]

      const response = await fetch("https://app.chargespot.jp/spotwork/list.php?key=hb7xcczd", {
        method: "GET",
        mode: "cors"
      }).catch((reason) => {
        console.log("error:", reason)
        // alert("スポットが取得できません。")
      })
      let result = await response.json()
      console.log("result:", result)
      this.opt.insufficientSpots = result.dataInfo
    }
  }
}
</script>
