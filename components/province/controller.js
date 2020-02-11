const store = require('./store')

function getProvince(province) {
    if(!province){
        return Promise.reject("Invalid province");
    }

    return store.get(province);
}

module.exports = {
    getProvince
}