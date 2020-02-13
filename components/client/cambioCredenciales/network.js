const express = require('express');  //librería express
const controller = require('../../client/controller');
const router = express.Router();  //permite separar cabeceras, métodos, por url, etc
const response = require("../../../network/response");
const stringToSha256 = require('../../../module_cryptography/sha').stringToSha256

router.get("/", function(request, response){

    response.render('cambioCredenciales.ejs');
});

router.post('/', function (req, res) {

    console.log('cambio Credenciales:' + req.body.user);
    controller.getClientByUser(req.body.user)
    .then((client)=>{

        controller.updateClient(client._id,stringToSha256(req.body.password))
        .then(()=>{
            res.redirect('/client/login/');
        })
        .catch((e)=>{
            res.error(req, response, "Error interno transaction", 500, e);
        })
    })
    .catch((e)=>{
        res.error(req, response, "Error interno transaction", 500, e);
    })
    
});

module.exports = router;