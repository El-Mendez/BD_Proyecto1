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
          and u.contrasena = crypt($2, u.contrasena) and activo = true
          `,
  [username, contrasena]);

  res.status(200).json(response.rows);
};

const updateToArtist = async (req, res) => {
  const { username, modifier } = req.body;
  const response = await pool.query(`
  SELECT upgrade_artist($1,$2);`,
  [username, modifier])
    .then(() => {
    res.status(200).json(response.rows);
  })
    .catch(() => {
      res.status(500).json({ error: 'Bad request' });
    });
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

const getSpecificUser = async (req, res) => {
  const { nombre } = req.body;
  const response = await pool.query(`
    SELECT concat(nombres, ' ' ,apellidos) as nombre, username, tu.descripcion as tipo, activo as estado
    FROM usuarios
        INNER JOIN tipo_usuario tu on tu.id_tipousuario = usuarios.id_tipousuario
    WHERE username ILIKE $1 and (usuarios.id_tipousuario = 1 or usuarios.id_tipousuario = 2);`, [nombre]);

  res.status(200).json(response.rows);
};

const deactivateUser = async (req, res) => {
  const { identifier, modifier } = req.body;
  const response = await pool.query(`
  UPDATE usuarios SET activo = false, modificador = $2 WHERE username = $1;`,
    [identifier, modifier]);

  res.status(200).json(response.rows);
};

const deleteSubscription = async (req, res) => {
  const { identifier, modifier } = req.body;
  const response = await pool.query(`
    UPDATE usuarios SET id_tipousuario = 1, modificador = $2 WHERE username = $1;`,
    [identifier, modifier]);

  res.status(200).json(response.rows);
};

const monitorProfile = async (req, res) => {
  const { identifier, monitor, modifier } = req.body;
  const response = await pool.query(`
  UPDATE usuarios SET id_monitor = (SELECT id_monitor FROM monitores WHERE nombre = $2), modificador = $3 WHERE username = $1`,
    [identifier, monitor, modifier]);

  res.status(200).json(response.rows);
};

const addMonitor = async (req, res) => {
  const { monitor } = req.body;
  const response = await pool.query(`
  INSERT INTO monitores (nombre) VALUES ($1);`,
    [monitor]);
  res.status(200).json(response.rows);
};

const monitorTask = async (req, res) => {
  const { monitor, tarea } = req.body;
  const response = await pool.query(`
  SELECT tareas_monitor ($1, $2);`,
    [monitor, tarea]);
  res.status(200).json(response.rows);
};

const getSpecificTaskMonitor = async (req, res) => {
  const { id_monitor } = req.body;
  const response = await pool.query(`
  SELECT mt.id_tarea FROM monitor_tarea mt 
    INNER JOIN monitores m ON mt.id_monitor = m.id_monitor
  WHERE m.id_monitor = $1;`, [id_monitor]);

  res.status(200).json(response.rows);
};

const getMonitors = async (req, res) => {
  const response = await pool.query(`
    SELECT nombre FROM monitores;`);

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
  getSpecificUser,
  deactivateUser,
  deleteSubscription,
  monitorProfile,
  monitorTask,
  addMonitor,
  getSpecificTaskMonitor,
  getMonitors,
};
