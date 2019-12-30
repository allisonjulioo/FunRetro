<template>
  <div id="board">
    <div class="header">
      <sy-title primary>
        {{board.title || 'Novo board'}}
        <br />
        <sy-title
          sub
          style="margin: 0; font-size: 12px;"
        >Criado em: {{board.created_at | formatDate}}</sy-title>
      </sy-title>
      <div style="display: flex">
        <sy-button
          v-if="true"
          @click="addColumn('AddNew')"
          :disabled="columns.length >= 4"
          :class="{'disabled' : columns.length >= 4}"
        >Nova coluna</sy-button>
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
            <label id="color" v-bind:style="{ backgroundColor : column.color }">
              <input v-model="column.color" type="color" name @change="updateColumn(column)" />
            </label>
            <inline-edit
              :can-edit="true"
              :label="column.title"
              @lchanged="$event => {column.title = $event; updateColumn(column)}"
              input
            />
          </sy-title>
          <sy-button icon v-if="true">
            <i class="material-icons" @click="deleteColumn(column)">delete</i>
          </sy-button>
        </div>
        <button
          class="add-task"
          @click="showModal(column)"
          :style=" menuBarMobile &&{ background: column.color }"
        >
          <i class="material-icons">add</i>
        </button>
        <Container
          :drag-begin-delay="500"
          group-name="1"
          :get-child-payload="getChildPayload"
          @drop="onInnerDrop(column.cards, $event)"
          :drop-placeholder="dropPlaceholderOptions"
        >
          <Draggable v-for="(card, key) in column.cards" :key="key">
            <sy-card class="draggable-item" v-bind:style="{ backgroundColor : column.color }">
              <inline-edit
                :can-edit="user_id_logged == card.user_id"
                :label="card.content"
                @lchanged="$event =>{ card.content = $event, updateCard(card)}"
                :color="'#fff'"
              />
              <sy-button
                v-if="user_id_logged == card.user_id"
                icon
                v-bind:style="{ backgroundColor : column.color + '!important' }"
                class="delete"
              >
                <i class="material-icons" @click="deleteCard(card)">delete</i>
              </sy-button>
              <div class="dot-infos">
                <div class="avatar">
                  <img src="../../assets/avatar.png" width="30" alt />
                  <div class="info">
                    <img src alt />
                    <span>{{card.user.name}}</span>
                  </div>
                </div>
                <sy-button outline class="like" @click="addLike(card)">
                  <b>{{card.likes ? '('+card.likes+')' : ''}}</b>
                  <i class="material-icons">thumb_up</i>
                </sy-button>
              </div>
            </sy-card>
          </Draggable>
        </Container>
      </Draggable>
    </Container>
    <modal v-if="isModalVisible" @close="createCard(selectedCard)" @cancel="isModalVisible = false">
      <template v-slot:header>
        <label>
          Criar para
          <strong>{{selectedCard.title}}</strong>
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
            v-bind:style="[description.length == 50 ? {color : '#ff2948'} : {}]"
          >{{50 - description.length}} carateres restantes</span>
        </sy-input>
      </template>
    </modal>
    <div class="footer-board-mobile" v-show="menuBarMobile">
      <ul>
        <li v-for="(column, index) in columns" :key="index">
          <button
            @click="selectColumn(column, index)"
            :class="{'active' : selectedColumn == column}"
          >
            <label id="color" v-bind:style="{ backgroundColor : column.color }"></label>
            <span>{{column.title}}</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag, data } from "./helpers.js";
import {
  SyCard,
  SyButton,
  SyTitle,
  SyContainer,
  SyInput
} from "@/ui-components";
import Modal from "@/components/Modal/Modal.vue";
import InlineEdit from "@/components/InlineEdit/InlineEdit.vue";
import columnService from "@/services/column";
import boardService from "@/services/boards";
import cardService from "@/services/cards";
import userService from "@/services/users";
import toast from "@/services/toaster";
import jsPDF from "jspdf";
import "jspdf-autotable";

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
    InlineEdit
  },
  data() {
    return {
      isModalVisible: false,
      description: "",
      selectedCard: "",
      index: 0,
      columns: [],
      dropPlaceholderOptions: {
        className: "drop-preview",
        animationDuration: "150",
        showOnTop: true
      },
      menuBarMobile: false,
      selectedColumn: Object,
      board: {
        title: String,
        created_at: Date,
        limit_votes: Boolean,
        in_voting: Boolean
      },
      user_id_logged: localStorage.getItem("uid")
    };
  },
  sockets: {
    socketUpdateColumn: function(data) {
      this.getColumns();
    }
  },
  created() {
    localStorage.setItem("bid", this.$route.params.idBoard);
    let vm = this;
    let size = window.innerWidth;
    this.menuBarMobile = size <= 981;
    this.selectedColumn = this.columns[0];
    window.onresize = function(e) {
      let size = window.innerWidth;
      vm.menuBarMobile = size <= 981;
      vm.selectedColumn = vm.columns[0];
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
        dd.push(cdrs[i].map(res => res.content));
        let dd3 = [];
        dd3.push([dd[i]]);

        doc.autoTable({
          head: [tcards[i]],
          body: [dd3]
        });
      }
      doc.save(`${this.board.title} - ${this.$options.filters.formatDate(this.board.created_at)} .pdf`);
    },
    addColumn() {
      const data = {
        title: "Nova coluna",
        color: "#0097ff",
        id: this.board.id
      };
      if (this.columns.length <= 4) {
        columnService.createColumn(data).then(res => {
          toast.open("Coluna criada", "success");
          this.$socket.emit("socketUpdateColumn");
        });
      }
    },
    getColumns() {
      let vm = this;
      const id = this.$route.params.idBoard;
      columnService.getColumns(id).then(res => {
        this.board = res.data;
        vm.columns = res.data.columns;
      });
    },
    updateColumn(column) {
      columnService.updateColumn(column).then(res => {
        toast.open(res.data.message, "success");
        this.$socket.emit("socketUpdateColumn");
      });
    },
    deleteColumn(column) {
      columnService.deleteColumn(column).then(res => {
        toast.open(`Coluna ${column.title} deletada`, "success");
        this.$socket.emit("socketUpdateColumn");
      });
    },
    createCard(column) {
      if (this.description.length) {
        const data = {
          content: this.description,
          board_id: column.board_id,
          id: column.id
        };
        cardService.createCard(data).then(res => {
          toast.open("Card criado", "success");
          this.$socket.emit("socketUpdateColumn");
          this.description = "";
          this.isModalVisible = false;
        });
      }
    },
    addLike(card){
      card.likes  = card.likes +1;
      this.updateCard(card)

    },
    updateCard(card) {
      cardService.updateCard(card).then(res => {
        toast.open("Card atualizado", "success");
        this.$socket.emit("socketUpdateColumn");
      });
    },
    deleteCard(card) {
      cardService.deleteCard(card).then(res => {
        toast.open("Card deletado", "success");
        this.$socket.emit("socketUpdateColumn");
      });
    },
    selectColumn(column, index) {
      this.selectedColumn = column;
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
    getChildPayload(index) {
      return this.columns[index].cards[index];
    },
    dragStart(index) {
      console.log("drag started", index);
    },
    showModal(column) {
      const newItems = [...this.columns];
      this.index = newItems.indexOf(column);
      (this.selectedCard = column), (this.isModalVisible = true);
    }
  }
};
</script>

<style lang='scss' scoped>
.smooth-dnd-container {
  min-height: 90%;
}
.pdf {
  display: flex;
  align-items: center;
  justify-content: space-around;
  i {
    color: #f16692;
  }
}
#color {
  cursor: pointer;
  border-radius: 50px;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  display: flex;
  float: left;
  margin-top: 2px;
  input {
    display: none;
  }
}
#board {
  width: 100%;
  height: calc(100vh - 80px);
  .add-task {
    cursor: pointer;
    background: #c2c2c1;
    color: #5f5f5f;
    border: none;
    width: 100%;
    text-align: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    height: 32px;
    border-radius: 4px;
  }
  .header {
    background: #fff;
    display: flex;
    height: 100px;
    margin-top: -10px;
    align-items: center;
    padding: 0 50px;
    justify-content: space-between;
  }
  .columns {
    display: flex;
    padding: 0 40px;
    height: 90%;
  }
  .column {
    user-select: none;
    margin: 0 10px;
    flex: 1 1 33.33%;
    padding: 10px 20px;
    border-radius: 4px;
    @media (max-width: 981px) {
      display: table;
      padding-bottom: 100px;
      margin-bottom: 100px;
      overflow: auto;
    }
    .draggable-item {
      color: #fff;
      position: relative;
      cursor: move;
      min-height: 80px;
      margin-bottom: 10px;
      .delete {
        float: right;
        position: absolute;
        top: 1px;
        right: 0px;
        i {
          position: relative;
          color: #fff;
          font-size: 15px !important;
          right: -9px;
        }
      }
    }
    .title {
      margin: 20px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      white-space: nowrap;
      .header-column {
        display: flex;
        align-items: center;
      }
      * {
        color: #5f5f5f;
      }
    }
    .dot-infos {
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-align: left;
      margin: 20px 10px 0;
      .avatar {
        display: flex;
        align-items: center;
        * {
          color: #fff;
        }
        img {
          margin-right: 5px;
          border-radius: 40px;
        }
      }
      .like {
        width: auto;
        min-width: auto;
        display: flex;
        align-items: center;
        border: none;
        margin: 0;
        b {
          margin: 5px 10px 0;
        }
      }
    }
  }
  .smooth-dnd-container.horizontal > .smooth-dnd-drop-preview-constant-class {
    background: rgb(255, 255, 255);
  }
}
@media (max-width: 981px) {
  #board {
    .columns {
      padding: 0;
      flex-direction: column;
    }
    .header {
      height: 60px;
      margin-top: 50px;
      padding: 0 20px;
    }
    .footer-board-mobile {
      display: flex;
      position: fixed;
      bottom: 0;
      background: #fff;
      width: 100%;
      align-items: center;
      ul {
        list-style: none;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        margin: 0;
        box-shadow: 0 -1px 0px rgba(0, 0, 0, 0.1);
        width: 100%;
        li {
          flex: 1;
          button {
            outline: none;
            width: 100%;
            background: #fff;
            border: none;
            padding: 10px 20px;
            label {
              float: none;
              margin: 0 auto 5px;
            }
            span {
              font-size: 10px;
            }
            &.active {
              background: #eee;
            }
          }
        }
      }
    }
    .add-task {
      position: fixed;
      bottom: 60px;
      width: 60px;
      height: 60px;
      border-radius: 50px;
      right: 20px;
      color: #fff;
      z-index: +1;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    }
  }
}
</style>
