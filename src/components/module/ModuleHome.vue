<template lang="pug">
  div.wrap-home.f.fh
    span(@click="logout") Sign Out

</template>

<style lang="scss" scoped>
.wrap-home {
  width: 100%;
  min-height: 100vh;
}
</style>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapStateAuth, mapActions: mapActionsAuth } = createNamespacedHelpers('auth')

export default {
  components: {
  },
  computed: {
    ...mapStateAuth(['uid'])
  },
  data () {
    return {
      showModal: true,
      headerContent: {
        label: "home",
        rightAction: {
          icon: "add",
          color: "#1967d2",
          method: this.onHeaderRight
        }
      }
    }
  },
  methods: {
    ...mapActionsAuth(['signOut']),
    logout () {
      this.signOut()
      setTimeout(() => {
        this.$router.push('/sign-in')
      }, 400)
    },
    onLoggedIn () {
      
    },
    onFailedAuthentication () {
      this.$router.push('/sign-in')
    },
    openModal () {
      this.showModal = true
    },
    closeModal (e) {
      this.showModal = false
    },
    onHeaderRight () {
      console.log("onHeaderRight")
    }
  }
}
</script>
