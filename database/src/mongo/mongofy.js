const mongoose = require('mongoose');
const pool = require('../../credentials');
const { updateCanciones } = require('./updateCanciones');

mongoose.connect('mongodb://localhost/zoa', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


db.once('open', function() {
    updateCanciones(db, pool).then( () => {
        console.log("Listo");
    });
});


