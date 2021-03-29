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

module.exports = {
  createUser,
  logIn,
};
