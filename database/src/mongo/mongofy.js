const { updateCanciones } = require('./updateCanciones');
const { updateStreams } = require('./updateUsuarios');
const { fillRecommendation } = require('./recomendaciones');



const updateDatabases = async (db, pool, fechaInicial, fechaFinal) => {
    await updateStreams(db, pool, fechaInicial, fechaFinal).then(() => {
        console.log("Se han actualizado la base de datos de Mongo de canciones.");
    });
     await updateCanciones(db, pool).then(() => {
        console.log("Se ha actualizado la base de datos de Mongo de reproducciones.");
    });
     await fillRecommendation()
};

module.exports = { updateDatabases };

