const store = require('./store')

function verifyCode(userId, code, ip){

    return new Promise((resolve, reject)=>{

        const client = {
            _id: userId,
            verificationCode: code
        }

        resolve(store.verify(client, ip))
    })
    

   
}

function obtenerUrlDeRedireccion(userId){
    return new Promise((resolve, reject)=>{
        resolve(store.generarUrlQuery(userId))
    })
}

module.exports = {
    verifyCode,
    obtenerUrlDeRedireccion,
}