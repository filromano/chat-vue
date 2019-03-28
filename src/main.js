import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router';
import { store } from './store/store'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:3000';

axios.defaults.headers.common = {
    "Content-Type": "application/json"
}

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
