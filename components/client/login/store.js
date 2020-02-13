const ModelClient = require('../model')
const ModelAccount = require('../../account/model')
const ModelClientLogs = require('../../clientAccessLog/model')

const ModelClientAccessLog = require('../../clientAccessLog/model')

const listaSockets = require('../../../socket').listaSockets
                            
var clientesConectados = {}

function authClient(client, fullClientAccessLog){

    return new Promise((resolve, reject)=>{
        
        let filter = {user: client.user}

        //console.log(filter)
        ModelClient.findOne(filter)
            .then((fullClient)=>{

                //console.log(fullClient)
                
                if(fullClient != null){  //existe

                    if(fullClient.password == client.password){
                        

                        ModelClientLogs.findOne({client: fullClient._id, connIP: fullClientAccessLog.connIP})
                        
                            .then((fullLog)=>{

                                console.log(fullLog)
                                if(fullLog != null){  //dispositivo conocido: hacerle ingresar directamente
                                    resolve({id: 2, cliente: fullClient});
                                }else{
                                    //registra el codigo
                                    const code = 100000 + parseInt(Math.random() * 899999)
                                    console.log("Codigo generado: " + code)
                                    fullClient.verificationCode = code
                                    fullClient.save() //agrega el código

                                    resolve({id: 1, cliente: fullClient}); //dispositivo desconocido: Puede ser un Hacker o un ingreso por primera vez
                                }

                            })
                            .catch(e=>{
                                console.log(e)
                                reject(e)
                            })

                    
                    }else{
                        resolve({id: 0, cliente: fullClient}); //contraseña incorrecta
                    }
            
                }else{ // no existe el usuario
            
                    resolve({id: -1, cliente: fullClient});
            
                }
                
            })
            .catch(e => {
                console.log(e)
                reject(e)
            })





    })

}


function comprobarConexionCliente(clientId, clientIp){
console.log("Clientes")
    console.log(clientesConectados)
    if (clientesConectados[clientId] == undefined) { 
        //no hay sesión previa activa, es su primer ingreso

        
		return false;		
	} else { 
		//Ya hay una sesión activa
		return true		
	}

}

function notificarAccesoACliente(cliente){
    
    const connIP = clientesConectados[cliente._id]

    console.log(connIP)
    console.log("Sockets: ", listaSockets)
    listaSockets[connIP].socket.emit("alertaIntruso", "Alguien ha intentado acceder a su cuenta, por favor le solicitamos el cambio de credenciales");
    

}

function obtenerURLDeRedireccion(userId, ip){

    return new Promise((resolve, reject)=>{
        ModelClient.findOne({_id: userId})
        .then((cliente)=>{
            //console.log('cliente:', cliente);

            clientesConectados[cliente._id]  = ip  //creo una sesión activa y le asocio a su IP

            const newLog = new ModelClientAccessLog({
                client: cliente._id,
                connIP: ip,
                connTime: new Date()
            });
            newLog.save();


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
                    console.log(er)
                    reject(er)
                })
        }).catch(e=>{
            console.log(e)
            reject(e)
        })
    })
}


module.exports = {
    auth: authClient,
    comprobarConexionCliente,
    clientesConectados,
    notificarAccesoACliente: notificarAccesoACliente,
    obtenerURLDeRedireccion
}