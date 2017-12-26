import axios from 'axios'

function loadTags() {
    return axios.get('http://127.0.0.1:3003/data/tags')
}

function getItemById(itemId) {
    return axios
    .get('http://127.0.0.1:3003/data/item/'+itemId)
    .then(res => {
        console.log('resdata:', res.data)
        return res.data
    })
    // return new Promise ((resolve, reject) => {
    //     setTimeout(_ => {
    //         resolve({id: itemId, isReal: 'not real'})
    //     })
    // })
}

export default {
    loadTags,
    getItemById
}