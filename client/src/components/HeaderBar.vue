<template>
    <section class="header-bar">
        <div>
            <img src="../assets/Byte-Me-Logo.png" />
        </div>
        <div>
            <input type="text" placeholder="What you want to byte?">
            <button>Show Map</button>
        </div>
        <div>
            <button class="login-button">Log In</button>
            <router-link to="/join">
                <button class="join-button">Join</button>
            </router-link>
        </div>
    </section>
</template>

<script>
import UserService from '../services/UserService.js';
import { SIGNUP, SIGNIN } from '../modules/UserModule.js';

export default {
    name: 'HeaderBar',
    data() {
        return {
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
    justify-content: space-between;
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
