const pool = require('../credentials');

const getSongs = async (req, res) => {
    const response = await pool.query('select * from canciones')
    res.status(200).json(response.rows)
};

module.exports = {
    getSongs
}