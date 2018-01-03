<template>
    <section class="tags-bar">
        <nav style="margin-top:150px;">
            <ul class="container-tags">
                <router-link v-for="(tag, index) in tags" :key="index" @click.native="setTag(tag)" tag="li" :to="`/items?tag=${tag}`" exact>
                    <button style="text-transform: capitalize">
                        {{tag}}
                    </button>

                </router-link>
            </ul>
        </nav>
    </section>
</template>

<script>
import { LOAD_TAGS, SET_TAG, LOAD_SEARCHED_ITMES } from '../modules/ShopModule';

export default {
    name: 'TagsBar',
    data() {
        return {
        }
    },
    methods: {
        setTag(tag) {
            this.$emit('resetTag')
            this.$store.commit({ type: SET_TAG, tag })
            this.$store.dispatch({ type: LOAD_SEARCHED_ITMES })
        }
    },
    computed: {
        tags() {
            return this.$store.getters.tags.tags
        }
    },
    created() {
        this.$store.dispatch({ type: LOAD_TAGS })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

button {
    border-radius: 5px;
    border: none;
    height: 40px;
    width: 80px;
    background-color: #a6cfd6;
    /* font-weight: 600; */
    font-size:17px;
    color:#5a5454;
    /* box-shadow: 1px 2px 2px 0px black; */
}

button:hover {
    background-color: rgb(111, 133, 154);
}

* {
    list-style: none;
}


ul {
    margin-left: 400px;
    display: flex;
    flex-direction: row;
    /* justify-content: center; */
}

li {
    width: 100px;
    /* padding: 0 10px 0 10px; */
    border-right: none;
    cursor: pointer;
    text-transform: capitalize
}

.li-active {
    color: orange
}

.router-link-active {
    color: orange
}

.tags-bar {
    width: 70%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 50px;
    margin-top: 20px;
}
</style>
