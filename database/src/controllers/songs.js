const pool = require('../../credentials');

const getSongs = async (req, res) => {
  const response = await pool.query(`
        select c.id_cancion, link, a.id_artista, c.nombre as cancion_nombre, c.estado, a.nombre as artista_nombre 
        from canciones c
           inner join artista a on a.id_artista = c.id_artista;
    `);
  res.status(200).json(response.rows);
};

const getLinkSong = async (req, res) => {
  const { nombre } = req.body;
  const response = await pool.query(`
  SELECT link
    FROM canciones
    WHERE nombre ILIKE $1;`,
  [nombre]);

  res.status(200).json(response.rows);
};

const getSongByArtist = async (req, res) => {
  const { nombre } = req.body;
  const response = await pool.query(`
  SELECT c.nombre
    FROM artista a
    INNER JOIN canciones c on a.Id_artista = c.id_artista
    WHERE a.nombre = $1;`,
  [nombre]);

  res.status(200).json(response.rows);
};

const getSongByGenre = async (req, res) => {
  const { genero } = req.body;
  const response = await pool.query(`
  SELECT c.nombre AS cancion, a.nombre AS artista, g.nombre AS genero
    FROM genero g
      INNER JOIN genero_canciones gc on g.id_genero = gc.id_genero
      INNER JOIN canciones c on c.id_cancion = gc.id_canciones
      INNER JOIN artista a on c.id_artista = a.Id_artista
  WHERE g.nombre ILIKE $1`,
  [genero]);

  res.status(200).json(response.rows);
};

const getSongsByAlbum = async (req, res) => {
  const { nombre } = req.body;
  const response = await pool.query(`
  SELECT c.nombre
    FROM cancion_album
      INNER JOIN canciones c on c.id_cancion = cancion_album.id_canciones
      INNER JOIN albumes a on a.id_album = cancion_album.id_album
    WHERE a.nombre ILIKE $1;`,
  [nombre]);

  res.status(200).json(response.rows);
};

const getSpecificSong = async (req, res) => {
  const { nombre } = req.body;
  const response = await pool.query(`
  SELECT c.nombre AS cancion, a.nombre AS artista, g.nombre AS genero
FROM canciones c
         INNER JOIN artista a ON c.id_artista = a.Id_artista
         INNER JOIN genero_canciones gc ON c.id_cancion = gc.id_canciones
         INNER JOIN genero g ON g.id_genero = gc.id_genero
         INNER JOIN cancion_album ca on c.id_cancion = ca.id_canciones
WHERE c.nombre ILIKE $1;`,
  [nombre]);

  res.status(200).json(response.rows);
};
const songOff = async (req, res) => {
  const { estado, cancion, artista } = req.body;
  const response = await pool.query(`
  UPDATE canciones SET estado = $1 WHERE id_cancion = (SELECT c.id_cancion FROM canciones c
    INNER JOIN artista a ON c.id_artista = a.id_artista 
    WHERE c.nombre = $2 AND a.nombre = $3);`,
  [estado, cancion, artista]);

  res.status(200).json(response.rows);
};

const updateSongName = async (req, res) => {
  const { newName, oldName, artist } = req.body;
  const response = await pool.query(`
  UPDATE canciones SET nombre = $1 WHERE id_cancion = (SELECT c.id_cancion FROM canciones c
    INNER JOIN artista a ON c.id_artista = a.id_artista 
    WHERE c.nombre = $2 AND a.nombre = $3);`,
  [newName, oldName, artist]);

  res.status(200).json(response.rows);
};

const updateSongLink = async (req, res) => {
  const { link, nombre } = req.body;
  const response = await pool.query(`
  UPDATE canciones SET link = $1 WHERE nombre = $2; `,
  [link, nombre]);

  res.status(200).json(response.rows);
};

const deleteSong = async (req, res) => {
  const { cancion, artista } = req.body;
  const response = await pool.query(`
  DELETE FROM canciones WHERE id_cancion = (SELECT c.id_cancion FROM canciones c
    INNER JOIN artista a ON c.id_artista = a.id_artista 
    WHERE c.nombre = $1 AND a.nombre = $2)`,
  [cancion, artista]);

  res.status(200).json(response.rows);
};

module.exports = {
  getSongs,
  getSongByArtist,
  getSongByGenre,
  getSpecificSong,
  songOff,
  updateSongName,
  updateSongLink,
  deleteSong,
  getSongsByAlbum,
  getLinkSong,
};
