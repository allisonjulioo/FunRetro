<template>
  <div>
    <time-line></time-line>
    <sy-container>
      <section class="container-board">
        <sy-title black class="title">
          <span>Meus boards</span>
          <sy-button @click="showModal">+ Adicionar novo board</sy-button>
        </sy-title>
        <Row>
          <sy-card clickable def @click="showModal" class="con-cards" v-if="!retros.length">
            <img class="empty-boards" src="../assets/empty.png" alt />
            <sy-title>
              Não há nada por aqui!
              <sy-title normal black>clique em mim para adicionar</sy-title>
            </sy-title>
          </sy-card>
          <sy-card
            clickable
            hover
            class="retros"
            v-for="(retro, index) in retros"
            :key="index"
            :class="{'editing' : retro.editing}"
          >
            <router-link v-if="!retro.editing" class="action-link" to="/retro/1" :col="3">
              <sy-title black normal>{{retro.name}}</sy-title>
              <sy-title black normal sub>
                Votos por usuário
                <b>{{retro.votes || '10/01/2019'}}</b>
              </sy-title>
              <sy-title black normal sub class="f-2" style="white-space: nowrap">
                <i class="material-icons mr-2">date_range</i>
                {{retro.date || '10/01/2019'}} -
                <span
                  style="color: #0097ff; font-size: 18px;"
                >Em votação</span>
              </sy-title>
            </router-link>
            <sy-input v-if="retro.editing" class="on-edit">
              <label>Nome</label>
              <input v-model="retro.name" type="text" />
              <label>Votos por usuário</label>
              <input type="number" v-model="retro.votes" />
            </sy-input>
            <div class="actions">
              <!-- Default          -->
              <section v-if="!retro.editing">
                <sy-button icon @click="retro.editing = true">
                  <i class="material-icons">edit</i>
                </sy-button>
                <sy-button icon>
                  <i class="material-icons" @click="deleteBoard(index)">delete</i>
                </sy-button>
              </section>
              <!-- On edit          -->
              <section v-if="retro.editing">
                <sy-button icon @click="retro.editing = false">
                  <i class="material-icons">save</i>
                </sy-button>
                <sy-button icon @click="retro.editing = false">
                  <i class="material-icons">cancel</i>
                </sy-button>
              </section>
            </div>
          </sy-card>
        </Row>
      </section>
      <modal
        v-if="isModalVisible"
        @close="closeModal"
        @cancel="isModalVisible = false"
        :disable-save="retro.name.length< 5"
      >
        <template v-slot:body>
          <sy-input full class="mb-10">
            <label>Nome</label>
            <input type="text" v-model.trim="retro.name" maxlength="50" />
            <span
              class="preamble"
              v-bind:style="[retro.name.length == 50 ? {color : '#ff2948'} : {}]"
            >{{50 - retro.name.length}} carateres restantes</span>
          </sy-input>
          <sy-input pre-left class="mb-10">
            <label>Votos por usuário</label>
            <input type="number" v-model="retro.votes" />
          </sy-input>
        </template>
      </modal>
    </sy-container>
  </div>
</template>

<script>
import TimeLine from "@/components/Timeline/TimeLine";
import Modal from "@/components/Modal/Modal";

import {
  SyCard,
  Row,
  Column,
  SyButton,
  SyTitle,
  SyContainer,
  SyInput
} from "@/ui-components";

export default {
  name: "home",
  components: {
    TimeLine,
    SyCard,
    Row,
    Column,
    SyButton,
    SyTitle,
    SyInput,
    SyContainer,
    Modal
  },
  data() {
    return {
      isModalVisible: false,
      retro: {
        name: "",
        votes: 6,
        editing: false
      },
      retros: [],
      editMode: false
    };
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.retros.push(this.retro);
      this.retro = {
        name: "",
        votes: 6,
        editing: false
      };
      this.isModalVisible = false;
    },
    deleteBoard(index) {
      this.retros.splice(index, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.container-board {
  margin-top: 40px;
  @media (max-width: 981px) {
    .con-cards {
      margin-right: 0;
    }
  }
}
.retros {
  width: 25%;
  margin-right: 20px;
  max-width: 300px;
  position: relative;
  overflow: hidden;
  @media (max-width: 981px){
    width: 100%;
    margin-right: 0px;
    max-width: 100%;
    .actions{
      opacity: 1 !important;
    }
  }
  .action-link {
    display: block;
    width: calc(100% - 3px);
    height: calc(100% + 40px);
    margin: -20px;
    padding: 20px;
  }
  .on-edit {
    width: calc(100% - 35px);
    display: block;
  }
  .actions {
    opacity: 0.3;
    transition: all 0.3s ease;
    width: 100%;
    background: #0097ff;
    padding: 5px 15px;
    position: absolute;
    right: 0%;
    top: 0;
    width: 40px;
    height: 100%;
    button {
      position: relative;
      left: -4px;
      i {
        color: #fff;
      }
    }
  }
  &.editing {
    border: 1px solid #0097ff;
    box-shadow: 0 4px 24px 1px rgba(0, 0, 0, 0.1);
    .actions {
      opacity: 1 !important;
    }
  }
  &:hover {
    .actions {
      opacity: 1 !important;
      transition: all 0.3s ease;
      position: absolute;
    }
  }
}
.con-cards {
  display: table-cell;
  vertical-align: middle;
  margin-right: 20px;
  img {
    filter: hue-rotate(-531deg) invert(18%) contrast(110%);
  }
}
@media (max-width: 981px) {
  .empty-boards {
    width: 100%;
  }
  .title {
    flex-direction: column;
    align-items: center;
    width: 100%;
    button {
      margin: 1em 0;
    }
  }
}
</style>
