const pool = require('../../credentials');

const createUser = async (req, res) => {
  const {
    username, contrasena, nombres, apellidos, correo,
  } = req.body;

  const response = await pool.query(
    `INSERT INTO usuarios (username, contrasena, nombres, apellidos, correo, id_tipousuario) 
        VALUES ($1, crypt($2, gen_salt('bf')),$3,$4,$5,$6)`,
    [username, contrasena, nombres, apellidos, correo, 1],
  ).then(() => {
    res.status(201).json({
      status: 'correct',
    });
  }).catch(() => {
    res.status(500).json({
      error: 'Could not create new user.',
    });
  });
};

const logIn = async (req, res) => {
  const { username, contrasena } = req.body;
  const response = await pool.query(`
    select u.username, u.nombres, u.apellidos, u.correo, u.id_tipousuario from usuarios u 
        where u.username like $1
          and u.contrasena = crypt($2, u.contrasena)
          `,
  [username, contrasena]);

  res.status(200).json(response.rows);
};

const updateToArtist = async (req, res) => {
  const { username } = req.body;
  const response = await pool.query(`
  UPDATE usuarios SET id_tipoUsuario = 4 WHERE username = $1;
          `,
  [username]);

  res.status(200).json(response.rows);
};

const updateData = async (req, res) => {
  const { nombres, apellidos, username } = req.body;
  const response = await pool.query(`
  UPDATE usuarios SET nombres = $1, apellidos = $2 WHERE username = $3;
          `,
  [nombres, apellidos, username]);

  res.status(200).json(response.rows);
};

const updateToManager = async (req, res) => {
  const { username } = req.body;
  const response = await pool.query(`
  UPDATE usuarios SET id_tipoUsuario = 5 WHERE username = $1;
          `,
  [username]);

  res.status(200).json(response.rows);
};

const getUserDescription = async (req, res) => {
  const { username } = req.body;
  const response = await pool.query(`
  SELECT u.username, u.nombres, u.apellidos, u.correo, tu.descripcion, u.id_tipousuario, u.id_monitor, u.activo 
    FROM usuarios u
      INNER JOIN tipo_usuario tu ON u.id_tipoUsuario = tu.id_tipoUsuario
    WHERE u.username ILIKE $1;
          `,
  [username]);

  res.status(200).json(response.rows);
};

const getUserPlaylist = async (req, res) => {
  const { username } = req.body;
  const response = await pool.query(`
  SELECT c.nombre
    FROM usuario_playlist up
      INNER JOIN playlist p ON up.id_usuario = p.id_playlist
      INNER JOIN playlist_canciones pc ON pc.id_playlist = p.id_playlist
      INNER JOIN canciones c  ON c.id_cancion = pc.id_canciones
    WHERE  up.id_usuario like $1;;
          `,
  [username]);

  res.status(200).json(response.rows);
};

const addSubscription = async (req, res) => {
  const { username } = req.body;
  const response = await pool.query(`
  INSERT INTO suscripcion (id_usuario, Fecha_inicio)
    VALUES ($1,current_date);`, [username]);

  res.status(200).json(response.rows);
};

const updateToPremium = async (req, res) => {
  const { username } = req.body;
  const response = await pool.query(`
  UPDATE usuarios SET id_tipoUsuario = 2 WHERE username = $1;`, [username]);

  res.status(200).json(response.rows);
};

module.exports = {
  createUser,
  logIn,
  updateToArtist,
  updateToManager,
  getUserDescription,
  getUserPlaylist,
  updateData,
  addSubscription,
  updateToPremium,
};
