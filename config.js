const config = {
    dbUrl: process.env.DB_URL || 'mongodb://localhost:27017/bred_bank',  //usa variable de entorno o la mia
    host: process.env.HOST || 'http://localhost',
    port: process.env.PORT || 3002,
    publicRoute: process.env.PUBLIC_ROUTE || '/bank',
    files: process.env.PUBLIC_ROUTE_FILES || '/files',
    
}

module.exports = config