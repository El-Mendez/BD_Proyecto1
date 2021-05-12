const pool = require('../../credentials');

const getChangesUsers = async (req, res) => {
  const response = await pool.query(`
    SELECT * FROM bitacora b WHERE tabla = 'usuarios';
  `);
  res.status(200).json(response.rows);
};
const getChangesAlbumes = async (req, res) => {
  const response = await pool.query(`
    SELECT * FROM bitacora b WHERE tabla = 'albumes';
  `);
  res.status(200).json(response.rows);
};
const getChangesSongs = async (req, res) => {
  const response = await pool.query(`
    SELECT * FROM bitacora b WHERE tabla = 'canciones';
  `);
  res.status(200).json(response.rows);
};
const getChangesArtist = async (req, res) => {
  const response = await pool.query(`
    SELECT * FROM bitacora b WHERE tabla = 'artista';
  `);
  res.status(200).json(response.rows);
};
const getChangesPlaylist = async (req, res) => {
  const response = await pool.query(`
    SELECT * FROM bitacora b WHERE tabla = 'playlist';
  `);
  res.status(200).json(response.rows);
};



module.exports = {
  getChangesUsers,
  getChangesAlbumes,
  getChangesSongs,
  getChangesArtist,
  getChangesPlaylist,
};
