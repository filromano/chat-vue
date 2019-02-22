<template>
    <div class="row" style="margin-bottom:10px;">
        <div class="col-sm">
            <button type="button" class="btn btn-primary" @click="startStoreChat">Start Store Chat</button>
        </div>
        <div class="col-sm">
            <button type="button" class="btn btn-primary" @click="startExampleChat">Start Example Chat</button>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        startStoreChat() {
            this.$store.commit('startChatStore');
        },
        startExampleChat() {
            this.$store.commit('startChatExample');
        }
    }
}
</script>
