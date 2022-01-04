const { Videogame, Genre, Op } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

const getDbInfo = async () => {
    return await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ['name'],
        through: {
          attributes: [],
        },
      },
    });
  };
  
  const getAllVideogames = async () => {
    const dbInfo = await getDbInfo();
    if (!dbInfo.length) {
      await loadDb();
      return await getDbInfo();
    }
    return dbInfo;
  };

  // const getVideogame = async (id) => {
  //   const dbInfo = await getDbInfo();
  //   if (!dbInfo.length) {
  //     await loadDb();
  //     return await getDbInfo();
  //   }
  //   return dbInfo.find((e) => e.id === id);
  // }

  const getVideogames = async (req, res) => {
    let videogames = await getAllVidegames(); //Deposita todo los datos de la db;
    try {
      videogames.length
        ? res.status(200).json(videogames)
        : res.status(404).send('Not found... ):');
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  const getVideogameById = async (req, res) => {
    const id = req.params.id;
    let videogames = await getAllVideogame(); //Deposita todo los datos de la db;
    if (id) {
      try {
      let videogame = videogames.filter((fl) => fl.id.toUpperCase() === id);
      videogame.length
        ? res.status(200).json(videogame)
        : res.status(404).send('Not found... ):');
      } catch (error) {
          res.status(500).send(error);
        }
    }
    // res.status(404).send("Not found... ):");
  };

  const getVideogameByName = async (req, res) => {
    const { name } = req.query;
    if (name) {
      try {
        let videogames = await getAllVideogames();
        let videogame = videogames.filter((fl) =>
          fl.name.toLowerCase().includes(name.toLowerCase())
        );
        // console.log('videogames', videogame);
        // console.log(res)
        // console.log("res", res)
        videogame.length
          ? res.status(200).json(videogame)
          : res.status(404).send('Not found... ):');
      } catch (error) {
        console.log(error);
        res.status(500).send(error);
      }
      // try {
      //   let videogames = await getAllVideogames();
      //   if (videogames.length)
      //   return res.json(videogames)
      //     // : res.status(404).send("Not found... ):");
      // }
      // catch (error) {
      //   console.log(error);
      //   res.send("error");
      // }
    }
  };

  module.exports = {
    getVideogames,
    getVideogameById,
    getVideogameByName,
  };