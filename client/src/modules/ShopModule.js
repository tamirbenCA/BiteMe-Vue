export const LOAD_TAGS = 'shop/loadTags' 
import ShopService from '../services/ShopService.js';

const state = {
    tags: []
}
const mutations = {
    [LOAD_TAGS](state, payload) {
        // console.log('mutating tags', payload.tags)
        state.tags = payload
    }
}
const getters = {
    tags: state => state.tags
}
const actions = {
    [LOAD_TAGS]({commit, payload}) {
        // console.log('loading in actions')
        ShopService.loadTags()
            .then(tags => {
                // console.log('tags in action', tags)
                commit({type: LOAD_TAGS, tags: tags.data})
            })
        
    }
}
export default {
    state,
    mutations,
    getters,
    actions
} 