
const store = require("./store")
const config = require("../../../config")

function generateTransaction(clientSource, password, clientDest
    , amount, description, transactionStatus, movement, 
    code, dateTimeActual){

        return new Promise((resolve, reject) => {
            resolve(store.generateTransaction(clientSource, password, clientDest
                , amount, description, transactionStatus, movement, 
                code, dateTimeActual))
        });


    }

async function sendMail(email, subject, message){

    var xhr = new XMLHttpRequest();
    xhr.open("POST", config.emailServiceHost, true);

    xhr.onreadystatechange = async function () {
        if (this.readyState != 4) 
            return //no está listo

        if (this.status == 200) {
            var data = JSON.parse(this.responseText);

            console.log("El correo fue enviado correctamente\n" + data);
            return data;
            
        }else{
            return {error: "error mail"};
        }

        // end of state change: it can be after some time (async)
    };

    
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    xhr.send("toEmail=" + email  + "&subject="+ subject + "&message="+message);

    
    return await xhr.onreadystatechange
}

module.exports = {
    generateTransaction,
    sendMail
};