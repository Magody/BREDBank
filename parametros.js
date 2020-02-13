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


function verificarCodigoMalicioso(cadena){

    var expreg = /^[A-z0-9@\.áéíóú\s]+$/;
  
    if(expreg.test(cadena) || cadena.contains() )
      return false;
    else 
      return true; 

}



module.exports = {
    mongoDBTablesNames,
    movements,
    resultadosCodigos,
    verificarCodigoMalicioso
}