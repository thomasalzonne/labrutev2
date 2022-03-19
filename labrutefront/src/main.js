import { createApp } from "vue";
import App from "./App.vue";
import VueAxentix from "@axentix/vue";
import "@axentix/vue/dist/vue3/vue-axentix.css";
import "axentix/dist/axentix.min.css";

createApp(App).use(VueAxentix).mount("#app");
