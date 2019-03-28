<template>
    <div class="row justify-content-md-center">
        <div class="col-sm-5">
            <h2 class="mb-5">Login</h2>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">Email</span>
                </div>
                <input type="text" class="form-control" v-model="email">
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">Password</span>
                </div>
                <input type="password" class="form-control" v-model="password">
            </div>
            <div v-if="error != ''" class="alert alert-danger" role="alert">
               {{ error }}
            </div>
            <button type="button" class="btn btn-primary" @click="login">Log in</button>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            email: '',
            password: '',
            error: ''
        }
    },
    methods: {
        login(){
            axios.post('/login', {
                email: this.email,
                password: this.password
            })
            .then(response => {
                console.log('resposta')
                console.log(response.data);
                if(!response.data.msg){
                    this.error = 'Email or password are invalid';
                    return
                }
                if(response.data.error){
                    this.error = response.data.msg;
                    return
                }
                this.$store.commit('loggedIn', response.data.data);
                this.$router.push({ path: '/chat' });

            })
            .catch(err => { 
                console.log(err)
                this.error = 'Internal error';
            })
        }
    },
}
</script>