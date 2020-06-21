import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'
import axios from 'axios'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor)

Vue.config.productionTip = false
Vue.prototype.$axios = axios.create({
  baseURL: 'http://192.168.43.145:8889',
})

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
