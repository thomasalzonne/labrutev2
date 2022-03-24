import { createApp } from "vue";
import App from "./App.vue";
import VueAxentix from "@axentix/vue";
import "@axentix/vue/dist/vue3/vue-axentix.css";
import "axentix/dist/axentix.min.css";
import Vuex from "vuex";
import {router} from './router';
import {store} from './store';

createApp(App).use(VueAxentix).use(store).use(router).use(Vuex).mount("#app");
