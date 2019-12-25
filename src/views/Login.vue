<template>
  <div id="login">
    <img src="../assets/brand_light.svg" alt width="150" />
    <section id="form" v-if="!register" class="animated fadeIn">
      <sy-title style="color: white; text-align: center">Login</sy-title>
      <form @submit="login()">
        <sy-input style="margin-bottom: 20px;">
          <label>E-mail</label>
          <input
            type="email"
            class="animated fast"
            v-model="user.email"
            autofocus="on"
            autocomplete="on"
            :class="{'hasError shake' : error}"
          />
          <span class="alert" v-if="error">E-mail inválido</span>
        </sy-input>
        <sy-input>
          <label>Password</label>
          <input
            type="password"
            class="animated fast"
            v-model="user.password"
            :class="{'hasError shake' : error}"
          />
          <span class="alert" v-if="error">Senha inválido</span>
        </sy-input>
      </form>
      <div class="action-btns">
        <sy-button outline @click="register = !register">Cadastrar</sy-button>
        <sy-button @click="login()">Entrar</sy-button>
      </div>
    </section>
    <section id="form" v-if="register" class="animated fadeIn">
      <sy-title style="color: white; text-align: center">Cadastrar</sy-title>
      <div>
        <sy-input>
          <label>Nome</label>
          <input type="text" v-model="user.name" />
        </sy-input>
        <sy-input>
          <label>E-mail</label>
          <input type="text" v-model="user.email" />
        </sy-input>
        <sy-input>
          <label>Senha</label>
          <input type="password" v-model="user.firstPassword" />
        </sy-input>
        <sy-input>
          <label>Repita a senha</label>
          <input type="password" v-model="user.password" />
        </sy-input>
      </div>
      <div class="action-btns">
        <sy-button outline @click="register = !register">Login</sy-button>
        <sy-button @click="signup()">Cadastrar</sy-button>
      </div>
    </section>
  </div>
</template>
<script>
import {
  SyCard,
  Row,
  Column,
  SyButton,
  SyTitle,
  SyContainer,
  SyInput
} from "@/ui-components";
import auth from "@/services/auth";
import toast from "@/services/toaster";

export default {
  name: "Login",
  components: {
    SyCard,
    Row,
    Column,
    SyButton,
    SyTitle,
    SyContainer,
    SyInput
  },
  data() {
    return {
      error: false,
      user: {
        name: "",
        email: "",
        password: "",
        firstPassword: ""
      },
      register: false
    };
  },
  methods: {
    login() {
      let vm = this;
      auth.login(this.user.email, this.user.password).then(res => {
        if (res.data.auth) {
          localStorage.setItem("uid", res.data.id_user);
          localStorage.setItem("uitoken", res.data.token);
          window.location.href = "/boards";
          toast.open("Seja bem vindo!", "success");
        } else {
          this.error = true;
          setTimeout(() => {
            this.error = false;
          }, 2000);
          toast.open("Login Invalido", "error");
        }
      });
    },
    signup() {
      const user = {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password
      };
      auth.signup(user).then(res => {
        if (res.data.isValid) {
          this.login();
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../variables/_colors.scss";
#login {
  /*background-image: linear-gradient(to bottom right, #494ecd, #3a92f2);*/
  background: $primary;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: -60px;
  img {
    margin-bottom: 40px;
    margin-top: -10%;
  }
  #form {
    max-width: 365px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    @media (max-width: 981px) {
      max-width: 100%;
      width: 100%;
      padding: 0 40px;
    }
    label {
      margin-bottom: 5px;
      display: block;
      color: #ffffff;
    }
    input {
      height: 50px;
      border: solid 1px #ffffff;
    }
    .action-btns {
      margin-top: 40px;
      display: flex;
      justify-content: center;
      @media (max-width: 981px) {
        display: block;
        button {
          width: 100%;
          height: 50px;
          margin: 10px 0;
        }
      }
    }
  }
}
</style>
