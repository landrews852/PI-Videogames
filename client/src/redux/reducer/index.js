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
        const filtered = state.allVideogames
        // const allVideogames = state.videogames;
        console.log(action.payload)
        const genresFilter =
          action.payload === "All"
            ? filtered
            : filtered.filter( 
                (videogame) =>
                // videogame.gId.name === action.payload
                videogame.gId.includes(action.payload)
                );
          console.log(genresFilter)
                
        return {
          ...state,
          videogames: genresFilter,
        };
        
      case 'FILTER_BY_CREATED':
        const videogames = state.allVideogames
        // const allVideogames = state.videogames;
        console.log(action.payload)
        function createdFilter() {
          if(action.payload === 'All') {
            return videogames 
          } if (action.payload === "created") {
            videogames.filter( 
              (e) =>
                e.createdInDb === true
              );
          } else {
            videogames.filter( 
              (e) =>
                e.createdInDb === false
              );
          }}
          console.log(createdFilter())
                
        return {
          ...state,
          videogames: createdFilter(),
        };
  
      default:
        return state;
    }
  }
  
  export default rootReducer;