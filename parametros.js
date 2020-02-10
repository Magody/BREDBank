const mongoDBTablesNames = {
    Province: "Province",
    Client: "Client",
    Movement: "Movement",
    ClientAccessLog:  'ClientAccessLog',
    Account: 'Account',
    Transaction: 'Transaction',

}

const movements = {
    deposit:"deposit",
    withdrawal:"withdrawal",
    transfer:"transfer",
    paymentBasicServices:"payment of basic services",
}


module.exports = {
    mongoDBTablesNames,
    movements
}