const { Videogame, Genre, Op } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;
const { loadDb } = require('../loadDb');


const getDbInfo = async () => {
  return await Videogame.findAll({
    include: [Genre],
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
  let videogames = await getAllVideogames(); //Deposita todo los datos de la db;
  try {
    console.log(videogames[0].genres);
    videogames.length
      ? res.status(200).json(videogames)
      : res.status(404).send('Not found... ):');
  } catch (error) {
    res.status(500).send(error);
  }
};

// const getVideogameById = async (req, res) => {
//   const id = req.params.id;
//   let videogames = await getAllVideogames(); //Deposita todo los datos de la db;
//   if (id) {
//     try {
//     let videogame = videogames.filter((fl) => fl.id.toUpperCase() === id);
//     videogame.length
//       ? res.status(200).json(videogame)
//       : res.status(404).send('Not found... ):');
//     } catch (error) {
//         res.status(500).send(error);
//       }
//   }
//   // res.status(404).send("Not found... ):");
// };
  
const getVideogameById = async (req, res) => {
  const {id} = req.params;
  // console.log(req.params);
  try {
    const videogameId = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
    // const videogame = []
    console.log(videogameId.data);
    videogameId
    ? res.status(200).json(videogameId.data)
    : res.status(404).send('Not found... ):');
      // const videogame = videogameId.values.filter(mp => {
        // return {
        //   img: mp.background_image,
        //   name: mp.name,
        //   genres: mp.genres.map(e => e.name),
        //   description: mp.description,
        //   released: mp.released,
        //   rating: mp.rating,
        //   platforms: mp.platforms.map(e => e.platform.name),
        // };
      //   });
      //   console.log(videogame, 'videogame');
      // res.status(200).json(videogame);
  } catch (error) {
    res.status(500).send(error);
  }
};


const getVideogameByName = async (req, res) => {
  const {name} = req.query;
  // console.log(req.query);
  if (name) {
    try {
      const videogamesName = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
      const videogames = videogamesName.data.results;
      // console.log(videogames[0]);
      if(videogames.length) {
        const games = videogames.slice(0, 15).map(mp => {
          return {
            apiId: mp.id,
            name: mp.name,
            description: mp.description,
            platforms: mp.platforms.map(e => e.platform.name),
            img: mp.background_image,
            rating: mp.rating,
            released: mp.released,
            genres: mp.genres.map(e => e.name),
          };
        }) 
        console.log(games.length);
        res.status(200).json(games) 
      } else res.status(404).send('Not found... ):');
    } catch (error) {
      res.status(500).send(error);
    }
  }
  // res.status(500).send(error);
}

// const getVideogameByName = async (req, res) => {
//   const { name } = req.query;
//   if (name) {
//     try {
//       let videogames = await getAllVideogames();
//       let videogame = videogames.filter((fl) =>
//         fl.name.toLowerCase().includes(name.toLowerCase())
//       );
//       // console.log('videogames', videogame);
//       // console.log(res)
//       // console.log("res", res)
//       videogame.length
//         ? res.status(200).json(videogame)
//         : res.status(404).send('Not found... ):');
//     } catch (error) {
//       console.log(error);
//       res.status(500).send(error);
//     }
//     // try {
//     //   let videogames = await getAllVideogames();
//     //   if (videogames.length)
//     //   return res.json(videogames)
//     //     // : res.status(404).send("Not found... ):");
//     // }
//     // catch (error) {
//     //   console.log(error);
//     //   res.send("error");
//     // }
//   }
// };

const addVideogame = async (req, res) => {
  try {
    const { name, description, released, rating, genres, platforms, gId } = req.body;
    console.log('will add videogame', req.body);

    const validateVideogame = await Videogame.findOne({
      where: {
        name: name,
      },
    });

    if (!name || !description || !released || !rating || !genres || !platforms || !gId) {
      res.status(404).json('Please complete all fields.');
    }

    if (validateVideogame) {
      res.status(404).json('This Videogame already exist.');
    } else {
      // const id = uuidv4();
      const newVideogame = await Videogame.create({
        // id,
        name,
        description,
        released,
        rating,
        genres,
        platforms,
      });

      for (const genreId of gId) {
        await newVideogame.addGenre(genreId);
      }

      res.status(200).send('OK');
    }
  } catch (error) {
    console.log('errro', error);
    res.status(500).send(error);
  }
};

// const addVideogame = async (req, res) => {
//   const { name, description, released, rating, platforms, genres } = req.body;
//   try {
//     const videogame = await Videogame.create({
//       name,
//       description,
//       released,
//       rating,
//       platforms,
//     });
//     const videogameId = videogame.id;
//     const videogameGenres = genres.map((genre) => {
//       return Genre.create({
//         name: genre,
//         videogameId,
//       });
//     });
//     const videogameGenresResult = await Promise.all(videogameGenres);
//     res.status(201).json(videogameGenresResult);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send(error);
//   }
// };


module.exports = {
  getVideogames,
  getVideogameById,
  getVideogameByName,
  addVideogame,
};