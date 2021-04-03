const pool = require('../../credentials');

const getGenres = async (req, res) => {
  const response = await pool.query(`
    select * from genero;
  `);
  res.status(200).json(response.rows);
};

// BÚSQUEDA DE GÉNERO
const getSpecificGenre = async (req, res) => {
  const { genre } = req.body;
  const response = await pool.query(`
  SELECT nombre
  FROM genero
  WHERE nombre ILIKE $1;`, [genre]);

  res.status(200).json(response.rows);
};


module.exports = {
  getGenres,
  getSpecificGenre,
};
