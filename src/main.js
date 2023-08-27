import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import axios from "axios";
// import creds from "../creds.json";
import SpotifyAPI from "./components/SpotifyAPI.vue";

createApp(App)
  .use(store)
  .use(router)
  .component("spotify-api", SpotifyAPI)
  .mount("#app");
