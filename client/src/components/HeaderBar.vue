<template>
    <section class="header-bar">
        <div>
            <router-link to="/">
                <img src="../assets/Byte-Me-Logo.png" />
            </router-link>
        </div>
        <div>
            <input type="text" placeholder="What you want to byte?">
            <button>Show Map</button>
        </div>
        <div v-if="!loggedUser">
            <router-link to="/login">
                <button class="login-button">Log In</button>
            </router-link>

            <router-link to="/join">
                <button class="join-button">Join</button>
            </router-link>
        </div>
        <div v-else>
            <button @click="logOut">Log Out</button>
        </div>
    </section>
</template>

<script>
import UserService from '../services/UserService.js';
import { SIGNOUT } from '../modules/UserModule.js';

export default {
    name: 'HeaderBar',
    data() {
        return {
        }
    },
    computed: {
        loggedUser() {
            console.log('*******logged user:************8', this.$store.getters.isUser)
            return this.$store.getters.isUser;
        }
    },
    methods: {
        logOut() {
            this.$store.dispatch({ type: SIGNOUT })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
    font-weight: normal;
}

a {
    color: #42b983;
}

.header-bar {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

input {
    /* padding: 5px; */
    padding: 5px;
    padding-left: 55px;
    max-width: 300px;
    border: 1px solid #f5f5f5;
    font-size: 13px;
    /* color:gray; */
    background-image: url('../assets/search logo.png');
    background-repeat: no-repeat;
    background-position: left center;
    outline: 0;
}

button {
    padding: 5px;
    width: 10vw;
}

.join-button {
    background-color: #00b22d;
    color: white;
}
</style>
