import axios from 'axios';

export function getVideogames() {
  return async function (dispatch) {
    var json = await axios.get('http://localhost:3001');

    return dispatch({
      type: 'GET_VIDEOGAMES',
      payload: json.data,
    });
  };
}

export function getVideogamesName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        'http://localhost:3001/videogames?name=' + name
      );

      console.log(json.data);

      return dispatch({
        type: 'GET_VIDEOGAMES_NAME',
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDetail(id) {
  return async (dispatch) => {
    var json = await axios.get('http://localhost:3001/videogames/' + id);

    return dispatch({
      type: 'GET_DETAIL',
      payload: json.data,
    });
  };
}

// export function addActivity(payload) {
//   return async function (dispatch) {
//     var json = await axios.post("http://localhost:3001/activity", payload);

//     // return json
//     return dispatch({
//       type: "POST_ACTIVITY",
//       payload: json.data,
//     });
//   };
// }

export function addVideogame (payload) {
  return async function (dispatch) {
    return await axios.post(`http://localhost:3001/new`, payload).then((res) => {
      dispatch({ type: 'POST_VIDEOGAME', 
      payload: res.data });
    });
  };
};

export function getGenres() {
  return async function (dispatch) {
    var json = await axios.get('http://localhost:3001/genres/');

    dispatch({
      type: 'GET_GENRES',
      payload: json.data,
    });
  };
}

export function getPlatforms() {
  return async function (dispatch) {
    var json = await axios.get('http://localhost:3001/');

    dispatch({
      type: 'GET_PLATFORMS',
      payload: json.data,
    });
  };
}


export function filterCountriesContinent(payload) {
  // return async function (dispatch) {
  // var json = await axios.get("http://localhost:3001/countries");

  return {
    type: 'FILTER_BY_CONTINENT',
    payload,
  };
  // };
}

export function setSort(payload) {

  return {
    type: 'SET_SORT',
    payload: {
      asc: payload,
    },
  };
}

export function ratingSort(payload) {

  return {
    type: 'RATING_SORT',
    payload,
  };
}

export function filterByGenres(payload) {
  return {
    type: 'FILTER_BY_GENRES',
    payload,
  };
}

export function filterByCreated(payload) {
  return {
    type: 'FILTER_BY_CREATED',
    payload,
  };
}

export async function validate(payload) {
  return async function (dispatch) {
    return await axios.use('http://localhost:3001/validate', payload).then((res) => {
      dispatch({ type: 'VALIDATE', 
      payload: res.boolean });
    });
  }
}

// export function deleteActivity(id) {
//   return async function (dispatch) {
//       var json = await axios.delete("http://localhost:3001/activity/" + id);

//       dispatch({
//         type: "DELETE_ACTIVITY",
//         payload: json.data
//       });
//   }
// }

// export function postActivity(payload) {
//   return async (dispatch) => {
//       var json = await axios.post("http://localhost:3001/activity", payload);
//       console.log(json)

//       return json
//       // dispatch({
//       //   type: "POST_ACTIVITY",
//       //   payload: json.data
//       // });
//   };
// }