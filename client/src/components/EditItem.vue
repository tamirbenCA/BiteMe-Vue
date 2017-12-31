<template>
    <section>
        NEW ITEM
        <form @submit.prevent="submitItem">
            <input type="text" v-model="itemToUpdate.name" autofocus placeholder="Item Name">
            <textarea v-model="itemToUpdate.desc" placeholder="Item Description"></textarea>
            <input type="number" v-model.number="itemToUpdate.price" placeholder="Item Price">
            <input type="file" @change="addPhoto" />
            <img v-if="itemToUpdate.imgUrl" :src="itemToUpdate.imgUrl"/>
            <input type="checkbox" v-model="itemToUpdate.tags">
            <!-- ADD CHECKBOX AS TAGS IN SERVER -->
            

            <button>{{(itemId) ? 'Save' : 'Add'}}</button>
            <router-link tag="button" to="/">Cancel</router-link>
        </form>
    </section>
</template>

<script>
import swal from 'sweetalert'
import UserService from '../services/UserService';
import ShopService from '../services/ShopService';

export default {
    name: 'editItem',
    data() {
        return {
            itemToUpdate: ShopService.emptyItem(),
            itemId: this.$route.params.itemId
        }
    },
    methods: {
        addPhoto({target}) {
            var file = target.files
            UserService.uploadImage(file[0])
            .then(imgUrl => {
                console.log('photo uploaded')
                this.itemToUpdate.imgUrl = imgUrl
            })
            .catch(err => {
                console.error('error adding photo:', err)
            })
        },
        submitItem() {
            console.log('submiting form', this.itemToUpdate)
            ShopService.saveItem(this.itemToUpdate)
            .then(_ => {
                this.$router.push('/')
            })
            .catch(err => {
                console.log('error saving car', err)
            })
        },
    },
    created() {
        // this.itemToUpdate.seller = this.$store.getters.loggedinUser
        if (!this.itemId) return;
        ShopService.getItemById(this.itemId)
            .then(item => {
                this.itemToUpdate = Object.assign({}, item)
            })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
form {
    margin: auto;
    display: flex;
    flex-direction: column;
    width: 50%;
}

form>* {
    padding: 5px;
    margin: 2.5px;
}

textarea {
    resize: none;
}
</style>
