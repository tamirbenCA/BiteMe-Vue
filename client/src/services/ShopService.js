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

function loadSellersItems () {
    return new Promise ((resolve, reject) => {
        setTimeout(() => resolve([{name:'toApproveItems0',_id: 0},{name: 'toApproveItems1', _id: 1}])) 
    })
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