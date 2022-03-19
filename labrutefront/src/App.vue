<template>
  <div>
    <NavBar msg="salut" />
    <ax-btn class="primary" @click="getFight()">Go fight</ax-btn>
    {{ fight }}
  </div>
</template>

<script>
import axios from "axios";
import NavBar from "./components/NavBar.vue";

const instance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-type": "application/json",
  },
});

export default {
  name: "App",
  components: { NavBar },
  data() {
    return {
      fight: null,
    };
  },
  methods: {
    getFight() {
      instance.get("/fight").then((e) => (this.fight = e.data));
    },
  },
};
</script>
