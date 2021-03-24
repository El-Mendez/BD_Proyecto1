const Parser = require('../utils/QueryParser');
const pool = require('../credentials');

const getPlaylist = async (req, res) => {
    const { playlist_id, playlist_name } = req.body;

    const parser = new Parser("select p.* from playlist p");
    parser.databaseConditionals([
        {
            variables: [
                {
                    name: "p.id_playlist",
                    value: playlist_id,
                },
                {
                    name: "p.nombre",
                    value: playlist_name,
                    forgiving: true
                },
            ]
        },
    ])

    const response = await pool.query(parser.buildQuery(), parser.buildParameters())
    res.status(200).json(response.rows)
};

module.exports = {
    getPlaylist,
}