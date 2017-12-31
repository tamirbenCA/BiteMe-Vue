<template>
    <section class="">
        <form @submit.prevent="logIn(user)">
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

            // authService.signin(user).then(res => {
            //     this.$store.commit(SIGN_IN, res);
            //     this.$router.go(-1);
            // }).catch(err => {
            //     err.json().then(res => this.error = res.error);
            // })
            console.log('user is: ', this.user)
            this.$store.dispatch({ type: SIGNIN, signinDetails: this.user })
                .then(res => { 
                     this.$router.go(-1);
                })
                .catch(err => { 
                    // alert('Wrong email / password')
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
