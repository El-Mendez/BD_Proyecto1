const pool = require('../credentials');

const getAlbums = async (req, res) => {
  const response = await pool.query(`
    select * from albumes;
  `);
  res.status(200).json(response.rows);
};

module.exports = {
  getAlbums,
};
