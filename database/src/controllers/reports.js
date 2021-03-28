const pool = require('../credentials');

// 1. Albums mas recientes de la semana
const weeklyAlbums = async (req, res) => {
  const response = await pool.query(`
    select a.* 
    from albumes a 
    where a.fecha_publicacion >= date_trunc('WEEK',now())::date;
  `);
  res.status(200).json(response.rows);
};

// 2. Artistas con popularidad creciente en los ultimos 3 meses
const growingArtist = async (req, res) => {
  const response = await pool.query(`
      select mes1.artista, mes1.id_artista, mes1.cantidad AS mes_pasado, mes2.cantidad AS hace_2_meses, mes3.cantidad AS hace_3_meses
      from (
          select sum(ec.cantidad) AS cantidad, a.nombre AS artista, a.id_artista as id_artista
          from escucha_cancion ec
            inner join canciones c ON ec.id_cancion = c.id_cancion
            inner join artista a ON a.id_artista = c.id_artista
          where fecha >= (current_date - interval '1 month')::date
          group by a.nombre, a.id_artista
      ) mes1 inner join (
          select sum(ec.cantidad) AS cantidad, a.nombre AS artista, a.id_artista as id_artista
          from escucha_cancion ec
            inner join canciones c ON ec.id_cancion = c.id_cancion
            inner join artista a ON a.id_artista = c.id_artista
          where ec.fecha between (current_date - interval '2 month') and (current_date - interval '1 month')
          group by a.nombre, a.id_artista
      ) mes2 ON mes1.id_artista = mes2.id_artista inner join (
          select sum(ec.cantidad) AS cantidad, a.nombre AS artista, a.id_artista as id_artista
          from escucha_cancion ec
            inner join canciones c ON ec.id_cancion = c.id_cancion
            inner join artista a ON a.id_artista = c.id_artista
          where ec.fecha between (current_date - interval '3 month') and (current_date - interval '2 month')
          group by a.nombre, a.id_artista
      ) mes3 ON mes1.id_artista = mes3.id_artista
      where mes1.cantidad > mes2.cantidad AND mes2.cantidad > mes3.cantidad;
  `);
  res.status(200).json(response.rows);
};

// 3. Cantidad de nuevas suscripciones mensuales durante los últimos seis meses
const newSubscriptions = async (req, res) => {
  const response = await pool.query(`
    SELECT count(*)  
    FROM suscripcion s
    WHERE s.fecha_inicio > (current_date - 183) AND s.fecha_inicio < current_date;
  `);
  res.status(200).json(response.rows);
};

// 4. Artista con mayor producción musical
const topArtist = async (req, res) => {
  const response = await pool.query(`
    select a.nombre, a.id_artista , count(*) as reproducciones
    from canciones c
        inner join artista a on c.id_artista = a.id_artista
    group by a.nombre, a.id_artista
    order by reproducciones desc limit 1;
  `);
  res.status(200).json(response.rows);
};

// 5. 5 Géneros más populares
const topGenres = async (req, res) => {
  const response = await pool.query(`
    select g.nombre, g.id_genero, count(*) as canciones 
    from genero_canciones gc
      inner join genero g on g.id_genero = gc.id_genero
    group by g.nombre, g.id_genero
    order by canciones desc
    limit 5;
  `);
  res.status(200).json(response.rows);
};

// 6. 5 usuarios mas activos en la plataforma en el ultimo mes
const topActiveUsers = async (req, res) => {
  const response = await pool.query(`
    select u.username, count (*) as reproducciones
    from escucha_cancion ec
        inner join usuarios u on ec.id_usuario = u.username
    where ec.fecha > ((current_date - interval '1 month')::date -  extract(day from current_date - 1)::int)
        and ec.fecha < ((date_trunc('month', now()) + interval '1 month') - interval '1 day')::date
    group by u.username
    order by reproducciones desc limit 5
  `);
  res.status(200).json(response.rows);
};

module.exports = {
  weeklyAlbums,
  growingArtist,
  newSubscriptions,
  topArtist,
  topGenres,
  topActiveUsers,
};
