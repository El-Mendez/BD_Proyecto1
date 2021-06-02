const inquirer = require('inquirer')
const mongoose = require('mongoose');
const pool = require('../../credentials');

const { updateDatabases } = require('./mongofy');

mongoose.connect('mongodb://localhost/zoa', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;


const dateValidator = (fecha) => {
    const regex = /^\d{4}[\-\/\s]?((((0[13578])|(1[02]))[\-\/\s]?(([0-2][0-9])|(3[01])))|(((0[469])|(11))[\-\/\s]?(([0-2][0-9])|(30)))|(02[\-\/\s]?[0-2][0-9]))$/
    return regex.test(fecha);
}
const questions = [
    {
        type: 'list',
        name: 'respuesta',
        message: '¿Qué deseas hacer?',
        choices: ['Iniciar simulación' ,'Actualizar recomendaciones', 'Ver recomendaciones', 'Salir'],
    }
]
const simulation = [
    {
        type: 'list',
        name: 'respuesta',
        message: '¿Qué deseas hacer?',
        choices: ['Crear canciones' ,'Crear streams'],
    }
]
const questionsSimulationsStreams = [
    {
        type: 'input',
        name: 'respuesta',
        message: 'Ingrese la fecha. YYYY-MM-DD',
        choices: ['Crear canciones' ,'Crear streams'],
    }
]
const questionsDate = [
    {
        type: 'input',
        name: 'fechaInicial',
        message: 'Ingrese la fecha inicial. YYYY-MM-DD',

    },
    {
        type: 'input',
        name: 'fechaFinal',
        message: 'Ingrese la fecha final. YYYY-MM-DD',
        validate: dateValidator,
    },
]
const questionRecomendaciones = [
    {
        type: 'list',
        name: 'respuesta',
        message: '¿Cómo deseas hacer las recomendaciones?',
        choices: ['Género', 'Por artista más escuchado', 'Top 5 canciones más escuchadas'],
    }
]



const main = async () => {
    let exit = false;
    let respuesta;
    let fechas;
    let recomendacionRespuesta;

    while (!exit) {
        respuesta = await inquirer.prompt(questions);
        switch (respuesta.respuesta) {
            case 'Iniciar simulación':
                respuesta = await inquirer.prompt(simulation);
            case 'Actualizar recomendaciones':
                fechas = await inquirer.prompt(questionsDate);
                try {
                    //await updateDatabases(db, pool, fechas.fechaInicial, fechas.fechaFinal);
                    console.log("Se han actualizado las recomendaciones.");
                } catch (err) {
                    console.log("No fue posible actualizar las recomendaciones. Intentalo más tarde.");
                }
                break;
            case 'Ver recomendaciones':
                recomendacionRespuesta = await inquirer.prompt(questionRecomendaciones);
                console.log(recomendacionRespuesta);
                break;
            case 'Salir':
                exit = true;
                await db.close();
                console.log('Cerrando conexión con la base de datos');
                break;
            default:
                console.log('Vaya! Has descubierto nuestro Easter Egg secreto! Definitivamente no es un bug.');
        }
    }
}

console.log('Conectándose a la base de datos...');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', main );
