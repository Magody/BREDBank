const Model = require('./model');

function get(clientIdentificacion) {

    
    return new Promise((resolve, reject) => {
        let filter = {
            client: clientIdentificacion,
        };

        Model.findOne(filter)
        
        .then((fullAccount) =>{
            console.log('full account:', fullAccount);

            resolve(fullAccount);

        })
    })
    .catch(e => {
        reject(e);
    })
}


module.exports = {
    get,
}