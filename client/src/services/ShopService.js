import axios from 'axios'

function loadTags() {
    return axios.get('http://127.0.0.1:3003/data/tags')
}

export default {
    loadTags
}