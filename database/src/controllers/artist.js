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
  SELECT a.nombre,  a.activado as estado
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
  const { modifier, nombre } = req.body;
  const response = await pool.query(`
  SELECT delete_artist($1, $2)`,
  [modifier, nombre])
  .then(() => {
    res.status(200).json(response.rows);
  })
    .catch(() => {
      res.status(500).json({ error: 'Bad request' });
    });
};

const revenueArtist = async (req, res) => {
  const { nombre } = req.body;
  const response = await pool.query(`
  SELECT * FROM calculate_revenue($1);`,
  [nombre]);
  res.status(200).json(response.rows);
};

const deactivateArtist = async (req, res) => {
  const { modifier, nombre } = req.body;
  const response = await pool.query(`
  SELECT deactivate_artist($1, $2)`,
    [modifier, nombre])
    .then(() => {
      res.status(200).json(response.rows);
    })
    .catch(() => {
      res.status(500).json({ error: 'Bad request' });
    });
};

module.exports = {
  getArtists,
  getSpecificArtist,
  updateArtistName,
  deleteArtist,
  revenueArtist,
  deactivateArtist,
};
