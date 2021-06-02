const mongoose = require('mongoose');
const pool = require('../../credentials');
const { updateCanciones } = require('./updateCanciones');
const { updateStreams } = require('./usuarios');

mongoose.connect('mongodb://localhost/zoa', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


db.once('open', function() {
    updateStreams(db, pool).then( () => {
        console.log("Listo");
    });
});


