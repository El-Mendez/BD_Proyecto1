const pool = require('../credentials');
const Parser = require('../utils/QueryParser');

const searchSubscription = async (req, res) => {
    const { tier_id } = req.body
    const parser = new Parser("select t.* from tipo_usuario t");

    parser.databaseConditionals([
        {
            variables: [
                {
                    name: "t.id_tipoUsuario",
                    value: tier_id,
                },
            ]
        }
    ])

    const response = await pool.query(parser.buildQuery(), parser.buildParameters())
    res.status(200).json(response.rows)
}

module.exports = {
    searchSubscription
}