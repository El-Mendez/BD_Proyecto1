const pool = require('../credentials');

const getGenres = async (req, res) => {
  const response = await pool.query(`
    select * from genero;
  `);
  res.status(200).json(response.rows);
};

module.exports = {
  getGenres,
};
