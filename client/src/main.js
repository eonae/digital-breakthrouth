import Vue from 'vue'
import VueBar from 'vuebar'

import store from './store'
import router from './router'

import App from './App.vue'
import ModalWindow from './components/ModalWindow.vue'
import ModalActions from './components/ModalActions.vue'

import 'materialize-css'
import 'materialize-css/dist/css/materialize.css'

Vue.use(VueBar);

Vue.component('modal-window', ModalWindow);
Vue.component('modal-actions', ModalActions);

Vue.config.productionTip = false;

window.onerror = (msg, url, line) => {
  alert(msg + '\n' + url + '\n' + line);
}

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
