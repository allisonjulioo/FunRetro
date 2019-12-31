<template>
  <sy-input class="label-edit">
    <span v-show="!canEdit" class="canEdit" :style="{ color : color }">{{label}}</span>
    <span
      class="canEdit enable-edit"
      v-bind:style="{ color : color }"
      v-show="!editing && canEdit"
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
      @keyup.enter="saveEdit(newLabel)"
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
    color: String,
    canEdit: Boolean
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
.label-edit {
  max-width: 300px;
  display: block;
  word-break: break-all;
}
.canEdit {
  padding: 9px 10px;
  cursor: text;
  color: #ffffff;
  width: 100%;
  border-radius: 4px;
  &::-moz-selection {
    background: yellow;
  }
  &::selection {
    background: yellow;
  }
  &.enable-edit {
    &:hover {
      background: #ffffff;
      color: #5d5d5d !important;
    }
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
