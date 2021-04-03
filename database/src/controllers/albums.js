const pool = require('../../credentials');

const getAlbums = async (req, res) => {
  const response = await pool.query(`
    select * from albumes;
  `);
  res.status(200).json(response.rows);
};

// Modificada para que devuelve el año del album
const getAlbumByArtist = async (req, res) => {
  const { nombre } = req.body;
  const response = await pool.query(`
  SELECT a2.nombre AS album, to_char(a2.fecha_publicacion, 'YYYY') as year
  FROM artista a
    INNER JOIN canciones c on a.Id_artista = c.id_artista
    INNER JOIN cancion_album ca on c.id_cancion = ca.id_canciones
    INNER JOIN albumes a2 on a2.id_album = ca.id_album
WHERE a.nombre ILIKE $1
GROUP BY a2.nombre, year`,
  [nombre]);

  res.status(200).json(response.rows);
};

const getSpecificAlbum = async (req, res) => {
  const { album } = req.body;
  const response = await pool.query(`
  SELECT DISTINCT a2.nombre AS artista, a.nombre AS albumes
    FROM albumes a
      INNER JOIN cancion_album ca on a.id_album = ca.id_album
      INNER JOIN canciones c ON c.id_cancion = ca.id_canciones
      INNER JOIN artista a2 ON c.id_artista = a2.id_artista
    WHERE a.nombre ILIKE $1`,
  [album]);
  res.status(200).json(response.rows);
};

const updateAlbumName = async (req, res) => {
  const { oldName, newName, artist } = req.body;
  const response = await pool.query(`
  UPDATE albumes SET nombre = $1 WHERE id_album = (SELECT DISTINCT a2.id_album FROM albumes a2 
    INNER JOIN cancion_album ca  ON ca.id_album = a2.id_album 
    INNER JOIN canciones c ON c.id_cancion = ca.id_canciones 
    INNER JOIN artista a ON a.id_artista = c.id_artista
    WHERE a2.nombre = $2 AND a.nombre = $3);`,
  [newName, oldName, artist]);

  res.status(200).json(response.rows);
};

const updateAlbumDate = async (req, res) => {
  const { date, album, artista } = req.body;
  const response = await pool.query(`
  UPDATE albumes SET fecha_publicacion = '$1' WHERE id_album = (SELECT DISTINCT a2.id_album FROM albumes a2 
    INNER JOIN cancion_album ca  ON ca.id_album = a2.id_album 
    INNER JOIN canciones c ON c.id_cancion = ca.id_canciones 
    INNER JOIN artista a ON a.id_artista = c.id_artista
    WHERE a2.nombre = $2 AND a.nombre = $3);`,
  [date, album, artista]);

  res.status(200).json(response.rows);
};

const deleteAlbum = async (req, res) => {
  const { album, artista } = req.body;
  const response = await pool.query(`
  DELETE FROM albumes WHERE id_album = (SELECT DISTINCT a2.id_album FROM albumes a2 
    INNER JOIN cancion_album ca  ON ca.id_album = a2.id_album 
    INNER JOIN canciones c ON c.id_cancion = ca.id_canciones 
    INNER JOIN artista a ON a.id_artista = c.id_artista
    WHERE a2.nombre = $1 AND a.nombre = $2);`,
  [album, artista]);

  res.status(200).json(response.rows);
};

module.exports = {
  getAlbums,
  getAlbumByArtist,
  getSpecificAlbum,
  updateAlbumName,
  updateAlbumDate,
  deleteAlbum,
};
