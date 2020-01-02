<template>
  <transition name="modal">
    <div class="modal-backdrop" :class="{'dismiss' : classDismiss }">
      <sy-card class="modal" :class="{'center' : center}">
        <header class="modal-header" @click="e => e.stopPropagation()">
          <slot name="header">
            <sy-title>Criar board</sy-title>
          </slot>
          <button class="modal-close" @click="cancel">
            <span class="material-icons">close</span>
          </button>
        </header>
        <section class="modal-body">
          <slot name="body">I'm the default body!</slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <sy-button @click="cancel" primary>Cancelar</sy-button>
            <sy-button :disabled="disableSave" @click="close">Criar</sy-button>
          </slot>
        </footer>
      </sy-card>
    </div>
  </transition>
</template>

<script>
import { SyCard, SyButton, SyTitle } from "@/ui-components";
import "./Modal.scss";
export default {
  name: "Modal",
  props: {
    disableSave: Boolean,
    center: Boolean
  },
  components: {
    SyCard,
    SyButton,
    SyTitle
  },
  data() {
    return {
      classDismiss: false
    };
  },
  created() {
    let vm = this;
    document.addEventListener("keyup", function(evt) {
      if (evt.keyCode === 27) {
        vm.cancel();
      }
    });
  },
  methods: {
    close() {
      this.classDismiss = true;
      setTimeout(() => {
        this.$emit("close");
        this.classDismiss = false;
      }, 150);
    },
    cancel() {
      this.classDismiss = true;
      setTimeout(() => {
        this.$emit("cancel");
        this.classDismiss = false;
      }, 150);
    }
  }
};
</script>
