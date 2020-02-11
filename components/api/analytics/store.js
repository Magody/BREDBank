const ModelClient = require('../../client/model')
const ModelTransaccion = require('../../transaction/model')
const ModelMovement = require('../../movement/model')
const ModelAccount = require('../../account/model')
const ModelProvince = require('../../province/model')


function getTransactionsFromToDate(APIKey, fromDate,toDate, provinces){

    return new Promise((resolve, reject) =>{

        let filter = {apiKey: APIKey}

        ModelClient.findOne(filter)
            .then((fullClient) => {

                console.log(fullClient)

                if(fullClient != null){
                    // se descuenta, uso del apikey
                    if(fullClient.apiKeyUses == undefined){
                        fullClient.apiKeyUses = 1
                    }else{
                        fullClient.apiKeyUses = fullClient.apiKeyUses + 1
                    }

                    if(fullClient.apiKeyUses < 1000){


                        fullClient.save()


                        const provincesLength = provinces.length

                        var filterProvinces = []

                        if(provincesLength == 0){
                            filterProvinces = [{}]
                        }


                        for(var i=0; i< provincesLength; i++){
                            filterProvinces.push({"name": provinces[i]})
                        }
                       
                       
                        ModelProvince.find({})
                            .then((listProvinces)=>{

                                var diccionaryProvinces = {}
                                var filterTransactions = []

                                for(var i=0; i<listProvinces.length; i++){
                                    diccionaryProvinces[listProvinces[i]._id] = listProvinces[i].name
                                    filterTransactions.push({province: listProvinces[i]._id})
                                }
                                //console.log(diccionaryProvinces)



 //$or: filterProvinces, "transTime": {$gte: fromDate, $lt: toDate} 
                        //, "transTime": {$gte: new Date(fromDate), $lt: new Date(toDate)} 
                        //, "transTime": {$gte: new Date(fromDate).toISOString(), $lt: new Date(toDate).toISOString()} 
                        

                                ModelTransaccion.find({$or: filterProvinces,  "transTime": {$gte: new Date(fromDate), $lt: new Date(toDate)} })
                                    .then((listTransactions)=>{

                                        const listTransactionsLength = listTransactions.length

                                        var data = []
                                        for(var i=0; i<listTransactionsLength; i++){
                                            
                                            data.push({date: listTransactions[i].transTime, amount: listTransactions[i].amount, province: diccionaryProvinces[listTransactions[i].province]})
                                            //console.log(listTransactions[i].transTime)

                                        }

                                        resolve({status: 1, data,  msg: "Collected: " + listTransactionsLength + " transactions."})
                                    })
                                    .catch(e=>{
                                        console.log(e)
                                        resolve({status: 0, data:[],  msg: "Internal error"})
                                    })


                            })
                            .catch(e=>{
                                console.log(e)
                                resolve({status: 0, data:[],  msg: "Internal error"})
                            })


                    }else{
                        
                        resolve({status: 0, data:[],  msg: "Usage limit exceded of API"})
                    }

                    
                }else{
                    resolve({status: 0, data:[],  msg: "No ApiKey"})  //no existe
                }
                

                
                
            })
            .catch(e=>{
                console.log(e)
                resolve({status: 0, data:[],  msg: "No user"})  //no existe
            })
            
    })
}

module.exports = {
    getTransactionsFromToDate
}