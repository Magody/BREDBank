const store = require('./store')


function verifyUser(user, password){

    if(!user || !password){
        //si no necesitamos la promesa completa
        return Promise.reject("Invalid user or password");
    }

    return store.verify(user, password)
}

function verifyUserSinCorreo(user, password){

    if(!user || !password){
        //si no necesitamos la promesa completa
        return Promise.reject("Invalid user or password");
    }

    return store.verifyUserSinCorreo(user, password)
}



module.exports = {
    verifyUser,
    verifyUserSinCorreo
}