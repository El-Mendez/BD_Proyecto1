const pool = require('../../credentials');

const streamSong = async (req, res) => {
  const { username, song_id } = req.body;
  const response = await pool.query(`
    select (
        select u.id_tipousuario != 1
        from usuarios u
        where u.username = $1
    ) or (
        select count(*) < 3
        from stream s
        where s.id_usuario = $1 and
             s.fecha = current_date) as can_listen;
  `, [username]);

  if (response.rows.length > 0) {
    res.status(200).json(response.rows[0]);
    console.log(`song_id: ${song_id} username: ${username}`);

    pool.query(`
      insert into stream values
        ($1, $2, current_date);
    `, [song_id, username]).catch(() => {});
  } else {
    res.status(200).json({ can_listen: false });
  }
};

module.exports = {
  streamSong,
};
