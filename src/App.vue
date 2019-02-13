<template>
  <div id="app">
    <div class="container">
      <div class="row" style="margin-bottom:10px;">
        <div class="col-sm">
          <button type="button" class="btn btn-primary" @click="startChat">Start Chat</button>
        </div>
      </div>
      <div class="row" style="margin-bottom:10px;">
        <div class="col-sm">
          <input class="form-control form-control-lg" type="text" v-model="respostadaMensages">
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
</template>

<script>
import axios from 'axios';

export default {
  data(){
    return {
      message: '',
      respostadaMensages: '',
      sessionId: ''
    }
  },
  methods:{
    startChat(){
      console.log('comecar o chat');
      axios.post('http://localhost:3000/conversation/', {
        message: this.message,
        sessionId: this.sessionId
      })
        
      .then(response => {
         this.respostadaMensages = response.data.text
         this.sessionId = response.data.sessionId
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
    sendMessage(){
      axios.post('http://localhost:3000/conversation/', {
          message: this.message,
          sessionId: this.sessionId
        })
          
        .then(response => {
          this.respostadaMensages = response.data.text
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
</style>
