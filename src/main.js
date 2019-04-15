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

router.beforeEach((to, from, next) => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get('token');
    if(token){
        store.commit('newJwt', token);
    }
    if(store.getters.getToken === '') {
      window.location.href = 'https://localhost:9995/user/login';
    } else {
        next();
    }
});

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
