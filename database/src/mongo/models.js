const { model } = require('mongoose');
const {
  generosSchema,
  reproduccionSchema,
  userSchema,
  cancionSchema,
  genreRecommendationSchema
} = require('./schema');

const Genero = model('Genero', generosSchema);
const Reproduccion = model('Reproduccion', reproduccionSchema);
const Usuarios = model('Usuarios', userSchema);
const Cancion = model('Canciones', cancionSchema);
const GenreRecommendation = model('genre_recommendation',genreRecommendationSchema )

module.exports = {
  Genero,
  Reproduccion,
  Usuarios,
  Cancion,
  GenreRecommendation
};
