const { Router } = require('express');
const router = Router();

const { getSongs, createUser, logIn } = require('../controllers/index.controller')

router.get('/songs', getSongs);
router.post('/users/', createUser);
router.get('/login/', logIn);

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