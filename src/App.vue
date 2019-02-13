<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-sm">
          <div v-if="this.notStarted" class="row" style="margin-bottom:10px;">
            <div class="col-sm">
              <button type="button" class="btn btn-primary" @click="startChat">Start Chat</button>
            </div>
          </div>
          <div v-else>
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
        </div>
        <div class="col-sm">
          
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data(){
    return {
      message: '',
      respostadaMensages: '',
      sessionId: '',
      arrayMensagens: [],
      notStarted: true
    }
  },
  methods:{
    scrollTop(){
      this.$nextTick(() =>{
        var objDiv = document.getElementById('chatbox');
        objDiv.scrollTop = objDiv.scrollHeight;
      });
    },
    startChat(){
      console.log('comecar o chat');
      axios.post('http://localhost:3000/conversation/', {
        message: this.message,
        sessionId: this.sessionId
      })
        
      .then(response => {
        this.respostadaMensages = response.data.text
        this.sessionId = response.data.sessionId
        this.arrayMensagens.push({type: 'chatbot', text: this.respostadaMensages});
        this.notStarted = false
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
    sendMessage(){
      this.arrayMensagens.push({type: 'user', text: this.message});
      this.scrollTop()
      axios.post('http://localhost:3000/conversation/', {
          message: this.message,
          sessionId: this.sessionId
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
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#chatbox{
  display: block;
  height: 400px;
  overflow: scroll;
}
</style>
