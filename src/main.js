import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import LoginView from "./views/LoginView";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
