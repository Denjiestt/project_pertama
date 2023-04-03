import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"

// import './assets/main.css'
import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.css";

// import router from "vue-router"

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.all";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


library.add(fas)


const app = createApp(App);
app
.component("font-awesome-icon", FontAwesomeIcon)
  .use(VueSweetalert2)
  .use(router)
  .mount("#app");

// createApp(App).mount('#app')
