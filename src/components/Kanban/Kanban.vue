<template>
  <div id="board">
    <div class="header">
      <sy-title primary>Novo board</sy-title>
      <sy-button
        @click="addColumn('AddNew')"
        :disabled="columns.length >= 4"
        :class="{'disabled' : columns.length >= 4}"
      >Nova coluna</sy-button>
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
              <input v-model="column.color" type="color" name />
            </label>
            <inline-edit :label="column.title" @lchanged="$event => column.title = $event" input />
          </sy-title>
          <sy-button icon>
            <i class="material-icons" @click="deleteColumn(index)">delete</i>
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
          group-name="1"
          :get-child-payload="getChildPayload"
          @drop="onInnerDrop(column, $event)"
          :drop-placeholder="dropPlaceholderOptions"
        >
          <Draggable v-for="(item, key) in column.cards" :key="key">
            <sy-card class="draggable-item" v-bind:style="{ backgroundColor : column.color }">
              <inline-edit
                :label="item.data"
                @lchanged="$event => item.data = $event"
                :color="'#fff'"
              />
              <sy-button icon v-bind:style="{ backgroundColor : column.color + '!important' }">
                <i class="material-icons" @click="deleteCard(index, key)">delete</i>
              </sy-button>
            </sy-card>
          </Draggable>
        </Container>
      </Draggable>
    </Container>
    <modal v-if="isModalVisible" @close="closeModal" @cancel="isModalVisible = false">
      <template v-slot:header>
        <label>
          Criar para
          <strong>{{selectedCard}}</strong>
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
      selectedColumn: Object
    };
  },
  created() {
    let vm = this;
    let size = window.innerWidth;
    vm.menuBarMobile = size <= 981;
    this.selectedColumn = this.columns[0];
    window.onresize = function(e) {
      let size = window.innerWidth;
      vm.menuBarMobile = size <= 981;
    };
    this.$root.$on("changedElement", event => console.log(event));
    this.getColumns();
  },
  methods: {
    getColumns() {
      const id = this.$route.params.idBoard;
      columnService.getColumns(id).then(res => {
        this.columns = res.data.columns;
      });
    },
    addColumn() {
      this.columns.length <= 4
        ? this.columns.push({
            id: 1,
            className: "default",
            title: "Nome",
            color: "#0097ff",
            cards: []
          })
        : "";
    },
    deleteColumn(index) {
      this.columns.splice(index, 1);
      this.selectedColumn = this.columns[0];
    },
    deleteCard(index, key) {
      this.columns[index].cards.splice(key, 1);
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
      newItems[index].items = applyDrag(newItems[index].items, dropResult);
    },
    getChildPayload(index) {
      return this.columns[index].items[index];
    },
    dragStart(index) {
      console.log("drag started", index);
    },
    showModal(column) {
      const newItems = [...this.columns];
      this.index = newItems.indexOf(column);
      (this.selectedCard = column.title), (this.isModalVisible = true);
    },
    closeModal() {
      if (this.description.length) {
        this.columns[this.index].cards.push({
          id: 1,
          data: this.description
        });
        this.description = "";
      }
      this.isModalVisible = false;
    }
  }
};
</script>

<style lang='scss' scoped>
.smooth-dnd-container {
  min-height: 90%;
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
    .draggable-item {
      color: #fff;
      position: relative;
      cursor: move;
      min-height: 80px;
      margin-bottom: 10px;
      button {
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
              font-size: 12px;
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
    }
  }
}
</style>
