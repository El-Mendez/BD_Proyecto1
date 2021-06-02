const { Cancion, Genero } = require('./models');

const newCanciones = async (pool) => {
  const respuesta = await pool.query(`
      select c.id_cancion, c.nombre as nombre_cancion, a.id_artista, a.nombre as nombre_artista, g.id_genero, g.nombre as nombre_genero
      from canciones c
        inner join artista a on a.id_artista = c.id_artista
        inner join genero_canciones gc on c.id_cancion = gc.id_canciones
        inner join genero g on gc.id_genero = g.id_genero
      order by c.id_cancion;
  `);
  return respuesta;
};

const parseResults = (cancionesRow) => {
  const canciones = [];
  let cancionActual = {};
  cancionesRow.forEach((cancion) => {
    if (cancionActual._id !== cancion.id_cancion) {
      cancionActual = {
        _id: cancion.id_cancion,
        nombre_cancion: cancion.nombre_cancion,
        id_artista: cancion.id_artista,
        nombre_artista: cancion.nombre_artista,
        generos: [],
      };
      canciones.push(cancionActual);
    };

    cancionActual.generos.push({
      _id: cancion.id_genero,
      nombre_genero: cancion.nombre_genero,
    });
  });
  return canciones;
};

const updateCanciones = async (db, pool) => {
  const test = await newCanciones(pool)
  const canciones = parseResults(test.rows)
  for (var i = 0; i < canciones.length; i++) {
    await (Cancion.findByIdAndUpdate(canciones[i]._id,{
          nombre_cancion: canciones[i].nombre_cancion,
          id_artista: canciones[i].id_artista,
          nombre_artista: canciones[i].nombre_artista,
          generos: canciones[i].generos,
        },
        { new: true, useFindAndModify: false, upsert: true }
    ))
  }

};

module.exports = { updateCanciones };
