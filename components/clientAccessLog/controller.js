

function addClientAccessLog(_idClient, _connIP) {

    return new Promise(
        (resolve, reject)=>{
            if(!_idClient || !_connIP) {
                console.log('[clientAccessLog controller]: No hay idClient o IP' );
                reject('Los datos son incorrectos');
                return false;
            }

            fullClientAccessLog = {
                idClient: _idClient,
                connIP: _connIP,
                connTime: new Date()
            };

            resolve(fullClientAccessLog);
        
        
    });
}

function getClientAccessLog(idClient, connIP){
    return new Promise((resolve, reject) => {
        resolve(store.list(idClient, connIP))
    });
}

module.exports = {
    addClientAccessLog,
    getClientAccessLog
};