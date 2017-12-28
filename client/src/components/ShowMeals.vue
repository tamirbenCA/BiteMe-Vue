<template>
    <ul>
        <li>
            <!-- {{meal}} -->
            {{item.name}}
               <!-- <img  :src="item.imgUrl" /> -->
        </li>
    </ul>
</template>

<script>

import { LOAD_ITEM } from '../modules/ShopModule.js';
import { LOAD_SELLER } from '../modules/ShopModule.js';

export default {

    data() {
        return {
            // mealId:null
        }
    },
    props: ['meal'],

    created() {
        // console.log(this.meal)
        this.$store.dispatch({ type: LOAD_ITEM, itemId:this.meal })
    },
    methods: {

    },

    computed: {
        item() {
            return this.$store.getters.currItem
        }
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>


