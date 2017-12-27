import axios from 'axios'

const URL = 'http://127.0.0.1:3003'

function loadTags() {
    return axios.get(`${URL}/data/tags`)
}

function getItemById(itemId) {
    return axios
    .get(`${URL}/data/item/${itemId}`)
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

function loadSellersItems (sellerId) {
    // console.log('sellers id in service.loadSellers(): ', sellerId)
    return axios.get(`${URL}/data/user/${sellerId}/orders/asseller`)
    // return new Promise ((resolve, reject) => {
    //     setTimeout(() => resolve([{name:'toApproveItems0',_id: 0},{name: 'toApproveItems1', _id: 1}])) 
    // })
}

function loadBuyersItems () {
    return new Promise ((resolve, reject) => {
        setTimeout(() => resolve([{name:'orderStatusItems0', _id: 0}, {name: 'orderStatusItems1', _id: 1}])) 
    })
}

export default {
    loadTags,
    getItemById,
    loadSellersItems,
    loadBuyersItems
}