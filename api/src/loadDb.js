const axios = require('axios');
const { Videogame } = require('./db');
const { API_KEY } = process.env;

const getApiInfo = async () => {
  const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
  const apiInfo = await apiUrl().data.map((mp) => {
    return {
      name: mp.name,
      description: mp.description,
      platforms: mp.platforms,
      img: mp.background_image,
      rating: mp.ratings,
      released: mp.released,
      genres: mp.genres,
    };
  });
  console.log(apiInfo);
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