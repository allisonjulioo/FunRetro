<template>
  <sy-nav >
    <router-link to="/boards" class="brand">
      <img src="../../assets/brand_light.svg" alt height="36" />
      <sy-title light>Retrospectiva organizador</sy-title>
    </router-link>
    <section class="right-nav">
      <!-- <router-link v-if="logged" to="/retro/1" >
        <sy-button outline>{{ $t('MINHAS_RETROS') }}</sy-button>
      </router-link>
      <router-link v-if="logged" to="/boards">
        <sy-button primary>+ {{ $t('CRIAR_BOARDS') }}</sy-button>
      </router-link>-->
      <dropdown :toggle-dropdown="isDropdownVisible">
        <template v-slot:button>
          <sy-button v-if="logged" class="dropdown-toggle" avatar @click="showDropdown">
            {{userInitials}}
            <span class="arrow">&#9660;</span>
          </sy-button>
        </template>
        <template v-slot:template>
          <section v-if="logged">
            <sy-title normal black>
              <i class="material-icons">account_circle</i>
              <small>{{userName}}</small>
            </sy-title>
            <hr />
            <sy-button raised @click="logout()">Sair</sy-button>
          </section>
        </template>
      </dropdown>
    </section>
    <div class="mobile-nav">
      <sy-button icon @click="openMenu = !openMenu">
        <i v-if="!openMenu" class="material-icons">menu</i>
        <i v-if="openMenu" class="material-icons">close</i>
      </sy-button>
      <div class="backdrop" v-if="openMenu" @click="openMenu = !openMenu"></div>
      <div class="menu-mobile" :class="{'open' : openMenu}">
        <section v-if="logged">
          <h4 normal black class="title">
            <span>
              <sy-button avatar style="min-width: 40px;">{{userInitials}}</sy-button>
              <small>{{userName}}</small>
            </span>
            <router-link v-if="logged" to="/login">
              <sy-button raised @click="logout()">Sair</sy-button>
            </router-link>
          </h4>
          <hr />
          <ul>
            <li>
              <strong>Menu</strong>
            </li>
            <li>
              <router-link @click.native="openMenu = !openMenu" to="/boards">{{ $t('MEUS_BOARDS') }}</router-link>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </sy-nav>
</template>
<script>
import { SyButton, SyNav, SyTitle, SyInput } from "@/ui-components";
import Dropdown from "@/components/Dropdown/Dropdown";
import auth from "@/services/auth";
import "./NavHeader.scss"
export default {
  name: "NavHeader",
  components: {
    SyButton,
    SyNav,
    SyTitle,
    SyInput,
    Dropdown
  },
  data() {
    return {
      openMenu: false,
      isDropdownVisible: false,
      logged: true,
      userName: "",
      userInitials: ""
    };
  },
  mounted() {
    let vm = this;
    const user = localStorage.getItem("uitoken");
    if (user) this.logged = true;
    else {
      this.logged = false;
      this.$router.replace({ path: `/login` });
    }
    auth.getUser().then(res => {
      if (!res.data.error) {
        res
          ? (vm.userName =
              res.data.name.charAt(0).toUpperCase() + res.data.name.substr(1))
          : "";
        let split = res.data.name.split(" ");
        vm.userInitials = split[0].charAt(0).toUpperCase();
      }
    });
    this.$root.$on("closeDropdown", e => (vm.isDropdownVisible = false));
  },
  methods: {
    showDropdown(e) {
      this.isDropdownVisible = !this.isDropdownVisible;
      e.stopPropagation();
    },
    logout() {
      localStorage.clear();
      this.$router.replace({ path: `/login` });
      this.openMenu = false;
    }
  }
};
</script>
