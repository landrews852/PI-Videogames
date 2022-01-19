const initialState = {
    videogames: [],
    allVideogames: [],
    detail: [],
    genres: [],
    platforms: [],
    sortRating: [],
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

      case 'GET_PLATFORMS':
        // console.log('GET_PLATFORMS', action.payload);
        const platforms = action.payload.map(e => e.platforms).flat()
        const platformsUnique = [...new Set(platforms)]
          return {
            ...state,
            platforms: platformsUnique,
          };

      // case "GET_PLATFORMS":
      //   // let platf = action.payload === "all" ? state.videogames : state.videogames.filter((elem)=>elem.platforms.includes(action.payload))
      //   return {

      //       ...state,
      //       platforms: action.payload.map(elem=>elem.platforms).flat()
            
      //   }

  
      case 'SET_SORT':
        const asc = action.payload.asc;
        return {
          ...state,
          allVideogames: state.videogames.sort((a, b) => {
            if (asc) {
              return a.name.localeCompare(b.name);
            }
            return b.name.localeCompare(a.name);
          }),
        };
        
      case 'RATING_SORT':

        // const sortByRating =
        // action.payload === "rAsc"
        // ? state.allVideogames.sort((a, b) => b.rating - a.rating)
        // : state.allVideogames.sort((a, b) => a.rating - b.rating);

        // return {
        //   ...state,
        //   allVideogames: action.payload === "All" ? allVideogames : sortByRating,
        // };

      // const rAsc = action.payload.rAsc; 
      // const rDesc = action.payload.rDesc; 
      // // const rDesc = action.payload.rDesc; 
      // function arraySort() {
      //   if (rAsc) {
      //     // console.log(a.rating - b.rating)
      //     console.log(action.payload)
      //     return state.videogames.sort((a, b) => a.rating - b.rating);
      //   } 
      //    if(rDesc) {
      //     // console.log(b.rating-a.rating)
      //     console.log(action.payload)
      //     return state.videogames.sort((a, b) => b.rating - a.rating)
      //   } else return state.videogames.sort((a, b) => b.rating.localeCompare(a.rating))
      // };
      // return {
      //   ...state,
      //   sortRating: arraySort()
      // };

        let arraySort1 =
        action.payload === "rAsc"
          ? state.videogames.sort(function (a, b) {
              if (a.rating > b.rating) {
                return 1;
              }
              if (b.rating > a.rating) {
                return -1;
              }
              return 0;
            })
          : state.videogames.sort(function (a, b) {
              if (a.rating > b.rating) {
                return -1;
              }
              if (b.rating > a.rating) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        allVideogames: arraySort1,
      };
  
      case 'FILTER_BY_GENRES':
        const genres = state.genres
        // const allVideogames = state.videogames;
        console.log(action.payload)
        const genresFilter =
          action.payload === 'All'
            ? genres
            : genres.filter( 
                (videogame) =>
                // videogame.gId.name === action.payload
                videogame.genres.includes(action.payload)
                );
                // console.log(allVideogames.gId)
                
        return {
          ...state,
          allVideogames: genresFilter,
        };
  
      default:
        return state;
    }
  }
  
  export default rootReducer;