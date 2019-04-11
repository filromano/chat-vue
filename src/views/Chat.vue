<template>
    <div>
        <h2 v-if="notStarted" class="mb-5" >Welcome, which chat would you like to try?</h2>
        <app-choose v-if="notStarted" :notStarted="notStarted"></app-choose>
        <app-chat v-else></app-chat>
    </div>
</template>


<script>
import Choose from '../components/Choose.vue';
import Chat from '../components/Chat.vue';

export default {
    data() {
        return {
        
        }
    },
    computed:{
        notStarted() {
            return this.$store.getters.chatState;
        },
    },
    components: {
        appChoose: Choose,
        appChat: Chat
    }
}
</script>