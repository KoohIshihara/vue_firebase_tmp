<template lang="pug">
v-app
  v-content
    router-view
</template>

<script>
export default {
  name: "App"
}
</script>

<style lang="scss">
@import "./plugins/meltline.css";

html,
body {
  margin: 0;
  height: 100%;
}
</style>
