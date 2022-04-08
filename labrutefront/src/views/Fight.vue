<template>
  <div class="fight"></div>
</template>
<script>
import Http from "../services/http.service";
import Game from "../game/game";

export default {
  name: "Fight",
  data() {
    Http.get(
      `/fight/${this.$route.params.id}/${this.$route.params.idtofight}`
    ).then((e) => new Game(this.$el, e.data));
    return {
      fight: null,
    };
  },
  methods: {},
};
</script>
