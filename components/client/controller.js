const store = require('./store')

function getClient(id){

    if(!id){
        return Promise.reject("Invalid id");
    }

    return store.get(id);
}

module.exports = {
    getClient,
};
