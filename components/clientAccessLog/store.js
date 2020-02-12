const Model = require('./model');

function get(idClient, _connIP) {

    return new Promise((resolve, reject) => {
        let filter = {
            client: idClient,
            connIP: _connIP
        };

        Model.find(filter)
        .then((fullLogs) =>{
            //console.log('full cliente:', fullClient);
            resolve(fullLogs);
        })
    })
    .catch(e => {
        reject(e);
    })
}

function add(log){

    return new Promise((resolve, reject) => {

        const newLog = new Model(log);
        newLog.save();
        resolve(newLog);
    })
    .catch(e => {
        reject(e);
    })

}


module.exports = {
    get,
    add
}