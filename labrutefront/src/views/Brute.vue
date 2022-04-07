<template>
  <div class="grix xs4">{{ brute }}</div>
</template>
<script>
import Http from "../services/http.service";

export default {
  name: "Brute",
  data() {
    console.log(this.$route.params.id);
    Http.get(`/getcharacter/${this.$route.params.id}`).then((res) => {
      this.brute = res.data;
    });
    return {
      brute: {},
    };
  },
  methods: {},
};
</script>
