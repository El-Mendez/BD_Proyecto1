const inquirer = require('inquirer');
const mongoose = require('mongoose');
const pool = require('../../credentials');
const { updateDatabases } = require('./mongofy');
const { Client } = require('pg')
const { newStream, newSongs } = require('./simulations/simulations');
const { topGenres, topSongs, topArtists } = require('./recomendaciones');
const { Usuarios, UserRecommendation, Cancion, ArtistRecommendation } = require('./models');
mongoose.connect('mongodb://localhost/zoa', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

const dateValidator = (fecha) => {
    const regex = /^\d{4}[\-\/\s]?((((0[13578])|(1[02]))[\-\/\s]?(([0-2][0-9])|(3[01])))|(((0[469])|(11))[\-\/\s]?(([0-2][0-9])|(30)))|(02[\-\/\s]?[0-2][0-9]))$/;
    return regex.test(fecha);
};
const numberValidator = (numero) => {
    const regex = /^[0-9]+$/;
    return regex.test(numero);
};
const questions = [
    {
        type: 'list',
        name: 'respuesta',
        message: '¿Qué deseas hacer?',
        choices: ['Iniciar simulación', 'Actualizar recomendaciones', 'Ver recomendaciones', 'Salir'],
    },
];
const simulation = [
    {
        type: 'list',
        name: 'respuesta',
        message: '¿Qué deseas hacer?',
        choices: ['Crear canciones', 'Crear streams'],
    },
];
const questionsSimulationStreams = [
    {
        type: 'input',
        name: 'fecha',
        message: 'Ingrese la fecha. YYYY-MM-DD',
        validate: dateValidator,
    },
    {
        type: 'input',
        name: 'cantidad',
        message: 'Ingrese la cantidad de streams',
        validate: numberValidator,
    },
];
const questionsSimulationSongs = [
    {
        type: 'input',
        name: 'cantidad',
        message: 'Ingrese la cantidad de canciones a ingresar',
        validate: numberValidator,
    },
];
const questionsDate = [
    {
        type: 'input',
        name: 'fechaInicial',
        message: 'Ingrese la fecha inicial. YYYY-MM-DD',
        validate: dateValidator,

    },
    {
        type: 'input',
        name: 'fechaFinal',
        message: 'Ingrese la fecha final. YYYY-MM-DD',
        validate: dateValidator,
    },
];
const questionRecomendaciones = [
    {
        type: 'list',
        name: 'respuesta',
        message: '¿Cómo deseas hacer las recomendaciones?',
        choices: ['Género', 'Por artista más escuchado', 'Top 7 canciones más escuchadas'],
    },
];

const main = async () => {
    let exit = false;
    let respuesta;
    let fechas;
    let recomendacionRespuesta;

    while (!exit) {
        respuesta = await inquirer.prompt(questions);
        switch (respuesta.respuesta) {
            case 'Iniciar simulación':
                simulacionRespuesta = await inquirer.prompt(simulation);
                switch (simulacionRespuesta.respuesta) {
                    case 'Crear canciones':
                        crearCancionRespuesta = await inquirer.prompt(questionsSimulationSongs);
                        try {
                            await newSongs(pool, crearCancionRespuesta.cantidad);
                            console.log('Se han añadido las canciones');
                        } catch (err) {
                            console.log('No fue posible realizar la simulación. Intentalo más tarde.', err);
                        }
                        break;
                    case 'Crear streams':
                        crearStreamRespuesta = await inquirer.prompt(questionsSimulationStreams);
                        try {
                            await newStream(pool, crearStreamRespuesta.fecha, crearStreamRespuesta.cantidad);
                            console.log('Se han añadido los nuevos streams');
                        } catch (err) {
                            console.log('No fue posible realizar la simulación. Intentalo más tarde.', err);
                        }
                        break;

                }
                break;
            case 'Actualizar recomendaciones':
                fechas = await inquirer.prompt(questionsDate);
                try {
                    await updateDatabases(db, pool, fechas.fechaInicial, fechas.fechaFinal);
                    console.log('Se han actualizado las recomendaciones.');
                } catch (err) {
                    console.log('No fue posible actualizar las recomendaciones. Intentalo más tarde.');
                }
                break;
            case 'Ver recomendaciones':
                recomendacionRespuesta = await inquirer.prompt(questionRecomendaciones);
                switch (recomendacionRespuesta.respuesta) {
                    case 'Género':
                        console.log('Ver recomendaciones a partir de los géneros de cada usuario: ')
                        try {
                            await topGenres();
                            const docs = await UserRecommendation.find();
                            docs.forEach(doc => {
                                console.log(doc._id);
                                doc.recomendaciones.forEach(cancion => {
                                    console.log(`--${cancion}`);
                                } )
                            });
                        } catch (err) {
                            console.log('No fue posible realizar la simulación. Intentalo más tarde.', err);
                        }
                        break;
                    case 'Por artista más escuchado':
                        console.log('El artista más escuchado es: ')
                        try {
                            await topArtists();
                            const docs = await ArtistRecommendation.find();
                            docs.forEach(doc => {
                                console.log(`${doc._id}: ${doc.artista}`);
                                doc.recomendaciones.forEach(cancion => {
                                    console.log(`--${cancion.cancion}`);
                                })
                                console.log();
                            });
                        } catch (err) {
                            console.log('No fue posible realizar la simulación. Intentalo más tarde.', err);
                        }
                        break;
                    case 'Top 7 canciones más escuchadas':
                        console.log('Las 7 canciones más escuchadas: ')
                        try {
                            await topSongs();
                        } catch (err) {
                            console.log('No fue posible realizar la simulación. Intentalo más tarde.', err);
                        }
                        break;
                    case 'Salir':
                        exit = true;
                        await db.close();
                        console.log('Cerrando conexión con la base de datos');
                        break;
                    default:
                        console.log('Vaya! Has descubierto nuestro Easter Egg secreto! Definitivamente no es un bug.');
                }
        break;
        case 'Actualizar recomendaciones':
            fechas = await inquirer.prompt(questionsDate);
            try {
            // await updateDatabases(db, pool, fechas.fechaInicial, fechas.fechaFinal);
            console.log('Se han actualizado las recomendaciones.');
            } catch (err) {
            console.log('No fue posible actualizar las recomendaciones. Intentalo más tarde.');
            }
            break;
        case 'Ver recomendaciones':
            recomendacionRespuesta = await inquirer.prompt(questionRecomendaciones);
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
main();
