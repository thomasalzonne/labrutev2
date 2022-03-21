<template>
  <div>
    <NavBar @user="getUser" msg="salut" />
    <component :is="currentView" />
    <!-- <ax-btn class="primary" @click="getFight()">Go fight</ax-btn>
    {{ fight }} -->
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import { store } from "./store";
import Http from "./services/http.service";
import NotFound from "./NotFound.vue";
import Home from "./Home.vue";

const routes = {
  "/": Home,
};

export default {
  name: "App",
  components: { NavBar },
  data() {
    const token = localStorage.getItem("token");
    if (token) {
      Http.defaults.headers.common["Authorization"] = token;
      Http.get("/user/me").then((res) => (this.store.user = res.data));
    }
    Http.get("/characters").then((res) =>
      res.data.map((arr) => {
        arr.map((character) => this.mycharacters.push(character));
      })
    );
    return {
      fight: null,
      currentPath: window.location.hash,
      store,
    };
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || "/"] || NotFound;
    },
  },
  mounted() {
    window.addEventListener("hashchange", () => {
      this.currentPath = window.location.hash;
    });
  },
  // methods: {
  //   getFight() {
  //     Http.get("/fight").then((e) => (this.fight = e.data));
  //   },
  //   generateCharacter() {
  //     Http.post("/character/generate", {
  //       name: this.characterName,
  //       user: this.store.user,
  //     }).then(
  //       Http.get("/characters").then((res) => {
  //         this.mycharacters = [];
  //         res.data.map((arr) => {
  //           arr.map((character) => this.mycharacters.push(character));
  //         });
  //       })
  //     );
  //   },
  //   getUser() {
  //     console.log("hey");
  //   },
  // },
};
</script>
