import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        chatNotStarted: true
    },
    getters: {
        chatState: state => {
            return state.chatNotStarted
        }
    },
    mutations: {
        startChat: state => {
            state.chatNotStarted = false;
        }
    }
});