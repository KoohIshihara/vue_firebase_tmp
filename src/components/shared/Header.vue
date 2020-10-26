<template lang="pug">
  Auth
    div.wrap-common-header
      div.header-content.f.fh
        div(v-if="content.left" @click="onLeft").left.f.fm
          v-icon(:color="content.left.color").mr4 {{content.left.icon}}
          span(:style="`color: ${content.left.color};`") {{content.left.label}}
        div.wrap-label
          span(v-if="content.label").label.line-clamp-1.fz16 {{content.label}}
        div(v-if="content.right" @click="onRight").right.f.fm
          v-icon(:color="content.right.color").mr4 {{content.right.icon}}
          span(:style="`color: ${content.right.color};`") {{content.right.label}}
</template>

<style lang="scss" scoped>
.wrap-common-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 48px;
  // background: $primary_bg_color;
  // border-bottom: solid $border_size $border_color;
  z-index: 1000;
  .header-content {
    position: relative;
    // width: $base_width_percent;
    height: 100%;
    // max-width: $base_max_width_px;
    margin: 0 auto;
    .left {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      // color: $primary_text_color;
    }
    .wrap-label {
      max-width: 160px;
    }
    .right {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      // color: $primary_text_color;
    }
  }
}
</style>

<script>
import Auth from "@/components/auth"

export default {
  components: {
    Auth
  },
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  methods: {
    onLeft () {
      this.content.left.to && this.$router.push(this.content.left.to)
      this.content.left.action && this.content.left.action()
    },
    onRight () {
      this.content.right.to && this.$router.push(this.content.right.to)
      this.content.right.action && this.content.right.action()
    }
  }
}
</script>
