const { Router } = require('express');
const router = Router();
const { getGenres } = require('../controllers/controllerGenres');

router.get('/genres', getGenres);
// router.get('/genres/:id', getGenresId);


module.exports = router;