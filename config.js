const fs = require('fs');

const config = {

    dbUrl: process.env.DB_URL || 'mongodb://localhost:27017/bred_bank',  //usa variable de entorno o la mia
    host: process.env.HOST || 'https://localhost',
    IP_HOST: process.env.IP_HOST || '172.29.64.151',
    hostTest: process.env.HOST_TEST || 'http://localhost',
    port: process.env.PORT || 3000,
    publicRoute: process.env.PUBLIC_ROUTE || '/bank',
    files: process.env.PUBLIC_ROUTE_FILES || '/files',
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt'),
    ca: fs.readFileSync('./keys/ca.crt'),
    emailServiceHost: process.env.EMAIL_HOST || "https://www.deusgallet.com/sendmail.php"
    
}

module.exports = config