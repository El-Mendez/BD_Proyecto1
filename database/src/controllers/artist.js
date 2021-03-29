const pool = require('../../credentials');

const getArtists = async (req, res) => {
  const response = await pool.query(`
    select * from artista;
  `);
  res.status(200).json(response.rows);
};

module.exports = {
  getArtists,
};
