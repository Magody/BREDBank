const express = require('express');  //librería express
const controller = require('./controller')
const router = express.Router();  //permite separar cabeceras, métodos, por url, etc
const res = require("../../module_network/response")


router.get("/", function(request, response){

    response.render('login.ejs')
})

router.post('/', function(request, response){
    
    controller.verifyUser(request.body.user, request.body.password, request.body.region)
        .then((data)=>{
            console.log("data: " + data)
            var user = encodeURIComponent(request.body.user);
            response.redirect('/?user=' + user)
        })
        .catch(e => {
            res.error(request, response, "Error interno", 500, e)
        })
})

module.exports = router