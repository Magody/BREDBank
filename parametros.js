const mongoDBTablesNames = {
    Province: "Province",
    Client: "Client",
    Movement: "Movement",
    ClientAccessLog:  'ClientAccessLog',
    Account: 'Account',
    Transaction: 'Transaction',

}

const movements = {
    deposit:"Deposit",
    withdrawal:"Withdrawal",
    transfer:"Transfer",
    paymentBasicServices:"Payment of basic services",
}


const resultadosCodigos = {
    ID_USUARIO_INCORRECTO: {valor: -1, mensaje: "Usuario o contraseña inválida"},
    ID_CONTRASENIA_INCORRECTA: {valor: 0, mensaje: "Usuario o contraseña inválida"},
    ID_IP_DESCONOCIDA: {valor: 1, mensaje: "IP desconocida"},
    ID_DISPOSITIVO_CONOCIDO: {valor: 2, mensaje: "Dispositivo conocido"},
    
}

module.exports = {
    mongoDBTablesNames,
    movements,
    resultadosCodigos
}