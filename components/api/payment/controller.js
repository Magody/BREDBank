
const store = require("./store")
const config = require("../../../config")
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function generateTransaction(clientSource, password, clientDest
    , amount, description, transactionStatus, movement, 
    code, dateTimeActual){

        return new Promise((resolve, reject) => {
            resolve(store.generateTransaction(clientSource, password, clientDest
                , amount, description, transactionStatus, movement, 
                code, dateTimeActual))
        });


    }

function sendMail(email, subject, message, transactionId){

    console.log(message)
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", config.emailServiceHost, true);

        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    var data = JSON.parse(this.responseText);
                    console.log(data)
    
                    resolve({status: 1, msg: transactionId})
                    
                }else{
                    reject({status: -2, msg: "Cant sent email"})
                }
            }

            
        };

        
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        xhr.send("toEmail=" + email  + "&subject="+ subject + "&message="+message);
    });


    

    
}


function verifyAndRealicePayment(transactionId, code, dateTimeActual){

    return new Promise((resolve, reject)=>{

        resolve(store.verifyAndRealicePayment(transactionId, code, dateTimeActual))

    })

}

module.exports = {
    generateTransaction,
    sendMail,
    verifyAndRealicePayment
};