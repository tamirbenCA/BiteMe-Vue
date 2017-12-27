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
}

function getChefById(chefId) {
    console.log('chefId:', chefId)
    return axios
    .get('http://127.0.0.1:3003/data/user/'+chefId)
    .then(res => {
        console.log('resdata:', res.data)
        return res.data
    })

}

export default {
    loadTags,
    getItemById,
    getChefById
}