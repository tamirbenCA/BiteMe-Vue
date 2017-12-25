function loadTags() {
    return new Promise ((resolve, reject) => {
        var tags = [];
        setTimeout(_ => {
            // console.log('setting load tags timeout')
            resolve(['a','b','c'])
        }, 500)
    })
}

export default {
    loadTags
}