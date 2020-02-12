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

                if(fullClientSource != null){
                    if(fullClientSource.password == password){

                        console.log('movement:', movement );
                        ModelMovement.findOne({movement: movement})
                            .then((fullMovement)=>{

                                ModelAccount.findOne({client: fullClientSource._id, accountType: 0})
                                    .then((fullAccountSource)=>{
                                        console.log('debug clientDes:', );
                                        console.log(clientDest);
                                        let filter = {user: clientDest}

                                        ModelClient.findOne(filter)
                                            .then((fullClientDest)=>{

                                                ModelAccount.findOne({client: fullClientDest._id, accountType: 0})
                                                    .then((fullAccountDest)=>{


                                                        if(fullAccountSource.balance - amount >= 0){ //si tiene para pagar

                                                            
                                                            //console.log(fullMovement)
                                                            //console.log(fullAccountSource)
                                                            //console.log(fullAccountDest)

                                                            const transaction = new ModelTransaccion({
                                                                movement: fullMovement._id,
                                                                originAccount: fullAccountSource._id,
                                                                destinationAccount: fullAccountDest._id,
                                                                amount: amount,
                                                                status: transactionStatus,
                                                                code: code,
                                                                description: description,
                                                                transTime: dateTimeActual,
                                                                province: fullClientSource.province
                                                            })

                                                            console.log(transaction)
                                                            transaction.save()

                                                            var data = fullClientSource
                                                            data.transactionId = transaction._id

                                                            resolve({fullClient: data, code: code})  //no existe la cuenta de origen
                                                        
                                                        }else{
                                                            resolve({fullClient: null, code: "008"})  //no hay suficiente saldo para la compra
                                                        }


                                                    })
                                                    .catch(e=>{
                                                        console.log(e);
                                                        resolve({fullClient: null, code: "007"})  //no existe la cuenta de origen
                                                    })

                                            })
                                            .catch(e=>{
                                                console.log(e);
                                                resolve({fullClient: null, code: "006"})  //no existe el usuario de destino
                                            })


                                    })
                                    .catch(e=>{
                                        console.log(e);
                                        resolve({fullClient: null, code: "005"})  //no existe la cuenta de origen
                                    })

                            })
                            .catch(e=>{
                                console.log(e);
                                resolve({fullClient: null, code: "004"})  //no existe ese tipo de movimiento
                            })

                    }else{
                        resolve({fullClient: null, code: "002"}) //contraseña inválida
                    }
                }else{
                    
                    resolve({fullClient: null, code: "001"})  //no existe
                }
                

                
                
            })
            .catch(e => {
                reject(e)
            })
            
    })
}

function verifyAndRealicePayment(transactionId, code, dateTimeActual){
    return new Promise((resolve, reject)=>{

        ModelTransaccion.findOne({_id: transactionId})
            .then((transaction)=>{
                if(transaction.code == code){
                    //todo: verificar que sea dentro de un plazo
                    const date1 = transaction.transTime
                    const date2 = dateTimeActual
                    
                    if( date1.getDate() == date2.getDate() && //same day
                        date1.getMonth() == date2.getMonth() && //same month
                        date1.getFullYear() == date2.getFullYear()){ 
                        
                            const fullMinutesDate1 = date1.getHours() * 60 + date1.getMinutes()
                            const fullMinutesDate2 = date2.getHours() * 60 + date2.getMinutes()
                            
                            const difference = fullMinutesDate2 - fullMinutesDate1

                            if(difference <= 30 && difference >0){

                                ModelAccount.findOne({_id: transaction.originAccount})
                                    .then((originAccount)=>{

                                        ModelAccount.findOne({_id: transaction.destinationAccount})
                                            .then((destAccount)=>{
                                                
                                                if(originAccount.balance - transaction.amount >= 0){
                                                   
                                                    console.log("Origin balance BEFORE:" + originAccount.balance)
                                                    console.log("Dest balance BEFORE:" + destAccount.balance)
                
                                                    originAccount.balance = originAccount.balance - transaction.amount
                                                    if(originAccount.bredPoints  == undefined){
                                                        originAccount.bredPoints = 10
                                                    }else{
                                                        originAccount.bredPoints = originAccount.bredPoints+10
                                                    }
                                                    
                                                    originAccount.save()

                                                    destAccount.balance = destAccount.balance + transaction.amount
                                                    destAccount.save()
                                                    console.log("Origin balance AFTER:" + originAccount.balance)
                                                    console.log("Dest balance AFTER:" + destAccount.balance)
                    
                                                    resolve({status: 2, msg: "ok"})
                                                }else{
                                                    resolve({status: 3, msg: "Not enought balance"})
                                                }
                                                
                                                
                
                                                
                
                                                
                                            })
                                            .catch(e=>{
                                                console.log(e)
                                                resolve({status: 3, msg: "Error with dest account"})
                                            })

                                    })
                                    .catch(e=>{
                                        console.log(e)
                                        resolve({status: 3, msg: "Error with source account"})
                                    })

                            
                                
                            }else{
                                resolve({status: 3, msg: "expired"})
                            }
                    }else{
                        resolve({status: 3, msg: "expired"})
                    }

                }else{
                    resolve({status: 3, msg: "Invalid code"})
                }

            })
            .catch(e=>{
                console.log(e)
                resolve({status: 3, msg: "transactionId Incorrect"})
            })
    })
}



module.exports = {
    generateTransaction,
    verifyAndRealicePayment
}