<template>
    <section class="sellers-container">

        <div>
            <p style="font-size:40px;">OUR SELLERS</p>
            <p style="font-size:20px;">CLICK ON THEM TO SEE WHAT THEY ARE COOKING</p>
        </div>

        <div class="sellers">
            <ul class="sellers">
                <li v-for="(seller, idx) in sellers" :key="idx" @click="sellerPage(seller._id)">
                    <img :src="seller.imgUrl" alt="">
                    <p style="text-transform: capitalize;font-size:20px">{{seller.name}}</p>
                </li>
            </ul>
        </div>
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
            this.$router.push(`/items/seller/${sellerId}`)
        }
    },
    created() {
        this.$store.dispatch({ type: LOAD_SELLERS })
            .then((items) => {
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
    flex-direction: column;
    margin-top: 50px;
}

h1 {
    margin-bottom: 50px;
}

li {
    cursor: pointer;
    list-style: none;
    /* box-shadow: 1px 1px 2px 0px black; */
}

p {
    margin-bottom: 50px;
}

.sellers {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    margin: auto;
    margin-bottom: 50px;
}

.sellers-list {
    width: 100%;
}

img {
    background-size: cover;
    background-position: center;
    width: 180px;
    height: 180px;
}

.seller-img {
    width: 50px;
    height: 50px;
}

.tr-seller {
    cursor: pointer;
}

tr {
    display: flex;
    flex-direction: row;
}
</style>
