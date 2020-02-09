var sha256 = require('js-sha256').sha256

function stringToSha256(string){
    const encripted_string = sha256(string)
    console.log("Encripting from-> " + string + " to-> " + encripted_string)
    return encripted_string
}

module.exports = {
    stringToSha256
}