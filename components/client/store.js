const Model = require('./model');

function get(id) {

    
    return new Promise((resolve, reject) => {
        let filter = {
            _id: id,
        };

        Model.findOne(filter)
        
        .then((fullClient) =>{
            //console.log('full cliente:', fullClient);

            resolve(fullClient);

        })
    })
    .catch(e => {
        reject(e);
    })
}


function getByUser(_user) {

    
    return new Promise((resolve, reject) => {
        let filter = {
            user: _user,
        };

        Model.findOne(filter)
        
        .then((fullClient) =>{
            //console.log('full cliente:', fullClient);

            resolve(fullClient);

        })
    })
    .catch(e => {
        reject(e);
    })
}

function updateClient(id, _password) {
    
    return new Promise((resolve, reject) => {
        let filter = {
            _id: id
        };

        Model.findOne(filter)
        .then((foundClient) =>{
            foundClient.password = _password;
            const newPassword = foundClient.save();
            resolve(newPassword);
        })
    })
    .catch(e => {
        reject(e);
    })

}

module.exports = {
    get,
    getByUser,
    updateClient
}