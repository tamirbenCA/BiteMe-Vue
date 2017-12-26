<template>
    <div class="item-container">
        <h1>{{item}}</h1>
    </div>
</template>

<script>
import ShopService from '../services/ShopService.js';
import {LOAD_ITEM} from '../modules/ShopModule.js'

export default {
    data() {
        return {

        }
    },
    created() {
        var itemId = this.$route.params.itemid;
        console.log('id: ', itemId);
        this.$store.dispatch({type: LOAD_ITEM, itemId})

    },
    computed: {
        item() {
            return this.$store.getters.currItem.item
        }
    },

}
</script>

<style scoped>

</style>
