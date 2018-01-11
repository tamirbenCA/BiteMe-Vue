<template>
    <section>

        <!-- <form @submit.prevent="submitItem"> -->
        <form>
            <div class="inp">Name <input type="text" v-model="itemToUpdate.name" autofocus></div>

            <div class="desc">Description
                <textarea style="height: 24px;width: 332px;" v-model="itemToUpdate.desc"></textarea>
            </div>

            <div style="text-align: left">Price<input style="width: 50px;" type="number" v-model.number="itemToUpdate.price"></div>

            <input type="file" @change="addPhoto" />
            <img v-if="itemToUpdate.imgUrl" :src="itemToUpdate.imgUrl" />
            <div>
                
                <span v-for="(tag, index) in tags" :key="index">
                    <input style="margin:10px" type="checkbox" :id="tag" :value="tag" v-model="itemToUpdate.tags">
                    <label :for="tag">{{tag}}</label>
                </span>
            </div>
            <div class="btns">
                <button class="btn add-btn" @click.prevent="submitItem">{{(itemId) ? 'Save' : 'Add'}}</button>
                <router-link to="/" tag="button" class="btn reset-btn">Cancel</router-link>
                <button v-if="itemId" class="btn delete-btn" @click.prevent="deleteItem">Delete</button>

            </div>

        </form>
    </section>
</template>

<script>
import swal from 'sweetalert'
import UserService from '../services/UserService';
import ShopService from '../services/ShopService';
import { LOAD_TAGS, SET_TAG, SAVE_ITEM, DISABLE_ITEM } from '../modules/ShopModule';


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
            // console.log('submiting form', this.itemToUpdate)
            if (!this.itemToUpdate._id) {
                console.log('getters:', this.$store.getters.loggedinUser._id)
                var seller = this.$store.getters.loggedinUser;
                this.itemToUpdate.seller.sellerId = seller._id;
                this.itemToUpdate.seller.sellerName = seller.name;
                this.itemToUpdate.seller.sellerImgUrl = seller.imgUrl;
            }
            // ShopService.saveItem(this.itemToUpdate)
            this.$store.dispatch({ type: SAVE_ITEM, itemToUpdate: this.itemToUpdate })
                .then(_ => {
                    // this.$router.push('/')
                    this.$router.go(-1)
                })
                .catch(err => {
                    console.log('error saving item', err)
                })
        },
        deleteItem() {
            swal("Delete this item?", {
                dangerMode: true,
                buttons: true,
            }).then((res) => {
                if (res) {
                    this.itemToUpdate.isActive = false;
                    this.$store.dispatch({ type: DISABLE_ITEM, item: this.itemToUpdate })
                        .then(_ => this.$router.push('/'))
                } else return;
            })
        }
    },
    created() {
        // this.itemToUpdate.seller = this.$store.getters.loggedinUser
        this.$store.dispatch({ type: LOAD_TAGS })
        // console.log('tags:')
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
body {
    color: #5a5454;
}

.inp {
    margin-top: 16px;
    width: 78%;
    text-align: left;
}

.desc {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.btns {
    display: flex;
    flex-direction: row;
    width: 250px;
    justify-content: space-around;
    margin: 0 auto;
    align-items: center;
}

.fa-times {
    color: red;
    font-size: 50px;
}


/* button { */

.btn {
    border-radius: 5px;
    width: 100px;
    height: 36px;
    border: none;
    font-size: 20px;
    margin: 0px 10px
}

.add-btn {
    background-color: #a6cfd6;
    color: #5a5454;
    cursor: pointer;
}

.reset-btn {
    background-color: #5a5454;
    color: lightgrey;
    cursor: pointer;
}

.delete-btn {
    background-color: #e26464;
    ;
    color: white;
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
    background-color: #ffffff9e;
    width: 100%;
    max-width: 500px;

    margin-right: 500px;
    border-radius: 5px;
    margin: 50px auto;
    /* box-shadow: 1px 1px 4px 0px black; */
    justify-content: space-between;
    height: 500px;
    padding: 10px;
    /* margin-top: 200px; */
}

input {
    border-radius: 5px;
    outline: none;
    padding: 7px;
    margin-left: 5px;
}

textarea {
    border-radius: 5px;
    outline: none;
    padding: 7px;
    margin-left: 5px;
}

form>* {
    padding: 5px;
    margin: 2.5px;
}

textarea {
    resize: none;
}

@media screen and (max-width: 480px) {
    form {
        width: 90%;
    }
}
</style>
