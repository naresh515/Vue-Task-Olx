import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

createApp(App).use(router).mount("#app");
