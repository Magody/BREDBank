const store = require('./store');

function getAccount(id){

    if(!id){
        return Promise.reject("Invalid id");
    }

    return store.get(id);
}

function updateAccount(idAccount, balance) {
    return new Promise( async (resolve, reject) => {
        if (!idAccount || !balance) {
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
};