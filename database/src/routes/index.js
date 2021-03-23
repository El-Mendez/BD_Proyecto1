const { Router } = require('express');
const router = Router();

const { getSongs } = require('../controllers/index.controller')

router.get('/songs', getSongs);

module.exports = router;