const store = require('./store')

function getClient(id){

    if(!id){
        return Promise.reject("Invalid id");
    }

    return store.get(id);
}

function getClientByUser(user){

    if(!user){
        return Promise.reject("Invalid id");
    }

    return store.getByUser(user);
}


function updateClient(id,  newPassword ) {
    console.log('update client:' + id + ' ' + newPassword)

        if (!id || !newPassword) {
            reject('Los datos son incorrectos');
            return Promise.reject('Invalid data ');
        }
        
        return store.updateClient(id, newPassword);
}

module.exports = {
    getClient,
    getClientByUser,
    updateClient
};
