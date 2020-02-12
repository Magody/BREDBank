const store = require('./store');

function getAccount(id){

    if(!id){
        return Promise.reject("Invalid id");
    }
    //console.log('id getaccount:', id);
    return store.get(id);
}

function getAccountByNumAccount(numAccount){

    if(!numAccount){
        return Promise.reject("Invalid num account");
    }

    return store.getByNumAccount(numAccount);
}

function updateAccount(origenAccount,  newBalance, ) {
    console.log('update Account controller' + origenAccount + ' ' + newBalance)

        if (!origenAccount || !newBalance) {
            reject('Los datos son incorrectos');
            return Promise.reject('Invalid data ');
        }
        
        return store.updateAccount(origenAccount, newBalance);
}


module.exports = {
    getAccount,
    updateAccount,
    getAccountByNumAccount
};