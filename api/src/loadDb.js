const axios = require('axios');
const { Videogame } = require('./db');
const { API_KEY } = process.env;

const getApiInfo = async () => {
  const {data} = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
  // console.log("1", data);
  const apiInfo = data.results.map((mp) => {
    // console.log("2", apiInfo);
    return {
      name: mp.name,
      description: mp.description,
      platforms: mp.platforms,
      img: mp.background_image,
      rating: mp.rating,
      released: mp.released,
      // genres: mp.genres.map(el => el.nameGenre),
      genres: mp.genres.map(el => el.name),
    };
  });
  console.log("apiInfo", apiInfo);
  return apiInfo;
};

async function loadDb() {
  try {
    {
      const videogames = await getApiInfo();
      await Promise.all(
        videogames.map(async (e) => {
          // console.log(e);
          await Videogame.create(e);
        })
      );
    }
    // console.log('DB loaded');
  } catch (error) {
    console.log(error);
  }
}

module.exports = { loadDb };