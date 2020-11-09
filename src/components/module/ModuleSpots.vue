<template lang="pug">
  div.wrap-module-spots
    div.spots-content
      GmapMap(
        v-if="center"
        :center="center"
        :options="options"
        map-type-id="terrain"
        style="width: 100vw; height: calc(100vh - 48px);")
        GmapMarker(
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :icon="m.icon"
          @click="onMarker(m)")
</template>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";

.wrap-module-spots {
  width: 100%;
  min-height: 100vh;
  .spots-content {
    
  }
}
</style>

<script>
import { createNamespacedHelpers } from "vuex"
const { mapState: mapStateAuth, mapActions: mapActionsAuth } = createNamespacedHelpers("auth")

import iconSpot from "../../assets/icon-spot.svg"
import iconUser from "../../assets/icon-user.svg"

export default {
  props: {
    insufficientSpots: {
      type: Array,
      required: false
    }
  },
  computed: {
    ...mapStateAuth(["uid"])
  },
  data () {
    return {
      center: null,
      options: {
        zoom: 16,
        gestureHandling: "greedy"
      },
      markers: null
    }
  },
  watch: {
    insufficientSpots () {
      console.log("insufficientSpots:", this.insufficientSpots)
      
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.mapMarkers, (error) => {
          console.log("error:", error)
          alert("現在地が取得できません。ブラウザの位置情報設定が有効になっているかをご確認ください。")
        })
      } else { //Geolocation apiがサポートされていない場合
        alert("このブラウザでは現在地が取得できません")
      }
    }
  },
  async created () {
    // this.getSpots()
    
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(this.mapMarkers, () => {
    //     alert("現在地が取得できません")
    //   })
    // } else { //Geolocation apiがサポートされていない場合
    //   alert("このブラウザでは現在地が取得できません")
    // }
  },
  methods: {
    onMarker (marker) {
      console.log("onMarker:", marker)
      if (marker.type === "shop") this.$router.push(`/spots/${marker.shop_id}`)
    },
    // async getSpots () {
    //   this.markers = [
    //     {
    //       type: "shop",
    //       shopId: "1",
    //       position: { lat: 35.658033, lng: 139.701123 },
    //       icon: { url: iconSpot, scaledSize: { width: 28, height: 28 } }
    //     },
    //     {
    //       type: "shop",
    //       shopId: "2",
    //       position: { lat: 35.655033, lng: 139.701123 },
    //       icon: { url: iconSpot, scaledSize: { width: 28, height: 28 } }
    //     },
    //     {
    //       type: "shop",
    //       shopId: "3",
    //       position: { lat: 35.655033, lng: 139.704123 },
    //       icon: { url: iconSpot, scaledSize: { width: 28, height: 28 } }
    //     }
    //   ]
    // },
    mapMarkers (myPos) {
      let lat  = myPos.coords.latitude
      let lng = myPos.coords.longitude
      console.log("pos:", { lat, lng })
      // this.markers = this.markers.filter(e => { return !(e.type === "user") })

      // 現在地から半径10km以内でフィルターする
      this.markers = this.insufficientSpots.map(e => {
          e.type = "shop"
          e.position = { lat: Number(e.lat), lng: Number(e.lng) }
          e.icon = { url: iconSpot, scaledSize: { width: 28, height: 28 } }
          return e
        }).splice(0, 100)

      this.markers.push({
        type: "user",
        position: { lat, lng },
        icon: { url: iconUser, scaledSize: { width: 28, height: 28 } }
      })
      
      this.center = { lat, lng }
    },
    getDistance (pos1, pos2) {
      pos1.lat *= Math.PI / 180;
      pos1.lng *= Math.PI / 180;
      pos2.lat *= Math.PI / 180;
      pos2.lng *= Math.PI / 180;
      return 6371 * Math.acos(Math.cos(pos1.lat) * Math.cos(pos2.lat) * Math.cos(pos2.lng - pos1.lng) + Math.sin(pos1.lat) * Math.sin(pos2.lat))
    }
  }
}
</script>
