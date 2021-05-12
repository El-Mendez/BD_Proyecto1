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
    GROUP BY mes;
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

// 7. Reproducciones por semana
const weeklyStreams = async (req, res) => {
  const { date } = req.body;
  const response = await pool.query(`
    select * from weekly_streams($1)`, [date])

  res.status(200).json(response.rows);
};

// 8. Artistas con más reproducciones en fecha
const bestArtist = async (req, res) => {
  const { dateB,dateF, quantity } = req.body;
  const response = await pool.query(`
  SELECT * FROM best_artists($1,$2,$3);  
  `, [dateB, dateF, quantity])
    res.status(200).json(response.rows);
};

// 9. Reproducciones por género
// const genreStream = async (req, res) => {
//   const { from, to } = req.bodyUsed;
//   const response = await pool.query(`
//     select * from genre_stream($1, $2);`, [from, to]);
//
//   res.status(200).json(response.rows);
// };

// 9. Reproducciones por género
const genreStream = async (req, res) => {
  const { from, to } = req.bodyUsed;
  const response = await pool.query(`
    SELECT g.nombre as genero, COUNT(*) as reproducciones
        FROM stream s
            INNER JOIN canciones c on c.id_cancion = s.id_cancion
            INNER JOIN genero_canciones gc on c.id_cancion = gc.id_canciones
            INNER JOIN genero g on g.id_genero = gc.id_genero
\t        WHERE s.fecha BETWEEN $1 AND $2
\t        GROUP BY genero;`, [from, to]);

  res.status(200).json(response.rows);
};

// 10. Canciones con más reproducciones de un artista
const topArtistSongs = async (req, res) => {
  const { artistName, quantity } = req.body;
  const response = await pool.query(`
    select * from artist_songs($1, $2);  
  `, [artistName, quantity])
    .then(() => {
      res.status(200).json(response.rows);
    })
    .catch(() => {
      res.status(500).json({ error: 'Invalid date' });
    });
};

const modifyAlbumSong = async (req, res) => {
  const {
    option,
    change,
    id,
    name,
    link,
    fecha,
    artistId,
  } = req.body;

  await pool.query(`
    modificar_album_cancion($1, $2, $3, $4, $5, $6, $7);
  `, [option, change, id, name, link, fecha, artistId])
    .then(() => {
      res.status(200).json({ status: 'correct' });
    })
    .catch(() => {
      res.status(500).json({ status: 'bad request' });
    });
};

module.exports = {
  weeklyAlbums,
  growingArtist,
  newSubscriptions,
  topArtist,
  topGenres,
  topActiveUsers,

  weeklyStreams,
  bestArtist,
  genreStream,
  topArtistSongs,
  modifyAlbumSong,

};
