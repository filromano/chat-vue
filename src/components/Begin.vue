<template>
    <div class="row" style="margin-bottom:10px;">
        <div class="col-sm">
            <button type="button" class="btn btn-primary" @click="startChat">Start Chat</button>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        startChat() {
            this.$store.commit('startChat');
        }
    }
}
</script>
