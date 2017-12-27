<template>
    <section class="tags-bar">
        <!-- <h1>tags</h1> -->

        <nav>
            <ul class="container-tags">
                <li v-for="(tag, index) in tags" :key="index" @click="showTagItems(tag)">
                    {{tag}}
                </li>
                <li class="how-it-works">How it works</li>
                 <li class="how-it-works">Our mission</li>
            </ul>
        </nav>

    </section>
</template>

<script>
import { LOAD_TAGS } from '../modules/ShopModule';
export default {
    name: 'TagsBar',
    data() {
        return {
            // tags: this.$store.state.shop.tags
        }
    },
    methods: {
        showTagItems(tag) {
            console.log('tag27', tag)
            this.$router.push('/items/' + tag);
        }
    },
    computed: {
        tags() {
            // console.log('computing tags', this.$store.getters.tags.tags)
            return this.$store.getters.tags.tags
        }
    },
    created() {
        // console.log('tags created')
        this.$store.dispatch({ type: LOAD_TAGS })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
    list-style: none;
}


ul {
    margin-left:400px;
    display: flex;
    flex-direction: row;
    /* justify-content: center; */
}

li {
    width:100px;
    /* padding: 0 10px 0 10px; */
    border-right: none;
    cursor: pointer;
    text-transform: capitalize
}


.tags-bar {
    /* height: 50px; */
    width: 70%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    /* border-bottom: 1px solid black; */
    margin-bottom: 50px;
}

.how-it-works{
    padding-left: 50px;
    }
</style>
