<template>
<section class="sellers-container">
    <table class="sellers-list">
        <tr>
            <th>seller name</th>
            <th>seller address</th>
        </tr>
        <tr v-for="(seller, idx) in sellers" :key="idx" @click="sellerPage(seller._id)" class="tr-seller">
            <td>{{seller.name}}</td>
            <td>{{seller.address.city}}</td>
        </tr>
    </table>
    <!-- <ul> -->
        <!-- <li class="user" v-for="(seller, idx) in sellers" :key="idx"> -->
            <!-- <img class="image" :src="seller.imgUrl"> -->
            <!-- <div class="details" style="text-transform: capitalize"> {{seller.name}} </div> -->
            <!-- <div class="details" style="text-transform: capitalize"> {{seller.address.street}}, {{seller.address.city}}</div> -->
            <!-- <router-link :to="`/items/seller/${seller._id}`" tag="button">View This Seller Items</router-link> -->
        <!-- </li> -->
    <!-- </ul> -->
</section>
</template>

<script>

import { LOAD_SELLERS } from '../modules/ShopModule.js';

import swal from 'sweetalert'


export default {
    name: 'HeaderBar',
    data() {
        return {

        }
    },
    methods: {
        sellerPage(sellerId) {
            // alert(`click ${sellerId}`)
            this.$router.push(`/items/seller/${sellerId}`)
        }
    },
    created() {
        this.$store.dispatch({ type: LOAD_SELLERS })
            .then((items) => {
                // console.log('items20', items)
            })
    },
    computed: {
        sellers() {
            return (this.$store.getters.items).filter(seller => seller.isActive)
        },

    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.sellers-container {
    display: flex;
    justify-content: center;
    margin: 25px 0px;
}
 th, td {
     width: 30%;
     text-transform: capitalize;
 }

 .tr-seller {
     cursor: pointer;
 }

/* .details {
    width: 200px;
    text-align: start;
}

.image {
    background-size: cover;
    background-position: center;
    width: auto;
    max-height: 50px;
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
    width: 5%;
    height: 5%;
} */
</style>
