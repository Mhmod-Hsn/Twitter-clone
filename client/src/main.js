import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"

import "./assets/css/style.scss"
require('./assets/js/bootstrap.bundle.min')

import "./assets/fonts/remixicon.css"

import './libs/sweet-alert'


import axios from './axios'
import VueAxios from 'vue-axios'

window.axios = axios;

createApp(App)
    .use(store)
    .use(router)
    .use(VueAxios,axios)
    .mount("#app");
