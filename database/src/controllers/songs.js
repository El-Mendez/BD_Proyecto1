const pool = require('../credentials');

const getSongs = async (req, res) => {
    const response = await pool.query(`
        select c.id_cancion, link, a.id_artista, c.nombre as cancion_nombre, a.nombre as artista_nombre from canciones c
           inner join artista a on a.id_artista = c.id_artista;
    `)
    res.status(200).json(response.rows);
};

module.exports = {
    getSongs,
}
