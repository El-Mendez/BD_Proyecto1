const { userSchema, reproduccionSchema } = require('./models');

const userSchema = async (pool) => {
  const respuesta = await pool.query(`
      SELECT u.username,
             s.fecha,
             c.id_cancion,
             c.nombre AS cancion,
             a.id_artista,
             a.nombre AS artista,
             g.id_genero,
             g.nombre AS genero
      FROM usuarios u
               INNER JOIN stream s ON s.id_usuario = u.username
               INNER JOIN canciones c ON c.id_cancion = s.id_cancion
               INNER JOIN artista a ON a.id_artista = c.id_artista
               INNER JOIN genero_canciones gc ON gc.id_canciones = c.id_cancion
               INNER JOIN genero g ON g.id_genero = gc.id_genero;
  `);
  return respuesta;
};

