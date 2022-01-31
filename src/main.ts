import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue, {IconsPlugin} from "bootstrap-vue";
import VueQrcodeReader from "vue-qrcode-reader";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(VueQrcodeReader);
//export let BASE_URL = 'http://178.63.163.115:4567';
export let BASE_URL = 'http://localhost:4567';

export function changeBaseUrl(url) {
  BASE_URL = url;
}

//export const BASE_URL = 'http://seed001.ec.dylaan.nl:4567/';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
