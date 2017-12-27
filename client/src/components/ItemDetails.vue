<template>
    <div class="details-container">
        <div class="left-side">
            <div class="head-left">
                <img class="logo" src="../assets/Byte-Me-Logo.png" />
            </div>
            <div class="middle" v-if="item">
                <p class="title"> {{item.name}} with olives and cheese
                    <span class="star">{{item.rank}} ★</span>
                </p>
                <!-- <p class="rank"> {{item.rank}}
                                            <span class="star">★</span>
                                        </p> -->
                <img :src="item.img" />

            </div>
            <div class="buttom">
                <p> Price: {{item.price}}$ </p>
                <select>
                    <option>0</option>
                    <option v-for="n in 10">{{n}}</option>
                </select>
                <button class="checkout-btn">Add to cart</button>
            </div>
        </div>

        <div class="right-side">
            <div class="details">
                <h1>About the byte</h1>
            </div>
            <div class="comments">
                <h1>Reviews</h1>
            </div>

        </div>

    </div>
</template>

<script>
// @click="showDetails(item.sellerId,item.item.id)"

import { LOAD_ITEM } from '../modules/ShopModule.js';

export default {

    data() {
        return {

        }
    },
    created() {
        var itemId = this.$route.params.itemId;
        console.log('id: ', itemId);
        this.$store.dispatch({ type: LOAD_ITEM, itemId })
            .then(item => {
                var x = this.$store.getters.currItem.item
                console.log('items:', x)
            })
            .catch(err => { console.log('err', err) })
    },
    computed: {
        item() {
            return this.$store.getters.currItem.item
        }
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
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
    flex-direction: row;
    /* background-color: lightgray; */
    height: 500px;
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

.buttom {
    /* background-color: lightgray; */
    padding: 10px;
    border-radius: 10px;
}

.right-side-title {
    color: black;
    font-size: 30px;
    margin: 0 auto;
}
</style>


