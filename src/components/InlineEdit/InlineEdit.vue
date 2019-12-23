<template>
  <sy-input>
    <span
      class="canEdit"
      v-bind:style="{ color : color }"
      v-show="!editing"
      @click="toggleEdit($event)"
    >{{label}}</span>
    <input
      class="canEditInput"
      v-show="editing && input"
      v-model="newLabel"
      @blur="saveEdit(newLabel)"
    />
    <textarea
      v-show="editing && !input"
      v-model="newLabel"
      @keyup.enter.native="saveEdit(newLabel)"
      @blur="saveEdit(newLabel)"
    ></textarea>
  </sy-input>
</template>
<script>
import { SyInput } from "@/ui-components";
export default {
  name: "InlineEdit",
  components: {
    SyInput
  },
  props: {
    label: String,
    input: Boolean,
    color: String
  },
  data() {
    return {
      editing: false,
      newLabel: ""
    };
  },
  methods: {
    toggleEdit: function(e) {
      this.newLabel = this.label;
      this.editing = !this.editing;
    },
    saveEdit: function(newLabel) {
      this.$emit("lchanged", newLabel);
      this.toggleEdit();
    }
  }
};
</script>

<style lang="scss" scoped>
.canEdit {
  padding: 9px 10px;
  cursor: text;
  height: 38px;
  width: 100%;
  border-radius: 4px;
  &:hover {
    background: #ffffff;
    color: #5d5d5d !important;
  }
}
.canEditInput {
  padding: 4px 12px !important;
  font-size: 14px;
  font-weight: 600;
  color: #50525f;
  margin-left: -3px;
  margin-top: -1px;
  line-height: 0.1;
  margin-bottom: 1px;
}
</style>
