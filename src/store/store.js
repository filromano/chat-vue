import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        jwt: '',
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
        },
        getToken: state => {
            return state.jwt;
        }
    },
    mutations: {
        startChat: (state, chat) => {
            state.chatNotStarted = false
            state.chatType = chat
        },
        newJwt: (state, jwt) => {
            state.jwt = jwt
        }
    }
});