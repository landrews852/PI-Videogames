const initialState = {
    videogames: [],
    allVideogames: [],
    detail: [],
    genres: [],
    platforms: [],
  };
  
  function rootReducer(state = initialState, action) {
    switch (action.type) {
      case 'GET_VIDEOGAMES':
        return {
          ...state,
          allVideogames: action.payload,
          videogames: action.payload,
        };
  
      case 'GET_VIDEOGAMES_NAME':
        return {
          ...state,
          videogames: action.payload,
        };
  
      case 'GET_DETAIL':
        return {
          ...state,
          detail: action.payload,
        };
  
      case 'POST_VIDEOGAME':
        return {
          ...state,
          videogames: action.payload,
        };
  
      case 'GET_GENRES':
        return {
          ...state,
          genres: action.payload,
        };

      // case 'GET_PLATFORMS':
      //   console.log('GET_PLATFORMS', action.payload);
      //     return {
      //       ...state,
      //       platform: [action.payload.results.platforms.map((e) => {
      //         return {
      //           platforms: e.platform.name,
      //         };
      //       }
      //       )],
      //     };
          case "GET_PLATFORMS":
            // let platf = action.payload === "all" ? state.videogames : state.videogames.filter((elem)=>elem.platforms.includes(action.payload))
            return {

                ...state,
                platforms: action.payload.map(elem=>elem.platforms).flat()
                
            }

  
      // case 'SET_SORT':
      //   const asc = action.payload.asc;
      //   return {
      //     ...state,
      //     countries: state.countries.sort((a, b) => {
      //       if (asc) {
      //         return a.name.localeCompare(b.name);
      //       }
      //       return b.name.localeCompare(a.name);
      //     }),
      //   };
  
      // case 'FILTER_BY_CONTINENT':
      //   const allCountries = state.allCountries;
      //   const continentFilter =
      //     action.payload === 'All'
      //       ? allCountries
      //       : allCountries.filter(
      //           (country) => country.continent === action.payload
      //         );
  
      //   return {
      //     ...state,
      //     countries: continentFilter,
      //   };
  
      default:
        return state;
    }
  }
  
  export default rootReducer;