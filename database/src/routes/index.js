const { Router } = require('express');
const router = Router();

const { createUser, logIn } = require('../controllers/usuarios')
const { getSongs } = require('../controllers/songs');
const { searchArtist } = require('../controllers/artist');
const { getAlbums } = require('../controllers/albums');
const { searchSubscription } = require('../controllers/subscriptionTiers')
const { getSubscription } = require('../controllers/subscription')
const { getGenres } = require('../controllers/genres')
const { getPlaylist } = require('../controllers/playlist')

router.get('/tiers/', searchSubscription);

router.post('/users/', createUser);
router.get('/users/', logIn);

router.get('/subscription/', getSubscription);

router.get('/artist/', searchArtist);

router.get('/genres/', getGenres)

router.get('/albums', getAlbums);

router.get('/songs', getSongs);

router.get('/playlist', getPlaylist)

router.use((req, res, next) =>{
    const error = new Error('Not Found');
    res.status(404);
    next(error);
})

router.use((error, req, res) => {
    res.status(error || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = router;