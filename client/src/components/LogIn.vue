<template>
    <!-- <section class="form-box">
        <form @submit.prevent="logIn(user)">
            <h1>Join Us</h1>
            <input v-model="user.password" type="password" placeholder="Password">
            <input v-model="user.email" type="email" placeholder="Email">
            <button>submit</button>
        </form>
    </section> -->
    <section class="form-box">
           <form @submit.prevent="logIn(user)">
               <h1>Log in</h1>
               <input v-model="user.email" type="text" placeholder="Email">
               <input v-model="user.password" type="password" placeholder="Password">
               <button>submit</button>
               <p>Don't have an account? <router-link to="/join">Click here</router-link></p>
           </form>
       </section>
</template>


<script>

import { SIGNIN } from '../modules/UserModule';
import UserService from '../services/UserService';
import swal from 'sweetalert'

export default {
    name: 'HeaderBar',
    data() {
        return {
            user: { email: '', password: '' }
        }
    },
    methods: {
        logIn(user) {
            this.$store.dispatch({ type: SIGNIN, signinDetails: this.user })
                .then(res => {
                    this.$router.go(-1);
                })
                .catch(err => {
                    swal({
                        text: 'Wrong email / password',
                        icon: 'error'
                    })
                })
        }
    },
    created() {

    }
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
    background-color: #53bf53;
    border-radius: 5px;
    width: 100px;
}


form button {
    margin: 20px 0 20px 70px;
}

input {
    outline: none;
}

.form-box {
    margin: 0 auto;
    margin-top: 50px;
    margin-bottom: 50px;
    border: 1px solid lightgray;
    border-radius: 5px;
    max-width: 500px;
    width: 100%;
    background-color: #b5f5b5;
}

form {
    margin: auto;
    display: flex;
    flex-direction: column;
    width: 50%;
}

form>* {
    padding: 5px;
    margin: 2.5px;
}

textarea {
    resize: none;
}
</style>
