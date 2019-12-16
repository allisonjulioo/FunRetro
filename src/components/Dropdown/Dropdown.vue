<template>
  <div id="dropdown">
    <slot name="button">
      <sy-button @click="close()">fechar</sy-button>
    </slot>
    <sy-card class="dropdown-menu" v-if="toggleDropdown">
      <slot name="template">template</slot>
    </sy-card>
  </div>
</template>
<script>
import { SyCard, SyButton } from "@/ui-components";

export default {
  name: "Dropdown",
  components: {
    SyCard,
    SyButton
  },
  props: {
    toggleDropdown: Boolean
  },
  mounted() {
    let vm = this;
    window.onclick = e => {
      let menu = e.target.classList.contains("dropdown-menu");
      let btn = e.target.classList.contains("dropdown-toggle");
      let parent = e.target.parentElement.parentElement.parentElement.classList.contains(
        "dropdown-menu"
      );

      if (!menu && !btn && !parent) {
        vm.$root.$emit("closeDropdown");
      }
    };
  },
  data() {
    return {
      showDropdown: false
    };
  },
  methods: {
    close() {
      this.$emit("closeDropdown");
    }
  }
};
</script>
<style lang="scss" scoped>
#dropdown {
  float: right;
  position: relative;
  .dropdown-menu {
    min-width: 200px;
    top: calc(100% + -3px);
    position: absolute;
    display: table;
    right: 0;
    z-index: +1;
  }
}
</style>