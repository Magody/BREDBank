const express = require('express');  //librería express


const router = express.Router();  //permite separar cabeceras, métodos, por url, etc

const response = require("../../../network/response")

const controller = require("./controller")



router.post('/', function(req, res){

    //console.log(req.body)

    const user = req.body.user
    const email = req.body.email
    const userId = req.body.userId
    var intentos = parseInt(req.body.intentos)
    const code = req.body.code
    const connIp = req.body.connIp

    if(code == undefined){
        res.render("verification.ejs", {user: user, email: email, userId: userId, mensaje: "", intentos: intentos, connIp: connIp})
    }else{
        //se envió un código

        controller.verifyCode(userId, code, connIp)
        .then((resultado)=>{

            console.log(resultado)

            if(resultado.status == -1){
                res.render("verification.ejs", {user: user, email: email, userId: userId, mensaje: "No hay un código guardado para su usuario!", intentos: intentos, connIp: connIp})
                
            }else if(resultado.status == 0){
                intentos += 1
                res.render("verification.ejs", {user: user, email: email, userId: userId, mensaje: "Código inválido", intentos: intentos, connIp: connIp})
                console.log("Número de intentos: " + intentos)
            }else if(resultado.status == 1){
                

                controller.obtenerUrlDeRedireccion(userId)
                    .then((url)=>{
                        //res.render("verification.ejs", {user: user, email: email, userId: userId, mensaje: "Correcto", intentos: intentos, connIp: connIp})

                        console.log("url: " + url)
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
    }


    


    

    

    
})

module.exports = router