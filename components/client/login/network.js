const express = require('express');  //librería express
const controller = require('./controller');
const router = express.Router();  //permite separar cabeceras, métodos, por url, etc
const res = require("../../../network/response");
const controllerClientPrincipal = require('../controller');
const controllerAccount = require('../../account/controller');
router.get("/", function(request, response){

    response.render('login.ejs')
})

router.post('/', function(request, response){
    
    controller.verifyUser(request.body.user, request.body.password, request.body.region)
        .then((data)=>{
            //console.log("data: " + data);
            controllerClientPrincipal.getClient(data._id)
            .then( (cliente) => {
                //console.log("cliente: " + cliente);
                controllerAccount.getAccount(cliente._id)
                .then((account)=> {
                    //console.log("account: " + account);
                    //var user = encodeURIComponent(request.body.user);
                    response.redirect('/client/principal/?numberAccount=' + account._id + 
                                                    '&clientIdentificacion=' + cliente.clientIdentificacion + 
                                                    '&name=' + cliente.name +
                                                    '&lastname=' + cliente.lastname + 
                                                    '&phone=' + cliente.phone +
                                                    '&email=' + cliente.email + 
                                                    '&balance=' + account.balance);
                })
                .catch((er)=>{
                    res.error(request, response, "Error interno account", 500, er)
                })

                 
            })
            .catch( (er) =>{
                res.error(request, response, "Error interno cliente", 500, er)
            })

        })
        .catch(e => {
            res.error(request, response, "Error interno", 500, e)
        })
});

module.exports = router;