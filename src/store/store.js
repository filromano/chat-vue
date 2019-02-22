import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        chatNotStarted: true,
        chatType: ''
    },
    getters: {
        chatState: state => {
            return state.chatNotStarted
        },
        chatTypeStore: state => {
            return state.chatType
        }
    },
    mutations: {
        startChatStore: state => {
            state.chatNotStarted = false
            state.chatType = 'store'
        },
        startChatExample: state => {
            state.chatNotStarted = false
            state.chatType = 'example'
        }
    }
});