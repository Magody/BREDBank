
const ModelClient = require('../model')
const ModelAccount = require('../../account/model');
const ModelClientAccessLog = require('../../clientAccessLog/model')

const clientesConectados = require('../login/store').clientesConectados

function verifyCode(client, ip){

    return new Promise((resolve, reject)=>{

        ModelClient.findOne({ _id: client._id})
        .then((fullClient)=>{


            console.log('verificar ip antes:', ip);

            if(fullClient.verificationCode != undefined){
                if(fullClient.verificationCode == client.verificationCode){
                    
                    const newLog = new ModelClientAccessLog({
                        client: fullClient._id,
                        connIP: ip,
                        connTime: new Date()
                    });
                    console.log('log total antes:', newLog);
                    newLog.save(); //se genera un log al verificar el código

                    console.log('log total despues:', newLog );

		            clientesConectados[client._id]  = ip  //creo una sesión activa y le asocio a su IP

                    console.log("Clientes conectados")
                    console.log(clientesConectados)
                    resolve({status: 1, message: "Código correcto"})

                }else{
                    resolve({status: 0, message: "Código incorrecto"})
                }
            }else{
                resolve({status: -1, message: "No se almacenó un código de verificación"})
            }

            
        })
        .catch(e=>{
            console.log('catch: ', e);
            reject(e)
        })

    })

}

function obtenerUrlDeRedireccion(userId){

    return new Promise((resolve, reject)=>{
        ModelClient.findOne({_id: userId})
        .then((cliente)=>{
            //console.log('cliente:', cliente);
        
            ModelAccount.findOne({client: cliente._id})
                .then((account)=> {
                    
                    resolve('/client/principal/?numberAccount=' + account._id + 
                                                    '&clientIdentificacion=' + cliente.clientIdentificacion + 
                                                    '&name=' + cliente.name +
                                                    '&lastname=' + cliente.lastname + 
                                                    '&phone=' + cliente.phone +
                                                    '&email=' + cliente.email + 
                                                    '&balance=' + account.balance); //se envía a la pantalla principal con todos sus datos

                })
                .catch((er)=>{
                    console.log(e)
                    reject(er)
                })
        }).catch(e=>{
            console.log(e)
            reject(e)
        })
    })
    
}

module.exports = {
    verify: verifyCode,
    generarUrlQuery: obtenerUrlDeRedireccion,
}