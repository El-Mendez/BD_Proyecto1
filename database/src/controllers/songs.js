const pool = require('../credentials');

const getSongs = async (req, res) => {
    const response = await pool.query('select * from canciones')
    res.status(200).json(response.rows)
};

const getSongByArtistName = async (req, res) => {
    const { artist_name } = req.body
    const response = await pool.query("SELECT c.* FROM artista a INNER JOIN canciones c on a.Id_artista = c.id_artista " +
        "WHERE a.nombre ilike $1", ["%" + artist_name + "%"]);
    res.status(200).json(response.rows)
}

module.exports = {
    getSongs,
    getSongByArtistName
}