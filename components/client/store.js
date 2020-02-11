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


module.exports = {
    get,
}