<template>
  <transition name="modal">
    <div class="modal-backdrop" :class="{'dismiss' : classDismiss }">
      <sy-card class="modal">
        <header class="modal-header" @click="e => e.stopPropagation()">
          <slot name="header">
            <sy-title>Criar board</sy-title>
            <button class="modal-close" @click="cancel">
              <span class="material-icons">close</span>
            </button>
          </slot>
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

export default {
  name: "Modal",
  props: {
    disableSave: Boolean
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

<style lang="scss">
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: +1;
  &.dismiss {
    animation: out 0.4s ease-in;
    .modal {
      animation: fadeOut 0.4s ease-in;
    }
  }
}

.modal {
  display: block;
  max-width: 600px;
  position: absolute;
  top: 50%;
  opacity: 1;
  left: 50%;
  transform: translate(-50%, -100%);
  animation: fade 0.5s ease-out;
  .modal-close {
    cursor: pointer;
    position: relative;
    border: none;
    background: transparent;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    margin-top: -10px;
    margin-right: -10px;
    &:focus {
      outline: none;
    }
    span {
      font-size: 18px;
    }
  }
  @media (max-width: 981px) {
    top: 70%;
    max-width: 90%;
  }
}
@keyframes fade {
  from {
    opacity: 0;
    transform: translate(-50%, -150%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -100%);
  }
}
@keyframes fadeOut {
  from {
    opacity: 1;
    transform: translate(-50%, -100%);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -200%);
  }
}
@keyframes out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.modal-header,
.modal-footer {
  padding: 10px 0;
  display: flex;
}

.modal-header {
  justify-content: space-between;
}

.modal-footer {
  justify-content: flex-end;
  @media (max-width: 981px) {
    justify-content: center;
  }
}

.modal-body {
  position: relative;
  padding: 20px 10px;
  text-align: left;
}
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
