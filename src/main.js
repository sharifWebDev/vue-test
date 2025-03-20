import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import { useAuthStore } from "@/stores/authStore";
import "toastr/build/toastr.min.css";
import { info, success, error, warning } from "@/utils/alerts.js";


import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUser, faHome, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
 
library.add(faUser, faHome, faSignOutAlt);
  

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.component("font-awesome-icon", FontAwesomeIcon);

app.config.globalProperties.$info = info;
app.config.globalProperties.$success = success;
app.config.globalProperties.$error = error;
app.config.globalProperties.$warning = warning;

const authStore = useAuthStore();
if (authStore.token) {
  authStore.getUser();
}

app.use(router);
app.mount("#app");
