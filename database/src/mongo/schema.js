const { Schema } = require('mongoose');

const userRecommendation = new Schema({
  _id: String,
  recomendaciones:[String]
});

const artistRecommendation = new Schema({
  _id: String,
  artista: String,
  recomendaciones:[{_id: Number, cancion: String}]
})

const generosSchema = new Schema({
  _id: Number,
  nombre_genero: String,
});

const genreRecommendationSchema = new Schema({
  _id: String,
  genre: [generosSchema]
});

const reproduccionSchema = new Schema({
  _id: Number,
  id_cancion: Number,
  nombre_cancion: String,
  id_artista: Number,
  nombre_artista: String,
  generos: [generosSchema],
  reproduccion: Number,
  fecha: Date,
});

const userSchema = new Schema({
  _id: String,
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
  generosSchema, reproduccionSchema, userSchema, cancionSchema, genreRecommendationSchema, userRecommendation, artistRecommendation
};
