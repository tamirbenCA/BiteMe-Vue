<template>
    <section class="">
        <form @submit.prevent="logIn">
            <h1>Join Us</h1>
            <input v-model="user.email" type="text" placeholder="Email">
            <input v-model="user.password" type="password" placeholder="Password">
            <button>submit</button>
        </form>
    </section>
</template>

<script>
import { SIGNIN } from '../modules/UserModule';
import UserService from '../services/UserService';

export default {
    name: 'HeaderBar',
    data() {
        return {
            user: {}
        }
    },
    methods: {
        logIn() {
           console.log('user is: ', this.user)
           this.$store.dispatch({ type: SIGNIN, signinDetails: this.user })
                .then(this.$router.push('/'))

        }
    },
    created() {
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
form {
    margin: auto;
    display: flex;
    flex-direction: column;
    width: 50%;
} 
form > * {
    padding: 5px;
    margin: 2.5px;
}
textarea {
   resize: none;
}
</style>
