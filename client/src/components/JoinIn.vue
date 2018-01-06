<template>
    <section class="join-box">
        <form @submit.prevent="submitNewUser">
            <h1>Join Us</h1>

            <input v-model="newUser.name" type="text" placeholder="Name">
            <input v-model="newUser.password" type="password" placeholder="Password">
            <input v-model="newUser.email" type="email" placeholder="Email">
            <div class="user-address">
                <input v-model="newUser.address.street" type="text" placeholder="Street">
                <input v-model="newUser.address.city" type="text" placeholder="City">
            </div>
            <textarea v-model="newUser.about" placeholder="About you"></textarea>
            <input type="file" @change="pushPhoto" />
            <img v-if="newUser.imgUrl" :src="newUser.imgUrl" />
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
        },
        pushPhoto({ target }) {
            var file = target.files
            UserService.uploadImage(file[0])
                .then(imgUrl => {
                    this.newUser.imgUrl = imgUrl
                }).catch(err => {
                    console.error('error adding photo:', err)
                })
        },
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
.user-address {
    display: flex;
    justify-content: space-between;
    padding: 0px;
}

.user-address>input {
    width: 43%;
    padding: 5px;
}

button {
    background-color: #53bf53;
    border-radius: 5px;
    width: 100px;
}

.join-box {
    margin: 0 auto;
    margin-top: 50px;
    margin-bottom: 50px;
    border: 1px solid lightgray;
    border-radius: 5px;
    max-width: 500px;
    width: 100%;
    background-color: #b5f5b5;
    margin-top: 174px;
}

form {
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;
}

form button {
    margin: 20px 0 20px 70px;
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
        width: 90%;
        margin-top: 70px;
    }
}
</style>
