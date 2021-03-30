const { Router } = require('express');

const router = Router();
// Queries usuarios
const {
  createUser,
  logIn,
  updateToArtist,
  updateToManager,
  getUserDescription,
  getUserPlaylist,
} = require('../controllers/usuarios');
// Queries songs
const {
  getSongs,
  getSongByArtist,
  getSongByGenre,
  getSpecificSong,
  songOff,
  updateSongName,
  updateSongLink,
  deleteSong,
  getSongsByAlbum,
  getLinkSong,
} = require('../controllers/songs');
// Queries artist
const {
  getArtists,
  getSpecificArtist,
  updateArtistName,
  deleteArtist,
} = require('../controllers/artist');
// Queries albums
const {
  getAlbums,
  getAlbumByArtist,
  getSpecificAlbum,
  updateAlbumName,
  updateAlbumDate,
  deleteAlbum,
} = require('../controllers/albums');
// Queries genres
const {
  getGenres,
} = require('../controllers/genres');
// Queries playlist
const {
  getPlaylists,
  createPlaylist,
  getPlaylistByUsername,
} = require('../controllers/playlist');
// Queries reports
const {
  weeklyAlbums,
  growingArtist,
  newSubscriptions,
  topArtist,
  topGenres,
  topActiveUsers,
} = require('../controllers/reports');
// --------------------Queries usuarios--------------------------
router.post('/createUser', createUser);
router.post('/login', logIn);
router.post('/updatesToArtist', updateToArtist);
router.post('/updatesToManager', updateToManager);
router.post('/getUserDescription', getUserDescription);
router.post('/getUserPlaylist', getUserPlaylist);
// --------------------Queries artist--------------------------
router.get('/artists', getArtists);
router.post('/SpecificArtist', getSpecificArtist);
router.post('/updateArtistName', updateArtistName);
router.post('/deleteArtist', deleteArtist);
// --------------------Queries genres--------------------------
router.get('/genres', getGenres);
// --------------------Queries albums--------------------------
router.get('/albums', getAlbums);
router.post('/getAlbumByArtist', getAlbumByArtist);
router.post('/getSpecificAlbum', getSpecificAlbum);
router.post('/changeAlbumName', updateAlbumName);
router.post('/changeAlbumDate', updateAlbumDate);
router.post('/deleteAlbum', deleteAlbum);
// --------------------Queries songs--------------------------
router.get('/songs', getSongs);
router.post('/songByArtist', getSongByArtist);
router.post('/getSongByGenre', getSongByGenre);
router.post('/getSpecificSong', getSpecificSong);
router.post('/songOff', songOff);
router.post('/changeSongName', updateSongName);
router.post('/changeSongLink', updateSongLink);
router.post('/deleteSong', deleteSong);
router.post('/getSongsByAlbum', getSongsByAlbum);
router.post('/getLinkSong', getLinkSong);
// --------------------Queries playlist--------------------------
router.get('/playlists', getPlaylists);
router.post('/createPlaylist', createPlaylist);
router.post('/getPlaylistByUsername', getPlaylistByUsername);
// --------------------Queries reports--------------------------
router.get('/reports/weeklyAlbums', weeklyAlbums);
router.get('/reports/growingArtists', growingArtist);
router.get('/reports/newSubscriptions', newSubscriptions);
router.get('/reports/topArtist', topArtist);
router.get('/reports/topGenres', topGenres);
router.get('/reports/topActiveUsers', topActiveUsers);

module.exports = router;
