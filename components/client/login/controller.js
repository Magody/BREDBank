const store = require('./store')

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const stringToSha256 = require('../../../module_cryptography/sha').stringToSha256
const config = require('../../../config')

function sendMail(email, subject, message){

    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", config.emailServiceHost, true);

        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    
                    resolve(true)
                    
                }else{
                    reject(false)
                }
            }

            
        };

        
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        xhr.send("toEmail=" + email  + "&subject="+ subject + "&message="+message);
    });


    

    
}


function authClient(user, password, connIP){


    return new Promise((resolve, reject)=>{

        if(!user || !password || !connIP){
            reject("Datos inválidos para el login")
            
        }

        const client = {
            user: user,
            password: stringToSha256(password)
        }
    
        var fullClientAccessLog = {
            client: null,  //require la id solo se tiene el nombre
            connIP: connIP,
            connTime: new Date()
        };

        resolve(store.auth(client, fullClientAccessLog))
    })

}

function existeConeccionActiva(clientId, clientIp){

    return store.comprobarConexionCliente(clientId, clientIp)
}

function notificarAccesoACliente(cliente){
    store.notificarCliente(cliente)

}

function obtenerUrlDeRedireccion(userId, ip){
    return new Promise((resolve, reject)=>{


        

        resolve(store.obtenerUrlRedireccion(userId, ip))
    })
    
    
}

module.exports = {
    authClient,
    existeConeccionActiva,
    sendMail,
    notificarAccesoACliente,
    obtenerUrlDeRedireccion
}