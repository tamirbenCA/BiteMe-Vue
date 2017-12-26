<template>
    <section class="">
        <form @submit.prevent="submitNewUser">
            <h1>Join Us</h1>
            <input v-model="newUser.name" type="text" placeholder="Name">
            <input v-model="newUser.password" type="password" placeholder="Password">
            <input v-model="newUser.email" type="email" placeholder="Email">
            <input v-model="newUser.address" type="text" placeholder="Address">
            <textarea v-model="newUser.about" placeholder="About you"></textarea>
            <input  v-model="newUser.chefPic" type="url" placeholder="picture url">
            <button>submit</button>
        </form>
    </section>
</template>

<script>
import { SIGNUP } from '../modules/UserModule';
import UserService from '../services/UserService';

export default {
    name: 'HeaderBar',
    data() {
        return {
            newUser: null
        }
    },
    methods: {
        submitNewUser() {
            console.log('submiting form', this.newUser)
            this.$store.dispatch({ type: SIGNUP, signupDetails: this.newUser })
                .then(this.$router.push('/'))
        }
    },
    computed: {

    },
    created() {
        this.newUser = UserService.getEmptyUser()
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
