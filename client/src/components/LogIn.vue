<template>
    <section class="form-box">
        <form @submit.prevent="logIn(user)">
            <p style="font-size:30px">Log in</p>
            <input v-model="user.email" type="text" placeholder="Email">
            <input v-model="user.password" type="password" placeholder="Password">
            <button>submit</button>
            <p>Don't have an account?
                <router-link to="/join">Click here</router-link>
            </p>
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
    background-color: #a6cfd6;
    border-radius: 5px;
    width: 100px;
    height: 40px;
    border: none;
    font-size: 20px;
    color: #5a5454;
}


form button {
    margin: 20px 0 20px 70px;
}

input {
    outline: none;
    background-color: white;
    border-radius: 5px;
}

.form-box {
    margin: 0 auto;
    margin-bottom: 50px;
    border: 1px solid lightgray;
    border-radius: 5px;
    max-width: 500px;
    width: 100%;
    background-color: #ffffff9e;
    margin-top: 80px;
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


@media screen and (max-width: 480px) {
    .form-box {
        max-width: 440px;
        margin-top: 50px;
        margin-bottom: 200px;
    }

    form {
        width: 60%;
    }
}
</style>
