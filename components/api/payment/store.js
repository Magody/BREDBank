const ModelClient = require('../../client/model')
const ModelTransaccion = require('../../transaction/model')
const ModelMovement = require('../../movement/model')
const ModelAccount = require('../../account/model')
const ObjectId = require('mongodb').ObjectID;


function generateTransaction(clientSource, password, clientDest
    , amount, description, transactionStatus, movement, 
    code, dateTimeActual){

    return new Promise((resolve, reject) =>{

        let filter = {user: clientSource}

        ModelClient.findOne(filter)
            .then((fullClientSource)=>{

                
                const clientSourceId = fullClientSource._id;
                console.log(clientSourceId)

                if(fullClientSource != null){
                    if(fullClientSource.password == password){


                        ModelMovement.findOne({movement: movement})
                            .then((fullMovement)=>{

                                ModelAccount.findOne({client: clientSourceId})
//client:  clientSourceId, accountType : 0
                                    .then((fullAccountSource)=>{

                                        console.log(fullAccountSource)
                                    })
                                    .catch(e=>{
                                        resolve({fullClient: null, errorCode: "003"})  //no existe
                                    })

                            })
                            .catch(e=>{
                                resolve({fullClient: null, errorCode: "003"})  //no existe
                            })


                        

                       //console.log(accountSourceId)

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

                        resolve({fullClient: null, errorCode: "001111"}) //contraseña inválida

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