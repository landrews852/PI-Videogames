const { Router } = require('express');
const router = Router();
const { getGenres, addGenre } = require('../controllers/controllerGenres');

router.get('/genres', getGenres);
router.post('/newgenre', addGenre);


module.exports = router;