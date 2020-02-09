

function addTransaction(_idMovement, _originAccount, _destinationAccount , _amount) {

    return new Promise(
        (resolve, reject)=>{
            if(!_idMovement || !_originAccount || !_destinationAccount || !_amount) {
                console.log('[transaction controller]: No hay el tipo de movimiento, cuenta de origen, cuenta de desitno o la cantidad de la transacción' );
                reject('Los datos son incorrectos');
                return false;
            }

            fullTransaction = {
                idMovement: _idMovement,
                originAccount: _originAccount,
                destinationAccount: _destinationAccount,
                amount: _amount,
                transTime: new Date()
            };

            resolve(fullTransaction);
        
    });

}

function getTransaction (originAccount) {
    return new Promise((resolve, reject) => {
        resolve(store.list(originAccount))
    });
}

module.exports = {
    addTransaction,
    getTransaction,
};