const { model } = require('mongoose');
const {
  generosSchema,
  reproduccionSchema,
  userSchema,
  cancionSchema,
  genreRecommendationSchema,
    userRecommendation,
    artistRecommendation,
} = require('./schema');

const Genero = model('Genero', generosSchema);
const Reproduccion = model('Reproduccion', reproduccionSchema);
const Usuarios = model('Usuarios', userSchema);
const Cancion = model('Canciones', cancionSchema);
const GenreRecommendation = model('genre_recommendation',genreRecommendationSchema );
const UserRecommendation = model('user_recommendation', userRecommendation);
const ArtistRecommendation = model('artist_recommendation', artistRecommendation);

module.exports = {
  Genero,
  Reproduccion,
  Usuarios,
  Cancion,
  GenreRecommendation,
  UserRecommendation,
ArtistRecommendation,
};
