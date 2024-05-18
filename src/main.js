import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import LoginView from "./views/LoginView";
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false

Vue.use(Vuetify);

new Vue({
  vuetify: new Vuetify(),
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
