import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router';
import { store } from './store/store'

Vue.config.productionTip = false

axios.defaults.baseURL = process.env.VUE_APP_APILINK;

axios.defaults.headers.common = {
    "Content-Type": "application/json"
}

router.beforeEach((to, from, next) => {
    console.log(process.env.VUE_APP_APILINK);
    const url = new URL(window.location.href);
    const token = url.searchParams.get('token');
    if(token){
        store.commit('newJwt', token);
    }
    if(store.getters.getToken === '') {
        window.location.href = process.env.VUE_APP_APILINK+'/user';
    } else {
        next();
    }
});

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
