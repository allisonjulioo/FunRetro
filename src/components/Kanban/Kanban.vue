<template>
  <section>
    <sy-container
      style="text-align: center; margin-top: 60px"
      v-if="
        !board.in_voting && Number(user_id_logged) !== Number(board.user_id)
      "
    >
      <img src="@/assets/404.png" width="80%" alt style="max-width: 400px" />
      <br />
      <sy-title
        >Parece que o board não está disponível {{ user_id_logged }} -
        {{ board }}</sy-title
      >
      <router-link to="/boards/" :col="3">
        <sy-button>Voltar ao início</sy-button>
      </router-link>
    </sy-container>
    <div id="board" v-else>
      <div class="header">
        <sy-title primary>
          {{ board.title || "Novo board" }}
          <br />
          <sy-title sub style="margin: 0; font-size: 14px">
            Criado em: {{ board.created_at | formatDate }}
          </sy-title>
        </sy-title>
        <dropdown :toggle-dropdown="isDropdownVisible" v-if="menuBarMobile">
          <template v-slot:button>
            <sy-button class="dropdown-toggle" icon @click="showDropdown">
              <span class="material-icons">more_vert</span>
            </sy-button>
          </template>
          <template v-slot:template>
            <ul class="menu">
              <li
                @click="
                  addColumn();
                  showDropdown();
                "
                v-if="columns.length <= 4"
              >
                <i class="material-icons">add</i> Nova coluna
              </li>
              <li
                @click="
                  createPDF();
                  showDropdown();
                "
              >
                <i class="material-icons">picture_as_pdf</i> Exportar pdf
              </li>
            </ul>
          </template>
        </dropdown>
        <div
          style="display: flex"
          v-if="!menuBarMobile && board.user_id == user_id_logged"
        >
          <sy-button
            v-if="true"
            @click="addColumn('AddNew')"
            :disabled="columns.length >= 4"
            :class="{ disabled: columns.length >= 4 }"
            >Nova coluna</sy-button
          >
          <sy-button class="pdf" @click="createPDF()" primary>
            <i class="material-icons">picture_as_pdf</i> Exportar pdf
          </sy-button>
        </div>
      </div>
      <Container
        lock-axis="x,y"
        @drop="onDrop($event)"
        :drag-begin-delay="500"
        orientation="horizontal"
        drag-handle-selector=".column-drag-handle"
        @drag-start="dragStart($event, this)"
        class="columns"
      >
        <Draggable
          class="column"
          v-for="(column, index) in columns"
          v-show="(menuBarMobile && selectedColumn == column) || !menuBarMobile"
          :key="index"
          :class="column.className"
        >
          <div class="title column-drag-handle">
            <sy-title normal class="header-column">
              <label
                id="color"
                v-bind:style="{ backgroundColor: column.color }"
              >
                <input
                  v-model="column.color"
                  type="color"
                  name
                  @change="updateColumn(column)"
                  :disabled="board.user_id != user_id_logged"
                />
              </label>
              <inline-edit
                :can-edit="board.user_id == user_id_logged"
                :label="column.title"
                @lchanged="
                  ($event) => {
                    column.title = $event;
                    updateColumn(column);
                  }
                "
                input
              />
            </sy-title>
            <span class="title">
              <span>{{
                columns[index].cards.length != 1
                  ? columns[index].cards.length + " cards"
                  : columns[index].cards.length + " card"
              }}</span>
              <sy-button icon v-if="board.user_id == user_id_logged">
                <i class="material-icons" @click="deleteColumn(column)"
                  >delete</i
                >
              </sy-button>
            </span>
          </div>
          <Container
            :drag-begin-delay="500"
            group-name="1"
            :get-child-payload="getChildPayload"
            @drop="onInnerDrop(column.cards, $event)"
            :drop-placeholder="dropPlaceholderOptions"
          >
            <Draggable v-for="(card, key) in column.cards" :key="key">
              <sy-card
                class="draggable-item"
                v-bind:style="{ backgroundColor: column.color }"
              >
                <div class="dot-infos">
                  <div class="avatar">
                    <img src="../../assets/avatar.png" width="30" alt />
                    <div class="info">
                      <img src alt />
                      <span>{{ card.user.name }}</span>
                    </div>
                  </div>
                </div>
                <inline-edit
                  :can-edit="user_id_logged == card.user_id"
                  :label="card.content"
                  @lchanged="
                    ($event) => {
                      (card.content = $event), updateCard(card);
                    }
                  "
                  :color="'#fff'"
                />
                <sy-button
                  v-if="user_id_logged == card.user_id"
                  icon
                  v-bind:style="{
                    backgroundColor: column.color + '!important',
                  }"
                  class="delete"
                >
                  <i class="material-icons" @click="deleteCard(card)">delete</i>
                </sy-button>
                <section
                  class="like"
                  :disabled="card.user_id === user_id_logged"
                >
                  <b>{{ card.likes ? "(" + card.likes + ")" : "" }}</b>
                  <sy-button outline icon @click="addLike(card)">
                    <i class="material-icons">thumb_up</i>
                  </sy-button>
                </section>
              </sy-card>
            </Draggable>

            <button
              class="add-task"
              @click="showModal(column)"
              :style="menuBarMobile && { background: column.color }"
            >
              <i class="material-icons">add</i>
            </button>
          </Container>
        </Draggable>
      </Container>
      <modal
        v-if="isModalVisible"
        @close="createCard(selectedCard)"
        @cancel="isModalVisible = false"
      >
        <template v-slot:header>
          <label>
            Criar para
            <strong>{{ selectedCard.title }}</strong>
          </label>
        </template>
        <template v-slot:body>
          <sy-input full class="mb-10">
            <textarea
              style="border: 1px solid #929eaa"
              autofocus
              v-model="description"
              maxlength="50"
            ></textarea>
            <span
              class="preamble"
              v-bind:style="[
                description.length == 50 ? { color: '#ff2948' } : {},
              ]"
              >{{ 50 - description.length }} carateres restantes</span
            >
          </sy-input>
        </template>
      </modal>
      <div class="footer-board-mobile" v-show="menuBarMobile">
        <ul>
          <li v-for="(column, index) in columns" :key="index">
            <button
              @click="selectColumn(column, index)"
              :class="{ active: selectedColumn == column }"
            >
              <label
                id="color"
                v-bind:style="{ backgroundColor: column.color }"
              ></label>
              <span>{{ column.title }}</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag, data } from "./helpers.js";
import {
  SyCard,
  SyButton,
  SyTitle,
  SyContainer,
  SyInput,
} from "@/ui-components";
import Modal from "@/components/Modal/Modal.vue";
import InlineEdit from "@/components/InlineEdit/InlineEdit.vue";
import boardService from "@/services/boards";
import columnService from "@/services/column";
import cardService from "@/services/cards";
import toast from "@/services/toaster";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Dropdown from "@/components/Dropdown/Dropdown";
import "./Kanban.scss";
export default {
  name: "Kanban",
  components: {
    Container,
    Draggable,
    SyCard,
    SyButton,
    SyTitle,
    SyContainer,
    SyInput,
    Modal,
    InlineEdit,
    Dropdown,
  },
  data() {
    return {
      isModalVisible: false,
      isDropdownVisible: false,
      description: "",
      selectedCard: "",
      index: 0,
      columns: [],
      dropPlaceholderOptions: {
        className: "drop-preview",
        animationDuration: "150",
        showOnTop: true,
      },
      menuBarMobile: false,
      selectedColumn: {},
      indexColumn: 0,
      board: {
        title: "",
        created_at: "",
        limit_votes: "",
        in_voting: false,
      },
      user_id_logged: localStorage.getItem("uid"),
    };
  },
  sockets: {
    socketUpdateColumn: function (data) {
      this.getColumns();
    },
  },
  created() {
    localStorage.setItem("bid", this.$route.params.idBoard);
    let vm = this;
    let size = window.innerWidth;
    this.menuBarMobile = size <= 981;
    this.selectedColumn = this.columns[this.indexColumn || 0];
    window.onresize = function (e) {
      let size = window.innerWidth;
      vm.menuBarMobile = size <= 981;
      vm.selectedColumn = vm.columns[vm.indexColumn || 0];
    };
    this.getColumns();
  },
  methods: {
    createPDF() {
      var doc = new jsPDF();
      let cdrs = [];
      doc.setFontSize(22);
      doc.text("This is a title", 20, 20);
      let tcards = [];
      for (let i in this.columns) {
        let column = this.columns[i];
        let bcards = [];
        tcards.push([column.title]);
        for (let j in column.cards) {
          let card = column.cards[j];
          if (card.column_id == this.columns[i].id) {
            bcards.push(card);
          }
        }
        cdrs.push(bcards);
      }
      for (let i in this.columns) {
        let dd = [];
        dd.push(cdrs[i].map((res) => res.content));
        let dd3 = [];
        dd3.push([dd[i]]);

        doc.autoTable({
          head: [tcards[i]],
          body: [dd3],
        });
      }
      doc.save(
        `${this.board.title} - ${this.$options.filters.formatDate(
          this.board.created_at
        )} .pdf`
      );
    },
    addColumn() {
      const data = {
        title: "Nova coluna",
        color: "#0097ff",
        id: this.board.id,
      };
      if (this.columns.length <= 4) {
        columnService.createColumn(data).then((res) => {
          toast.open("Coluna criada", "success");
          this.$socket.emit("socketUpdateColumn");
        });
      }
    },
    getColumns() {
      let vm = this;
      const id = this.$route.params.idBoard;
      columnService.getColumns(id).then((res) => {
        this.board = res.data.board;
        console.log(res.data.board);
        this.columns = res.data.columns;
        this.selectedColumn = this.columns[this.indexColumn || 0];
        let totalCards = 0;
        this.columns.forEach((column) => {
          totalCards = totalCards + column.cards.length;
        });
        let data = {
          ...this.board,
          user_votes: totalCards,
        };
        // boardService.updateBoard(data);
      });
    },
    updateColumn(column) {
      columnService.updateColumn(column).then((res) => {
        toast.open(res.data.message, "success");
        this.$socket.emit("socketUpdateColumn");
      });
    },
    deleteColumn(column) {
      columnService.deleteColumn(column).then((res) => {
        toast.open(`Coluna ${column.title} deletada`, "success");
        this.$socket.emit("socketUpdateColumn");
      });
    },
    createCard(column) {
      if (this.description.length) {
        const data = {
          content: this.description,
          board_id: column.board_id,
          id: column.column_id,
        };
        cardService.createCard(data).then((res) => {
          this.isModalVisible = false;
          toast.open("Card criado", "success");
          this.$socket.emit("socketUpdateColumn");
          this.description = "";
        });
      }
    },
    addLike(card) {
      card.likes = card.likes ? card.likes + 1 : 1;
      this.updateCard(card);
    },
    updateCard(card) {
      cardService.updateCard(card).then((res) => {
        toast.open("Card atualizado", "success");
        this.$socket.emit("socketUpdateColumn");
      });
    },
    deleteCard(card) {
      cardService.deleteCard(card).then((res) => {
        toast.open("Card deletado", "success");
        this.$socket.emit("socketUpdateColumn");
      });
    },
    selectColumn(column, index) {
      localStorage.setItem("column", JSON.stringify(column));
      this.selectedColumn = this.columns[index || 0];
      this.indexColumn = index || 0;
    },
    openDropdown() {
      this.dropdown = true;
    },
    onDrop(dropResult) {
      this.columns = applyDrag(this.columns, dropResult);
    },
    onInnerDrop(column, dropResult) {
      const newItems = [...this.columns];
      const index = newItems.indexOf(column);
      newItems[index].cards = applyDrag(newItems[index].cards, dropResult);
    },
    showDropdown(e) {
      this.isDropdownVisible = !this.isDropdownVisible;
      e.stopPropagation();
    },
    getChildPayload(index) {
      return this.columns[index].cards[index];
    },
    dragStart(index) {
      return index;
    },
    showModal(column) {
      const newItems = [...this.columns];
      this.index = newItems.indexOf(column);
      (this.selectedCard = column), (this.isModalVisible = true);
    },
  },
};
</script>
