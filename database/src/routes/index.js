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
  updateData,
  addSubscription,
  updateToPremium,
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
  getSpecificGenre,
} = require('../controllers/genres');
// Queries playlist
const {
  getPlaylists,
  createPlaylist,
  getPlaylistByUsername,
  getSpecificPlaylist,
  addUserPlaylist,
  addPlaylistSong,
  deletePlaylistSong,
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
router.post('/updateToPremium', updateToPremium);
router.post('/getUserDescription', getUserDescription);
router.post('/getUserPlaylist', getUserPlaylist);
router.post('/updateData', updateData);
router.post('/addSubscription', addSubscription);
// --------------------Queries artist--------------------------
router.get('/artists', getArtists);
router.post('/SpecificArtist', getSpecificArtist);
router.post('/updateArtistName', updateArtistName);
router.post('/deleteArtist', deleteArtist);
// --------------------Queries genres--------------------------
router.get('/genres', getGenres);
router.get('/getSpecificGenre', getSpecificGenre);
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
router.post('/addUserPlaylist', addUserPlaylist);
router.post('/getSpecificPlaylist', getSpecificPlaylist);
router.post('/addPlaylistSong', addPlaylistSong);
router.post('/deletePlaylistSong', deletePlaylistSong);
// --------------------Queries reports--------------------------
router.get('/reports/weeklyAlbums', weeklyAlbums);
router.get('/reports/growingArtists', growingArtist);
router.get('/reports/newSubscriptions', newSubscriptions);
router.get('/reports/topArtist', topArtist);
router.get('/reports/topGenres', topGenres);
router.get('/reports/topActiveUsers', topActiveUsers);

module.exports = router;
