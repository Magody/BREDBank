const store = require('./store');

function getAccount(id){

    if(!id){
        return Promise.reject("Invalid id");
    }

    return store.get(id);
}

function getAccountByNumAccount(numAccount){

    if(!numAccount){
        return Promise.reject("Invalid num account");
    }

    return store.getByNumAccount(numAccount);
}

function updateAccount(origenAccount,  balance, ) {
    return new Promise( async (resolve, reject) => {
        if (!origenAccount || !balance) {
            reject('Los datos son incorrectos');
            return false;
        }
        
        const result = await store.updateBalance(idAccount, balance);
        resolve(result);

    });
}


module.exports = {
    getAccount,
    updateAccount,
    getAccountByNumAccount
};