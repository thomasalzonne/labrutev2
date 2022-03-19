<template>
  <div>
    <ax-modal class="white rounded-1 shadow-1" v-model="isModalOpened">
      <form class="form-material">
        <div class="form-field">
          <input
            v-model="usernamelog"
            data-form-validate="auto"
            required
            type="username"
            id="username"
            class="form-control"
            placeholder="Username"
          />
          <input
            v-model="passwordlog"
            data-form-validate="auto"
            required
            type="password"
            id="password"
            class="form-control"
            placeholder="Password"
          />
          <button class="mt-3" type="button" @click="login">
            Se connecter
          </button>
        </div>
      </form>
    </ax-modal>
    <ax-modal class="white rounded-1 shadow-1" v-model="isRegisterOpened">
      <form class="form-material">
        <div class="form-field">
          <input
            v-model="usernamereg"
            data-form-validate="auto"
            required
            type="username"
            id="username"
            class="form-control"
            placeholder="Username"
          />
          <input
            v-model="passwordreg"
            data-form-validate="auto"
            required
            type="password"
            id="password"
            class="form-control"
            placeholder="Password"
          />
          <button class="mt-3" type="button" @click="register">
            S'inscrire
          </button>
          <div v-if="errorsignup" class="text-red light-1 text-center mt-3">
            {{ errorsignup }}
          </div>
        </div>
      </form>
    </ax-modal>
    <nav class="navbar shadow-1">
      <a href="#" class="navbar-logo navbar-centered">
        <img src="https://axelsimonet.fr/assets/img/logoA.svg" alt="Xelzs" />
      </a>
      <a href="#" class="navbar-brand">Axentix</a>
      <div class="navbar-menu ml-auto">
        <button
          class="loginbtn"
          v-if="!connectedUser"
          @click="isRegisterOpened = !isRegisterOpened"
        >
          S'inscrire
        </button>
        <button
          class="loginbtn"
          v-if="!connectedUser"
          @click="isModalOpened = !isModalOpened"
        >
          Se connecter
        </button>
        <div v-if="connectedUser">Hello {{ connectedUser }}</div>
        <button v-if="connectedUser" @click="logout">Se déconnecter</button>
      </div>
    </nav>
  </div>
</template>
<script>
import axios from "axios";

const instance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-type": "application/json",
  },
});
export default {
  name: "NavBar",
  props: {
    msg: String,
  },
  data() {
    return {
      fight: null,
      isModalOpened: null,
      isRegisterOpened: null,
      passwordreg: "",
      usernamereg: "",
      passwordlog: "",
      usernamelog: "",
      connectedUser: "",
      errorsignup: "",
    };
  },
  methods: {
    register() {
      instance
        .post("/user/create", {
          username: this.usernamereg,
          password: this.passwordreg,
        })
        .then((e) => {
          if (typeof e.data === "string") this.errorsignup = e.data;
          if (typeof e.data === "object") {
            this.errorsignup = null;
            this.isRegisterOpened = !this.isRegisterOpened;
          }
        });
    },
    login() {
      instance
        .post("/user/login", {
          username: this.usernamelog,
          password: this.passwordlog,
        })
        .then((e) => {
          this.connectedUser = e.data.username;
          this.isModalOpened = !this.isModalOpened;
        });
    },
    logout() {
      this.connectedUser = "";
    },
  },
};
</script>
