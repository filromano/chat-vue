import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        chatNotStarted: true,
        chatType: ''
    },
    getters: {
        userInfo: state => {
            return state.userInfo
        },
        chatState: state => {
            return state.chatNotStarted
        },
        chatTypeStore: state => {
            return state.chatType
        }
    },
    mutations: {
        startChat: (state, chat) => {
            state.chatNotStarted = false
            state.chatType = chat
        },
    }
});