const pool = require('../../credentials');

const getArtists = async (req, res) => {
  const response = await pool.query(`
    select * from artista;
  `);
  res.status(200).json(response.rows);
};

const getSpecificArtist = async (req, res) => {
  const { nombre } = req.body;
  const response = await pool.query(`
  SELECT a.nombre
    FROM artista a
    WHERE a.nombre ILIKE $1;`,
  [nombre]);

  res.status(200).json(response.rows);
};

const updateArtistName = async (req, res) => {
  const { newName, oldName } = req.body;
  const response = await pool.query(`
  UPDATE artista SET nombre = $1 WHERE nombre = $2;`,
  [newName, oldName]);

  res.status(200).json(response.rows);
};

const deleteArtist = async (req, res) => {
  const { nombre } = req.body;
  const response = await pool.query(`
  DELETE FROM artista WHERE nombre = $1;`,
  [nombre]);

  res.status(200).json(response.rows);
};

module.exports = {
  getArtists,
  getSpecificArtist,
  updateArtistName,
  deleteArtist,
};
