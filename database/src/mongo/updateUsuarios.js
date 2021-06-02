const { Usuarios } = require('./models');

const newStreams = async (pool, fechaInicial, fechaFinal) => {
  const respuesta = await pool.query(`
    SELECT u.username, s.fecha, c.id_cancion, c.nombre AS nombre_cancion, a.id_artista, a.nombre AS nombre_artista, g.id_genero, g.nombre AS nombre_genero, count(*) AS cantidad FROM usuarios u
      INNER JOIN stream s ON s.id_usuario = u.username
      INNER JOIN canciones c ON c.id_cancion = s.id_cancion
      INNER JOIN artista a ON a.id_artista = c.id_artista
      INNER JOIN genero_canciones gc ON gc.id_canciones = c.id_cancion
      INNER JOIN genero g ON g.id_genero = gc.id_genero
    WHERE s.fecha >= $1 AND s.fecha < $2
    GROUP BY u.username, c.nombre, nombre_artista,s.fecha, c.id_cancion, a.id_artista , g.id_genero
    ORDER BY u.username , s.fecha , c.id_cancion;
  `, [fechaInicial, fechaFinal]);
  return respuesta;
};

const parseResults = (streamsRow) => {
  const users = [];
  let actualUser = {};
  let currentStream = {};

  streamsRow.forEach((stream) => {
    if (actualUser._id !== stream.username) {
      actualUser = { _id: stream.username, reproducciones: [] };
      users.push(actualUser);
      currentStream = {};
    }

    if (currentStream.id_cancion !== stream.id_cancion || currentStream.fecha.getTime() !== stream.fecha.getTime()) {
      currentStream = {
        reproduccion: stream.cantidad,
        fecha: stream.fecha,
        id_cancion: stream.id_cancion,
        nombre_cancion: stream.nombre_cancion,
        id_artista: stream.id_artista,
        nombre_artista: stream.nombre_artista,
        generos: [],
      }
      actualUser.reproducciones.push(currentStream);
    }

    currentStream.generos.push({
      _id: stream.id_genero,
      nombre_genero: stream.nombre_genero,
    });
  });
  return users;
};

const updateStreams = async (db, pool, fechaInicial, fechaFinal) => {
  const test = await newStreams(pool, fechaInicial, fechaFinal);
  const usuarios = parseResults(test.rows);
  // console.log(canciones);
  for (var i = 0; i < usuarios.length; i++) {
    await (Usuarios.findByIdAndUpdate(usuarios[i]._id,{ ...usuarios[i] },
        { new: true, useFindAndModify: false, upsert: true }
    ))
  }

};

module.exports = { updateStreams };



