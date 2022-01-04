const { Router } = require('express');
const router = Router();
const { getGenres } = require('../controller/controllerGenres');

router.get('/genres', getActivities);
router.get('/genres/:id', getActId);


module.exports = router;