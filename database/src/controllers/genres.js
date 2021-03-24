const Parser = require('../utils/QueryParser');
const pool = require('../credentials');

const getGenres = async (req, res) => {
    const { genre_id, genre_name } = req.body;

    const parser = new Parser("select g.* from genero g");
    parser.databaseConditionals([
        {
            variables: [
                {
                    name: "g.id_genero",
                    value: genre_id,
                },
                {
                    name: "g.nombre",
                    value: genre_name,
                    forgiving: true
                },
            ]
        },
    ])

    const response = await pool.query(parser.buildQuery(), parser.buildParameters())
    res.status(200).json(response.rows)
};

module.exports = {
    getGenres,
}