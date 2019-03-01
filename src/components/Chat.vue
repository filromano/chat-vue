<template>
    <div class="row">
        <div class="col-sm">
            <div class="row">
                <div class="col-sm">
                    <div id="chatbox" class="list-group">
                        <div v-for="message in arrayMensagens" :key="message.index">
                            <span class="list-group-item list-group-item-primary" v-if="message.type === 'chatbot'">{{ message.text }}</span>
                            <span class="list-group-item list-group-item-success" v-if="message.type === 'user'">{{ message.text }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" style="margin-bottom:10px;">
                <div class="col-sm">
                    <input class="form-control form-control-lg" type="text" v-model="message" @keyup.enter="sendMessage">
                </div>
            </div>
            <div class="row" style="margin-bottom:10px;">
                <div class="col-sm">
                    <button type="button" class="btn btn-secondary" @click="sendMessage">Send</button>
                </div>
            </div>
        </div>
        <div class="col-sm">

        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data(){
    return {
        
        respostadaMensages: '',
        arrayMensagens: [],
        sessionId: '',
        message: ''
    }
  },
    methods:{
        scrollTop(){
            this.$nextTick(() =>{
                var objDiv = document.getElementById('chatbox');
                objDiv.scrollTop = objDiv.scrollHeight;
            });
        },
        sendMessage(){
            this.arrayMensagens.push({type: 'user', text: this.message});
            this.scrollTop()
            axios.post('/conversation/', {
                info: {
                    sessionId: this.sessionId,
                    message: this.message,
                    chatbotType: this.chatbotType
                }
                })
                
            .then(response => {
                this.respostadaMensages = response.data.text
                this.arrayMensagens.push({type: 'chatbot', text: this.respostadaMensages});
                this.message = ''
                this.scrollTop()
            })
            .catch(e => {
                this.errors.push(e)
            })
        }
    },
    computed: {
        chatbotType(){
            return this.$store.getters.chatTypeStore
        }
    },
    created() {
        console.log('comecar o chat');
        axios.post('/conversation/', {
            info: {
                sessionId: this.sessionId,
                message: this.message,
                chatbotType: this.chatbotType
            }
        })
            
        .then(response => {
            this.respostadaMensages = response.data.text
            this.sessionId = response.data.sessionId
            this.arrayMensagens.push({type: 'chatbot', text: this.respostadaMensages});
        })
        .catch(e => {
            this.errors.push(e)
        })
    }
}
</script>

<style lang="scss">
#chatbox{
    display: block;
    height: 400px;
    overflow: scroll;
}
</style>
