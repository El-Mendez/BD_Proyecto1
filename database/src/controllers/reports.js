const pool = require('../credentials');
// 1. Albums mas recientes de la semana
const getAlbumsRecientes = async (req, res) => {
    query = "SELECT a.nombre FROM albumes a WHERE a.fecha_publicacion >= date_trunc('WEEK',now())::DATE"
    const response = await pool.query(query);
    res.status(200).json(response.rows);
}
// 2. Artistas con popularidad creciente en los ultimos 3 meses
const getArtistasCrecientes = async (req, res) => {
    query = "SELECT mes1.artista, mes1.cantidad AS mes_pasado, mes2.cantidad AS hace_2_meses, mes3.cantidad AS hace_3_meses"
	query =+ "FROM (SELECT SUM(ec.cantidad) AS cantidad, a.nombre AS artista" 
	query =+ "FROM escucha_cancion ec"
	query =+ "INNER JOIN canciones c ON ec.id_cancion = c.id_cancion"
	query =+ "INNER JOIN artista a ON a.id_artista = c.id_artista"
	query =+ "WHERE fecha >= (current_date - interval '3 month')::date AND fecha < current_date - interval '2 month'"
	query =+ "GROUP BY a.nombre) mes3"
	query =+ "INNER JOIN ("
    query =+ "SELECT SUM(ec.cantidad) AS cantidad, a.nombre AS artista"
	query =+ "FROM escucha_cancion ec"
	query =+ "INNER JOIN canciones c ON ec.id_cancion = c.id_cancion"
	query =+ "INNER JOIN artista a ON a.id_artista = c.id_artista"
	query =+ "WHERE fecha >= (current_date - interval '2 month')::date AND fecha < current_date - interval '1 month'"
	query =+ "GROUP BY a.nombre) mes2 ON mes3.artista = mes2.artista"
	query =+ "INNER JOIN ("
	query =+ "SELECT SUM(ec.cantidad) AS cantidad, a.nombre AS artista"
	query =+ "FROM escucha_cancion ec"
	query =+ "INNER JOIN canciones c ON ec.id_cancion = c.id_cancion"
	query =+ "INNER JOIN artista a ON a.id_artista = c.id_artista"
	query =+ "WHERE fecha >= (current_date - interval '1 month')::date AND fecha < current_date"
	query =+ "GROUP BY a.nombre) mes1 ON mes1.artista = mes2.artista AND mes1.artista = mes3.artista"
	query =+ "WHERE mes1 > mes2 AND mes2 > mes3;"
    const response = await pool.query(query);
    res.status(200).json(response.rows);
}
// 3. Cantidad de nuevas suscripciones mensuales durante los últimos seis meses
const getSuscripcionesActuales = async (req, res) => {
    query = "SELECT s.fecha_inicio, current_date AS fecha_actual FROM suscripcion s"
    query += "WHERE s.fecha_inicio > (current_date - 183) AND s.fecha_inicio < current_date"
    query += "GROUP BY fecha_inicio"
    query += "ORDER BY fecha_inicio ASC"
    const response = await pool.query(query);
    res.status(200).json(response.rows);
}
// 4. Artista con mayor producción musical
const getArtistaPopular = async (req, res) => {
    query = "SELECT a.nombre , count(*) AS cantidad FROM canciones c"
    query += "INNER JOIN artista a ON c.id_artista = a.id_artista"
    query += "GROUP BY a.nombre"
    query += "ORDER BY cantidad DESC LIMIT 1;"
    const response = await pool.query(query);
    res.status(200).json(response.rows);
}
// 5. 5 Géneros más populares
const getGenerosPopulares = async (req, res) => {
    query = "SELECT g.nombre, count(*) AS cantidad FROM genero_canciones gc"
    query += "INNER JOIN genero g ON g.id_genero = gc.id_genero"
    query += "GROUP BY g.nombre"
    query += "ORDER BY cantidad DESC LIMIT 5;"
    const response = await pool.query(query);
    res.status(200).json(response.rows);
}
// 6. 5 usuarios mas activos en la plataforma en el ultimo mes
const getUsuariosActivos = async (req, res) => {
    query = "SELECT u.username, count (*) as cantidad"
    query += "FROM escucha_cancion ec"
    query += "INNER JOIN usuarios u ON ec.id_usuario = u.username"
    query += "WHERE ec.fecha > ((current_date - interval '1 month')::date -  EXTRACT(DAY FROM current_date - 1)::int)"
    query += "AND ec.fecha < ((date_trunc('month', now()) + interval '1 month') - interval '1 day')::date"
    query += "GROUP BY u.username"
    query += "ORDER BY cantidad DESC limit 5"
    const response = await pool.query(query);
    res.status(200).json(response.rows);
}

module.exports = {
    getAlbumsRecientes,
    getSuscripcionesActuales,
    getArtistaPopular,
    getGenerosPopulares,
    getUsuariosActivos,
    getArtistasCrecientes
}
