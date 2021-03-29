const { Router } = require('express');

const router = Router();

const { createUser, logIn } = require('../controllers/usuarios');
const { getSongs } = require('../controllers/songs');
const { getArtists } = require('../controllers/artist');
const { getAlbums } = require('../controllers/albums');
const { getGenres } = require('../controllers/genres');
const { getPlaylists } = require('../controllers/playlist');
const {
  weeklyAlbums,
  growingArtist,
  newSubscriptions,
  topArtist,
  topGenres,
  topActiveUsers,
} = require('../controllers/reports');

router.post('/createUser', createUser);
router.post('/login', logIn);

router.get('/artists', getArtists);

router.get('/genres', getGenres);

router.get('/albums', getAlbums);

router.get('/songs', getSongs);

router.get('/playlists', getPlaylists);

router.get('/reports/weeklyAlbums', weeklyAlbums);
router.get('/reports/growingArtists', growingArtist);
router.get('/reports/newSubscriptions', newSubscriptions);
router.get('/reports/topArtist', topArtist);
router.get('/reports/topGenres', topGenres);
router.get('/reports/topActiveUsers', topActiveUsers);

module.exports = router;
