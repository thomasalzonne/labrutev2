<template>
  <div class="grix xs4">
    <div v-for="character in opponents" v-bind:key="character.id">
      <div class="card light-shadow-2 white">
        <div class="card-image">
          <img src="../assets/gameassets/Knight/Idle/idle1.png" alt="logo" />
        </div>

        <div class="card-header">{{ character.name }}</div>
        <div class="divider"></div>
        <div class="card-content">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi
          suscipit harum repellat architecto unde vel numquam rem doloribus
          maiores deserunt tenetur labore, aut, adipisci sit, sequi nihil
          voluptas commodi? Velit?
        </div>

        <div class="card-footer">
          <button @click="getFight(character.id)">Fight</button>
        </div>
      </div>
    </div>
    <div class="fight">
      <h1>LE FIGHT OMG</h1>
      <div>{{ fight }}</div>
    </div>
  </div>
</template>
<script>
import Http from "../services/http.service";
import Game from "../game";

export default {
  name: "Arene",
  data() {
    Http.get("/characters/tofight").then((res) => {
      this.opponents = res.data;
    });
    return {
      opponents: [],
      fight: null,
    };
  },
  mounted() {
    new Game(this.$el);
  },
  methods: {
    getFight(characterid) {
      Http.get(`/fight/${this.$route.params.id}/${characterid}`).then(
        (e) => (this.fight = e.data.timeline)
      );
    },
  },
};
</script>
