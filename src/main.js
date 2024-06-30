import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import { createVuetify } from "vuetify";
import "vuetify/dist/vuetify.min.css";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "./assets/main.css";

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

app.use(router);
app.use(vuetify);

const baseURL =
  import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:3000";
axios.defaults.baseURL = baseURL;
axios.defaults.headers.common["Content-Type"] = "application/json";

app.mount("#app");
