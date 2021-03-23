const pool = require('../credentials');

const searchArtist = async (req, res) => {
    const { artista } = req.body
    const response = await pool.query('select * from artista a where a.nombre ilike $1', ["%" + artista + "%"])
    res.status(200).json(response.rows);
}

module.exports = {
    searchArtist
}