export const LOAD_TAGS = 'shop/loadTags'
export const LOAD_ITEMS = 'shop/loadItems';
import ShopService from '../services/ShopService.js';
import UserService from "../services/UserService.js";

const SET_ITEMS = 'shop/setItems';

const state = {
    items: [],
    tags: []
}
const mutations = {
    [LOAD_TAGS](state, payload) {
        // console.log('mutating tags', payload.tags)
        state.tags = payload
    },
    [SET_ITEMS](state, {items}) {
        state.items = items;
        // console.log( state.items)
    },
}
const getters = {
    tags: state => state.tags,
    
    items: state => state.items
}
const actions = {
    [LOAD_TAGS]({ commit, payload }) {
        // console.log('loading in actions')
        UserService.loadTags()
            .then(tags => {
                // console.log('tags in action', tags)
<<<<<<< HEAD
                commit({ type: LOAD_TAGS, tags })
            })

    },
    [LOAD_ITEMS]({ commit}) {
        return UserService.getItems()
            .then(items => {
                // console.log(items)
                commit({ type: SET_ITEMS, items })
               
                
            })
            .catch(err => {
                commit(SET_ITEMS, [])
                throw err;
=======
                commit({type: LOAD_TAGS, tags: tags.data})
>>>>>>> 3e0e19b8c4acf46639e26522ba74f8799582017c
            })
    },
}
export default {
    state,
    mutations,
    getters,
    actions
} 