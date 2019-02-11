<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld/>
  </div>
</template>

<script>
import axios from 'axios';
import HelloWorld from './components/HelloWorld.vue'

export default {
  data(){
    return {
      message: 'which stores?'
    }
  },
  components: {
    HelloWorld
  },
  created(){
    axios.post('http://localhost:3000/conversation/', {
      message: this.message
    })
      
    .then(response => {})
    .catch(e => {
      this.errors.push(e)
    })
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
