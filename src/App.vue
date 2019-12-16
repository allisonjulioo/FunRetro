<template>
  <div id="app">
    <nav-header></nav-header>
    <router-view />
  </div>
</template>
<script>
import NavHeader from "@/components/NavHeader/NavHeader.vue";

export default {
  name: "App",
  components: {
    NavHeader
  },
  watch: {
    $route(to, from) {
      this.$root.$emit('route:changed', true)
    }
  }
};
</script>

<style lang="scss">
$material-icons-font-path: "~material-icons/iconfont/";
@import "~material-icons/iconfont/material-icons.scss";
</style>
