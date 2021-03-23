const { Router } = require('express');
const router = Router();

const { createUser, logIn } = require('../controllers/usuarios')
const { getSongs, getSongByArtistName } = require('../controllers/songs');
const { searchArtist } = require('../controllers/artist');
const { getAlbums, getAlbumsByArtist } = require('../controllers/albums');

router.get('/songs', getSongs);
router.get('/songs/artist', getSongByArtistName);

router.post('/users/', createUser);
router.get('/users/', logIn);

router.get('/artist/', searchArtist);

router.get('/albums', getAlbums);
router.get('/albums/artist', getAlbumsByArtist);


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