import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        jwt: '',
        chatNotStarted: true,
        sessionId: '',
        arrayMensagens: [],
        chatType: '',  
        error: [],
        ticket: '',
        id: ''
    },
    getters: {
        sessionId: state => {
            return state.sessionId;
        },
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
        },
        arrayMensagens: state => {
            return state.arrayMensagens;
        },
        ticketMessage: state => {
            return state.ticket;
        },
        tickedId: state => {
            return state.id
        }
    },
    mutations: {
        newSession: (state, session) => {
            state.sessionId = session
        },
        addChatbotMessage: (state, message) => {
            state.arrayMensagens.push({type: 'chatbot', text: message});
        },
        addUserMessage: (state, message) => {
            state.arrayMensagens.push({type: 'user', text: message});
        },
        startChat: (state, chat) => {
            state.chatNotStarted = false
            state.chatType = chat
        },
        newJwt: (state, jwt) => {
            state.jwt = jwt
        },
        addError: (state, error) => {
            state.error.push(error);
        },
        createTicket: (state, ticket, id) => {
            state.ticket = ticket;
            state.id = id;
        }
    },
    actions: {
        startChat: ({commit, state}, message) => {
            axios.post('/conversation', {
                info:{
                    sessionId: state.sessionId,
                    message: message,
                    chatbotType: state.chatType
                }
            }, {
                headers: {
                    'x-auth-token': state.jwt
                }
            })
            .then(response => {
                commit('newSession', response.data.sessionId)
                commit('addChatbotMessage', response.data.text)
            })
            .catch(e => {
                commit('addError', e);
            })
        },
        sendMessage: ({commit, state}, message) => {
            return new Promise((resolve, reject) => {
                axios.post('/conversation', {
                    info:{
                        sessionId: state.sessionId,
                        message: message,
                        chatbotType: state.chatType
                    }
                }, {
                    headers: {
                        'x-auth-token': state.jwt
                    }
                })
                .then(response => {
                    commit('addChatbotMessage', response.data.text);
                    if(response.data.action === 'order'){
                        let message = 'A ticket was opened with your order';
                        commit('createTicket', message, response.data.data);
                    }
                    resolve();
                })
                .catch(e => {
                    commit('addError', e);
                    reject();
                })
            })
        }
    }
});