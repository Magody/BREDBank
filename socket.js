//inicializa el servidor de socket io

const socketIO = require('socket.io')

const socket = {}  //los objetos se guardan como referencia en javascript



var listaSockets = {}


function connect(server){

    

    socket.io = socketIO(server)  //inicia la key io en socket

    socket.io.on('connection', function(socket){

        var client_ip_address = socket.request.connection.remoteAddress;
        const ip = client_ip_address.replace("::ffff:", "")
        listaSockets[ip] = {socket: socket, time: new Date()}
    
    
        console.log('Nueva conección desde ' + ip);
        console.log(Object.keys(listaSockets))
    
    
        socket.emit("mensaje", "Bienvenido")

        socket.on('disconnect', function() {
            console.log(ip + ' desconectado');
      
            delete listaSockets[ip]
         });
        
    
    
    })
    

}

module.exports = {
    connect,
    socket,
    listaSockets
}