const express = require('express');  //librería express
const controller = require('./controller');
const router = express.Router();  //permite separar cabeceras, métodos, por url, etc
const res = require("../../../network/response");
const controllerClientPrincipal = require('../controller');
const controllerAccount = require('../../account/controller');
const controllerClientAccessLog = require('../../clientAccessLog/controller');

let contadorIntentosIngresar = 0;

router.get("/", function(request, response){

    response.render('login.ejs')
})

router.post('/', function(request, response){

    const connIP = 2; //"192.168.1.9" aqui obtener la IP

    const resultado = 2; //authClient("cliente1", "ASLGALDKJFLAKSFJALKSFDJALKAS", "192.168.1.9");
    //console.log('resultado:', resultado);
    if (resultado == -1 ){ //usuario no registrado
    
        //window.alert("Usuario o contraseña inválidos");
        
    } else if (resultado == 0){ //usuario registrado pero contraseña incorrecta
        
        contadorIntentosIngresar = contadorIntentosIngresar + 1;
        console.log('contador: ' , contadorIntentosIngresar);
        //window.alert("Usuario o contraseña inválidos");
    
    } else if (resultado == 1){ //credenciales correctas, ip desconocida

        contadorIntentosIngresar = 0;
        //redireccionar al lugar donde debe ingresar el código que le llegó a su correo

    } else if (resultado == 2){ // credenciales correctas, ip conocida

        contadorIntentosIngresar = 0;
        controller.verifyUserSinCorreo(request.body.user, request.body.password, request.body.region)
        .then((cliente)=>{
            console.log('cliente:', cliente);
            controllerAccount.getAccount(cliente._id)
            .then((account)=> {
                console.log('account:' , account);
                controllerClientAccessLog.addClientAccessLog(cliente._id, connIP)
                .then((clientAccessLog)=>{
                    console.log('log:', clientAccessLog);
                    response.redirect('/client/principal/?numberAccount=' + account._id + 
                                                    '&clientIdentificacion=' + cliente.clientIdentificacion + 
                                                    '&name=' + cliente.name +
                                                    '&lastname=' + cliente.lastname + 
                                                    '&phone=' + cliente.phone +
                                                    '&email=' + cliente.email + 
                                                    '&balance=' + account.balance); //se envía a la pantalla principal con todos sus datos
                })
                .catch((e)=>{
                    res.error(request, response, "Error interno client access log", 500, e)
                })

            })
            .catch((er)=>{
                res.error(request, response, "Error interno account", 500, er)
            })

        })
        .catch(e => {
            res.error(request, response, "Error interno", 500, e)
        })
    }


});

module.exports = router;