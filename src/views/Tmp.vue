<template lang="pug">
  Auth(@loggedIn="onLoggedIn"
    :redirectWithLoginFailed="true")
    Header(:content="headerContent")
    div.wrap-home.f.fh
      ModuleTmp

</template>

<style lang="scss" scoped>
.wrap-home {
  width: 100%;
  min-height: 100vh;
}
</style>

<script>
import db from '@/components/utils/firebase'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapStateAuth, mapActions: mapActionsAuth } = createNamespacedHelpers('auth')
import Auth from '@/components/shared/Auth'
import Header from '@/components/shared/Header.vue'
import ModuleTmp from '@/components/module/ModuleTmp'

export default {
  components: {
    Auth,
    Header,
    ModuleTmp
  },
  data () {
    return {
      owner: null,
      headerContent: {
        label: 'Tmp',
        rightAction: {
          icon: 'add',
          color: '#1967d2',
          method: this.onHeaderRight
        }
      }
    }
  },
  computed: {
    ...mapStateAuth(['uid'])
  },
  methods: {
    onLoggedIn () {
    
    }
  }
}
</script>
