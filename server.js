const express = require('express');  //librería express

const app = express();

const server = require('https') // para los web sockets

const cors = require('cors') //permitir accesos

const bodyParser = require("body-parser")

const socket = require('./socket')

const db = require('./db')

const router = require('./network/routes')//require('./components/message/network')  //recolecta con export

const config = require("./config")

db(config.dbUrl)

app.set('view-engine', 'ejs')  // permite darle valores personalizados
app.use(cors())


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

//app.listen(3001);

var options = {
    key: config.key,
    cert: config.cert
};

server.Server(app);
server.createServer(options, app).listen(config.port);
