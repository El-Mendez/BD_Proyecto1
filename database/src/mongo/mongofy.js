const mongoose = require('mongoose');
const pool = require('../../credentials');
const { updateCanciones } = require('./updateCanciones');
const { updateStreams } = require('./usuarios');

mongoose.connect('mongodb://localhost/zoa', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

let finished = false;


const end = () => {
    if (finished) {
        db.close();
    }
    finished = true;
}

db.once('open', function() {
    updateStreams(db, pool).then( () => {
        console.log("Se han actualizado las reproducciones por usuarios");
        end();
    });
    updateCanciones(db, pool).then( () => {
        console.log("Se han actualizado las canciones");
        end();
    });
});
