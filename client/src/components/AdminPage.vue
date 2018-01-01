<template>
    <ul>
        <li class="user" v-for="(seller, idx) in sellers" :key="idx">
            <img class="image" :src="seller.imgUrl">
            <div class="details" style="text-transform: capitalize"> {{seller.name}} </div>
            <div class="details" style="text-transform: capitalize"> {{seller.address.street}}, {{seller.address.city}}</div>

            <button v-if="seller.isActive" style="background-color:green" class="dis-btn" @click="disableSeller(seller)">
                Disable
            </button>
            <button v-else style="background-color:red" class="dis-btn" @click="disableSeller(seller)">
                Enable
            </button>
        </li>
    </ul>
</template>

<script>

import { LOAD_SELLERS } from '../modules/ShopModule.js';
// import { DELETE_SELLER } from '../modules/ShopModule.js';
import { UPDATE_USER } from '../modules/UserModule.js';

import swal from 'sweetalert'


export default {
    name: 'HeaderBar',
    data() {
        return {

        }
    },
    methods: {
        disableSeller(seller) {
            if (seller.isActive === true) {
                seller.isActive = false;
            }
            else {

                seller.isActive = true;
            }
            console.log(seller)
            this.$store.commit({ type: UPDATE_USER, seller })
            // this.$store.commit({ type: DELETE_ITEMS, mealsForSale})
        }
    },
    created() {
        this.$store.dispatch({ type: LOAD_SELLERS })
            .then((items) => {
                console.log('items20', items)
            })
    },
    computed: {
        sellers() {
            return this.$store.getters.items
        },

    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.details {
    width: 200px;
    text-align: start;
}

.dis-btn {
    width: 100px;
    height: 30px;
    border: none;
    border-radius: 10px;
}

.image {
    background-size: cover;
    background-position: center;
    width: 120px;
    height: 90px;
}

.user {
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 20px;
}

ul {
    list-style: none;
    margin-top: 50px;
}



img {
    width: 10%;
    height: 10%;
}
</style>
