
const Parser = require('../utils/QueryParser');
const pool = require('../credentials');

const getSongs = async (req, res) => {
    const {song_name, song_id, artist_id, song_state, artist_name, genero_id} = req.body;

    const parser = new Parser("select c.* from canciones c");
    parser.databaseConditionals([
        {
            variables: [
                {
                    name: "c.id_cancion",
                    value: song_id,
                },
                {
                    name: "c.nombre",
                    value: song_name,
                    forgiving: true

                },
                {
                    name: "c.id_artista",
                    value: artist_id
                },
                {
                    name: "c.estado",
                    value: song_state
                }
            ]
        },
        {
            joinStatement: "inner join artista a on a.Id_artista = c.id_artista",
            variables: [
                {
                    name: "a.nombre",
                    value: artist_name,
                    forgiving: true,
                }
            ]
        },
        {
            joinStatement: "inner join genero_canciones gc on gc.id_canciones = c.id_cancion",
            variables: [
                {
                    name: "gc.id_canciones",
                    value: genero_id,
                }
            ]
        }
    ])
    console.log(parser.buildQuery());
    console.log(parser.buildParameters())
    const response = await pool.query(parser.buildQuery(), parser.buildParameters())
    res.status(200).json(response.rows)
};

module.exports = {
    getSongs,
}