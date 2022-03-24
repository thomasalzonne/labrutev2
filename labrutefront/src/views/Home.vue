<template>
  <div>
    <form v-if="user" class="form-material">
      <div class="form-field">
        <input
          v-model="characterName"
          data-form-validate="auto"
          required
          type="name"
          id="name"
          class="form-control"
          placeholder="Name"
        />
        <button class="mt-3" type="button" @click="generateCharacter">
          Créer une brute
        </button>
      </div>
    </form>
    <div>Mes brutes</div>
    <div class="grix xs4">
      <div v-for="character in mycharacters" v-bind:key="character.id">
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
            <router-link :to="{ name: 'Arene', params: { id: character.id } }"
              >Go to Arene</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Http from "../services/http.service";

export default {
  data() {
    Http.get("/characters").then((res) =>
      res.data.map((arr) => {
        arr.map((character) => this.mycharacters.push(character));
      })
    );
    return {
      characterName: "",
      mycharacters: [],
    };
  },
  computed: {
    user() {
      return this.$store.user;
    },
  },
  methods: {
    getFight() {
      Http.get("/fight").then((e) => (this.fight = e.data));
    },
    generateCharacter() {
      Http.post("/character/generate", {
        name: this.characterName,
        user: this.$store.user,
      }).then(
        Http.get("/characters").then((res) => {
          this.mycharacters = [];
          res.data.map((arr) => {
            arr.map((character) => this.mycharacters.push(character));
          });
        })
      );
    },
    getUser(charid) {
      Http.get(`/character/${charid}`).then((res) => {
        this.$store.chartofight = res.data;
      });
    },
  },
};
</script>
