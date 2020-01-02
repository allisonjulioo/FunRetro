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
import "./InlineEdit.scss"
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
