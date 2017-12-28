import axios from 'axios'

const URL = 'http://127.0.0.1:3003'

function loadTags() {
    return axios.get(`${URL}/data/tags`)
}

function getItemById(itemId) {
    // console.log('itemId', itemId)
    return axios
        .get(`${URL}/data/item/${itemId}`)
        .then(res => {
            // console.log('resdata:', res.data)
            return res.data
        })
}



function getItemsByIds(itemsIds) {
    var items = itemsIds.map((itemId) => {
        return getItemById(itemId)
            .then((res) => {
                // console.log(res)
                return res
            })
    })

    return Promise.all(items)

}



function getChefById(chefId) {
    // console.log('chefId:', chefId)
    return axios
        .get('http://127.0.0.1:3003/data/user/' + chefId)
        .then(res => {
            // console.log('resdata:', res.data)
            return res.data
        })
}

function loadSellersItems(sellerId) {
    // console.log('sellers id in service.loadSellers(): ', sellerId)
    return axios.get(`${URL}/data/user/${sellerId}/orders/asseller`)
    // return new Promise ((resolve, reject) => {
    //     setTimeout(() => resolve([{name:'toApproveItems0',_id: 0},{name: 'toApproveItems1', _id: 1}])) 
    // })
}

function loadBuyersItems() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve([{ name: 'orderStatusItems0', _id: 0 }, { name: 'orderStatusItems1', _id: 1 }]))
    })
}

export default {
    loadTags,
    getItemById,
    getChefById,
    loadSellersItems,
    loadBuyersItems,
    getItemsByIds
}