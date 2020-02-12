const express = require('express');  //librería express
const app = express();
const server = require('https'); // server en https para los web sockets
const serverTest = require('http').Server(app); //server en http, TO-DO: ELIMINAR ESTA VARIABLE
const cors = require('cors'); //permitir accesos
const bodyParser = require("body-parser");
const socket = require('./socket');
const db = require('./db');
const router = require('./network/routes');//require('./components/message/network')  //recolecta con export
const config = require("./config");

db(config.dbUrl)

app.set('view-engine', 'ejs');  // permite darle valores personalizados
app.use(cors());

app.use(bodyParser.json());  //define el tipo de datos a enviar
app.use(bodyParser.urlencoded({extended: true})); //extended para objetos complejos
//app.use(router);






router(app)

//servir estáticos
app.use(config.publicRoute, express.static('public'));

app.get("/", function(request, response){

    //var ip = request.UserHostAddress;//request.header('x-forwarded-for') || request.connection.remoteAddress;
    
    //ip = ip.replace("::ffff:", "")  //reemplaza la sección de IPV6 y solo deja IPV4

    console.log("IP: " + ip)
    console.log(request.query)
    console.log(request.body)
    response.render('index.ejs', {user: request.query.user})
    //response.sendFile("../../public/login.html", {root: __dirname })
    /*
    //localhost:3000/user?name=Juan
    const filteredQuery = request.query.name || null
    controller.getUser(filteredQuery)
        .then((fullUser)=>{
            res.success(request, response, fullUser, 200)
        })
        .catch(e => {
            res.error(request, response, "Error interno", 500, e)
        })*/
})

app.post("/", function(req, res){

    var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
    console.log(req.body)
    res.send({status:1, data:[], msg:"Hola!, " + ip +  " te saludo desde el servidor"})

})

app.get("/client/principal", function(request, response){
    //console.log('principal');
    //console.log('Query:', request.query)
    //console.log('Body:', request.body)
    response.render('principal.ejs', request.query);
})

app.get("/client/payments", function(request, response){

    //console.log('Query:', request.query)
    //console.log('Body:', request.body)
    response.render('payments.ejs', request.query); 
})

app.get("/client/search", function(request, response){

    //console.log('Query:', request.query)
    //console.log('Body:', request.body)
    response.render('search.ejs',request.query);
})

//app.listen(3001);



// STARTING SERVER

var options = {
    key: config.key,
    cert: config.cert
};






/*https://localhost:3000:PUERTO

server.createServer(options, app).listen(config.port, function(){
    console.log("La aplicación está escuchando en " + config.host + ":" + config.port);
});

*/


/*
http://localhost:3001
*/


socket.connect(serverTest)  // servidor de sockets conectado

serverTest.listen(config.port, function(){  //http://localhost:3003/app/socket.html
    console.log("La aplicación está escuchando en " + config.hostTest + ":" + config.port);
})
