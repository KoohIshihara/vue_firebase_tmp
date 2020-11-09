<template lang="pug">
  div(v-if="shopInfo").wrap-module-spot-detail
    div.spot-detail-section.py12
      span.block.fz20.bold.mb8 バッテリーの補充
      div.required-num.f.fm.mb12
        v-icon(size="18px").mr6 mdi-plus-box
        span.block.fz14 {{`${requiredNum}個`}}
      div.place.f.flex-top
        v-icon(size="20px").mr4 mdi-map-marker
        span.block.fz14 {{`${shopInfo.name} ${shopInfo.address}`}}
    GmapMap(
      ref="gmap"
      v-if="center"
      :center="center"
      :options="options"
      map-type-id="terrain"
      style="width: 100vw; height: 320px;")
      GmapMarker(
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :icon="m.icon"
        @click="onMarker(m)")
    //- div.spot-detail-section.mt2
      span.fz12 {{`${shopInfo.name} ${shopInfo.address}`}}
    div.spot-detail-section.py12
      span.block.bold.fz14 詳細：
      p.fz14 Charge Spotのバッテリーの補充をお願いします。経由するスポットからバッテリーを取り出して目的地のスポットに補充してください。
      span.block.bold.fz14 成果報告：
      p.fz14 補充した様子を写真で撮ってアップロードしてください。設置時に位置情報を送信してください。
</template>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";

.wrap-module-spot-detail {
  width: 100%;
  min-height: 100vh;
  .spot-detail-section {
    width: $base_width_percent;
    max-width: $base_max_width_px;
    margin: 0 auto;
  }
}
</style>

<script>
import { createNamespacedHelpers } from "vuex"
const { mapState: mapStateAuth, mapActions: mapActionsAuth } = createNamespacedHelpers("auth")
import { getCenter } from "geolib"
import { gmapApi } from "vue2-google-maps"

import iconSpot from "../../assets/icon-spot.svg"
import iconAPoint from "../../assets/icon-a-point.svg"
import iconUser from "../../assets/icon-user.svg"

export default {
  components: {
  },
  props: {
    insufficientSpots: {
      type: Array,
      required: false
    }
  },
  computed: {
    ...mapStateAuth(["uid"]),
    google: gmapApi
  },
  data () {
    return {
      shopInfo: null,
      requiredNum: null,
      center: null,
      options: {
        zoom: 16,
        gestureHandling: "greedy"
      },
      markers: []
    }
  },
  created () {
    this.shopInfo = this.insufficientSpots.filter(e => { 
      return e.shop_id === this.$route.params.shopId
    })[0]

    this.requiredNum = Number(this.shopInfo.expect_insert) - Number(this.shopInfo.current_pb)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.mapMarkers, (error) => {
        console.log("error:", error)
        alert("現在地が取得できません。ブラウザの位置情報設定が有効になっているかをご確認ください。")
      })
    } else { //Geolocation apiがサポートされていない場合
      alert("このブラウザでは現在地が取得できません")
    }
  },
  methods: {
    mapMarkers (myPos) {
      let lat  = myPos.coords.latitude
      let lng = myPos.coords.longitude
      console.log("pos:", { lat, lng })

      // 現在地からsufficientなスポットを半径3km以内でフィルターする
      // APIがないのでinsufficientなスポットで代用中
      this.markers = this.insufficientSpots.map(e => {
          e.type = "via"
          e.position = { lat: Number(e.lat), lng: Number(e.lng) }
          e.icon = { url: iconAPoint, scaledSize: { width: 28, height: 28 } }
          return e
        }).splice(0, 100)

      this.shopInfo.type = "shop"
      this.shopInfo.position = { lat: Number(this.shopInfo.lat), lng: Number(this.shopInfo.lng) }
      this.shopInfo.icon = { url: iconSpot, scaledSize: { width: 28, height: 28 } }
      this.markers.push(this.shopInfo)

      this.markers.push({
        type: "user",
        position: { lat, lng },
        icon: { url: iconUser, scaledSize: { width: 28, height: 28 } }
      })
      
      let center = getCenter([
        { latitude: lat, longitude: lng }, // my position
        { latitude: Number(this.shopInfo.lat), longitude: Number(this.shopInfo.lng) } // shop position
      ])
      this.center = { lat: center.latitude, lng: center.longitude }
    },
    async onMarker (marker) {
      if (marker.type !== "via") return

      console.log("onMarker:", marker)

      let myPosMarker = this.markers.filter(e => { return e.type === "user" })[0]
      let viaMarker = marker
      let goalMarker = this.markers.filter(e => { return e.type === "user" })[0]

      let map = await this.$refs.gmap.$mapPromise.then((map) => {
        return map
      })
      
      let directionsService = new this.google.maps.DirectionsService()
      let directionsDisplay = new this.google.maps.DirectionsRenderer()

      directionsDisplay.setMap(map)

      let request1 = {
        origin: new this.google.maps.LatLng(myPosMarker.position.lat, myPosMarker.position.lng),
        destination: new this.google.maps.LatLng(viaMarker.position.lat, viaMarker.position.lng),
        travelMode: this.google.maps.TravelMode.WALKING
      }
      directionsService.route(request1, (result, status) => {
        if (status == this.google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(result)
        }
      })

      let request2 = {
        origin: new this.google.maps.LatLng(viaMarker.position.lat, viaMarker.position.lng),
        destination: new this.google.maps.LatLng(goalMarker.position.lat, goalMarker.position.lng),
        travelMode: this.google.maps.TravelMode.WALKING
      }
      directionsService.route(request2, (result, status) => {
        if (status == this.google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(result)
        }
      })
    }
  }
}
</script>
