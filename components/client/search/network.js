const express = require('express');  //librería express
const controller = require('./controller');
const router = express.Router();  //permite separar cabeceras, métodos, por url, etc
const res = require("../../../network/response");
const controllerTransaction = require('../../transaction/controller');

router.get("/", function(request, response){

    response.render('search.ejs')
})

router.post('/', function(request, response){
    console.log('search desde boton search principal:' , request.body);
    controllerTransaction.getTransaction(request.body.numberAccountS)
    .then((transactions)=>{
         transactions.forEach(


             element => console.log('transaction element:', element)
         );

        response.send('<form id="transactions" method="post" action="/client/search">' + 

        '<script type="text/javascript" > $("#search-table td").parent().remove(); var trHTML = "";' + transactions +'.forEach( function(valor, indice, array){trHTML += <tr id ="tr_indice" ><td style=" margin: 3px; padding: 3px; border: 1px solid"> valor["originAccount"] </td><td style=" margin: 3px; padding: 3px; border: 1px solid"> valor["destinationAccount"] </td><td style=" margin: 3px; padding: 3px; border: 1px solid"> valor["amount"] </td></tr>  }); $("#user-table").append(trHTML); </script>');

        //response.redirect('/client/search/?transactions=' + transactions);
        // res.send('<form id="redirectVerification" method="post" action="/client/verification">' +
        //            '<input type="hidden" name="user" value="'+ cliente.user+ '">' +
        //            '<input type="hidden" name="email" value="'+ cliente.email + '">' +
        //            '</form>' +
        //            '<script>document.getElementById("redirectVerification").submit()</script>');
    })
    .catch((e)=>{
        res.error(request, response, "Error interno", 500, e)
    })

});


module.exports = router;