<template lang="pug">
  div
    Header(:content="header")
    ModalPage(
      v-for="(item, index) in modalPages"
      :showModalPage="item.show"
      :index="index")
      ModuleTmp(
        v-if="modalPages[index].currentContent == 'tmp' && index == 0"
        @closeModalPage="modalPages[index].show = false")
      ModuleTmp2(
        v-if="modalPages[index].currentContent == 'tmp2' && index == 1"
        @closeModalPage="modalPages[index].show = false")
      ModuleSpotDetail(
        v-if="modalPages[index].currentContent == 'spot_detail' && index == 1 && opt.insufficientSpots"
        :insufficientSpots="opt.insufficientSpots"
        @closeModalPage="modalPages[index].show = false")
    ModalWindow(
      :showModal="showModalWindow"
      @closeModalWindow="closeModalWindow")
      ModuleTmp(v-if="modalWindowContent == 'tmp'")
    slot
</template>

<script>
import { createNamespacedHelpers } from "vuex"
const { mapState: mapStateAuth } = createNamespacedHelpers("auth")
import Header from "@/components/shared/Header"
import ModalWindow from "@/components/shared/ModalWindow"
import ModalPage from "@/components/shared/ModalPage"
import ModuleTmp from "@/components/module/ModuleTmp"
import ModuleTmp2 from "@/components/module/ModuleTmp2"
import ModuleSpotDetail from "@/components/module/ModuleSpotDetail"

export default {
  components: {
    Header,
    ModalPage,
    ModalWindow,
    ModuleTmp,
    ModuleTmp2,
    ModuleSpotDetail
  },
  computed: {
    ...mapStateAuth(["uid"])
  },
  props: {
    rootHeaderTitle: {
      type: String,
      default: ""
    },
    opt: {
      type: Object,
      required: false
    }
  },
  data () {
    return  {
      header: {},
      rootHeader: {
        title: this.rootHeaderTitle,
        left: {
          icon: "mdi-battery-positive",
          to: "/spots"
        },
        right: {
          icon: "mdi-account-circle",
          to: "/tmp"
        }
      },
      modalPages: [
        { currentContent: "", show: false },
        { currentContent: "", show: false }
      ],
      showModalWindow: false,
      modalWindowContent: ""
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
    changeModalPageByRouteParams () {
      console.log("changeModalPageByRouteParams:", this.$route.name)

      this.header = {}
      this.modalPageContent = ""

      let currentModalIndex
      switch (this.$route.name) {
        case "tmp":
        case "spots":
          currentModalIndex = -1
          this.header = this.rootHeader
          break
        case "tmp_detail":
          currentModalIndex = 0
          this.modalPages[currentModalIndex].currentContent = "tmp"
          this.modalPages[currentModalIndex].show = true

          this.header = {
            title: "Detail1",
            left: {
              label: "Detail1",
              icon: "mdi-chevron-left",
              to: "/tmp"
            }
          }
          break
        case "tmp_detail2":
          currentModalIndex = 1
          this.modalPages[currentModalIndex].currentContent = "tmp2"
          this.modalPages[currentModalIndex].show = true

          this.header = {
            title: "Tmp Detail2",
            left: {
              label: "Tmp Detail1",
              icon: "mdi-chevron-left",
              to: `/tmp/${this.uid}`
            }
          }
          break
        case "spot_detail":
          currentModalIndex = 1
          this.modalPages[currentModalIndex].currentContent = "spot_detail"
          this.modalPages[currentModalIndex].show = true

          this.header = {
            title: "",
            left: {
              label: "近くのスポット",
              icon: "mdi-chevron-left",
              to: "/spots"
            }
          }
          break
      }
      this.modalPages = this.modalPages.map((e, i) => {
        if (i > currentModalIndex) {
          e.currentContent = ""
          e.show = false
        }
        return e
      })
    },
    openModalWindow (content) {
      this.modalWindowContent = content
      this.showModalWindow = true
    },
    closeModalWindow () {
      this.modalWindowContent = ""
      this.showModalWindow = false
    }
  }
}
</script>
