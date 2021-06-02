const { Schema } = require('mongoose');

const generosSchema = new Schema({
  _id: Number,
  nombre_genero: String,
});

const reproduccionSchema = new Schema({
  _id: Number,
  id_cancion: Number,
  nombre_cancion: String,
  id_artista: Number,
  nombre_artista: String,
  generos: [generosSchema],
  fecha: Date,
});

const userSchema = new Schema({
  username: String,
  reproducciones: [reproduccionSchema],
});

const cancionSchema = new Schema({
  _id: Number,
  nombre_cancion: String,
  id_artista: Number,
  nombre_artista: String,
  generos: [generosSchema],
});

module.exports = {
  generosSchema, reproduccionSchema, userSchema, cancionSchema,
};
