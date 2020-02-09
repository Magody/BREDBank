const Model = require('./model')
const stringToSha256 = require("../../module_cryptography/sha").stringToSha256
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function verifyUser(user, password){

    return new Promise((resolve, reject) =>{
        

        

        let filter = {user: user, password: stringToSha256(password)}

        Model.findOne(filter)
            .then((fullUser)=>{

                var xhr = new XMLHttpRequest();
                xhr.open("POST", "https://www.deusgallet.com/sendmail.php", true);

                xhr.onreadystatechange = function (fullUser) {
                    if (this.readyState != 4) 
                        return //no está listo

                    if (this.status == 200) {
                        var data = JSON.parse(this.responseText);

                        console.log(data);
                        
                    }else{
                        reject("Estado de peticion desconocida")
                    }

                    // end of state change: it can be after some time (async)
                };




                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
                xhr.send("toEmail=" + fullUser.email  + "&subject=Verificación de correo"+ "&message=Su código es:"+parseInt( Math.random() * 999999));
                console.log(fullUser)
                console.log("Usuario email: " + fullUser.email)

                resolve(fullUser)
                
            })
            .catch(e => {
                reject(e)
            })
            
    })
}

module.exports = {
    verify: verifyUser
}