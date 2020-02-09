const store = require('./store')

function getRegion() {
    return new Promise((resolve, reject) => {
        resolve(store.list())
    });
}

module.exports = {
    getRegion
}