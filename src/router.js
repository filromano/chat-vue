import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Chat from './views/Chat.vue'
import { store } from './store/store';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
        path: '/chat',
        beforeEnter: function(to, from, next) {
            if(store.state.loggedIn) {
                next();
            } else {
                next('/')
            }
        },
        name: 'chat',
        component: Chat
      }
  ]
})
