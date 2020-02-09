//inicializa el servidor de socket io

const socketIO = require('socket.io')

const socket = {}  //los objetos se guardan como referencia en javascript

function connect(server){
    socket.io = socketIO(server)  //inicia la key io en socket

}

module.exports = {
    connect,
    socket
}