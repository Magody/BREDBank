const ModelClient = require('../model')
const ModelClientLogs = require('../../clientAccessLog/model')
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
                        

                        ModelClientLogs.findOne({client: fullClient._id, lastIp: fullClientAccessLog.connIP})
                        
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
                reject(e)
            })





    })

}


function comprobarConexionCliente(clientId, clientIp){

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
    listaSockets[connIP].socket.emit("alertaIntruso", "Alguien ha intentado acceder a su cuenta, por favor le solicitamos el cambio de credenciales")

}


module.exports = {
    auth: authClient,
    comprobarConexionCliente,
    clientesConectados,
    notificarCliente: notificarAccesoACliente
}