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

socket.connect(server)  // servidor de sockets conectado
router(app)

//servir estáticos
app.use(config.publicRoute, express.static('public'));

app.get("/", function(request, response){

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

app.get("/client/principal", function(request, response){
    //console.log('principal');
    //console.log('Query:', request.query)
    //console.log('Body:', request.body)
    response.render('principal.ejs', request.query) //modificar el json que se le va a mandar 
})

app.get("/client/payments", function(request, response){

    //console.log('Query:', request.query)
    //console.log('Body:', request.body)
    response.render('payments.ejs', request.query) //modificar el json que se le va a mandar 
})

app.get("/client/search", function(request, response){

    //console.log('Query:', request.query)
    //console.log('Body:', request.body)
    response.render('search.ejs', {user: request.query.clientIdentification}) //modificar el json que se le va a mandar 
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
serverTest.listen(config.port, function(){  //http://localhost:3003/app/socket.html
    console.log("La aplicación está escuchando en " + config.hostTest + ":" + config.port);
})

