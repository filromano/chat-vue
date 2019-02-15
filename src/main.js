import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import { store } from './store/store'

Vue.config.productionTip = false

axios.defaults.headers.common = {
  "Content-Type": "application/json"
}

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
