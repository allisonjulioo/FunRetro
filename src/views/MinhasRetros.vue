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
          <sy-card clickable def @click="showModal" class="con-cards" v-if="!boards.length">
            <img class="empty-boards" src="../assets/empty.png" alt />
            <sy-title>
              Não há nada por aqui!
              <sy-title normal black>clique em mim para adicionar</sy-title>
            </sy-title>
          </sy-card>
          <sy-card
            clickable
            hover
            class="boards"
            v-for="(board, index) in boards"
            :key="index"
            :class="{'in_voting' : board.in_voting}"
          >
            <router-link
              v-if="!board.in_voting"
              class="action-link"
              :to="'/board/'+ board.board_id"
              :col="3"
            >
              <sy-title black normal>{{board.title}}</sy-title>
              <sy-title black normal sub>
                Votos por usuário
                <b>{{board.limit_votes}}</b>
              </sy-title>
              <sy-title black normal sub class="f-2" style="white-space: nowrap">
                <i class="material-icons mr-2">date_range</i>
                {{board.created_date | formatDate}}
                <span
                  class="span-my-retros"
                >{{ board.in_voting ? '-Em votação' : ''}}</span>
              </sy-title>
            </router-link>
            <sy-input v-if="board.in_voting" class="on-edit">
              <label>Nome</label>
              <input v-model="board.title" type="text" />
              <label>Votos por usuário</label>
              <input type="number" v-model="board.limit_votes" />
            </sy-input>
            <div class="actions">
              <!-- Default          -->
              <section v-if="!board.in_voting">
                <sy-button icon @click="board.in_voting = true">
                  <i class="material-icons">edit</i>
                </sy-button>
                <sy-button icon>
                  <i class="material-icons" @click="deleteBoard(board.board_id)">delete</i>
                </sy-button>
              </section>
              <!-- On edit          -->
              <section v-if="board.in_voting">
                <sy-button icon @click="editBoard(board)">
                  <i class="material-icons">save</i>
                </sy-button>
                <sy-button icon @click="board.in_voting = false">
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
        :disable-save="false"
      >
        <template v-slot:body>
          <sy-input full class="mb-10">
            <label>Nome</label>
            <input type="text" v-model.trim="board.title" maxlength="50" />
            <span
              class="preamble"
              v-bind:style="[board.title.length == 50 ? {color : '#ff2948'} : {}]"
            >{{50 - board.title.length}} carateres restantes</span>
          </sy-input>
          <sy-input pre-left class="mb-10">
            <label>Votos por usuário</label>
            <input type="number" v-model="board.limit_votes" />
          </sy-input>
        </template>
      </modal>
    </sy-container>
  </div>
</template>

<script>
import TimeLine from "@/components/Timeline/TimeLine";
import Modal from "@/components/Modal/Modal";
import boardService from "@/services/boards";

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
      board: {
        title: "",
        limit_votes: 6,
        in_voting: false
      },
      boards: [],
      editMode: false
    };
  },
  computed: {
    load: async function() {
      await this.getBoards();
    }
  },
  mounted() {
    this.load;
  },
  methods: {
    getBoards() {
      let vm = this;
      boardService.getBoards().then(res => {
        vm.boards = res.data.boards;
      });
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      let vm = this;
      const data = {
        title: this.board.title,
        limit_votes: this.board.limit_votes
      };
      boardService.createBoard(data).then(res => {
        this.getBoards();
        vm.isModalVisible = false;
      });
    },
    deleteBoard(id) {
      boardService.deleteBoard(id).then(res => {
        this.getBoards();
      });
    },
    editBoard(board) {
      boardService.updateBoard(board).then(res => {
        this.getBoards();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../variables/_colors.scss";
.container-board {
  margin-top: 40px;
  @media (max-width: 981px) {
    .con-cards {
      margin-right: 0;
    }
  }
}
.span-my-retros {
  color: $primary;
  font-size: 18px;
}
.boards {
  width: calc(25% - 30px);
  margin-right: 20px;
  max-width: 300px;
  position: relative;
  overflow: hidden;
  @media (max-width: 981px) {
    width: 100%;
    margin-right: 0px;
    max-width: 100%;
    .actions {
      opacity: 1 !important;
    }
  }

  a > h1 {
    text-overflow: ellipsis;
    overflow: hidden;
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
    background: $primary;
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
  &.in_voting {
    border: 1px solid #8030ff;
    box-shadow: 0 4px 24px 1px rgba(128, 48, 255, 0.2);
    .actions {
      opacity: 1 !important;
      background: #8030ff;
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
  .container-board {
    margin: 0;
  }
  .title {
    flex-direction: row;
    align-items: center;
    width: 100%;
    button {
      position: fixed;
      bottom: 10px;
      right: 10px;
      z-index: 1;
      font-size: 12px;
      height: 50px;
    }
  }
}
</style>
