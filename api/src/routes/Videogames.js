const { Router } = require("express");
const router = Router();
const {
  getVideogames,
  getVideogameByName,
  getVideogameById,
} = require("../controllers/controllerVideogame");

router.get("/", getVideogames);
router.get("/videogames", getVideogameByName);
router.get("/videogames/:id", getVideogameById);

module.exports = router;