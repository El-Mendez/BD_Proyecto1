const newStream = async (pool, fecha, cantidad) => {
    const respuesta = await pool.query(`
    SELECT streams_simulation($1,$2);
    `, [fecha, cantidad]);
};
const newSongs = async (pool, cantidad) => {
    const respuesta = await pool.query(`
    SELECT songs_simulation($1);
    `, [cantidad]);
};
module.exports = { newStream, newSongs }
