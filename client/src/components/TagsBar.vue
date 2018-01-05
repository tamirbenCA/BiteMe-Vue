<template>
    <section class="tags-bar">
        <!-- <nav style="margin-top:50px;"> -->
        <ul class="container-tags">
            <router-link v-for="(tag, index) in tags" :key="index" @click.native="setTag(tag)" tag="li" :to="`/items?tag=${tag}`" exact>
            <li>  {{tag}}</li>
                  
            </router-link>
        </ul>
        <!-- </nav> -->
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
.tag-btn {
    text-transform: capitalize;
    cursor: pointer;
}

li:hover {
  color: rgb(111, 133, 154);
}

* {
    list-style: none;
}


ul {
    display: flex;
    flex-direction: row;
}

li {
    width: 100px;
       font-size: 18px;
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
    /* width: 70%; */
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-bottom: 50px;
    align-items: center;
    background-color: #ffffff6e;
    justify-content: center;
}
</style>
