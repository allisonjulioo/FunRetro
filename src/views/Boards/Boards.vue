<template>
  <div>
    <!--<time-line></time-line> -->
    <sy-container>
      <section class="container-board">
        <sy-title black class="title" v-if="boards.length">
          <span>Meus boards</span>
          <sy-button @click="showModal">+ Novo board</sy-button>
        </sy-title>
        <Row>
          <sy-container style="text-align: center; margin-top: 60px;" v-if="!boards.length">
            <img src="@/assets/empty.png" width="80%" alt style="max-width: 400px;" />
            <br />
            <sy-title>Parece que não há nada por aqui!</sy-title>
            <sy-button @click="showModal">Adicione um novo board</sy-button>
          </sy-container>
          <sy-card
            clickable
            hover
            class="boards"
            v-for="(board, index) in boards"
            :key="index"
            :class="{'editing' : board.editing}"
          >
            <router-link
              v-if="!board.editing"
              class="action-link"
              :to="'/board/'+ board.id"
              :col="3"
            >
              <sy-title black normal>{{board.title}}</sy-title>
            </router-link>
            <sy-title black normal sub>
              Votos
              <b>{{board.user_votes}}</b>
            </sy-title>
            <sy-input class="checkbox" :for="board.id">
              <input
                @change="editBoard(board)"
                v-model="board.in_voting"
                type="checkbox"
                :id="board.id"
                class="tgl tgl-light"
              />
              <label class="tgl-btn" :for="board.id"></label>
              <label :for="board.id" class="label">Iniciar votação</label>
            </sy-input>
            <sy-title black normal sub class="f-2" style="white-space: nowrap">
              <i class="material-icons mr-2">date_range</i>
              {{board.created_at | formatDate}}
              <span
                class="span-my-retros"
              >{{ board.in_voting ? '-Em votação' : ''}}</span>
            </sy-title>
            <sy-input v-if="board.editing" class="on-edit">
              <label>Nome</label>
              <input v-model="board.title" type="text" />
              <label>Votos por usuário</label>
              <input type="number" v-model="board.limit_votes" />
            </sy-input>
            <div class="actions">
              <!-- Default          -->
              <router-link v-if="!board.editing" :to="'/board/'+ board.id" :col="3">
                <sy-button icon>
                  <i class="material-icons">play_circle_filled</i>
                </sy-button>
              </router-link>
              <section v-if="!board.editing">
                <sy-button icon @click="board.editing = true">
                  <i class="material-icons">edit</i>
                </sy-button>
                <sy-button icon>
                  <i class="material-icons" @click="deleteBoard(board.id)">delete</i>
                </sy-button>
                <sy-button icon @click="showModalShare(board)">
                  <i class="material-icons">share</i>
                </sy-button>
              </section>
              <!-- On edit          -->
              <section v-if="board.editing">
                <sy-button icon @click="editBoard(board)">
                  <i class="material-icons">save</i>
                </sy-button>
                <sy-button icon @click="getBoards()">
                  <i class="material-icons">cancel</i>
                </sy-button>
              </section>
            </div>
          </sy-card>
        </Row>
      </section>
      <modal
        v-if="isModalShareVisible"
        @close="closeModalShare"
        @cancel="isModalShareVisible = false"
        :disable-save="false"
        center
      >
        <template v-slot:header>
          <sy-input full class="mb-10">
            <label>URL</label>
            <input type="text" v-model="urlBoard" maxlength="50" />
          </sy-input>
        </template>
        <template v-slot:body>
          <qrcode-vue
            level="H"
            :value="urlBoard"
            size="300"
            style="text-align: center"
            :renderAs="'svg'"
          ></qrcode-vue>
        </template>
        <template v-slot:footer>
          <sy-button @click="closeModalShare()">Fechar</sy-button>
        </template>
      </modal>
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
import "./Boards.scss";
import QrcodeVue from "qrcode.vue";
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
    Modal,
    QrcodeVue
  },
  data() {
    return {
      isModalVisible: false,
      isModalShareVisible: false,
      board: {
        title: "",
        limit_votes: 6,
        in_voting: false,
        editing: false
      },
      boards: [],
      editMode: false,
      urlBoard: ""
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
  sockets: {
    connect: function() {}
  },
  methods: {
    getBoards() {
      let vm = this;
      boardService.getBoards().then(res => {
        for (let board of res.data) {
          Object.assign(board, { editing: false });
        }
        vm.boards = res.data || [];
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
    showModalShare(board) {
      console.log(window.location);

      this.urlBoard = `${window.location.protocol}//${window.location.host}/board/${board.id}`;
      this.isModalShareVisible = true;
    },
    closeModalShare() {
      this.isModalShareVisible = false;
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
