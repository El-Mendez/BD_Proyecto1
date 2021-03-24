const pool = require('../credentials');
const Parser = require('../utils/QueryParser');

const getSubscription = async (req, res) => {
    const { id_subscription } = req.body
    const parser = new Parser("select s.* from suscripcion s");

    parser.databaseConditionals([
        {
            variables: [
                {
                    name: "s.Id_suscripción",
                    value: id_subscription,
                },
            ]
        }
    ]);

    const response = await pool.query(parser.buildQuery(), parser.buildParameters())
    res.status(200).json(response.rows)
}

    module.exports = {
    getSubscription

}