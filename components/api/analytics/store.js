const ModelClient = require('../../client/model')
const ModelTransaccion = require('../../transaction/model')
const ModelMovement = require('../../movement/model')
const ModelAccount = require('../../account/model')


function generateTransaction(clientSource, password, clientDest
    , amount, description, transactionStatus, movement, 
    code, dateTimeActual){

    return new Promise((resolve, reject) =>{

        let filter = {user: clientSource}

        ModelClient.findOne(filter)
            .then((fullClientSource)=>{

                console.log(fullClientSource)

                if(!fullClientSource){
                    if(fullClientSource.password == password){

                        const movementId =  ModelMovement.findOne({movement: movement})
                        const accountSourceId =  ModelAccount.findOne({client: fullClientSource._id, accountType : 0})

                        console.log(movementId)

                        console.log(accountSourceId)

                        //const accountDestId =  ModelAccount.findOne({client: movement})

                        




                        /*new ModelTransaccion({
                            movement: {
                                type: Schema.ObjectId,
                                ref: mongoDBTablesNames.Movement,
                            },
                            originAccount: {
                                type: Schema.ObjectId,
                                ref: mongoDBTablesNames.Account,
                            },
                            destinationAccount: {
                                type: Schema.ObjectId,
                                ref: mongoDBTablesNames.Account,
                            },
                            amount: amount,
                            status: status,
                            code: code,
                            description: description,
                            transTime: dateTimeActual,
                        }).save()*/

                        resolve({fullClient: null, errorCode: "002"}) //contraseña inválida

                    }else{
                        resolve({fullClient: null, errorCode: "002"}) //contraseña inválida
                    }
                }else{
                    resolve({fullClient: null, errorCode: "001"})  //no existe
                }
                

                
                
            })
            .catch(e => {
                reject(e)
            })
            
    })
}

module.exports = {
    generateTransaction: generateTransaction
}