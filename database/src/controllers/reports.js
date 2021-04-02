const pool = require('../../credentials');

// 1. AlbumsArtist mas recientes de la semana
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
          select count(*) AS cantidad, a.nombre AS artista, a.id_artista as id_artista
          from stream st
            inner join canciones c ON st.id_cancion = c.id_cancion
            inner join artista a ON a.id_artista = c.id_artista
          where st.fecha >= (current_date - interval '1 month')::date
          group by a.nombre, a.id_artista
      ) mes1 inner join (
          select count(*) AS cantidad, a.nombre AS artista, a.id_artista as id_artista
          from stream st
            inner join canciones c ON st.id_cancion = c.id_cancion
            inner join artista a ON a.id_artista = c.id_artista
          where st.fecha between (current_date - interval '2 month') and (current_date - interval '1 month')
          group by a.nombre, a.id_artista
      ) mes2 ON mes1.id_artista = mes2.id_artista inner join (
          select count(*) AS cantidad, a.nombre AS artista, a.id_artista as id_artista
          from stream st
            inner join canciones c ON st.id_cancion = c.id_cancion
            inner join artista a ON a.id_artista = c.id_artista
          where st.fecha between (current_date - interval '3 month') and (current_date - interval '2 month')
          group by a.nombre, a.id_artista
      ) mes3 ON mes1.id_artista = mes3.id_artista
      where mes1.cantidad > mes2.cantidad AND mes2.cantidad > mes3.cantidad;
  `);
  res.status(200).json(response.rows);
};

// 3. Cantidad de nuevas suscripciones mensuales durante los últimos seis meses
const newSubscriptions = async (req, res) => {
  const response = await pool.query(`
    SELECT to_char(s.fecha_inicio, 'MON') as mes, count(*)
    FROM suscripcion s
    WHERE s.fecha_inicio > (current_date - 183) AND s.fecha_inicio < current_date
    GROUP BY s.fecha_inicio;
  `);
  res.status(200).json(response.rows);
};

// 4. Artista con mayor producción musical
const topArtist = async (req, res) => {
  const response = await pool.query(`
    select a.nombre, a.id_artista , count(*) as canciones
    from canciones c
        inner join artista a on c.id_artista = a.id_artista
    group by a.nombre, a.id_artista
    order by canciones desc limit 1;
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
    from stream st
        inner join usuarios u on st.id_usuario = u.username
    where st.fecha > ((current_date - interval '1 month')::date -  extract(day from current_date - 1)::int)
        and st.fecha < ((date_trunc('month', now()) + interval '1 month') - interval '1 day')::date
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
