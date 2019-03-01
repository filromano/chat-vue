<template>
    <div id="app">
        <div class="container">
            <app-choose v-if="notStarted" :notStarted="notStarted"></app-choose>
            <app-chat v-else></app-chat>
        </div>
    </div>
</template>

<script>
import Choose from './components/Choose.vue';
import Chat from './components/Chat.vue';

export default {
    computed:{
        notStarted() {
            return this.$store.getters.chatState;
        }
    },
    components: {
        appChoose: Choose,
        appChat: Chat
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
