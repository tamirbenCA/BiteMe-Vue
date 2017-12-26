<template>
    <section class="tags-bar">
        <!-- <h1>tags</h1> -->
        <nav>
            <ul>
                <li v-for="tag in tags">
                    {{tag}}
                </li>
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
    computed: {
        tags () {
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
    padding: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}

li {
    padding: 10px;
    border: 1px solid black;
    border-right: none;
}
li:last-child {
    border: 1px solid black;
}
</style>
