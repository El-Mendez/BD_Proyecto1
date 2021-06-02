const { model } = require('mongoose');
const {
  generosSchema,
  reproduccionSchema,
  userSchema,
  cancionSchema,
} = require('./schema');

const Genero = model('Genero', generosSchema);
const Reproduccion = model('Reproduccion', reproduccionSchema);
const Usuarios = model('Usuarios', userSchema);
const Cancion = model('Cancion', cancionSchema);

module.exports = {
  Genero,
  Reproduccion,
  Usuarios,
  Cancion,
};
