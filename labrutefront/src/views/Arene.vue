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
          <router-link
            :to="{
              name: 'Fight',
              params: { id: this.$route.params.id, idtofight: character.id },
            }"
            >Go Fight</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Http from "../services/http.service";

export default {
  name: "Arene",
  data() {
    Http.get("/characters/tofight").then((res) => {
      this.opponents = res.data;
    });
    return {
      opponents: [],
    };
  },
};
</script>
