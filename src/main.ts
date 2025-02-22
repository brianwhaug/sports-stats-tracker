import { createApp } from "vue";

// Routes
import router from "./router";

// Stores
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";

// Styles
import "./style.css";

// Global Imports
import FloatingVue from "floating-vue";
import "floating-vue/dist/style.css";

import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";

// App entry point
import App from "./App.vue";

import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";

// Wire it all up
const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(Vue3Toastify, {
  autoClose: 3000,
} as ToastContainerOptions);
app.use(FloatingVue, { themes: { tooltip: { html: true } } });
app.component("EasyDataTable", Vue3EasyDataTable);
app.mount("#app");

console.log("Sports Stats Tracker - Vue app mounted successfully");
