<template>
  <sy-nav v-if="this.$route.path !== '/login'">
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
      </router-link> -->
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
              <router-link
                @click.native="openMenu = !openMenu"
                to="/boards"
              >{{ $t('MEUS_BOARDS') }}</router-link>
            </li>
           <!-- <li>
              <router-link
                @click.native="openMenu = !openMenu"
                to="/retro/1"
              >+ {{ $t('CRIAR_RETRO') }}</router-link>
            </li> -->
          </ul>
        </section>
      </div>
    </div>
  </sy-nav>
</template>
<script>
import { SyButton, SyNav, SyTitle, SyInput } from "@/ui-components";
import Dropdown from "@/components/Dropdown/Dropdown";
import auth from '@/services/auth'

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
      userName: '',
      userInitials: ''
    };
  },
  mounted() {
    let vm = this;
    const user = localStorage.getItem('uitoken');
    if(user) this.logged = true
    else {
      this.logged = false
      this.$router.replace({ path: `/login` })
    }
    auth.getUser().then(res => {
      if(!res.data.error){
        res ? vm.userName = res.data.name.charAt(0).toUpperCase() + res.data.name.substr(1) : '';
        let split = res.data.name.split(" ");
        vm.userInitials = split[0].charAt(0).toUpperCase();
      }
    })
    this.$root.$on("closeDropdown", e => (vm.isDropdownVisible = false));
  },
  methods: {
    showDropdown(e) {
      this.isDropdownVisible = !this.isDropdownVisible;
      e.stopPropagation();
    },
    logout(){
      localStorage.clear();
      this.$router.replace({ path: `/login` })
      this.openMenu = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.brand {
  display: flex;
  align-items: center;
  img {
    margin-right: 10px;
    padding-right: 20px;
    border-right: 1px solid #fff;
  }
  * {
    color: #fff;
    font-weight: 400;
    font-size: 20px;
    margin: 0;
  }
}
.mobile-nav {
  display: none;
}
@media (max-width: 981px) {
  nav {
    height: 50px;
    z-index: 9;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
  .brand {
    img {
      width: 80px;
    }
    * {
      font-size: 13px;
    }
  }
  .right-nav {
    display: none;
    position: absolute;
    left: 0;
  }
  .mobile-nav {
    display: block;
    z-index: 0;
    .close {
      float: right;
      margin: 20px !important;
    }
    i {
      font-size: 32px !important;
      color: #fff;
    }
  }
  .backdrop {
    position: fixed;
    left: 0;
    top: 51px;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.52);
    display: block;
    z-index: 0;
  }
  .menu-mobile {
    transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
    position: fixed;
    top: 51px;
    right: -100%;
    min-width: 300px;
    width: 60%;
    background: #fff;
    height: 100%;
    z-index: +1;
    &.open {
      transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
      right: 0;
    }
    ul {
      list-style: none;
      text-align: left;
      margin: 0;
      padding: 0 0 0 40px;
      li {
        margin: 30px 0;
        a {
          color: #5d5d5d;
          &.is-active {
            color: #ff880e;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
