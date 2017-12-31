<template>
    <ul>
        <li class="user" v-for="(seller, idx) in sellers" :key="idx">
            <img :src="seller.imgUrl">
            <div>{{seller.rank}}</div>
            <div> {{seller.name}} {{seller.address}}</div>
           
            <ul>
                Products:
                <li v-for="(meal, idx) in seller.itemsForSale" :key="idx">
                    {{meal}}
                </li>
            </ul>
            <ul>
                Comments:
                <li v-for="(comment, idx) in seller.commentsOnSellers" :key="idx">
                    {{comment}}
                </li>
            </ul>
            Meals sold:
            
            <button @click="deleteSeller(seller)">Delete seller</button>
        </li>
    </ul>
</template>

<script>

import { LOAD_SELLERS } from '../modules/ShopModule.js';
import { DELETE_SELLER } from '../modules/ShopModule.js';
// import { DELETE_ITEMS } from '../modules/ShopModule.js';

import swal from 'sweetalert'


export default {
    name: 'HeaderBar',
    data() {
        return {
        }
    },
    methods: {
        deleteSeller(seller) {
            var sellerId = seller._id;
            var mealsForSale=[];
            seller.itemsForSale.forEach(item=>mealsForSale.push(item))
            console.log(mealsForSale)
            // swal({
            //     title: 'Are you sure?',
            //     text: "You won't be able to revert this!",
            //     type: 'warning',
            //     showCancelButton: true,
            //     confirmButtonColor: '#3085d6',
            //     cancelButtonColor: '#d33',
            //     confirmButtonText: 'Yes, delete it!'
            // }).then((result) => {
            //     if (result.value) {
            //         swal(
            //             'Deleted!',
            //             'Your file has been deleted.',
            //             'success'
            //         )
            //     }
            // })
            console.log(sellerId)
            // alert('are you sure???')

            // this.$store.commit({ type: DELETE_SELLER, sellerId })
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
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.user{
display: flex;
flex-direction: row;
}
ul {
    list-style: none;
}

img {
    width: 10%;
    height: 10%;
}
</style>
