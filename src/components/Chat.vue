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
            <transition name="fade">
                <div class="card" style="width: 70%; margin: auto;" v-if="id != ''">
                    <div class="card-body">
                        <div class="card-text">
                            <p>{{ ticket }}<br/>Link: <a :href="ticketLink">{{ ticketLink }}</a></p>
                        </div> 
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
//import { mapGetters } from 'vuex';

export default {
  data(){
    return {
        message: '',
    }
  },
    methods:{
        scrollTop(){
            this.$nextTick(() =>{
                var objDiv = document.getElementById('chatbox');
                objDiv.scrollTop = objDiv.scrollHeight;
            });
        },
        async sendMessage(){
            this.$store.commit('addUserMessage', this.message)
            this.scrollTop()
            await this.$store.dispatch('sendMessage', this.message)
            this.scrollTop();
            this.message = ''
        }
    },
    computed: {
        sessionId(){
            return this.$store.getters.sessionId;
        },
        arrayMensagens(){
            return this.$store.getters.arrayMensagens;
        },
        chatbotType(){
            return this.$store.getters.chatTypeStore
        },
        ticketLink(){
            return process.env.VUE_APP_APILINK + '/order/' + this.id;
        },
        ticket(){
            return this.$store.getters.ticketMessage;
        },
        id(){
            return this.$store.getters.ticketId;
        }
    },
    created() {
        console.log('comecar o chat');
        console.log(this.$store.getters.getToken);
        this.$store.dispatch('startChat', this.message)
    }
}
</script>

<style lang="scss">
#chatbox{
    display: block;
    height: 400px;
    overflow: scroll;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
