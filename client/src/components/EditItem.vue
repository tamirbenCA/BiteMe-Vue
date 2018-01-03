<template>
    <section>

        <form @submit.prevent="submitItem">
            <div style="text-align: left">Name: <input type="text" v-model="itemToUpdate.name" autofocus placeholder="Item Name"></div>

            <div class="desc" >Description:
                <textarea style="height: 24px" v-model="itemToUpdate.desc" placeholder="Item Description"></textarea>
            </div>

            <div style="text-align: left">Price:<input type="number" v-model.number="itemToUpdate.price" placeholder="Item Price"></div>

            <input type="file" @change="addPhoto" />
            <img v-if="itemToUpdate.imgUrl" :src="itemToUpdate.imgUrl" />
            <div>
                tags:
                <span v-for="(tag, index) in tags" :key="index">
                    <input style="margin:10px"   type="checkbox" :id="tag" :value="tag" v-model="itemToUpdate.tags">
                    <label :for="tag">{{tag}}</label>
                </span>
            </div>
            <!-- ADD CHECKBOX AS TAGS IN SERVER -->
            <div class="btn">
                <button>{{(itemId) ? 'Save' : 'Add'}}</button>
                <router-link to="/">
                    <i class="fa fa-times" aria-hidden="true"></i>
                </router-link>
            </div>

        </form>
    </section>
</template>

<script>
import swal from 'sweetalert'
import UserService from '../services/UserService';
import ShopService from '../services/ShopService';
import { LOAD_TAGS, SET_TAG } from '../modules/ShopModule';


export default {
    name: 'editItem',
    data() {
        return {
            itemToUpdate: ShopService.emptyItem(),
            itemId: this.$route.params.itemId
        }
    },
    computed: {
        tags() {
            return this.$store.getters.tags.tags
        }
    },
    methods: {
        addPhoto({ target }) {
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
            if (!this.itemToUpdate._id) {
                console.log('getters:', this.$store.getters.loggedinUser._id)
                var seller = this.$store.getters.loggedinUser;
                this.itemToUpdate.seller.sellerId = seller._id;
                this.itemToUpdate.seller.sellerName = seller.name;
                this.itemToUpdate.seller.sellerImgUrl = seller.imgUrl;
            }
            ShopService.saveItem(this.itemToUpdate)
                .then(_ => {
                    this.$router.push('/')
                })
                .catch(err => {
                    console.log('error saving item', err)
                })
        },
    },
    created() {
        // this.itemToUpdate.seller = this.$store.getters.loggedinUser
        this.$store.dispatch({ type: LOAD_TAGS })
        console.log('tags:')
        if (!this.itemId) return;
        ShopService.getItemById(this.itemId, 'item')
            .then(item => {
                this.itemToUpdate = Object.assign({}, item)
            });
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.desc{
    display: flex;
    flex-direction: row;
    align-items: center;
}

.btn{
    display: flex;
    flex-direction: row;
    width:200px;
    justify-content: space-around;
    margin: 0 auto;
        align-items: center;

}
.fa-times {
    color: red;
    font-size: 50px;
}

button {
    background-color: #53bf53;
    border-radius: 5px;
    width: 100px;
        height: 36px;

    font-size:20px;
}

section {
    font-size: 20px;
}

img {
    background-size: cover;
    background-position: center;
    width: 30%;
    height: 30%;
}

form {
    margin: auto;
    display: flex;
    flex-direction: column;
    align-self: flex-end;
    width: 50%;   
    z-index: 10000;
    background-color: #b5f5b5;
    width: 100%;
    width: 350px;
    margin-right: 500px;
    border-radius: 5px;
    margin: 50px auto;
    box-shadow: 1px 1px 4px 0px black;
    justify-content: space-between;
    height:400px;
    padding: 10px;
}

form>* {
    padding: 5px;
    margin: 2.5px;
}

textarea {
    resize: none;
}
</style>
