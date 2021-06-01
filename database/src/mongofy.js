const mongoose = require('mongoose');
const pool = require('../credentials');

mongoose.connect('mongodb://localhost/zoa', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Definir el schema de Mongo
const generoSchema = new mongoose.Schema({
  id_genero: Number,
  reproducciones: Number,
});
const artistaSchema = new mongoose.Schema({
  id_artista: Number,
  reproducciones: Number,
});
const userSchema = new mongoose.Schema({
  username: String,
  generos: [generoSchema],
  artistas: [artistaSchema],
});

// Crear los modelos de Mongoose
const Artista = mongoose.model('artistaSchema', artistaSchema);
const Usuario = mongoose.model('userSchema', userSchema);

const usuarios = [];
let isReady = false;

// Migrar los datos a Mongo
const toMongo = () => {
  if (isReady) {
    usuarios.forEach((usuario) => {
      new Usuario({ ...usuario }).save();
    });
    console.log('Listo!');
  }
  isReady = true;
};

// Traer los datos a postgres
pool.query(
  `select s.id_usuario as username, a.id_artista, count(*) as reproducciones
    from stream s
        inner join canciones c on c.id_cancion = s.id_cancion
        inner join artista a on a.id_artista = c.id_artista
    group by s.id_usuario, a.id_artista
    order by s.id_usuario;`,
).then((respuesta) => {
  let usuarioActual = {};

  respuesta.rows.forEach((data) => {
    if (usuarioActual.username !== data.username) {
      usuarioActual = { username: data.username, artistas: [] };
      usuarios.push(usuarioActual);
    }
    usuarioActual.artistas.push(new Artista({
      id_artista: data.id_artista,
      reproducciones: data.reproducciones,
    }));

  });
  console.log('Postgres listo!');
  toMongo();
});

// Limpiar la base de datos
db.once('open', () => {
  db.dropCollection('userschemas').then(() => {
    console.log('Mongo Listo');
    toMongo();
  });
});
