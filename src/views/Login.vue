<template>
  <div id="login">
    <img src="../assets/brand_light.svg" alt width="150" />
    <section id="form" v-if="!register" class="animated fadeIn">
      <sy-title style="color: white; text-align: center">Login</sy-title>
      <form method="POST" @submit="login($event)">
        <sy-input style="margin-bottom: 20px">
          <label>E-mail</label>
          <input
            :disabled="loading"
            type="email"
            class="animated fast"
            v-model="user.email"
            autofocus="on"
            autocomplete="on"
            :class="{ 'hasError shake': error }"
          />
          <span class="alert" v-if="error">E-mail inválido</span>
        </sy-input>
        <sy-input>
          <label>Password</label>
          <input
            :disabled="loading"
            type="password"
            class="animated fast"
            v-model="user.password"
            :class="{ 'hasError shake': error }"
          />
          <span class="alert" v-if="error">Senha inválido</span>
        </sy-input>
        <input type="submit" style="display: none" @submit="login($event)" />
      </form>
      <div class="action-btns">
        <sy-button :disabled="loading" outline @click="register = !register"
          >Cadastrar</sy-button
        >
        <sy-button :disabled="!user.email || loading" @click="login($event)">
          <i v-if="loading" class="loading animated material-icons">cached</i>
          {{ loading ? "Aguarde" : "Entrar" }}
        </sy-button>
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
          <input
            type="password"
            v-model="user.password"
            :class="{
              hasError:
                user.firstPassword.length &&
                user.password.length &&
                user.firstPassword != user.password,
            }"
          />
          <span
            class="alert"
            v-if="
              user.firstPassword.length &&
              user.password.length &&
              user.firstPassword != user.password
            "
            >Senhas não conferem</span
          >
        </sy-input>
      </div>
      <div class="action-btns">
        <sy-button outline @click="register = !register">Login</sy-button>
        <sy-button
          @click="signup()"
          :disabled="
            user.name &&
            user.email &&
            user.firstPassword.length &&
            user.password.length &&
            user.firstPassword != user.password
          "
          >Cadastrar</sy-button
        >
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
  SyInput,
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
    SyInput,
  },
  data() {
    return {
      error: false,
      user: {
        name: "",
        email: "",
        password: "",
        firstPassword: "",
      },
      register: false,
      loading: false,
      vm: Object,
    };
  },
  mounted() {
    this.vm = this;
  },
  computed: {
    computedProperty() {
      return this.user.firstPassword, this.user.password;
    },
  },
  methods: {
    login(e) {
      this.loading = true;
      e.preventDefault();
      let vm = this;
      auth
        .login(this.user.email, this.user.password)
        .then((res) => {
          vm.loading = false;
          if (res.data.auth) {
            localStorage.setItem("uid", res.data.id_user);
            localStorage.setItem("uitoken", res.data.token);
            this.$router.push("/boards");
            toast.open("Seja bem vindo!", "success");
          } else {
            vm.alertError();
          }
        })
        .catch((err) => {
          vm.loading = false;
          vm.alertError();
        });
    },
    signup() {
      const user = {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
      };
      auth.signup(user).then((res) => {
        if (res.data.isValid) {
          this.login();
        }
      });
    },
    alertError() {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 2000);
      toast.open("Login Invalido", "error");
    },
    validEmail: function (email) {
      var re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
  },
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
    button {
      line-height: 2.2 !important;
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
      .loading {
        animation: rotate 1s linear infinite;
        animation-fill-mode: linear;
      }
      @keyframes rotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    }
  }
}
</style>
