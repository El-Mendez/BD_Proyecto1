const pool = require('../../credentials');

const getPlaylists = async (req, res) => {
  const response = await pool.query(`
    select * from playlist;
  `);
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

module.exports = {
  getPlaylists,
  createPlaylist,
  getPlaylistByUsername,
};
