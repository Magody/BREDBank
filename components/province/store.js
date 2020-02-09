const Model = require('./model')



function listRegions(){

    return new Promise((resolve, reject) =>{

        

        Model.find()
            .then((fullRegions)=>{
                console.log(fullRegions)
                resolve(fullRegions)
                
            })
            .catch(e => {
                reject(e)
            })
            
    })
}

module.exports = {
    list: listRegions
}