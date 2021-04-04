//import user from '../../../frontend/app/src/components/user/user';

const pool = require('../../credentials');

const getPlaylists = async (req, res) => {
  const response = await pool.query(`
    select * from playlist;
  `);
  res.status(200).json(response.rows);
};

// BÚSQUEDA DE PLAYLIST
const getSpecificPlaylist = async (req, res) => {
  const { nombre } = req.body;
  const response = await pool.query(`
  SELECT up.id_playlist, up.id_usuario as username
    FROM playlist
    INNER JOIN usuario_playlist up on playlist.id_playlist = up.id_playlist
  WHERE nombre ILIKE $1
  GROUP BY up.id_playlist, up.id_usuario`, [nombre]);

  res.status(200).json(response.rows);
};

const createPlaylist = async (req, res) => {
  const { nombre } = req.body;
  const response = await pool.query(`
  INSERT INTO playlist (nombre)
    VALUES
    ($1);`,
  [nombre]);

  res.status(200).json(response.rows);
};

const getPlaylistByUsername = async (req, res) => {
  const { username } = req.body;
  const response = await pool.query(`
  SELECT p.nombre
    FROM usuario_playlist up
      INNER JOIN playlist p on p.id_playlist = up.id_playlist
      INNER JOIN usuarios u on u.username = up.id_usuario
    WHERE u.username ILIKE $1;`,
  [username]);

  res.status(200).json(response.rows);
};

// Añadir una playlist a un usuario
const addUserPlaylist = async (req, res) => {
  const { username, playlist_name } = req.body;
  const response = await pool.query(`
    INSERT INTO usuario_playlist
    SELECT $1 as usuario, p.id_playlist
    FROM playlist p
    WHERE p.nombre ILIKE $2;`, [username, playlist_name]);

  res.status(200).json(response.rows);
};

// AÑADIR CANCIÓN A UNA PLAYLIST
const addPlaylistSong = async (req, res) => {
  const { playlist_id, cancion } = req.body;
  const response = await pool.query(`
    INSERT INTO playlist_canciones
    SELECT $1 as id_playlist, c.id_cancion
    FROM canciones c
    WHERE c.nombre ILIKE $2;`, [playlist_id, cancion]);

  res.status(200).json(response.rows);
};

// ELIMINAR CANCION DE UNA PLAYLIST
const deletePlaylistSong = async (req, res) => {
  const { playlist_id, cancion } = req.body;
  const response = await pool.query(`
    DELETE FROM playlist_canciones
    WHERE id_playlist = $1 AND id_canciones = (
    SELECT c.id_cancion
    FROM canciones c
    WHERE c.nombre ILIKE $2);`, [playlist_id, cancion]);

  res.status(200).json(response.rows);
};

const playlistSongs = async (req, res) => {
  const { nombre } = req.body;
  const response = await pool.query(`
  SELECT c.nombre as cancion, a.nombre as artista, a2.nombre as album
  FROM playlist p
    INNER JOIN playlist_canciones pc on p.id_playlist = pc.id_playlist
    INNER JOIN canciones c on c.id_cancion = pc.id_canciones
    INNER JOIN artista a on a.Id_artista = c.id_artista
    INNER JOIN cancion_album ca on c.id_cancion = ca.id_canciones
    INNER JOIN albumes a2 on a2.id_album = ca.id_album
  WHERE p.nombre ILIKE $1;`, [nombre]);

  res.status(200).json(response.rows);
};


module.exports = {
  getPlaylists,
  createPlaylist,
  getPlaylistByUsername,
  getSpecificPlaylist,
  addUserPlaylist,
  addPlaylistSong,
  deletePlaylistSong,
  playlistSongs,
};
