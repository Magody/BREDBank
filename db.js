const db = require('mongoose')

db.Promise = global.Promise  // scoope Global (javascript -nodejs), cuando quieras utilizar cualquier promesa usa esta eso nos dice
    
async function connect(url){
    await db.connect(url, {
        useNewUrlParser: true, //evita problemas de compatibilidad
    })

    //async awit no aseguramos que se conecte

    console.log("DB conectada con éxito")
}

module.exports = connect  //exportamos como la función principal

