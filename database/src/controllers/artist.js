const pool = require('../credentials');
const Parser = require('../utils/QueryParser');

const searchArtist = async (req, res) => {
    const { artist_name, artist_id } = req.body
    const parser = new Parser("select a.* from artista a");

    parser.databaseConditionals([
        {
            variables: [
                {
                    name: "a.nombre",
                    value: artist_name,
                    forgiving: true,
                },
                {
                    name: "a.Id_artista",
                    value: artist_id,
                }
            ]
        }

    ]);

    const response = await pool.query(parser.buildQuery(), parser.buildParameters())
    res.status(200).json(response.rows)

}

module.exports = {
    searchArtist
}