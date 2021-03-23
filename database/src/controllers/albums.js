const pool = require('../credentials');

const getAlbums = async (req, res) => {
    const response = await pool.query('select * from albumes');
    res.status(200).json(response.rows);
}

const getAlbumsByArtist = async (req, res) => {
    const { artist_name } = req.body
    // todo arreglar
    const response = await pool.query('select al.* from albumes al inner join artista ar on al.nombre = ar.nombre where ar.nombre ilike $1', ["%"+ artist_name + "%"]);
    res.status(200).json(response.rows);
}

module.exports = {
    getAlbums,
    getAlbumsByArtist
}