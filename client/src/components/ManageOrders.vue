<template>
    <div>
        <h1>Manage Orders</h1>

        <h2>waiting for my approve</h2>
        <ul>
           <li v-for="order in sellersItems ">
               <p style="display: inline;">{{order.name}} </p>
               <button @click="approveOrder(order._id)">Approve</button>
               <button @click="declineOrder(order._id)">Decline</button>
               <button @click="deliverOrder(order._id)">Delivered</button>
           </li>
       </ul>
        <h2>waiting for sellers approve</h2>
        <ul>
           <li v-for="item in buyersItems">
               {{item.name}}
           </li>
       </ul>
    </div>
</template>

<script>
import { LOAD_SELLERS_ITEMS } from '../modules/ShopModule';
import { LOAD_BUYERS_ITEMS } from '../modules/ShopModule';
import { APPROVE_ITEM } from '../modules/ShopModule';


export default {
    data() {
        return {
        }
    },
    created() {
        this.$store.dispatch({type: LOAD_SELLERS_ITEMS});
        this.$store.dispatch({type: LOAD_BUYERS_ITEMS});
    },
    computed: { 
        sellersItems () {
            return this.$store.getters.sellersItems 
        },
        buyersItems() {
            return this.$store.getters.buyersItems
        }
    },
    methods: {
        approveOrder(itemId) {
            console.log('item approved in METHODS _id: ', itemId);
        },
        declineOrder(itemId) {
            console.log('item declined in METHODS _id: ', itemId);
        },
        deliverOrder(itemId) {
            console.log('item deliverd in METHODS _id: ', itemId);
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
    list-style: none;
}

/* .title {
    font-size: 30px;
    font-weight: bold;
}

.star {
    color: gold;
}

img {
    height: 40%;
    width: 40%;
}

.right-side {
    color: black;
    background-color: lightgray;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 300px;
    align-items: center;
}


.comments {
    background-color: white;
    width: 90%;
    margin: 5px;
    border-radius: 10px;
}

.details {
    background-color: white;
    width: 90%;
    margin: 5px;
    border-radius: 10px;
}

select {
    height: 40px;
}

.details-container {
    width: 100%;
    max-width: 1500px;
    display: flex;
    flex-direction: row; */
    /* background-color: lightgray; */
    /* height: 500px;
    justify-content: center;
    align-items: center;
    justify-content: space-around;
}

.left-side {
    background-color: white;
    width: 40%;
    border: 1px lightgray solid;
    height: 470px;
    padding: 10px;
    margin-left: 100px;
}


.checkout-btn {
    background-color: green;
    border: none;
    height: 40px;
}

form {
    display: flex;
    flex-direction: column;
}

.logo {
    width: 20%;
    height: 20%;
    margin-bottom: 50px;
    margin-left: -500px;
}

.name {
    margin: 0;
}

.title {
    margin: 10px;
    color: black;
}

input {
    margin: 10px;
}

.buttom { */
    /* background-color: lightgray; */
    /* padding: 10px;
    border-radius: 10px;
}

.right-side-title {
    color: black;
    font-size: 30px;
    margin: 0 auto;
} */
</style>


