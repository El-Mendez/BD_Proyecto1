const { Router } = require('express');

const router = Router();

const { createUser, logIn } = require('../controllers/usuarios');
const { getSongs } = require('../controllers/songs');
// const { searchArtist } = require('../controllers/artist');
const { getAlbums } = require('../controllers/albums');
// const { searchSubscription } = require('../controllers/subscriptionTiers')
// const { getSubscription } = require('../controllers/subscription')
// const { getGenres } = require('../controllers/genres')
// const { getPlaylist } = require('../controllers/playlist')

// router.get('/tiers/', searchSubscription);

router.post('/createUser', createUser);
router.get('/login', logIn);

// router.get('/subscription', getSubscription);

// router.get('/artist', searchArtist);

// router.get('/genres', getGenres)

router.get('/albums', getAlbums);

router.get('/songs', getSongs);

// router.get('/playlist', getPlaylist)

module.exports = router;
