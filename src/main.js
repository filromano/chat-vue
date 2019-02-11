import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'

Vue.config.productionTip = false

axios.defaults.headers.common = {
  "Content-Type": "application/json"
}

new Vue({
  render: h => h(App),
}).$mount('#app')
