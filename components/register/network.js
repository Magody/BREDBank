const express = require('express');  //librería express


const controller = require('./controller')

const router = express.Router();  //permite separar cabeceras, métodos, por url, etc

const res = require("../../network/response")

const config = require("../../config")

router.get("/", function(request, response){

    response.render('register.ejs')
})

router.post('/', function(request, response){


    controller.addUser(request.body.user, request.body.password, request.body.email, request.body.region)
        .then((data)=>{
            console.log(data)
            //res.success(request, response, data, 201)
            response.redirect("/login")
        })
        .catch(e => {
            res.error(request, response, "Error interno", 500, e)
        })

    
})

module.exports = router