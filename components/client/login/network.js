const express = require('express');  //librería express
const controller = require('./controller');
const router = express.Router();  //permite separar cabeceras, métodos, por url, etc
const response = require("../../../network/response");
const controllerClientPrincipal = require('../controller');
const controllerAccount = require('../../account/controller');
const controllerClientAccessLog = require('../../clientAccessLog/controller');

let contadorIntentosIngresar = 0;
let connIP;


const resultadosCodigos = require('../../../parametros').resultadosCodigos
const codigoMalicioso = require('../../../parametros');


router.get("/", function(req, res){

    res.render('login.ejs')
})

router.post('/', function(req, res){

    var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
    
    connIP = ip.replace("::ffff:", "")  //reemplaza la sección de IPV6 y solo deja IPV4

    console.log(req.body)
    console.log(connIP)


    controller.authClient(req.body.user, req.body.password, connIP)
        .then((resultadoCompleto)=>{
            // resultadoCompleto ejemplo: {id: 2, cliente: cliente}
            console.log('debug authCLiente', resultadoCompleto.id);
            
            const resultado = resultadoCompleto.id;
            const cliente = resultadoCompleto.cliente
            

            if (resultado == resultadosCodigos.ID_USUARIO_INCORRECTO.valor ){ //usuario no registrado
                
                //console.log("El usuario ingresado no está registrado")
                response.success(req, res, resultadosCodigos.ID_USUARIO_INCORRECTO.mensaje, 200)
                
            } else if (resultado == resultadosCodigos.ID_CONTRASENIA_INCORRECTA.valor){ //usuario registrado pero contraseña incorrecta
                
                contadorIntentosIngresar = contadorIntentosIngresar + 1;  //todo: hacer esta variable local
                console.log('contador: ' , contadorIntentosIngresar);
                console.log("La contraseña es inválida")
                response.success(req, res, resultadosCodigos.ID_CONTRASENIA_INCORRECTA.mensaje, 200)
                
            
            } else if (resultado == resultadosCodigos.ID_IP_DESCONOCIDA.valor){ //credenciales correctas, ip desconocida


                if (controller.existeConeccionActiva(cliente._id, connIP)) {
	
                    //es un intento de hackeo

                    controller.notificarAccesoACliente(cliente._id);
                    console.log('cliente user:', cliente.user);
                    //res.redirect('/client/cambioCredenciales/?user='+ cliente.user);
                    // res.send('<form id="redirectCambioCredenciales" method="post" action="/client/cambioCredenciales">' +
                    // '<input type="hidden" name="user" value="'+ cliente.user+ '">' +
                    // '<input type="password" name="password" required>' +                   
                    // '</form>' +
                    // '<script>document.getElementById("redirectVerification").submit()</script>');

                    res.render("loginDenegado.ejs");
                   
                   
                    
                } else {
                
                    
                    
                    //es el primer logeo
                    
                    controller.sendMail(cliente.email, "Verification email", "Your code is: "+cliente.verificationCode)
                        .then((enviado)=>{
                            
                            if(enviado){
                                res.send('<form id="redirectVerification" method="post" action="/client/verification">' +
                                '<input type="hidden" name="user" value="'+ cliente.user+ '">' +
                                '<input type="hidden" name="email" value="'+ cliente.email + '">' + 
                                '<input type="hidden" name="userId" value="'+ cliente._id + '">' +
                                '<input type="hidden" name="intentos" value="'+ 0 + '">' +
                                '<input type="hidden" name="connIp" value="'+ connIP + '">' +                   
                                '</form>' +
                                '<script>document.getElementById("redirectVerification").submit()</script>');
                            }else{
                                response.success(req, res, "Ocurrio un problema al enviar el correo", 200)
                            }
                            
                        })
                        .catch(e=>{
                            response.error(req, res, "Error al enviar el correo", 500, e)
                        })


                        //esto solo para testear
                    
                        // res.send('<form id="redirectVerification" method="post" action="/client/verification">' +
                        // '<input type="hidden" name="user" value="'+ cliente.user+ '">' +
                        // '<input type="hidden" name="email" value="'+ cliente.email + '">' + 
                        // '<input type="hidden" name="userId" value="'+ cliente._id + '">' +
                        // '<input type="hidden" name="intentos" value="'+ 0 + '">' +
                        // '<input type="hidden" name="connIp" value="'+ connIP + '">' +                   
                        // '</form>' +
                        // '<script>document.getElementById("redirectVerification").submit()</script>');
                    


                   

                   
                    
                }
                
                contadorIntentosIngresar = 0;
                

                    

                
            } else if (resultado == resultadosCodigos.ID_DISPOSITIVO_CONOCIDO.valor){ // credenciales correctas, ip conocida
                

                controller.obtenerURLDeRedireccion(cliente._id, connIP)

                    .then((url)=>{
                        res.redirect(url)
                    })
                    .catch(e=>{
                        response.error(req, res, "Error interno", 500, e)
                    })


            }


        })
        .catch(e=>{
            response.error(req, res, "Error interno", 500, e)
        })



    
    


});

module.exports = router;